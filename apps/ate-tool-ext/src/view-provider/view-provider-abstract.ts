import type {
  ExtensionContext,
  Webview,
  WebviewPanel,
  WebviewView,
  WebviewViewProvider
} from 'vscode'
import { Uri } from 'vscode'
import { readFileSync } from 'fs'
import { join } from 'path'
import { modifyHtml } from 'html-modifier' // 用于修改 html 内容的库，基于：htmlparser2。下载：pnpm i -F extension html-modifier
import type { Messenger } from 'vscode-messenger'

export type ViewProviderOptions = {
  distDir: string // 打包目录
  indexPath: string // index.html模板路径
  routePath?: string // 跳转的页面path
}

export abstract class AbstractViewProvider implements WebviewViewProvider {
  // 这个是在前端应用插入代码的标识，用于在 index.html 文件适应的位置插入内容
  static WEBVIEW_INJECT_IN_MARK = '__webview_opts__'

  /**
   * 构造方法
   * @param context 该插件的上下文，在插件激活时可以获取
   * @param controllerOptions
   * @param viewProviderOptions 相关配置
   */
  constructor(
    protected context: ExtensionContext,
    protected readonly messenger: Messenger,
    protected viewProviderOptions: ViewProviderOptions
  ) {}

  /**
   * 用于实现 webviewView 的处理逻辑，例如：html 赋值、通讯、设置 webviewView 参数等
   * @param webviewView 可以为 vscode.WebviewView 或者 vscode.WebviewPanel 的实例
   */
  abstract resolveWebviewView(webviewView: WebviewView | WebviewPanel): void

  protected setMessengers(webviewView: WebviewView) {
    this.messenger.registerWebviewView(webviewView)
  }

  /**
   * 处理前端应用 index.html 文件的方法
   * @param webview vscode.Webview 类型，指向 vscode.WebviewView 的一个属性：webview
   * @returns 处理好的 index.html 文本内容
   */
  protected async getWebviewHtml(webview: Webview) {
    const { distDir, indexPath, routePath = '' } = this.viewProviderOptions
    // 前端应用的打包结果所在的目录，形如：https://file%2B.vscode-resource.vscode-cdn.net/d%3A/AAAAA/self/vscode-webview-example/apps/extension/out/view-vue
    const publicPath = webview
      .asWebviewUri(Uri.joinPath(this.context.extensionUri, distDir))
      .toString()
    // 需要在前端应用中插入的脚本，目的是：将上述 webviewUri 所指的目录告知前端应用，前端应用在定位资源时需要
    const injectInContent = `<script> 
      window.${AbstractViewProvider.WEBVIEW_INJECT_IN_MARK} = ${JSON.stringify({
        publicPath,
        routePath
      })}
    </script>`

    const htmlPath = join(this.context.extensionPath, indexPath)
    // 读取 index.html 文件内容
    const htmlText = readFileSync(htmlPath).toString()
    // 使用 html-modifier 库来处理读取的内容，主要的作用是：1、将 script、link 标签中的 src、href 的值，重新赋予正确的值，2、将上述 injectInContent 的内容插入读取的内容中
    const html = await modifyHtml(htmlText, {
      onopentag(name, attribs) {
        if (name === 'script') {
          attribs.src = join(publicPath, attribs.src)
        }
        if (name === 'link') {
          attribs.href = join(publicPath, attribs.href)
        }
        return { name, attribs }
      },
      oncomment(data) {
        // 为匹配上的注释替换为webview opts脚本
        const hasMark = data
          ?.toString()
          .toLowerCase()
          .includes(AbstractViewProvider.WEBVIEW_INJECT_IN_MARK)
        return hasMark ? { data: injectInContent, clearComment: true } : { data }
      }
    })
    return html
  }
}

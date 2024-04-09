import type { ExtensionContext, WebviewView } from 'vscode'
import { AbstractViewProvider } from '../../view-provider-abstract'
import { routes } from '@hf/ate-tool-common'
import type { Messenger } from 'vscode-messenger'
import registerMessenger from './messenger'

export class ViewProviderSidebar extends AbstractViewProvider {
  constructor(context: ExtensionContext, messenger: Messenger) {
    super(context, messenger, {
      distDir: 'dist/view',
      indexPath: 'dist/view/index.html',
      routePath: routes.sidebar.sidebarA.path
    })
  }

  async resolveWebviewView(webviewView: WebviewView) {
    const { webview } = webviewView
    webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri]
    }

    registerMessenger(webviewView, this.messenger)

    webview.html = await this.getWebviewHtml(webview)
  }
}

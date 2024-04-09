import type { WebviewView, Disposable } from 'vscode'
import { workspace, commands } from 'vscode'
import type { Messenger } from 'vscode-messenger'
import { messages } from '@hf/ate-tool-common'

export default function registerMessenger(webviewView: WebviewView, messenger: Messenger) {
  const disposables: Disposable[] = []
  const {
    sidebar: { sidebarA },
    panel: { panelA }
  } = messages

  //, { broadcastMethods: [panelA.methods.OPEN_PANEL] }
  messenger.registerWebviewView(webviewView)

  disposables.push(
    messenger.onRequest({ method: sidebarA.extension.methods.FETCH_THEME }, async () => {
      return workspace.getConfiguration().get('workbench.colorTheme')
    })
  )

  disposables.push(
    messenger.onNotification(
      { method: sidebarA.extension.methods.UPDATE_THEME },
      async (colorTheme: string) => {
        await workspace.getConfiguration().update('workbench.colorTheme', colorTheme)
      }
    )
  )

  disposables.push(
    messenger.onNotification(
      { method: sidebarA.extension.commands.OPEN_PANEL },
      async (_command: string, ..._rest: any[]) => {
        commands.executeCommand(sidebarA.extension.commands.OPEN_PANEL)
      }
    )
  )

  webviewView.onDidDispose(() => disposables.forEach((disposable) => disposable.dispose()))
}

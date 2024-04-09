import { messages } from '@hf/ate-tool-common'
import type { Disposable, WebviewPanel } from 'vscode'
import type { Messenger } from 'vscode-messenger'

export default function registerMessenger(webviewPanel: WebviewPanel, messenger: Messenger) {
  const disposables: Disposable[] = []
  const {
    panel: { panelA }
  } = messages

  messenger.registerWebviewPanel(webviewPanel)

  webviewPanel.onDidDispose(() => disposables.forEach((disposable) => disposable.dispose()))
}

import type { Disposable, WebviewPanel } from 'vscode';
import type { Messenger } from 'vscode-messenger';

export default function registerMessenger(webviewPanel: WebviewPanel, messenger: Messenger) {
  const disposables: Disposable[] = [];

  messenger.registerWebviewPanel(webviewPanel);

  webviewPanel.onDidDispose(() => disposables.forEach((disposable) => disposable.dispose()));
}

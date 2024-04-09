import { Messenger } from 'vscode-messenger-webview';

let messenger: Messenger;

function getMessenger() {
  if (!messenger) {
    const vscode = acquireVsCodeApi();
    messenger = new Messenger(vscode, { debugLog: true });
  }
  return messenger;
}

export default getMessenger;

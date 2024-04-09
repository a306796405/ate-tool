import type * as vscode from 'vscode';
import { Messenger } from 'vscode-messenger';

import panelAEntry from './extensions/webview/panel/panel-a';
import sidebarAEntry from './extensions/webview/sidebar/sidebar-a';

export function activate(context: vscode.ExtensionContext) {
  const messenger = new Messenger({ debugLog: true });

  sidebarAEntry(context, messenger);
  panelAEntry(context, messenger);

  return messenger.diagnosticApi({ withParameterData: true });
}

// export function deactivate() {}

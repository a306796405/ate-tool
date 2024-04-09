import { routes } from '@hf/ate-tool-common';
import type { ExtensionContext, WebviewPanel } from 'vscode';
import type { Messenger } from 'vscode-messenger';

import { AbstractViewProvider } from '../../view-provider-abstract';
import registerMessenger from './messenger';

export class ViewProviderPanel extends AbstractViewProvider {
  constructor(context: ExtensionContext, messenger: Messenger) {
    super(context, messenger, {
      distDir: 'dist/view',
      indexPath: 'dist/view/index.html',
      routePath: routes.panel.panelA.path,
    });
  }

  async resolveWebviewView(webviewPanel: WebviewPanel) {
    const { webview } = webviewPanel;
    webview.options = {
      enableScripts: true,
      localResourceRoots: [this.context.extensionUri],
    };

    registerMessenger(webviewPanel, this.messenger);

    webview.html = await this.getWebviewHtml(webview);
  }
}

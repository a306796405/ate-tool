import { messages } from '@hf/ate-tool-common';
import type { ExtensionContext } from 'vscode';
import { window } from 'vscode';
import type { Messenger } from 'vscode-messenger';

import { ViewProviderSidebar } from '../../../view-provider/sidebar-provider/sidebar-a-provider/provider';

export default function entry(context: ExtensionContext, messenger: Messenger) {
  const {
    sidebar: {
      sidebarA: { extension: sidebarAExtension },
    },
  } = messages;
  const viewProviderSidebar = new ViewProviderSidebar(context, messenger);

  if (
    sidebarAExtension.participant.type === 'extension' &&
    sidebarAExtension.participant.extensionId
  ) {
    const sidebarViewDisposable = window.registerWebviewViewProvider(
      sidebarAExtension.participant.extensionId,
      viewProviderSidebar,
    );

    context.subscriptions.push(sidebarViewDisposable);
  }
}

import { messages } from '@hf/ate-tool-common';
import type { ExtensionContext } from 'vscode';
import { commands, ViewColumn, window } from 'vscode';
import type { Messenger } from 'vscode-messenger';

import { ViewProviderPanel } from '../../../view-provider/panel-provider/panel-a-provider/provider';

export default function entry(context: ExtensionContext, messenger: Messenger) {
  const {
    sidebar: {
      sidebarA: { extension: sidebarAExtension },
    },
  } = messages;

  // 注册react panel view指令
  const panelViewDisposable = commands.registerCommand(
    sidebarAExtension.commands.OPEN_PANEL,
    () => {
      const panel = window.createWebviewPanel('panel-a-view', 'Panel View', ViewColumn.One, {
        enableScripts: true,
      });
      // react panel view 实例化
      const viewProviderPanel = new ViewProviderPanel(context, messenger);
      viewProviderPanel.resolveWebviewView(panel);
    },
  );

  // subscriptions 列表中的 disposable, 会在插件失活时被执行
  context.subscriptions.push(panelViewDisposable);
}

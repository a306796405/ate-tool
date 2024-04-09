import type { MessageInfo } from '@/message/type';

const messageInfo: MessageInfo = {
  extension: {
    participant: { type: 'extension', extensionId: 'sidebar-a-view' },
    methods: {
      FETCH_THEME: 'FETCH_THEME',
      UPDATE_THEME: 'UPDATE_THEME',
    },
    commands: {
      OPEN_PANEL: 'sidebar-a.openPanel',
    },
  },
  webview: {
    participant: { type: 'webview', webviewType: 'sidebar-a-view' },
    methods: {
      MESSAGE_TO_SIDEBAR: 'MESSAGE_TO_SIDEBAR',
    },
    commands: {},
  },
};

export default messageInfo;

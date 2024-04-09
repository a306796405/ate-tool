import type { MessageInfo } from '@/message/type';

const messageInfo: MessageInfo = {
  extension: {
    participant: { type: 'webview', webviewType: 'panel-a-view' },
    methods: {
      MESSAGE_TO_PANEL: 'MESSAGE_TO_PANEL',
    },
    commands: {},
  },
  webview: {
    participant: { type: 'webview', webviewType: 'panel-a-view' },
    methods: {
      MESSAGE_TO_PANEL: 'MESSAGE_TO_PANEL',
    },
    commands: {},
  },
};

export default messageInfo;

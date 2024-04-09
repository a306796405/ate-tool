import type { MessageParticipant, RequestType } from 'vscode-messenger-common';

import getMessenger from '@/utils/messenger';

export function useCommand() {
  const messenger = getMessenger();

  function sendNotification<P, R>(
    type: RequestType<P, R>,
    receiver: MessageParticipant,
    params?: P,
  ) {
    messenger.sendNotification(type, receiver, params);
  }

  function sendRequest<P, R>(
    type: RequestType<P, R>,
    receiver: MessageParticipant,
    params?: P,
  ): Promise<R> {
    return messenger.sendRequest(type, receiver, params);
  }

  return { sendNotification, sendRequest };
}

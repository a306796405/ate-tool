import type { MessageParticipant } from 'vscode-messenger-common'

export type MessageParticipantInfo = {
  participant: MessageParticipant
  methods: Record<string, string>
  commands: Record<string, string>
}

export type MessageInfo = {
  extension: MessageParticipantInfo
  webview: MessageParticipantInfo
}

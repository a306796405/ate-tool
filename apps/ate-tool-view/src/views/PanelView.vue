<script setup lang="ts">
import { useCommand } from '@/hooks/use-command'
import getMessenger from '@/utils/messenger'
import { messages } from '@hf/ate-tool-common'
import { onMounted, reactive, toRefs } from 'vue'
import carPath from '@/assets/car.jpg'
import { usePublicPath } from '@/hooks/use-global-definition'

const messenger = getMessenger()
const carUrl = usePublicPath(carPath)
const { sendNotification } = useCommand()
const {
  panel: { panelA },
  sidebar: { sidebarA }
} = messages
const state = reactive({
  message: '',
  receivedMessage: {
    message: '',
    from: ''
  }
})

onMounted(async () => {
  // 接受传递给panelA的消息
  await messenger.onNotification<{ message: string; from: string }>(
    { method: panelA.webview.methods.MESSAGE_TO_PANEL },
    ({ message, from }) => {
      state.receivedMessage = { message, from }
    }
  )
})

// 给sidebarA传递消息
const clickToSendMessage = async () => {
  await sendNotification(
    { method: sidebarA.webview.methods.MESSAGE_TO_SIDEBAR },
    { type: 'webview', webviewType: 'sidebar-a-view' },
    { message: message.value, from: 'panel-a' }
  )
}

const { message, receivedMessage } = toRefs(state)
messenger.start()
</script>

<template>
  <main>
    <div className="example-block">
      <h2>Webview 之间的通信演示</h2>
      <label for="webview-message-input">请输入消息：</label>
      <input id="webview-message-input" v-model="message" type="text" />
      <button @click="clickToSendMessage()">发送消息</button>
      <div>接受到的消息： {{ receivedMessage.message }}</div>
      <div>发送者： {{ receivedMessage.from }}</div>
      <img :src="carUrl" alt="小米汽车" width="200" />
    </div>
  </main>
</template>

<style>
.example-block {
  margin-bottom: 20px;
  padding-left: 20px;
}

.sidebar {
  width: 100%;
  height: 100vh;
  background-color: #666;
}
</style>

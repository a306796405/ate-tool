<template>
  <div class="sidebar">
    <div class="example-block">
      <h2>打开panel</h2>
      <button @click="clickToOpenPanel">打开panel窗口</button>
    </div>
    <div class="example-block">
      <h2>主题获取、监听和设置演示</h2>
      <label for="color-theme-select">请选择 Vscode 的主题:</label>
      <select id="color-theme-select" v-model="colorTheme" @change="onChangeUpdateTheme()">
        <option v-for="{ value, label } of vscColorThemeOptions" :key="value" :value="value">
          {{ label }}
        </option>
      </select>
      <div>当前窗口 vscode 的主题类型: {{ colorTheme }}</div>
    </div>
    <div class="example-block">
      <h2>Webview 之间的通信演示</h2>
      <label for="webview-message-input">请输入消息：</label>
      <input id="webview-message-input" v-model="message" type="text" />
      <button @click="clickToSendMessage()">发送消息</button>
      <div>接受到的消息： {{ receivedMessage.message }}</div>
      <div>发送者： {{ receivedMessage.from }}</div>
    </div>
    <div className="example-block">
      <ul class="icon-list">
        <li class="icon-item">
          <Icon icon="captcha" :svg="true" />
        </li>
        <li class="icon-item">
          <Icon icon="mdi:ab-testing" />
        </li>
        <li class="icon-item">
          <Icon icon="mdi:access-point" />
        </li>
        <li class="icon-item">
          <Icon icon="mdi:alpha-a-circle" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import getMessenger from '@/utils/messenger';
  import { messages } from '@hf/ate-tool-common';
  import { useVscColorTheme } from '@/hooks/use-vsc-color-theme';
  import { useCommand } from '@/hooks/use-command';
  import { onMounted, reactive, toRefs } from 'vue';
  import Icon from '@/components/Icon/index.vue';

  // Webview 公共资源地址示例
  const messenger = getMessenger();
  const { sendNotification } = useCommand();
  const {
    sidebar: { sidebarA },
    panel: { panelA },
  } = messages;
  const state = reactive({
    message: '',
    receivedMessage: {
      message: '',
      from: '',
    },
  });
  const { message, receivedMessage } = toRefs(state);

  // Vscode 主题监听和设置示例
  const { colorTheme, vscColorThemeOptions, updateTheme } = useVscColorTheme();

  onMounted(async () => {
    // 接受传递给sidebarA的消息
    await messenger.onNotification<{ message: string; from: string }>(
      { method: sidebarA.webview.methods.MESSAGE_TO_SIDEBAR },
      ({ message, from }) => {
        state.receivedMessage = { message, from };
      },
    );
  });

  // 打开panelA
  const clickToOpenPanel = async () => {
    await sendNotification(
      { method: sidebarA.extension.commands.OPEN_PANEL },
      sidebarA.extension.participant,
    );
  };

  // 给panelA传递消息
  const clickToSendMessage = async () => {
    await sendNotification(
      { method: panelA.webview.methods.MESSAGE_TO_PANEL },
      panelA.webview.participant,
      {
        message: message.value,
        from: 'sidebar-a',
      },
    );
  };

  const onChangeUpdateTheme = async () => {
    await updateTheme(colorTheme.value!);
  };

  messenger.start();
</script>

<style lang="scss">
  .example-block {
    margin-bottom: 20px;
    padding-left: 20px;
  }

  .sidebar {
    width: 100%;
    height: 100vh;
    background-color: $menu-background;
  }

  .icon-list {
    display: flex;

    .icon-item {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      font-size: 30px;
    }
  }
</style>

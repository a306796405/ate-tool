import { messages } from '@hf/ate-tool-common';
import { onMounted, ref } from 'vue';

import getMessenger from '@/utils/messenger';

export function useVscColorTheme() {
  const colorTheme = ref<string>();
  const messenger = getMessenger();
  const {
    sidebar: {
      sidebarA: { extension: sidebarAExtension },
    },
  } = messages;

  onMounted(async () => {
    colorTheme.value = await messenger.sendRequest(
      { method: sidebarAExtension.methods.FETCH_THEME },
      sidebarAExtension.participant,
    );
  });

  const updateTheme = async (colorTheme: string) => {
    await messenger.sendNotification(
      { method: sidebarAExtension.methods.UPDATE_THEME },
      sidebarAExtension.participant,
      colorTheme,
    );
  };

  return { colorTheme, vscColorThemeOptions, updateTheme };
}

export const vscColorThemeOptions = [
  {
    label: 'Light High Contrast',
    value: 'Default High Contrast Light',
  },
  {
    label: 'Light (Visual Studio)',
    value: 'Visual Studio Light',
  },
  {
    label: 'Light Modern',
    value: 'Default Light Modern',
  },
  {
    label: 'Light+',
    value: 'Default Light+',
  },
  {
    label: 'Dark High Contrast',
    value: 'Default High Contrast',
  },
  {
    label: 'Dark (Visual Studio)',
    value: 'Visual Studio Dark',
  },
  {
    label: 'Dark Modern',
    value: 'Default Dark Modern',
  },
  {
    label: 'Dark+',
    value: 'Default Dark+',
  },
  {
    label: 'Red',
    value: 'Red',
  },
];

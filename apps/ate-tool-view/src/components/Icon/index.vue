<template>
  <svg v-if="svg" aria-hidden="true" class="svg-icon" :style="getSvgWrapStyle">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
  <span v-else class="app-iconify">
    <Icon :icon="icon" :style="getWrapStyle" />
  </span>
</template>

<script setup lang="ts">
  import { computed, CSSProperties, PropType } from 'vue';
  import { Icon } from '@iconify/vue';
  import { isString } from '@/utils/is';

  defineOptions({ name: 'Icon' });

  const props = defineProps({
    prefix: {
      type: String,
      default: 'icon',
    },
    icon: {
      type: String,
      required: true,
      default: '',
    },
    svg: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number] as PropType<string | number>,
      default: '20',
    },
  });

  const symbolId = computed(() => `#${props.prefix}-${props.icon}`);

  const getWrapStyle = computed((): CSSProperties => {
    const { size, color } = props;
    let fs = size;
    if (isString(size)) {
      fs = parseInt(size, 10);
    }

    return {
      fontSize: `${fs}px`,
      color: color,
      display: 'inline-flex',
    };
  });

  const getSvgWrapStyle = computed((): CSSProperties => {
    const { size } = props;
    let fs = size;
    if (isString(size)) {
      fs = parseInt(size, 10);
    }

    return {
      width: `${fs}px`,
      height: `${fs}px`,
    };
  });
</script>

<style lang="scss" scoped>
  .svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    overflow: hidden;
    outline: none;
    fill: currentcolor; /* 定义元素的颜色，currentColor是一个变量，这个变量的值就表示当前元素的color值，如果当前元素未设置color值，则从父元素继承 */
    vertical-align: -0.15em; /* 因icon大小被设置为和字体大小一致，而span等标签的下边缘会和字体的基线对齐，故需设置一个往下的偏移比例，来纠正视觉上的未对齐效果 */
  }

  .app-iconify {
    display: inline-block;
  }
</style>

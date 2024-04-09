<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router';

  import { useRoutePath } from '@/hooks/use-global-definition';

  const router = useRouter();

  router.push({
    path: useRoutePath().value,
  });

  // function test() {}

  // const test1 = "123";
  // const o = {
  //   a: 1,
  //   b: 2,
  // };
</script>

<template>
  <RouterView />
</template>

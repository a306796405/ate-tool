<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";

import { useRoutePath } from "@/hooks/use-global-definition";

const router = useRouter();

router.push({
  path: useRoutePath().value,
});

// function test() {}
</script>

<template>
  <RouterView />
</template>

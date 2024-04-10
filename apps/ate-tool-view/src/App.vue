<script setup lang="ts">
  import { RouterView, useRouter } from 'vue-router';
  import { useRoutePath } from '@/hooks/use-global-definition';
  import { onMounted } from 'vue';

  const router = useRouter();

  router.push({
    path: useRoutePath().value,
  });

  // function test() {}

  // const test1 = '123';
  // const o = {
  //   a: 1,
  //   b: 2,
  // };
  onMounted(async () => {
    //www.zhihu.com/api/v4/answer_later/count
    const getRes = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    console.log('get:', await getRes.json());
    const postRes = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: 'Hello',
        body: 'XingXingZi',
        userId: 8,
      }),
    });
    console.log('post:', await postRes.json());
    const putRes = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({
        title: 'Hello',
        body: 'XingXingZi',
        userId: 8,
      }),
    });
    console.log('put:', await putRes.json());
    await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'DELETE',
    });
    console.log('deleted');
  });
</script>

<template>
  <RouterView />
</template>

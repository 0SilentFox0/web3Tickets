<template>
  <div id="root">
    <button id="open-idkit" @click="openIDKit">WorldCoin Connect</button>
  </div>
</template>

<script setup>
const { $idkit } = useNuxtApp()

onMounted(() => {
  $idkit.initializeIDKit();
})

const openIDKit = async () => {
  await $idkit.openIDKit();
}
</script>

<style scoped>
#root {
  display: grid;
  justify-content: center;
  justify-items: center;
  align-content: center;
  gap: 24px;
}

#open-idkit {
  background-color: #4f46e5;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>

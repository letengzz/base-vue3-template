<script setup lang="ts">

const value = ref('')
</script>

<template>
  <h1>You did it!</h1>
  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>
  <t-button variant="base">按钮</t-button>
  <t-input v-model="value" placeholder="请输入" />
</template>

<style scoped></style>

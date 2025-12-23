<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <n-config-provider :theme-overrides="{ common: { primaryColor: '#18a058' } }">
    <n-message-provider>
      <n-notification-provider>
        <n-dialog-provider>
          <n-loading-bar-provider>
            <div class="container">
              <h1>You did it!</h1>
              <p>
                Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read
                the documentation
              </p>
              <p>NaiveUI Components Demo:</p>
              <div class="button-group">
                <n-button type="primary" @click="count++">Primary</n-button>
                <n-button type="info" @click="count++">Info</n-button>
                <n-button type="success" @click="count++">Success</n-button>
                <n-button type="warning" @click="count++">Warning</n-button>
                <n-button type="error" @click="count++">Error</n-button>
              </div>
              <p>Count: {{ count }}</p>
            </div>
          </n-loading-bar-provider>
        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.container {
  padding: 20px;
}

h1 {
  color: #18a058;
}

.button-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 16px 0;
}
</style>

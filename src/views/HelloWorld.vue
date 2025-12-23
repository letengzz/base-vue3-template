<script setup lang="ts">
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'

const count = ref(0)
const counterStore = useCounterStore()
</script>

<template>
  <div class="hello">
    <h1>Hello World</h1>
    <p>This is a sample page to demonstrate lazy loading of route components.</p>
    <div>
      <p>Local count: {{ count }}</p>
      <button @click="count++">Increment</button>
    </div>
    <div>
      <p>Store count: {{ counterStore.count }}</p>
      <p>Double count: {{ counterStore.doubleCount }}</p>
      <button @click="counterStore.increment">Increment from store</button>
    </div>
  </div>
</template>

<style scoped>
.hello {
  padding: 20px;
}

h1 {
  color: #42b883;
}

button {
  margin: 5px;
  padding: 10px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}
</style>

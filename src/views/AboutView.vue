<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'
import { ref } from 'vue'

const counter = useCounterStore()

const cherry = ref('i-ep:cherry')

const a = ref('a')
</script>

<template>
  <div class="about">
    <h1 text-25 font-800>This is an about page {{ counter.count }}</h1>
    <button @click="counter.increment">加一</button>
  </div>
  <div class="h-100 w-100 bg-red-800 text-30 text-blue hover:text-black">
    小猫米
  </div>
  <div grid="~ cols-[100px_1fr_1fr] md:cols-[100px_1fr_2fr]" mt30 h200 w-full gap10 border="10 solid #ddd">
    <div bg-red />
    <div bg-green />
    <div bg-blue />
    <div bg-red />
    <div bg-green />
    <div bg-blue />
  </div>
  <!-- 字体 -->
  <div text-20 text-op-55 font-600 color="[rgba(37,51,71,1)]">字体</div>
  <div t205b6>字体</div>
  <!-- 图片 -->
  <div h100 w100 bg="img-[@/assets/logo.svg]" />
  <div i-menu-a />
  <div :class="`i-menu-${a}`" h50 w50 />
  <!-- element icon 需要引入 element图标 -->
  <div class="i-ep:cherry" h50 w50 />
  <div :class="cherry" h50 w50 />
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
    min-height: 100vh;
  }
}
</style>

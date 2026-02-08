<template>
  <div>
    <header>
      <router-link to="/" class="item">home</router-link>&nbsp;
      <router-link to="/demo" class="item">demo</router-link>&nbsp;
      <router-link to="/vueuse" class="item">vueuse</router-link>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>

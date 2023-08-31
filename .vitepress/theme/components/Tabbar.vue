<script setup lang="ts">
import { ref } from 'vue';

const titles = ['All', 'About', 'Projects', 'Blogs', 'Life']

const highlight = ref('All')

const changeHighlight = (title) => {
  highlight.value = title
}
</script>
<template>
  <div class="container">
    <div v-for="title in titles" :key="title" class="tab" :class="{ 'highlight':highlight=== title}"
      @click="changeHighlight(title)">
      {{ title }}
    </div>
  </div>
</template>
<style scoped>
.highlight {
  border-radius: 16px;
  background: var(--vp-c-bg-mute);
  z-index: -1;
}

.tab:hover{
  color: var(--vp-c-text-3);
}

.tab {
  cursor: pointer;
  border-radius: 50px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  height: 32px;
  padding: 0px 16px;
  transition: opacity 0.3s ease 0s;
}

.container {
  position: relative;
  border-radius: 23px;
  transform: translateX(0px);
  display: flex;
  padding: 5px;
  border: 2px solid var(--vp-c-divider-light);
}
</style>

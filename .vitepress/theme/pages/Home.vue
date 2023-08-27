<script setup lang="ts">
import GridLayout from '../components/GridLayout.vue';
import Nav from '../components/Nav.vue'
</script>

<template>
  <div class="container">
    <Nav />
    <GridLayout />
  </div>
</template>
<style scoped>
.container {
  position: relative;
  background: var(--vp-c-bg);
}
</style>

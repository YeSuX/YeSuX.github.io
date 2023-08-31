<script setup lang="ts">
import Packery from 'packery'
import Draggabilly from 'draggabilly'
import { onMounted } from 'vue'
import NightModeToggle from './NightModeToggle.vue';
import Bio from './Bio.vue';

onMounted(() => {

  const elem = document.querySelector('.grid');

  const pckry = new Packery(elem, {
    // options
    itemSelector: '.grid-item',
    gutter: 12,
    columnWidth: 280
  });

  pckry.getItemElements().forEach(function (itemElem) {
    const draggie = new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);
  });
})

</script>
<template>
  <div class="gridContainer">
    <div class="grid">
      <div class="grid-item width-2">
        <Bio />
      </div>
      <div class="grid-item width-1">
        <NightModeToggle />
      </div>
      <div class="grid-item width-1" />
      <div class="grid-item width-1" />
      <div class="grid-item width-1" />
      <div class="grid-item width-1" />
      <div class="grid-item width-1" />
      <div class="grid-item width-1" />
      <div class="grid-item width-1" />
    </div>
  </div>
</template>
<style scoped>
.grid-item {
  opacity: 1;
  /* width: 280px; */
  height: 280px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  background: var(--vp-c-gray-soft);
  border: 2px solid var(--vp-c-border);
}

.grid-item:hover {
  /* border: 4px solid var(--vp-c-border); */
}

.grid-item:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.grid {
  position: relative;
  transition: height .2s ease;
}

.gridContainer {
  max-width: 1196px;
  position: relative;
  margin: 0 auto;
  padding: 0px 20px 80px 20px;
}
</style>

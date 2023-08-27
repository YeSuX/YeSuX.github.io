<script setup lang="ts">
import Packery from 'packery'
import Draggabilly from 'draggabilly'
import { onMounted } from 'vue'

onMounted(() => {

  var elem = document.querySelector('.grid');

  var pckry = new Packery(elem, {
    // options
    itemSelector: '.grid-item',
    gutter: 12
  });

  pckry.getItemElements().forEach(function (itemElem) {
    var draggie = new Draggabilly(itemElem);
    pckry.bindDraggabillyEvents(draggie);
  });
})

</script>
<template>
  <div class="gridContainer">
    <div class="grid">
      <div class="grid-item width-2" />
      <div class="grid-item width-1" />
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
  max-width: 1200px;
  position: relative;
  margin: 0 auto;
  padding: 0px 20px 80px 20px;
}
</style>

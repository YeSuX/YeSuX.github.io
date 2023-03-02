<script lang="ts" setup>
const props = defineProps(["title", "description", "link"]);
const { title, description, link } = props;

const routeToLink = () => {
  location.href = link;
};
</script>

<template>
  <a class="card" :href="link">
    <div class="icon">icon</div>
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="des">{{ description }}</div>
    </div>
  </a>
</template>

<style scoped>
.card:hover {
  color: var(--vp-c-text-1);
  opacity: 1;
  background-color: rgba(136, 136, 136, 0.03);
}
.des {
  opacity: 0.5;
  font-weight: 400;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.icon {
  padding-top: 0.5rem;
  padding-right: 1.25rem;
}
.card {
  padding: 0.8em 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s all ease-out;
  text-decoration: none;
  border-bottom: none !important;
  opacity: 0.6;
  color: var(--vp-c-text-1);
}
</style>
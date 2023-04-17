<script lang="ts" setup>
const props = defineProps(["leftLink", "rightLink"]);
</script>

<template>
  <div class="container">
    <a :href="leftLink" class="btn">
      <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
      </span>
      <span class="button-text">幻灯片</span>
    </a>
    <a :href="rightLink" class="btn">
      <span class="circle" aria-hidden="true">
        <span class="icon arrow"></span>
      </span>
      <span class="button-text">PDF</span>
    </a>
  </div>
</template>
<style scoped>
.btn-container {
  display: flex;
  align-items: center;
  justify-content: center;

}

a:hover .circle {
  width: 100%;
}

a:hover .circle .icon.arrow {
  background: var(--vp-c-bg);
  transform: translate(1em, 0);
}

a:hover .button-text {
  color: var(--vp-c-bg);
}

.button-text {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.75em 0;
  margin: 0 0 0 1.85em;
  color: var(--vp-c-text-1);
  font-weight: 700;
  line-height: 1.6;
  text-align: center;
  text-transform: uppercase;
}

.arrow::before {
  position: absolute;
  content: "";
  top: -0.25em;
  right: 0.0625em;
  width: 0.625em;
  height: 0.625em;
  border-top: 0.125em solid var(--vp-c-bg);
  border-right: 0.125em solid var(--vp-c-bg);
  transform: rotate(45deg);
}

.arrow {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  left: 0.625em;
  width: 1.125em;
  height: 0.125em;
  background: none;
}

.icon {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  background: var(--vp-c-bg);
}

.circle {
  transition: all 0.45s cubic-bezier(0.65, 0, 0.076, 1);
  position: relative;
  display: block;
  margin: 0;
  width: 3em;
  height: 3em;
  background: var(--vp-c-text-1);
  border-radius: 1.625em;
}

.btn {
  width: 12em;
  height: auto;
  margin-right: 10px;
}

a {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
}

.container {
  height: 100px;
  width: 100%;
  justify-content: space-around;
  padding: 10px;
  border: 1px solid var(--vp-c-text-4);
  border-radius: 0.9em;
  grid-gap: 16px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

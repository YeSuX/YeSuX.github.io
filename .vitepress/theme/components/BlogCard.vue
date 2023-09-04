<script setup lang="ts">
import { useRouter } from 'vitepress';

const { title, date, link } = defineProps(['title', 'date', 'link'])

const router = useRouter()

const routeToBlog = (link: string) => {
  router.go('../../../blog' + link)
}
</script>

<template>
  <div class="card">
    <h3 class="card__title">
      {{ title }}
    </h3>
    <!-- <p class="card__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. </p> -->
    <div class="card__date">
      {{ date }}
    </div>
    <div class="readmore"><svg id="Arrow.7" xmlns="http://www.w3.org/2000/svg" width="18.256" height="18.256"
        viewBox="0 0 18.256 18.256" style="transition: all 0.3s ease 0s;">
        <g id="Group_7" data-name="Group 7" transform="translate(5.363 5.325)">
          <path id="Path_10" data-name="Path 10" d="M14.581,7.05,7.05,14.581" transform="translate(-7.05 -7.012)"
            fill="none" stroke="var(--vp-c-text-1)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
          <path id="Path_11" data-name="Path 11" d="M10,7l5.287.037.038,5.287" transform="translate(-7.756 -7)"
            fill="none" stroke="var(--vp-c-text-1)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
        </g>
      </svg>
      <button @click="routeToBlog(link)" class="text" style="line-height: normal;">Read more</button>
    </div>
  </div>
</template>

<style scoped>
/* this card is inspired form this - https://georgefrancis.dev/ */

.readmore {
  height: 36px;
  bottom: 0;
  right: 0;
  margin-bottom: 10px;
  margin-right: 10px;
  position: absolute;
  padding: 0px 12px;
  border-radius: 18px;
  border: none;
  background: transparent;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  transition: all 0.3s ease-out 0s;
}

.readmore:hover{
  font-weight: bolder;
  border: 2px dashed var(--vp-c-brand);
  border-radius: 8px;
}

.card {
  width: 280px;
  font-family: "Arial";
  padding: 1rem;
  cursor: pointer;
  border-radius: var(--border-radius);
}

.card>*+* {
  margin-top: 1.1em;
}

.card .card__content {
  font-size: 0.86rem;
}

.card .card__title {
  padding: 0;
  font-size: 1.3rem;
  font-weight: bold;
}

.card .card__date {
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
}
</style>

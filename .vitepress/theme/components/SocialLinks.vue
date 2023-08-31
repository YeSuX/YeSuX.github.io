<script setup lang="ts">
const routToLink = (link:'linkedin'|'discord'|'twitter'|'github')=>{
  const links = {
    'linkedin':'https://www.linkedin.com/in/suxiong-ye-b4b080228/',
    'discord':'https://discord.gg/evZrD9h5qW',
    'twitter':'https://twitter.com/YeSuX1998',
    'github':'https://github.com/YeSuX'
  }

  location.href = links[link]
}
</script>

<template>
  <div class="main">
    <div class="up">
      <button class="card1" @click="routToLink('linkedin')">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="linkedin">
          <path
            d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
        </svg>
      </button>
      <button class="card2" @click="routToLink('twitter')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="30px" height="30px" class="twitter">
          <path
            d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429">
          </path>
        </svg>
      </button>
    </div>
    <div class="down">
      <button class="card3" @click="routToLink('github')">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30px" height="30px" class="github">
          <path
            d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z">
          </path>
        </svg>
      </button>
      <button class="card4" @click="routToLink('discord')">
        <svg height="30px" width="30px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" class="discord">
          <path
            d="M40,12c0,0-4.585-3.588-10-4l-0.488,0.976C34.408,10.174,36.654,11.891,39,14c-4.045-2.065-8.039-4-15-4s-10.955,1.935-15,4c2.346-2.109,5.018-4.015,9.488-5.024L18,8c-5.681,0.537-10,4-10,4s-5.121,7.425-6,22c5.162,5.953,13,6,13,6l1.639-2.185C13.857,36.848,10.715,35.121,8,32c3.238,2.45,8.125,5,16,5s12.762-2.55,16-5c-2.715,3.121-5.857,4.848-8.639,5.815L33,40c0,0,7.838-0.047,13-6C45.121,19.425,40,12,40,12z M17.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C21,28.209,19.433,30,17.5,30z M30.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C34,28.209,32.433,30,30.5,30z">
          </path>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.up {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.down {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.card1 {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: white;
  border-radius: 32px 5px 5px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.linkedin {
  fill: #2D64BC;
}

.dark .card1 {
  background: #2D64BC;
}

.dark .linkedin {
  fill: white;
}

.card2 {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: white;
  border-radius: 5px 32px 5px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.dark .card2 {
  background: #03A9F4;
}

.twitter {
  fill: #03A9F4;
}

.dark .twitter {
  fill: white;
}

.card3 {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: white;
  border-radius: 5px 5px 5px 32px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.dark .card3 {
  background: black;
}

.dark .github {
  fill: white;
}

.card4 {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
  background: white;
  border-radius: 5px 5px 32px 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  transition: .2s ease-in-out;
}

.dark .card4 {
  background: #8c9eff;
}

.discord {
  fill: #8c9eff;
}

.dark .discord {
  fill: white;
}

.card1:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #2D64BC;
}

.dark .card1:hover {
  background-color: white;
}

.card1:hover .linkedin {
  fill: white;
}

.dark .card1:hover .linkedin {
  fill: #2D64BC;
}

.card2:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #03A9F4;
}

.dark .card2:hover {
  background-color: white;
}

.card2:hover .twitter {
  fill: white;
}

.dark .card2:hover .twitter {
  fill: #03A9F4;
}

.card3:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: black;
}

.dark .card3:hover {
  background-color: white;
}

.card3:hover .github {
  fill: white;
}

.dark .card3:hover .github {
  fill: black;
}

.card4:hover {
  cursor: pointer;
  scale: 1.1;
  background-color: #8c9eff;
}

.dark .card4:hover {
  background-color: white;
}

.card4:hover .discord {
  fill: white;
}

.dark .card4:hover .discord {
  fill: #8c9eff;
}
</style>

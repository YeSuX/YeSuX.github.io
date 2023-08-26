<script setup lang="ts">
import { useData } from 'vitepress'
import Home from './pages/Home.vue'
import DefaultTheme from 'vitepress/theme'

const { page, frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<template>
  <div v-if="frontmatter.layout === 'home'">
    <Home />
  </div>
  <Layout v-else />
</template>

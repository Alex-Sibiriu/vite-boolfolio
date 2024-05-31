<script>

import ProjectCard from './partials/ProjectCard.vue'
import {store } from '../data/store'

export default {
  components: {
    ProjectCard,
  },

  data() {
    return {
      store
    }
  },
}
</script>

<template>
  <div class="container">
    <h1>I miei Progetti</h1>

    <div class="card-wrapper">
      <ProjectCard 
      v-for="project in store.projects" :key="project.id"
      :project="project"
      />
    </div>


  </div>
</template>

<style lang="scss" scoped>

.card-wrapper {
  display: flex;
  flex-wrap: wrap;
}
</style>
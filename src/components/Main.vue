<script>

import {store } from '../data/store';

import ProjectCard from './partials/ProjectCard.vue';

export default {
  components: {
    ProjectCard
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

    <div class="paginator">
      <ul>
      <li
          v-for="(link, index) in store.pageLinks"
          :key="`link-${index}`"
          @click="store.apiUrl = link.url; $emit('changePage')"
          :class="{'disabled': !link.url, 'active': link.active}"
          v-html="link.label"></li>
      </ul>
    </div>

  </div>
</template>

<style lang="scss" scoped>

.container {
  background-color: rgb(133, 152, 171);
  border-radius: 15px;
  h1 {
    text-align: center;
    padding: 10px;
    color: white;
  }
  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}

.paginator {
  display: flex;
  justify-content: center;
  padding: 20px;
  ul {
    display: flex;
    li {
      padding: 5px 10px;
      background: ivory;
      cursor: pointer;
      &:first-child {
        border-top-left-radius: 5px;
        border-end-start-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-end-end-radius: 5px;
      }
      &.disabled {
        pointer-events: none;
        background-color: rgb(165, 165, 165);
      }
      &:hover {
        background-color: #B0C4DE;
      }
      &.active {
        background-color: #608eb3;
        color: white;
      }
    }
  }
}
</style>
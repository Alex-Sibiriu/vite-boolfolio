<script>

import { store } from '../data/store';
import axios from 'axios'

import ProjectCard from '../components/partials/ProjectCard.vue';

export default {
  name: 'Projects',

  components: {
    ProjectCard
  },

  data() {
    return {
      projects: [],
      pageLinks: [],
      toSearch: '',
    }
  },

  methods: {
    getApi() {
      axios.get(store.apiUrl)
      .then(response => {
        this.projects = response.data.data;
        this.pageLinks = response.data.links;
      })
      .catch( error => {
        console.log(error.message);
      })
    },

    searchProjects() {
      axios.get(store.apiUrl + '/search/' + this.toSearch)
      .then(response => {
        this.projects = response.data.data;
        this.pageLinks = response.data.links;
      })
      .catch( error => {
        console.log(error.message);
      })
    }
  },

  mounted() {
    this.getApi()
  },
}
</script>

<template>
  <div class="container">
    <h1>I miei Progetti</h1>

    <div class="search-box">
      <label for="search-bar">Cerca per titolo</label>
      <input
          id="search-bar"
          type="text"
          v-model.trim="toSearch"
          placeholder="Search"
          @keyup.enter="toSearch != '' ? searchProjects() : getApi()">
    </div>

    <div class="card-wrapper">
      <ProjectCard 
      v-for="project in projects" :key="project.id"
      :project="project"
      />
    </div>

    <div class="paginator">
      <ul>
      <li
          v-for="(link, index) in pageLinks"
          :key="`link-${index}`"
          @click="store.apiUrl = link.url; getApi()"
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
  .search-box {
    text-align: end;
    padding-right: 10px;
    label {
      color: white;
      padding: 5px;
    }
    #search-bar {
        margin: 15px 0;
        border-radius: 10px;
        padding: 10px;
      }
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
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
      store,
      projects: [],
      pageLinks: [],
      toSearch: '',
      error: '',
      
      technologies: [],
      searchTech: {},

      types: [],
      searchType: null,

      loading: true
    }
  },

  methods: {
    getApi(apiUrl, type = '') {
      this.loading = true
      axios.get(apiUrl + type)
      .then(response => {
        this.loading = false
        switch (type) {
          case '/technologies':
            this.technologies = response.data
            break;
          case '/types':
            this.types = response.data
            break;
          default:
            this.projects = response.data.data;
            this.pageLinks = response.data.links;
            break;
        }
      })
      .catch( error => {
        this.error = error.message;
      })
    },

    searchProjects() {
      axios.get(store.apiUrl + '/search/', {
        params: {
          title: this.toSearch,
          type: this.searchType
        }
      })
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
    this.getApi(store.apiUrl)
    this.getApi(store.apiUrl, '/technologies')
    this.getApi(store.apiUrl, '/types')
  },
}
</script>

<template>
  <div class="container">
    <h1>I miei Progetti</h1>

    <div class="main-box">
      <div class="card-wrapper">

        <div v-if="!loading">
          <ProjectCard 
          v-for="project in projects" :key="project.id"
          :project="project"
          />
        </div>

        <div class="loader-box" v-else>
          <div class="loader"></div>
        </div>

      </div>

  
      <div class="filter-box">

        <h2>Filtri:</h2>
        <div class="filter-section">
          <label for="search-bar">Cerca per titolo</label>
          <input
              id="search-bar"
              type="text"
              v-model.trim="toSearch"
              placeholder="Search">
        </div>

        <div class="filter-section">
          <h2>Tecnologie</h2>

          <div class="badge-box">
            <span class="tech-badge" :class="{'active': searchTech === technology}" v-for="technology in technologies" :key="`tech-${technology.id}`" @click="searchTech != technology ? searchTech = technology : searchTech = {} ">{{ technology.name }}</span>
          </div>
        </div>

        <div class="filter-section">
          <h2>Tipi</h2>

          <div class="badge-box">
            <span
              class="type-badge"
              :class="{'active': searchType === projectType.id}"
              v-for="projectType in types"
              :key="`type-${projectType.id}`"
              @click=" searchType != projectType.id ? searchType = projectType.id : searchType = null">{{ projectType.name }}</span>
          </div>
        </div>
  
        <div
          class="search-btn"
          
          @click="searchProjects()">
          Cerca
        </div>

      </div>
    </div>

    <div v-if="!loading" class="paginator">
      <ul>
      <li
          v-for="(link, index) in pageLinks"
          :key="`link-${index}`"
          @click="getApi(link.url)"
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
  .main-box {
    display: flex;
    .card-wrapper {
      width: 75%;
      > div:first-child {
        display: flex;
        flex-wrap: wrap;
      }
      > .loader-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .filter-box {
      border-left: 1px solid ivory;
      width: 25%;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      > h2 {
        text-align: center;
        color: white;
        font-size: 1.7rem;
      }
      .filter-section {
        padding: 5px 20px;
        label {
          color: white;
          padding: 5px;
          font-weight: bold;
          font-size: 1.3rem;
        }
        #search-bar {
          margin: 15px 0;
          border-radius: 10px;
          padding: 10px;
        }
        h2 {
          color: white;
          padding-left: 10px;
        }
        .badge-box {
          padding-top: 20px;
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          .tech-badge {
            padding: 5px 10px;
            margin: 5px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            border: 1px solid fuchsia;
            background: linear-gradient(to bottom, white, lightgrey);
            transition: all .3s;
            &:hover {
              background: linear-gradient(to bottom, rgb(255, 227, 231), rgb(197, 172, 176));
            }
            &.active {
              background: linear-gradient(to bottom, violet, rgb(149, 81, 149));
              color: white;
            }
          }
          .type-badge {
            padding: 5px 10px;
            margin: 5px;
            border-radius: 20px;
            font-weight: bold;
            cursor: pointer;
            border: 1px solid lightseagreen;
            background: linear-gradient(to bottom, white, lightgrey);
            transition: all .3s;
            &:hover {
              background: linear-gradient(to bottom, rgb(214, 255, 241), rgb(147, 190, 176));
            }
            &.active {
              background: linear-gradient(to bottom, aqua, rgb(0, 170, 170));
              color: white;
            }
          }
        }
      }
      .search-btn {
        color: white;
        font-weight: bold;
        font-size: 1.2rem;
        text-align: center;
        border: 2px outset darkblue;
        border-radius: 15px;
        padding: 15px;
        cursor: pointer;
        background: linear-gradient(to bottom, cornflowerblue, rgb(57, 57, 255));
      }
    }
  }
}



.loader {
  width: fit-content;
  font-weight: bold;
  font-family: monospace;
  font-size: 30px;
  background:linear-gradient(90deg,#000 50%,#0000 0) right/200% 100%;
  animation: l21 2s infinite linear;
}
.loader::before {
  content :"Loading...";
  color: #0000;
  padding: 0 5px;
  background: inherit;
  background-image: linear-gradient(90deg,#fff 50%,#000 0);
  -webkit-background-clip:text;
          background-clip:text;
}

@keyframes l21{
  100%{background-position: left}
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
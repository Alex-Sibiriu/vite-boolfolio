<script>

import { store } from '../data/store';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue'

export default {
  name: 'projectShow',

  components: {
    Loader
  },

  data() {
    return {
      project: {},
      loading: true
    }
  },

  methods: {
    getApi(slug) {
      this.loading = true;
      axios.get(store.apiUrl + '/project-show/' + slug)
      .then(response => {
        this.project = response.data;
        this.loading = false;
        console.log(this.project);
      })
      .catch(error => {
        console.log(error.message);
      })
    }
  },

  computed: {
    type() {
      if (this.project.type) {
        return this.project?.type?.name
      }
      return 'nessuna tipologia specificata'
    },

    technologies() {
      if (this.project.technologies.length > 0) {
        return this.project.technologies.map(tech => tech.name)
      }
      return 'nessuna tecnologia associata'
    },

    date() {
      const d = new Date(this.project.updated_at);

      let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }

      return new Intl.DateTimeFormat(navigator.language,options).format(d)
    }
  },

  mounted() {
    this.getApi(this.$route.params.slug)
  }
}
</script>

<template>
  <div class="container">
    <div v-if="!loading" >
      <h1>{{ project.title }}</h1>
  
      <div class="show">
        <div class="left-box">
          <img :src="'http://127.0.0.1:8000' + project.image" :alt="project.original_image_name">
  
          <div class="date">
            <p>
              <strong>Tipologia: </strong><span class="type-badge">{{ type }}</span>
            </p>
            <p>{{ date }}</p>
          </div>
    
          <p><strong>Tecnologie: </strong> 
            <span v-if="Array.isArray(technologies)">
              <span v-for="(technology, index) in technologies" :key="index" class="tech-badge">{{ technology }}</span>
            </span>
            <span v-else>{{ technologies }}</span>
          </p>
        </div>
  
        <div class="right-box">
  
          <p><strong>Link: </strong>{{ project.link }}</p>
          
          <h3>Descrizione:</h3>
          <p>{{ project.description }}</p>
        </div>
      </div>
    </div>
    
    <Loader v-else />

  </div>
</template>

<style lang="scss" scoped>

.container {
  background-color: rgb(133, 152, 171);
  border-radius: 15px;
  padding: 20px;
  h1 {
    padding: 10px 0;
    color: white;
    text-align: center;
    padding-bottom: 20px;
  }
  .show {
    display: flex;
    gap: 10px;
    p {
      padding: 10px 0;
    }
    .right-box,
    .left-box {
      padding: 10px;
      border: 1px solid ivory;
      border-radius: 15px;
    }
    .type-badge {
      padding: 5px 10px;
      margin: 5px;
      border-radius: 20px;
      font-weight: bold;
      cursor: pointer;
      border: 1px solid lightseagreen;
      background: linear-gradient(to bottom, aqua, rgb(0, 170, 170));
      color: white;
    }
    .tech-badge {
      padding: 5px 10px;
      margin: 5px;
      border-radius: 20px;
      font-weight: bold;
      cursor: pointer;
      border: 1px solid fuchsia;
      background: linear-gradient(to bottom, violet, rgb(149, 81, 149));
      color: white;
    }
    .date {
      display: flex;
      justify-content: space-between;
      padding-right: 10px;
    }
  }
}
</style>
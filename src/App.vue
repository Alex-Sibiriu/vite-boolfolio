<script>

import axios from 'axios'
import { store } from './data/store';

export default {
  data() {
    return {
      projects: []
    }
  },

  methods: {
    getApi() {
      axios.get(store.apiUrl)
      .then(response => {
        this.projects = response.data;
        console.log(this.projects);
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
  <div>
    <h1>Front End</h1>
  </div>
</template>

<style lang="scss" scoped>

</style>
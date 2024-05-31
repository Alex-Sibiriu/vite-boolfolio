<script>

import axios from 'axios'
import { store } from './data/store';
import Main from './components/Main.vue';

export default {
  components: {
    Main
  },

  methods: {
    getApi() {
      axios.get(store.apiUrl)
      .then(response => {
        store.projects = response.data;
        console.log(store.projects);
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

  <Main />

</template>

<style lang="scss" scoped>

</style>
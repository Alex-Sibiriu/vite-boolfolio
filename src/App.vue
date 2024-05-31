<script>

import axios from 'axios'
import { store } from './data/store';
import Main from './components/Main.vue';
import Header from './components/Header.vue';

export default {
  components: {
    Header,
    Main
  },

  methods: {
    getApi() {
      axios.get(store.apiUrl)
      .then(response => {
        store.projects = response.data.data;
        store.pageLinks = response.data.links;
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

  <Header />

  <Main 
    @changePage="getApi()"
  />

</template>

<style lang="scss" scoped>

</style>
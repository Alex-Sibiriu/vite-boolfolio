<script>

import {store } from '../data/store'

export default {

  data() {
    return {
      store
    }
  },
}
</script>

<template>

  <header>
    <div class="container">
      <ul>
        <li :class="{'active': this.$route.name === 'home' }">
          <router-link :to="{name: 'home'}">Home</router-link>
        </li>

        
        <li :class="{'active': this.$route.name === 'projects' }">
          <router-link :to="{name: 'projects'}">Progetti</router-link>
        </li>

        <li :class="{'active': this.$route.name === 'contacts' }">
          <router-link :to="{name: 'contacts'}">Contatti</router-link>
        </li>
      </ul>
        
    </div>
  </header>

</template>

<style lang="scss" scoped>

@import '../assets/scss/partials/variables';

header {
  height: 70px;
  background-color: $secondary-clr;
  margin-bottom: 20px;

  .container,
  ul, li, a {
    height: 100%;
    transition: all .3s;
  }

  .container {
    display: flex;
    ul {
      display: flex;
      li {
        min-width: 100px;
        border: 4px solid $secondary-clr;
        border-bottom: none;
        text-align: center;
        &:hover,
        &.active {
          background-color: $primary-clr;
          border: 4px inset $secondary-clr;
          border-bottom: none;
          a {
            color: white;
            text-shadow: 2px 2px $txt-primary;
          }
        }
        a {
          display: inline-block;
          padding: 0 10px;
          line-height: 70px;
          font-weight: bold;
          font-size: 1.4rem;
          color: $txt-light;
        }
      }
    }
  }
}

</style>
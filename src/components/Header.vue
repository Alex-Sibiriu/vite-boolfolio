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
        <li>
          <router-link :to="{name: 'home'}">Home</router-link>
        </li>

        
        <li>
          <router-link :to="{name: 'projects'}">Progetti</router-link>
        </li>

        <li>
          <router-link :to="{name: 'contacts'}">Contatti</router-link>
        </li>
      </ul>
        
    </div>
  </header>

</template>

<style lang="scss" scoped>

header {
  height: 70px;
  background-color:  lightslategray;
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
        border: 4px solid lightslategray;
        border-bottom: none;
        text-align: center;
        &:hover {
          background-color: gainsboro;
          border: 4px inset lightslategray;
          border-bottom: none;
          a {
            color: lightslategray;
            text-shadow: 1px 1px black;
          }
        }
        a {
          display: inline-block;
          padding: 0 10px;
          line-height: 70px;
          font-weight: bold;
          font-size: 1.4rem;
          color: white;
        }
      }
    }
  }

  
}

</style>
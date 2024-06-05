<script>

import { store } from '../data/store';
import axios from 'axios';
import Loader from '../components/partials/Loader.vue';

export default {
  name: 'Contacts',

  components: {
    Loader
  },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: '',
      },
      errors: {},
      success: false,
      loading: false
    }
  },

  methods: {
    sendMail() {
      this.loading = true;
      this.errors = {},

      axios.post(store.apiUrl + '/send-mail', this.formData)
      .then(response => {
        console.log(this.loading);
        this.formData = {
          name: '',
          email: '',
          message: '',
        }
        this.success = response.data.success;
        if (response.data.errors) {
          this.errors = response.data.errors;
        }
        this.loading = false;
      })
    }
  },
}
</script>

<template>
  <div class="container">

    <div v-if="success === false">
      <h1>Contattami</h1>
  
      <form v-if="!loading" @submit.prevent="sendMail">
        <div class="form-section">
          <label for="name">Nome</label>
          <input :class="{'error-border' : errors.name && !success }" v-model="formData.name" type="text" id="name" name="name">
          <p>{{ errors.name?.toString() }}</p>
        </div>
  
        <div class="form-section">
          <label for="email">Email</label>
          <input :class="{'error-border' : errors.email && !success }" v-model="formData.email" type="email" id="email" name="email">
          <p>{{ errors.email?.toString() }}</p>
        </div>
  
        <div class="form-section">
          <label for="message">Messaggio</label>
          <textarea :class="{'error-border' : errors.message && !success }" v-model="formData.message" name="message" id="message" rows="10"></textarea>
          <p>{{ errors.message?.toString() }}</p>
        </div>
  
        <button type="submit">Invia</button>
      </form>

      <Loader v-else />
    </div>

    <div class="success-box" v-else>
      <p>Email inviata con successo</p>
    </div>
    
  </div>
</template>

<style lang="scss" scoped>

@import '../assets/scss/partials/variables';

.container {
  background-color: $secondary-clr;
  border-radius: 15px;
  padding: 20px;
  color: $txt-light;
  font-size: 1.5rem;
  box-shadow: 5px 5px $tertiary-clr;
  h1 {
    padding: 10px 0 40px;
  }
  input,
  textarea {
    width: 100%;
    margin-top: 5px;
    border-radius: 10px;
    padding: 10px;
  }
  .form-section {
    margin-bottom: 30px;
  }
  label {
    width: 100%;
    display: inline-block;
    text-align: center;
    font-weight: bold;
  }
  p {
    color: red;
    font-weight: bold;
    padding-left: 10px;
  }
  button {
    padding: 7px 14px;
    background-color: lightgreen;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: all .3s;
    &:hover {
      background-color: rgb(0, 155, 0);
      color: white;
    }
  }
}

.error-border {
  border: 3px solid red
}

.success-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 96, 0);
  border: 2px solid green;
  border-radius: 20px;
  padding: 30px;
  p {
    color: white;
  }
}

</style>
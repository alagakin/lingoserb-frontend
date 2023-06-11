<template>
  <div class="relative mr-4" @change="change">
    <select class="block appearance-none w-full py-2 px-4 rounded-md focus:outline-none focus:bg-white">
      <option value="en" :selected="getUserProfile.lang == 'en'">English</option>
      <option value="ru" :selected="getUserProfile.lang == 'ru'">Русский</option>
    </select>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: "Empty",
  methods: {
    change(event) {
      const value = event.target.value
      const formData = new FormData();
      formData.append('lang', value);
      axios.patch(this.$store.getters.getProfileEndpoint, formData, {
        headers: {
          'Authorization': `Token ${this.$store.getters.getToken}`,
        }
      }).then(response => {
        this.$store.commit('setUserLang', value)
      })
    }
  },
  computed: {
    ...mapGetters(['getUserProfile'])
  },
}
</script>
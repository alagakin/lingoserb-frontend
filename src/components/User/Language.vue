<template>
  <div class="relative mr-4" @change="change">
    <select class="block appearance-none w-full py-2 px-4 rounded-md focus:outline-none focus:bg-white">
      <option value="en" :selected="lang == 'en'">English</option>
      <option value="ru" :selected="lang == 'ru'">Русский</option>
    </select>
  </div>
</template>

<script>

import { mapGetters } from 'vuex';
import { apiRequest } from '../../api.js';

export default {
  name: "Empty",
  methods: {
    async change(event) {
      const value = event.target.value
      this.$store.commit('setUserLang', value)
      this.$i18n.locale = value

      if (this.isAuthenticated) {
        const formData = new FormData();
        formData.append('lang', value);

        try {
          apiRequest('PATCH', this.profileEndpoint(), formData)
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getUserProfile', 'profileEndpoint', 'isAuthenticated']),
    lang() {
      return this.$i18n.locale;
    }
  },
}
</script>
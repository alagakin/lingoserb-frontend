<template>
    <span class="flex items-center justify-center w-36 h-36 rounded-full border-4 border-gray-400 mb-4">
        <font-awesome-icon :icon="['far', 'user']" size="xl" class="text-gray-400 text-6xl" v-if="!getUserProfile" />
        <img @click="openFileManager" :src="getUserProfile?.picture" alt="" v-else
            class="cursor-pointer rounded-full w-full h-full object-cover ">
        <input type="file" ref="fileInput" accept="image/*" style="display: none" @change="handleFileChange">
    </span>
</template>
  
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
    name: 'Picture',
    beforeMount() {
        library.add(faUser);
    },
    computed: {
        ...mapGetters(['getUserProfile'])
    },
    methods: {
        openFileManager() {
            this.$refs.fileInput.click();
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const formData = new FormData();
                formData.append('picture', file);

                axios.patch(this.$store.getters.getProfileEndpoint, formData, {
                    headers: {
                        'Authorization': `Token ${this.$store.getters.getToken}`,
                    }
                }).then(response => {
                    if (response.data?.picture) {
                        this.$store.commit('setUserPicture', response.data.picture)
                    }
                }).catch(error => {
                    console.error('Upload failed:', error);
                });
            }
        }
    }
};
</script>

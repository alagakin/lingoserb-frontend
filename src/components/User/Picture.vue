<template>
    <div class="flex items-center justify-center w-36 h-36 rounded-full border-4 border-gray-400 mb-4">
        <div class="w-full h-full rounded-full overflow-hidden flex cursor-pointer p-0" @click="openFileManager">
            <font-awesome-icon :icon="['far', 'user']" size="xl" class="w-24 h-24 m-auto text-gray-400 text-6xl" v-show="!getUserProfile.picture" />
            <img  :src="getUserProfile?.picture" alt="" v-show="getUserProfile.picture"
                class="rounded-full w-full h-full object-cover ">
            <input type="file" ref="fileInput" accept="image/*" style="display: none" @change="handleFileChange">
        </div>
    </div>
</template>
  
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { mapGetters } from 'vuex';
import { apiRequest } from '../../api.js';

export default {
    name: 'Picture',
    beforeMount() {
        library.add(faUser);
    },
    computed: {
        ...mapGetters(['getUserProfile', 'profileEndpoint'])
    },
    methods: {
        openFileManager() {
            this.$refs.fileInput.click();
        },
        async handleFileChange(event) {
            const file = event.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const formData = new FormData();
                formData.append('picture', file);
                try {
                    const data = await apiRequest('PATCH', this.profileEndpoint(), formData)
                    if (data?.picture) {
                        this.$store.commit('setUserPicture', data.picture)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    }
};
</script>

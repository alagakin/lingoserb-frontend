<template>
    <font-awesome-icon :icon="['fas', 'star']" style="color: #e6c90a;" size="lg" v-show="added" v-on:click="remove"
        class="cursor-pointer hover:scale-105 transition-transform duration-300" />
    <font-awesome-icon :icon="['far', 'star']" style="color: #e6c90a;" size="lg" v-show="!added" v-on:click="add"
        class="cursor-pointer hover:scale-105 transition-transform duration-300" />
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default {
    name: 'AddSaved',
    beforeMount() {
        library.add(farStar, fasStar);
    },
    props: {
        id: Number
    },
    methods: {
        remove() {
            let ids = this.$store.getters.getSavedWordsIds
            this.$store.commit('setSavedWordsIds', ids.filter(id => id !== this.id))
            
            axios.delete(this.$store.getters.getDeleteSavedEnpoint,
                    {
                        data: { word: this.id },
                        headers: { 'Authorization': `Token ${this.$store.getters.getToken}` }
                    })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });

        },
        add() {
            let ids = this.$store.getters.getSavedWordsIds
            ids.push(this.id)
            this.$store.commit('setSavedWordsIds', ids)

            axios.post(this.$store.getters.getAddSavedEnpoint, {
                word: this.id,
            }, {
                headers: {
                    'Authorization': `Token ${this.$store.getters.getToken}`
                }
            }
            ).then(response => {

            })
        },
    },
    computed: {
        added() {
            if (this.$store.getters.getSavedWordsIds.includes(this.id)) {
                return true
            }
            return false
        }
    }
}
</script>
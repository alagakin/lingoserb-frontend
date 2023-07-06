<template>
    <span class="cursor-pointer inline p-1 hover:bg-gray-200 rounded-lg" @click="skipWord">
        <font-awesome-icon :icon="['fas', 'eye-slash']" v-if="skipped" style="color: #172439;"/>
        <font-awesome-icon :icon="['fas', 'eye']" v-else style="color: #555555;"/>
    </span>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { apiRequest } from '../../api.js';
import { mapGetters } from 'vuex';

export default {
    name: "SkipWord",
    components: { FontAwesomeIcon },
    beforeMount() {
        library.add(fas, faEyeSlash, faEye);
    },
    computed: {
        ...mapGetters(['skipWordEndpoint'])
    },
    props: {
        skipped: {
            type: Boolean,
            default: false
        },
        wordId: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            isSkipping: false
        }
    },
    methods: {
        skipWord() {
            if (!this.isSkipping) {
                this.isSkipping = true;
                try {
                    apiRequest('post', this.skipWordEndpoint(this.wordId))
                    this.$emit('skipWord', !this.skipped);
                    this.isSkipping = false;
                } catch (error) {
                    console.log(error)
                }
            }

        }
    }
}
</script>
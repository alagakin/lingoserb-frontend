<template>
    <h3 ref="openButton" class="text-xl italic hover:no-underline mb-2 cursor-pointer underline"
        :class="{ 'opacity-50': skipped }">{{ word.title }} <font-awesome-icon :icon="['fas', 'spinner']" spin v-show="loading"/></h3>

    <div ref="modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(150%)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ word.title }}
                    </h3>
                    <button type="button" ref="closeButton"
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
                <div class="p-6 space-y-6">
                    <p class="text-lg bold leading-relaxe  dark:text-gray-400">
                        Translation:
                    </p>
                    <div v-for="translation, key in word.translation" class="italic ">{{ translation.title }}{{ key <
                        word.translation.length - 1 ? ', ' : '' }}</div>
                            <div v-for="text, key in texts"
                                class="text-base leading-relaxed text-gray-500 relative dark:text-gray-400 border-gray-200 border p-2 rounded-lg">
                                <p>
                                    {{ text.content }}
                                </p>
                                <p class="italic">
                                    {{ text.translation }}
                                </p>
                                <div v-if="text.audio_link" class="absolute top-0 right-4 mt-2 mr-2">
                                    <AudioButton :audio_link="text.audio_link" />
                                </div>
                            </div>
                            <div class="rounded-lg border p-2 x" v-if="!loaded">
                                <p class="text-gray-500 mt-2  animate-pulse bg-gray-200 w-full rounded-full">&nbsp;</p>
                                <div class="text-gray-500 mt-2  animate-pulse bg-gray-200 w-full rounded-full">&nbsp;</div>
                                <p class="text-gray-500 mt-2  animate-pulse bg-gray-200 w-full rounded-full">&nbsp;</p>
                                <p class="text-gray-500 mt-2  animate-pulse bg-gray-200 w-full rounded-full">&nbsp;</p>
                            </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import AudioButton from './AudioButton.vue'
import { apiRequest } from '../api';
import { mapGetters } from 'vuex';

export default {
    name: "TranslationModal",
    props: {
        word: {
            type: Object,
            required: true
        },
        skipped: {
            type: Boolean,
            required: false
        }
    },
    components: {
        AudioButton
    },
    computed: {
        ...mapGetters(['textForWordEndpoint'])
    },
    data() {
        return {
            loaded: false,
            texts: Array,
            loading: false
        }
    },
    mounted() {
        library.add(fas)
        const modalOptions = {
            backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
        }
        this.modal = new Modal(this.$refs.modal, modalOptions);
        this.openButton = this.$refs.openButton
        this.closeButton = this.$refs.closeButton

        this.openButton.addEventListener('click', () => this.open());
        this.closeButton.addEventListener('click', () => this.modal.hide());

        this.styleBodyWhenOpen()
    },
    methods: {
        styleBodyWhenOpen() {
            let padding = window.innerWidth - document.documentElement.clientWidth
            document.body.style.setProperty('--paddingRight', padding + 'px')
        },
        open() {
            this.getTexts()
        },
        async getTexts() {
            if (this.word.texts_count <= 0) {
                return
            }
            if (this.loaded) {
                this.modal.show()
                return
            }
            try {
                this.loading = true
                const data = await apiRequest('GET', this.textForWordEndpoint(this.word.id))
                this.modal.show()
                this.loading = false

                if (data) {
                    this.loaded = true
                    this.texts = data.texts
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
<template>
    <div ref="modal" tabindex="-1" aria-hidden="true"
        class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(150%)] max-h-full">
        <div class="relative w-full max-w-2xl max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white" v-html="$t('betaWarning.title')"></h3>
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
                <div class="p-6 space-y-6" v-html="$t('betaWarning.text')"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "BetaWarningModal",
    props: {

    },
    data() {
        return {
            loaded: false,
            texts: Array,
            loading: false
        }
    },
    mounted() {
        const modalOptions = {
            backdropClasses: 'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40'
        }
        this.modal = new Modal(this.$refs.modal, modalOptions);
        this.openButton = this.$refs.openButton
        this.closeButton = this.$refs.closeButton

        this.closeButton.addEventListener('click', () => this.modal.hide());

        this.styleBodyWhenOpen()
        this.open()
    },
    methods: {
        styleBodyWhenOpen() {
            let padding = window.innerWidth - document.documentElement.clientWidth
            document.body.style.setProperty('--paddingRight', padding + 'px')
        },
        open() {
            this.modal.show()
        },
    }
}
</script>
<template>
    <div>
        <div class="min-h-screen overlay" :style="{ backgroundImage: 'url(' + bg + ')' }">
            <div class="overlay-content">
                <p class="text-bold p-12" v-html="$t('underConstruction')"></p>
            </div>
        </div>
        <div class="content">
            <!-- Your regular content here -->
        </div>
    </div>
</template>
  
<style>
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.overlay-content {
    text-align: center;
    color: white;
    font-size: 24px;
}

</style>
  
<script>
import bg from '@/assets/bg_no_mobile.svg'
export default {
    name: "NoMobile",
    data() {
        return {
            showOverlay: false,
            bg: bg
        };
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
        this.handleSize();
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
    },
    methods: {
        handleResize() {
            this.handleSize();
        },
        handleSize() {
            if (screen.width < 1030 || window.innerWidth < 1030) {
                this.showOverlay = true;
            } else {
                this.showOverlay = false;
            }
        }
    }
};
</script>
  
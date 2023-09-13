<template>
    <div class="bg-white p-4">
        <div class="flex justify-between">
            <div class="italic">
                <b>LingoSerb</b>: AI-Driven Serbian Learning, {{ currentYear }}
            </div>
            <div>
                <a href="https://github.com/alagakin" target="_blank">
                    <font-awesome-icon :icon="['fab', 'github']" size="xl" class="mr-3" />
                </a>
                <a href="https://www.linkedin.com/in/alexandar-agakin/" target="_blank">
                    <font-awesome-icon :icon="['fab', 'linkedin']" size="xl" class="mr-3"/>
                </a>
                <a href="https://t.me/alagakin" target="_blank">
                    <font-awesome-icon :icon="['fab', 'telegram']" size="xl" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faGithub, faTelegram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    beforeMount() {
        library.add(fab, faGithub, faTelegram, faLinkedin);
    },
    name: "Footer",
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
}
</script>
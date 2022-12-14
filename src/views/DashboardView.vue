<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        beforeMount() {
                if (!this.userStore.user) {
                        this.$router.push({
                                path: "/Auth",
                                replace: true,
                        });
                }
        },
        computed: {
                ...mapStores(userStore)
        },
}

</script>

<template>
        <h1 class="font-bold"> This is the dashboard!
        </h1>

</template>

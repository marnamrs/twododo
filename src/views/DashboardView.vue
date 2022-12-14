<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        beforeMount() {
                this.checkLog()
        },
        methods: {
                checkLog() {
                        if (!this.userStore.user) {
                                this.$router.push({
                                        path: "/Auth",
                                        replace: true,
                                });
                        }
                },
        },
        computed: {
                ...mapStores(userStore)
        },
}

</script>

<template>
<h2>Welcome /name/</h2>
<button>New task</button>
<button>Sort</button>
<div>/tasks/</div>

</template>

<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        data() {
                return {
                        user: null,
                }
        },
        beforeMount() {
                this.checkLog()
        },
        methods: {
                checkLog() {
                        if (!this.userStore.isLogged) {
                                alert("Log in or register with Twododo to view your dashboard.")
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
<h2>Welcome</h2>
<button>New task</button>
<button>Sort</button>
<div>/tasks/</div>

</template>

<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'
import NavBar from "../components/NavbarApp.vue"

export default {
        components: {
                NavBar
        },
        computed: {
                ...mapStores(userStore)
        },
}
</script>

<template>
<NavBar/>

        This is the dashboard!

        <routerview/>
</template>

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
        methods: {
                login() {
                        this.userStore.signUp()
                }
        }
}
</script>

<template>
<NavBar/>

        This is the dashboard!
        <button @click="login">Login!</button>
        <routerview/>
</template>

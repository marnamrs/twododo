<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'
export default {
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
        This is the dashboard!
        <button @click="login">Login!</button>
        <routerview/>
</template>

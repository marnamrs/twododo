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
                signUp() {
                        this.userStore.signUp()
                },
                signIn() {
                        this.userStore.signInWithEmail()
                },
        }
}

</script>

<template>
        <NavBar />
        <h1>Auth page:</h1>
        <p>This is the auth page</p>

        <div>
                <button @click="signUp" class="bg-lime-200 mx-2">Register!</button>
                <button @click="signIn" class="bg-blue-300 mx-2">Log In</button>
        </div>
</template>
<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        data() {
                return {
                        email: null,
                        password: null,
                }
        },
        computed: {
                ...mapStores(userStore)
        },
        methods: {
                signUp(email, password) {
                        this.userStore.signUp(email, password)
                },
                signIn(email, password) {
                        this.userStore.signInWithEmail(email, password)
                },
        },
        mounted() {
                // if (this.userStore.isLogged) {
                //         alert('You are already logged in, we are redirecting you to the Dashboard.')
                //         this.$router.push({
                //                 path: "/Dashboard",
                //                 replace: true,
                //         })
                // }
        },
}

</script>

<template>
        <h1 class="font-bold">Auth page</h1>
        <p>This is the auth page</p>
        <router-link to="/Auth/LogIn" class="underline">Log In</router-link>
        <router-link to="/Auth/Register" class="underline">Register</router-link>
        <div>
                <router-view />
        </div>
</template>
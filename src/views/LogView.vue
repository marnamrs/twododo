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
                signIn(email, password) {
                        this.userStore.signInWithEmail(email, password)
                },
        }
}

</script>

<template>
        <h2>Log In</h2>

        <form @submit.prevent="signIn(email, password)">
                <label id="email">@</label>
                <input type="email" v-model="email" class="border" />
                <label id="password">password</label>
                <input type="password" v-model="password" class="border" />
                <button class="bg-blue-300 mx-2">Log In</button>
        </form>
</template>
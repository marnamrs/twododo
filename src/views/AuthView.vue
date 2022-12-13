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
        }
}

</script>

<template>
        <h1>Auth page:</h1>
        <p>This is the auth page</p>

        <div>
                Log In:
                <form @submit.prevent="signIn(email, password)">
                        <label id="email">@</label>
                        <input type="email" v-model="email" class="border" />
                        <label id="password">password</label>
                        <input type="password" v-model="password" class="border" />
                        <button class="bg-blue-300 mx-2">Log In</button>
                </form>
                Registration:
                <form @submit.prevent="signUp(email, password)">
                        <label id="email">@</label>
                        <input type="email" v-model="email" class="border" />
                        <label id="password">password</label>
                        <input type="password" v-model="password" class="border" />
                        <button class="bg-lime-200 mx-2">Register</button>
                </form>

        </div>
</template>
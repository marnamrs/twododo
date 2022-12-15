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
        }
}

</script>

<template>

        <form @submit.prevent="signUp(email, password)">
                <label id="email">@</label>
                <input type="email" v-model="email" class="border" />
                <label id="password">password</label>
                <input type="password" v-model="password" class="border" />
                <button class="bg-lime-200 mx-2">Register</button>
        </form>

</template>

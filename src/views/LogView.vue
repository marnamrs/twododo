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
                reset() {
                        const email = prompt("Please enter your email:");
                        console.log(email);
                        this.userStore.resetPasswordForEmail(email);
                }
        }
}

</script>

<template>

        <form @submit.prevent="signIn(email, password)" class="">
                <div class="mx-auto">
                        <label id="email">Email</label>
                        <input type="email" v-model="email" class="border w-full" />
                </div>
                <div>
                        <label id="password">Password</label>
                        <input type="password" v-model="password" class="border w-full" />
                </div>
                <div class="text-center">
                        <button class="border px-5 rounded-md my-4">Log In</button>
                </div>
        </form>
        <div class="text-center">
                <a @click.once="reset()" class="text-xs mx-5 cursor-pointer">Forgot your password?</a>
        </div>
        
</template>
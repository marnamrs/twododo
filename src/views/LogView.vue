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

        <form @submit.prevent="signIn(email, password)">
                <div class="mx-auto">
                        <label id="email">Email</label>
                        <input type="email" v-model="email" class="border w-full" />
                </div>
                <div>
                        <label id="password">Password</label>
                        <input type="password" v-model="password" class="border w-full" />
                </div>
                <div class="text-center">
                        <button id="button" class="px-6 my-4 caveat">Log In</button>
                </div>
        </form>
        <div class="text-center">
                <a @click.once="reset()" class="text-xs mx-5 cursor-pointer">Forgot your password?</a>
        </div>
        
</template>

<style scoped>
#button {
        white-space: nowrap;
        border-radius: 15px;
        background-color: rgb(241, 241, 241);
        box-shadow: 2px 5px 5px rgba(145, 145, 145, 0.863);
}

#button:hover {
        background-color: rgb(161, 161, 161);
        box-shadow: 1px 2px 2px rgba(112, 112, 112, 0.863);

}
</style>
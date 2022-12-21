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

        <form @submit.prevent="signUp(email, password)" autocomplete="on">
                <div class="mx-auto">
                        <label for="email">Email</label>
                        <input type="email" v-model="email"  id="email" class="border w-full" autocomplete="email" />
                </div>
                <div>
                        <label for="password">Password</label>
                        <input type="password" v-model="password" id="password" class="border w-full" autocomplete="new-password"/>
                </div>
                <div class="text-center">
                        <button id="button" class="px-6 my-4 caveat">Register</button>
                </div>
        </form>

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
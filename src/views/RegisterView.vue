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
                <div class="mx-auto">
                        <label id="email">Email</label>
                        <input type="email" v-model="email" class="border w-full" />
                </div>
                <div>
                        <label id="password">Password</label>
                        <input type="password" v-model="password" class="border w-full" />
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
        background-color: rgb(226, 226, 226);
        box-shadow: 2px 5px 5px rgba(145, 145, 145, 0.863);
}

#button:hover {
        background-color: rgb(187, 187, 187);
        box-shadow: 1px 2px 2px rgba(112, 112, 112, 0.863);

}
</style>
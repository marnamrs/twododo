<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        computed: {
                ...mapStores(userStore),
        }
}
</script>

<template>
        <nav class="flex justify-between items-center h-[3.5rem] px-8 py-8">
                <div id="logo-wrap" class="ml-4 flex justify-between items-center w-48">
                        <div><img src="../assets/images/logonavbar.png" class="h-[3rem]" alt="null"></div>
                        <div class="caveat font-bold text-4xl">Twododo</div>
                </div>
                <div class="flex justify-between cursor-pointer">
                        <router-link to="/"
                                class="block roboto px-5 hover:text-gray-500 hover:drop-shadow-sm">Home</router-link>
                        <router-link to="/Dashboard"
                                class="block roboto px-5 hover:text-gray-500 hover:drop-shadow-sm">Dashboard</router-link>
                        <router-link v-if="!this.userStore.isLogged" to="/Auth"
                                class="block roboto px-5 hover:text-gray-500 whitespace-nowrap hover:drop-shadow-sm">Log
                                In</router-link>
                        <a v-else @click.once="this.userStore.logOff"
                                class="block roboto px-5 hover:text-gray-500 whitespace-nowrap hover:drop-shadow-sm">Log
                                Out</a>
                </div>
        </nav>
</template>

<style scoped>
@media(max-width: 600px) {
        nav {
                flex-direction: column;
                height: auto;
                padding-top: 1rem;
        }

        #logo-wrap {
                margin: .5rem auto;
        }
}
</style>
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
        <nav class="flex justify-between items-center h-[3.5rem]">
                <div class="ml-4 flex justify-between items-center w-48">
                        <div><img src="../assets/images/logonavbar.png" class="h-[3rem]"></div>
                        <div class="caveat font-bold text-4xl">Twododo</div>
                </div>
                <div class="flex justify-between w-1/4 cursor-pointer">
                        <router-link to="/" class="block roboto hover:text-gray-500 hover:drop-shadow-sm">Home</router-link>
                        <router-link to="/Dashboard" class="block roboto hover:text-gray-500 hover:drop-shadow-sm">Dashboard</router-link>
                        <router-link v-if="!this.userStore.isLogged" to="/Auth" class="block roboto hover:text-gray-500 whitespace-nowrap hover:drop-shadow-sm">Log In</router-link>
                        <a v-else @click.once="this.userStore.logOff" class="block roboto hover:text-gray-500 whitespace-nowrap hover:drop-shadow-sm">Log Out</a>
                </div>
        </nav>
</template>
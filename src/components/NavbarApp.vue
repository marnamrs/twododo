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
        <nav class="bg-lime-50 flex justify-between">
                <div>
                        <!-- logo -->LOGOLOGO
                </div>
                <div>
                        <router-link to="/">Home</router-link>
                        <router-link to="/Dashboard">Dashboard</router-link>
                        <router-link v-if="!this.userStore.isLogged" to="/Auth">Log In</router-link>
                        <a v-else @click.once="this.userStore.logOff">Log Out</a>
                </div>
        </nav>
</template>
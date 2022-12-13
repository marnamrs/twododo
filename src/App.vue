<script>
import NavBar from "./components/NavbarApp.vue"

export default {
        components: {
                NavBar
        },
}

</script>

<template>
        <NavBar />
        <div id="app">
                <RouterView />
        </div>
</template>

<style scoped>

</style>

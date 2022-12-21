<script>
import NavBar from "./components/NavbarApp.vue"
import FooterBar from "./components/FooterApp.vue"

export default {
        components: {
                NavBar,
                FooterBar,
        },
}

</script>

<template>
        <NavBar />
        <div id="app">
                <RouterView />
        </div>
        <FooterBar/>
</template>

<style scoped>

</style>

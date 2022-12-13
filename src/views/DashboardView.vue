<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'


export default {
        computed: {
                ...mapStores(userStore)
        },
}
</script>

<template>
<NavBar/>

        This is the dashboard!

        <routerview/>
</template>

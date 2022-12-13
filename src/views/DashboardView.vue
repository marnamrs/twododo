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
        <h1 class="font-bold"> This is the dashboard!
        </h1>

</template>

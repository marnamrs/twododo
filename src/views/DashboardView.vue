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

        This is the dashboard!

</template>

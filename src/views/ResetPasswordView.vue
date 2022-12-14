<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        data() {
                return {
                        email: null,
                        newpassword: null,
                }
        },
        computed: {
                ...mapStores(userStore)
        },
        methods: {
                updateUser(newpassword) {
                        this.userStore.updateUser(newpassword)
                }
        }
}

</script>

<template>
        <form @submit.prevent="updateUser(newpassword)">
                <label id="newpassword">Please enter your new password:</label>
                <input type="password" v-model="newpassword" class="border" />
        </form>
</template>
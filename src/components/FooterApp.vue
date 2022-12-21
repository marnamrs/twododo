<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'
export default {
        data() {
                return {
                        pseudoname: null,
                        lastSingin: null,
                }
        },
        methods: {
                getUserSession() {
                        let user = this.userStore.user;
                        const email = user.email;
                        let end = email.indexOf('@')
                        this.pseudoname = email.substring(0, end)


                        let signIn = user.last_sign_in_at
                        let dateEnd = signIn.indexOf('T')
                        this.lastSingin = signIn.substring(0, dateEnd)

                }
        },
        computed: {
                ...mapStores(userStore),
        },
        mounted() {
                this.getUserSession()
        }
}
</script>

<template>
        <footer class="italic text-right text-[.5rem] mx-2 text-gray-400">
                <div v-if="this.userStore.isLogged">Current session: {{ pseudoname }} : {{ lastSingin }} </div>
        </footer>
</template>
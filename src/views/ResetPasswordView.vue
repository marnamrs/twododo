<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        data() {
                return {
                        newpassword: null,
                }
        },
        computed: {
                ...mapStores(userStore)
        },
        methods: {
                updateUser(newpassword) {
                        this.userStore.updateUser(newpassword)
                        this.$router.push("/")
                }
        }
}

</script>

<template>
        <div class="h-[80vh] w-1/3 mx-auto mt-[10%]">
                <div class="content-box">
                        <form @submit.prevent="updateUser(newpassword)">
                                <div class="my-4 p-8">
                                        <label for="password" class="py-4">Enter new password:</label>
                                        <input type="password" v-model="password" id="password"
                                                autocomplete="current-password" class="border w-full" />
                                </div>
                                <div class="text-center">
                                        <button id="button" class="px-6 my-4 caveat">Send</button>
                                </div>
                        </form>
                </div>
        </div>
</template>

<style scoped>
#button {
        white-space: nowrap;
        border-radius: 15px;
        background-color: rgb(241, 241, 241);
        box-shadow: 2px 5px 5px rgba(145, 145, 145, 0.863);
}

#button:hover {
        background-color: rgb(161, 161, 161);
        box-shadow: 1px 2px 2px rgba(112, 112, 112, 0.863);

}

.content-box {
        height: 15rem;
        width: 25rem;
        margin: auto;
        box-sizing: border-box;
        border-color: black;
        border-width: 1px;
        border-radius: 15px;
        box-shadow: 5px 10px 10px rgb(110, 110, 110);
}
</style>
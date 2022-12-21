<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'

export default {
        data() {
                return {
                        email: null,
                        password: null,
                        isActive: false,
                }
        },
        computed: {
                ...mapStores(userStore)
        },
        methods: {
                signUp(email, password) {
                        this.userStore.signUp(email, password)
                },
                signIn(email, password) {
                        this.userStore.signInWithEmail(email, password)
                },
        },
}

</script>

<template>
        <div id="bg-wrap" class="bg-theme">
                <div id="auth-wrap" class="box-content w-[30rem] mx-auto mt-[15vh]">
                        <div class="flex justify-self-start">
                                <router-link to="/Auth/LogIn" activeClass="bg-white"
                                        class="block whitespace-nowrap tabs caveat">Log In</router-link>
                                <router-link to="/Auth/Register" activeClass="bg-white"
                                        class="block ml-1 hitespace-nowrap tabs caveat">Register</router-link>
                        </div>
                        <div id="tab-content-box" class="p-8 leading-loose bg-white">
                                <router-view />
                        </div>
                </div>
        </div>
</template>

<style scoped>
.bg-theme {

        height: 30rem;
        width: 60rem;
        margin: auto;
        background-image: url(../assets/images/doodle-arrows-bg-sm.jpg);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
}

.tabs {
        font-weight: 600;
        font-size: 24px;
        width: 8rem;
        height: 2.5rem;
        text-align: center;
        line-height: 2.5rem;
        box-sizing: border-box;
        border-color: black;
        border-width: 1px 1px 0 1px;
        border-top-left-radius: 25px;
        border-top-right-radius: 25px;
        background-color: rgb(221, 221, 221);
}

#tab-content-box {
        height: 20rem;
        width: 30rem;
        margin: auto;
        box-sizing: border-box;
        border-color: black;
        border-width: 1px;
        border-bottom-left-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-right-radius: 15px;
        box-shadow: 5px 10px 10px rgb(110, 110, 110);
}

.small-caps {
        font-variant: small-caps;
}

.bg-white {
        background-color: white;
}

@media(max-width: 600px) {
        #auth-wrap {
                margin: 2rem 1rem;
                width: 90vw;
        }

        #tab-content-box {
                width: auto;
        }
        .bg-theme {
                background-image: none;
        }
}
</style>
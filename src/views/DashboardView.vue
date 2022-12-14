<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'
import taskStore from '../stores/task'

export default {
        data() {
                return {
                        id: null,
                        task: null,
                }
        },
        beforeMount() {
                this.checkLog()
        },
        methods: {
                checkLog() {
                        if (!this.userStore.isLogged) {
                                alert("Log in or register with Twododo to view your dashboard.")
                                this.$router.push({
                                        path: "/Auth",
                                        replace: true,
                                });
                        } else {
                                this.id = this.userStore.user.id;
                        }
                },
        },
        computed: {
                ...mapStores(userStore),
                ...mapStores(taskStore),
        },
}

</script>

<template>
<h2>Welcome</h2>
<form @submit.prevent="this.taskStore.createTask(this.id, task)">
        <input type="text" v-model="task" placeholder="Create a new task" class="border"/>
        <button>Add</button>
</form>

<div>
        
</div>

</template>

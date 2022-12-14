<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'
import taskStore from '../stores/task'

export default {
        data() {
                return {
                        id: null,
                        title: null,
                }
        },
        beforeMount() {
                this.checkLog()
        },
        mounted() {
                this.taskStore.fetchTasks();
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
                addTask() {
                        this.taskStore.createTask(this.id, this.title);
                        this.title = null;
                }
        },
        computed: {
                ...mapStores(userStore, taskStore)
        },
}

</script>

<template>
        <h2>Welcome</h2>
        <form @submit.prevent="addTask">
                <input type="text" v-model="title" placeholder="Create a new task" class="border" />
                <button>Add</button>
        </form>
        <div>
                <div>
                        <table>
                                <thead>
                                        <th class="w-80 text-left">Tasks</th>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                </thead>
                                <tbody>
                                        <tr v-for="(task, index) in taskStore.tasks" :key="index">
                                        <td>{{task.title}}</td>
                                        <td>
                                                <!-- priority -->
                                        </td>
                                        <td>
                                                <!-- edit button -->
                                        </td>
                                        <td>
                                                <!-- delete button -->
                                                
                                        </td>
                                </tr>
                                </tbody>
                        </table>
                </div>
        </div>

</template>

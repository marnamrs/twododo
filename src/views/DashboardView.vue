<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'
import taskStore from '../stores/task'

export default {
        data() {
                return {
                        id: null,
                        title: null,
                        status: null,
                        //editing: false --> when true, change title to input
                }
        },
        // beforeMount() {
        //         this.checkLog()
        // },
        mounted() {
                this.taskStore.fetchTasks();
        },
        methods: {
                //         checkLog() {
                //                 this.id = this.userStore.user.id;
                //         }
                // },
                addTask() {
                        this.taskStore.createTask({
                                uuid: this.userStore.user.id,
                                title: this.title,
                                status: 1,
                        });
                        this.title = null;
                },
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
                                        <tr v-for="task in taskStore.tasks" :key="task.id">
                                                <td>{{ task.title }}</td>
                                                <td>
                                                        <!-- priority -->
                                                </td>
                                                <td>
                                                        <!-- edit button -->
                                                </td>
                                                <td>
                                                        <!-- delete button -->
                                                        <img src="../assets/images/trash.png"
                                                                v-on:click="taskStore.deleteTask(task.id)"
                                                                class="w-8" />
                                                </td>
                                        </tr>
                                </tbody>
                        </table>
                </div>
        </div>

</template>

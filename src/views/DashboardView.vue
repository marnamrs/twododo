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
                        priority: null,
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
        <div>
                <form @submit.prevent="addTask">
                        <input type="text" v-model="title" placeholder="New task" class="border" required />
                        <select v-model="priority" required>
                                <option selected hidden>Pick a priority</option>
                                <option value="1">High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                        </select>
                        <button class="block">Add to the list</button>
                </form>
        </div>

        <div>
                <div>
                        <ul class="mx-auto w-9/12">
                                <li v-for="task in taskStore.tasks" :key="task.id">
                                        <span>{{ task.title }}</span>
                                        <span>
                                                <!-- priority -->
                                        </span>
                                        <span>
                                                <!-- edit button -->
                                        </span>
                                        <span>
                                                <!-- delete button -->
                                                <img src="../assets/images/trash.png"
                                                        v-on:click="taskStore.deleteTask(task.id)" class="inline w-8" />
                                        </span>
                                </li>
                        </ul>
                </div>
        </div>

</template>

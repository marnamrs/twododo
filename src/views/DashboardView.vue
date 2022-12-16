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
                        isEditing: false, //when true, change title to input and show edit options
                        archived: false, // when true, show completed  list
                }
        },
        // beforeMount() {
        //         this.checkLog()
        // },
        mounted() {
                this.taskStore.fetchTasks();
        },
        methods: {
                addTask() {
                        this.taskStore.createTask({
                                uuid: this.userStore.user.id,
                                title: this.title,
                                status: 1,
                        });
                        this.title = null;
                },
                switchEdit () {
                        if (this.isEditing === false) {
                                this.isEditing = true;
                        } else { this.isEditing = false}
                },
        },
        computed: {
                ...mapStores(userStore, taskStore),
                // sortTasks() {
                //         return ('something')
                // },
        },
}

</script>

<template>

<div id="dashboard-wrap">
        <div class="w-1/3 mx-auto border rounded-md mt-6">
                <form @submit.prevent="addTask" class="">
                        <input type="text" v-model="title" placeholder="New task" class="border" required />
                        <select v-model="priority" required>
                                <option selected hidden>Pick a priority</option>
                                <option value="1">High</option>
                                <option value="2">Medium</option>
                                <option value="3">Low</option>
                        </select>
                        <button class="block hover:font-bold">Add to the list</button>
                </form>
        </div>
        <div class="flex justify-between mx-auto w-1/3 mb-14">
                <button class="block hover:font-bold" @click="switchEdit">Edit</button>
                <button class="block">Sort</button>
        </div>

        <div class="flex justify-between caveat text-3xl mx-auto">
                <div class="w-[380px] ml-10"> 
                        <ul>
                                <li v-for="task in taskStore.tasks" :key="task.id" class="flex justify-between">
                                        <span class="block">{{ task.title }}</span>
                                        <span class="block">
                                                <!-- priority -->
                                        </span>
                                        <span class="block">
                                                <!-- edit button -->
                                        </span>
                                        <span class="block">
                                                <!-- delete button -->
                                                <img v-if="isEditing" src="../assets/images/trash.png"
                                                        v-on:click="taskStore.deleteTask(task.id)" class="w-8" />
                                        </span>
                                </li>
                        </ul>
                </div>
                <div class="w-[380px]">
                        <ul>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                        </ul>
                </div>
                <div class="w-[380px]">
                        <ul>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                        </ul>
                </div>
                <div class="w-[380px] ">
                        <ul>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                                <li>testestestestest</li>
                        </ul>
                </div>
        </div>
</div>

</template>

<style scoped>

#dashboard-wrap {
        margin: 5rem ;
}

</style>
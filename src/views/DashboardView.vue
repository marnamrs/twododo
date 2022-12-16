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
                        isEditing: false, // when true, show edit options
                        showArchived: true, // when true, show completed tasks
                }
        },
        mounted() {
                this.taskStore.fetchTasks();
        },
        methods: {
                addTask() {
                        const userid = this.userStore.user.id;
                        console.log('id: ' + userid)
                        this.taskStore.createTask(
                                userid, this.title, this.priority,
                        );
                        this.title = null;
                },
                switchEdit() {
                        if (this.isEditing === false) {
                                this.isEditing = true;
                        } else { this.isEditing = false }
                },
        },
        computed: {
                ...mapStores(userStore, taskStore),
        },
}

</script>

<template>

        <div id="dashboard-wrap">
                <!-- ADD TASK -->
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
                <!-- CONTROL SECTION -->
                <div class="flex justify-between mx-auto w-1/3 mb-14">
                        <button class="block hover:font-bold" @click="switchEdit">Edit</button>
                        <button class="block">Sort</button>
                </div>

                <div id="boxes-wrap" class="flex justify-between caveat text-3xl mx-auto">
                        <!-- BOXES: INCOMPLETE BY PRIORITY -->
                        <div id="list-wrap" v-for="(priority, index) in taskStore.incompleteTasks" :key="index"
                                class="content-box">
                                <ul>
                                        <li v-for="task in priority" :key="task.id" class="flex justify-between cursor-pointer hover:line-through">
                                                <span class="block">{{ task.title }}</span>
                                                <span class="block">
                                                        <img v-if="isEditing" src="../assets/images/trash.png"
                                                                v-on:click="taskStore.deleteTask(task.id)"
                                                                class="w-8" />
                                                </span>
                                        </li>
                                </ul>
                        </div>
                        <!-- BOX: COMPLETED -->
                        <div id="archived-wrap" v-if="showArchived" class="content-box line-through decoration-3 decoration-black/50">
                                <ul>
                                        <li v-for="task in taskStore.completeTasks" :key="task.id"
                                                class="flex justify-between">
                                                <span class="block">{{ task.title }}</span>
                                                <span class="block">
                                                        <img v-if="isEditing" src="../assets/images/trash.png"
                                                                v-on:click="taskStore.deleteTask(task.id)"
                                                                class="w-8" />
                                                </span>
                                        </li>
                                </ul>
                        </div>
                </div>
        </div>

</template>

<style scoped>
#dashboard-wrap {
        margin: 5rem;
}

.content-box {
        height: 40vh;
        width: 20vw;
        max-width: 24rem;
        min-width: 18rem;
        margin: auto;
        padding: 1.5rem;
        background-color: rgb(245, 245, 245);

        box-sizing: border-box;
        border: solid 3px rgb(75, 75, 75);
        border-top-left-radius: 15px 220px;
        border-top-right-radius: 225px 25px;
        border-bottom-right-radius: 225px 15px;
        border-bottom-left-radius: 15px 255px;

        box-shadow: 5px 10px 10px rgb(110, 110, 110); 
}

@media(max-width: 1200px) {
        #boxes-wrap {
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
        }

        #list-wrap,
        #archived-wrap {
                padding: 1rem;
        }
}
</style>
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
                        showArchived: false, // when true, show completed tasks
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
                showArchive() {
                        if (this.showArchived === false) {
                                this.showArchived = true;
                        } else { this.showArchived = false }
                }
        },
        computed: {
                ...mapStores(userStore, taskStore),
        },
}

</script>

<template>

        <div id="dashboard-wrap">
                <!-- ADD TASK -->
                <div id="form-wrap" class="w-1/3 mx-auto mt-6">
                        <form @submit.prevent="addTask">
                                <input type="text" v-model="title" placeholder="New task"
                                        class="w-[95%] h-10 drawn-border" required />
                                <select v-model="priority" required>
                                        <option selected hidden>Pick a priority</option>
                                        <option value="1">High</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Low</option>
                                </select>
                                <button class="block hover:font-bold">Add to the list</button>
                        </form>
                </div>

                <!-- BUTTONS SECTION -->
                <div class="flex justify-between mx-auto w-1/3 mt-6 mb-10">
                        <div class="hover-wrap">
                                <button @click="switchEdit" class="caveat text-2xl">
                                        <img src="../assets/images/pencil.png" placeholder="Edit" class="w-10" />
                                        <p>Edit</p>
                                </button>
                        </div>
                        <div class="hover-wrap">
                                <button class="block hover:font-bold" @click="showArchive">Archive</button>
                        </div>
                        <div class="hover-wrap">
                                <button class="block">Sort</button>
                        </div>
                </div>

                <div id="boxes-wrap" class="flex justify-between caveat text-3xl mx-auto">
                        <!-- BOXES: INCOMPLETE BY PRIORITY -->
                        <div id="list-wrap" v-for="(priority, index) in taskStore.incompleteTasks" :key="index"
                                class="content-box">
                                <ul>
                                        <li v-for="task in priority" :key="task.id"
                                                class="flex justify-between cursor-pointer hover:line-through">
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
                        <div id="archived-wrap" v-if="showArchived"
                                class="content-box decoration-3 decoration-black/50">
                                <ul>
                                        <li v-for="task in taskStore.completeTasks" :key="task.id"
                                                class="flex justify-between">
                                                <span class="block striked">{{ task.title }}</span>
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

.drawn-border {
        box-sizing: border-box;
        border: solid 3px rgb(207, 207, 207);
        border-top-left-radius: 60px 220px;
        border-top-right-radius: 220px 60px;
        border-bottom-right-radius: 225px 15px;
        border-bottom-left-radius: 15px 255px;
}

.content-box {
        height: auto;
        min-height: 40vh;
        width: 25vw;
        max-width: 30rem;
        min-width: 15rem;
        margin: 1rem;
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

.hover-wrap p {
        visibility: hidden;
}

.hover-wrap:hover p {
        visibility: visible;
}

.striked {
        position: relative;
}

.striked::before {
        position: absolute;
        content: "";
        left: -2px;
        top: 55%;
        right: -10px;
        border-top: 2px solid rgba(0, 0, 0, 0.658) !important;
        border-color: inherit;
        -webkit-transform: rotate(-5deg);
        -moz-transform: rotate(-5deg);
        -ms-transform: rotate(-5deg);
        -o-transform: rotate(-5deg);
        transform: rotate(-1deg);
}

@media(max-width: 1200px) {
        #dashboard-wrap {
                margin: 1rem;
        }

        #form-wrap {
                min-width: 80vw;
        }

        #boxes-wrap {
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
        }

        .content-box {
                min-width: 80vw;
                margin-bottom: 2rem;
                min-height: 20vh;
        }

        #list-wrap,
        #archived-wrap {
                padding: 1rem;
        }
}
</style>
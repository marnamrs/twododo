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
                        isEditing: false, // when true, task is editable
                        optionsVisible: false, // when true, show edit options
                        showArchived: false, // when true, show completed tasks
                }
        },
        mounted() {
                this.taskStore.fetchTasks();
        },
        methods: {
                addTask() {
                        const userid = this.userStore.user.id;

                        this.taskStore.createTask(
                                userid, this.title, this.priority,
                        );
                        this.title = null;
                },
                findPriority(obj){
                        if (obj.length > 0) {
                                return obj[0].priority;
                        } 

                },
                switchOptions() {
                        if (this.optionsVisible === false) {
                                this.optionsVisible = true;
                        } else { this.optionsVisible = false }
                        if (this.isEditing == true) { this.isEditing = false }
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
                },
                checkImportance(priority) {
                        return priority == 1 ? true : false;
                },
                checkIrrelevance(priority) {
                        return priority == 3 ? true : false;
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
                <div id="form-wrap" class="w-1/3 min-w-max mx-auto mt-2">
                        <form @submit.prevent="addTask">
                                <input type="text" v-model="title" placeholder="New task"
                                        class="w-[95%] h-10 drawn-border focus:outline-none focus:bg-slate-50"
                                        required />
                                <div id="priority-wrap"
                                        class="flex justify-between whitespace-nowrap mx-auto mb-8 px-4">
                                        <p class="caveat  text-2xl font-semibold">Set a priority:</p>
                                        <div class="flex">
                                                <div class="caveat text-2xl mx-2 px-2 rounded-lg hover:bg-red-50">
                                                        <input type="radio" id="highpriority" v-model="priority"
                                                                value="1" />
                                                        <label for="highpriority" class="px-2">High</label>
                                                </div>
                                                <div class="caveat text-2xl mx-2 px-2 rounded-lg hover:bg-yellow-50">
                                                        <input type="radio" id="medpriority" v-model="priority"
                                                                value="2"/>
                                                        <label for="medpriority" class="px-2">Medium</label>
                                                </div>
                                                <div class="caveat text-2xl mx-2 px-2 rounded-lg hover:bg-lime-50">
                                                        <input type="radio" id="lowpriority" v-model="priority"
                                                                value="3" />
                                                        <label for="lowpriority" class="px-2">Low</label>
                                                </div>
                                        </div>
                                </div>
                                <button
                                        class="block caveat text-3xl bg-gray-100 px-10 py-2 rounded-lg mx-auto">Add</button>
                        </form>
                </div>

                <!-- BUTTONS SECTION -->
                <div id="buttons-wrap" class="flex justify-between align-center mx-auto w-[25%] mt-6 mb-6">
                        <div class="hover-wrap">
                                <button @click="switchOptions" class="caveat text-2xl">
                                        <img src="../assets/images/gear.png" placeholder="Edit" class="w-12" />
                                        <p>Options</p>
                                </button>
                        </div>
                        <div v-if="optionsVisible" class="hover-wrap">
                                <button @click="switchEdit" class="caveat text-2xl">
                                        <img src="../assets/images/pencil.png" placeholder="Edit" class="w-12" />
                                        <p>Edit</p>
                                </button>
                        </div>
                        <div class="hover-wrap">
                                <button @click="showArchive" class="caveat text-2xl">
                                        <img src="../assets/images/bag.png" placeholder="Archive" class="w-12" />
                                        <p>Archive</p>
                                </button>
                        </div>

                </div>
                <div v-if="optionsVisible">
                        <p class="!text-[.8rem] mt-[.5rem] text-center text-gray-400 italic">*click on the edit button
                                to change the task content. Remember to save all your changes!</p>
                </div>

                <div id="boxes-wrap" class="flex justify-between caveat text-3xl mx-auto">
                        <!-- BOXES: INCOMPLETE BY PRIORITY -->
                        <div id="list-wrap" v-for="(prioritylist, index) in taskStore.incompleteTasks"
                                :key="index" class="content-box"
                                :class="{ 'important': checkImportance(findPriority(prioritylist)), 'notimportant': checkIrrelevance(findPriority(prioritylist)) }">
                                <i v-if="checkImportance(findPriority(prioritylist))"
                                        class="font-extrabold !text-2xl">High priority:</i>
                                <i v-if="checkIrrelevance(findPriority(prioritylist))"
                                        class="font-extrabold !text-2xl">Low priority:</i>
                                <ul>
                                        <li v-for="task in prioritylist" :key="task.id"
                                                class="flex justify-between leading-loose">
                                                <!-- LIST ITEM / INPUT FIELD -->

                                                <span v-if="!isEditing && !optionsVisible"
                                                        v-on:click="taskStore.toggleStatus(task.id, task.status)"
                                                        class="block cursor-pointer  hover:line-through"> > {{
                                                                        task.title
                                                        }}</span>

                                                <span v-if="optionsVisible && !isEditing" class="block"> > {{ task.title
                                                }}</span>

                                                <input v-if="optionsVisible && isEditing" type="text"
                                                        v-model="task.title"
                                                        class="block bg-transparent border-b border-b-black border-dashed" />

                                                <span class="flex items-center">
                                                        <!-- SAVE CHANGES -->
                                                        <img v-if="optionsVisible && isEditing"
                                                                @click="this.taskStore.editTask(task.id, task.title); switchEdit()"
                                                                src="../assets/images/floppy-disc.png"
                                                                class="block h-6 mx-2 hover:h-8" />
                                                        <!-- DELETE -->
                                                        <img v-if="optionsVisible" src="../assets/images/dustbin.png"
                                                                v-on:click="taskStore.deleteTask(task.id)"
                                                                class="block h-6 hover:h-8" />
                                                </span>
                                        </li>
                                </ul>
                        </div>
                        <!-- BOX: COMPLETED -->
                        <div id="archived-wrap" v-if="showArchived"
                                class="content-box !bg-gray-200 decoration-3 decoration-black/50">
                                <ul>
                                        <li v-for="task in taskStore.completeTasks" :key="task.id"
                                                class="flex justify-between">
                                                <span v-on:click="taskStore.toggleStatus(task.id, task.status)"
                                                        class="block cursor-pointer striked">{{ task.title }}</span>
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
* {
        font-size: 1.4rem;
}

#dashboard-wrap {
        margin: 3rem;
}

#form-wrap {
        padding: 2rem;
        box-sizing: border-box;
        border: solid 3px rgb(75, 75, 75);
        border-top-left-radius: 225px 20px;
        border-top-right-radius: 20px 225px;
        border-bottom-right-radius: 225px 15px;
        border-bottom-left-radius: 15px 255px;

        box-shadow: 5px 10px 10px rgba(78, 78, 78, 0.863);
}

.drawn-border {
        box-sizing: border-box;
        border-bottom: solid 3px rgb(133, 133, 133);
        border-bottom-right-radius: 225px 15px;
        border-bottom-left-radius: 15px 255px;
        margin-bottom: 1rem;
}

.important {
        background-color: rgb(255, 214, 207) !important;
        background-image: url(../assets/images/bg-red-important-exlamations.png);
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: 170px;
        background-blend-mode: overlay;
}

.notimportant {
        background-color: rgb(238, 255, 207) !important;
        background-image: url(../assets/images/bg-green-important-questionmarks.png);
        background-position: right bottom;
        background-repeat: no-repeat;
        background-size: 170px;
}

.content-box {
        height: auto;
        min-height: 35vh;
        width: 30vw;
        max-width: 35rem;
        min-width: 20rem;
        margin: 1rem;
        padding: 1.5rem;
        background-color: rgb(255, 247, 200);
        font-size: 1.4rem;

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

        #priority-wrap {
                flex-direction: column;
                justify-content: center;
                align-items: center;
        }

        #buttons-wrap {
                width: 70%;
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
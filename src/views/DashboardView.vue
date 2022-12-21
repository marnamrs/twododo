<script>
import { mapStores } from 'pinia'
import userStore from '../stores/user'
import taskStore from '../stores/task'
import { useToast } from "vue-toastification"

export default {
        data() {
                return {
                        id: null,
                        title: null,
                        status: null,
                        priority: null,
                        isEditing: false, 
                        changingPriorities: false,
                        showArchived: false, 
                }
        },
        mounted() {
                this.taskStore.fetchTasks();
        },
        setup() {
                const toast = useToast();
                return { toast }
        },
        methods: {
                addTask() {
                        const userid = this.userStore.user.id;
                        this.taskStore.createTask(
                                userid, this.title, this.priority,
                        );
                        this.title = null;
                },
                randomPrompt() {
                        const prompts = ['befriend a dodo', 'outrun an angry thylacine', 'ride a quagga into the sunset', 'search for the last golden toad'];
                        let prompt = prompts[Math.floor(Math.random() * prompts.length)]
                        return `To-do: ${prompt}`
                },
                switchStatus() {
                        this.changingPriorities === false ? this.changingPriorities = true : this.changingPriorities = false;
                        if (this.isEditing === true) { this.isEditing = false }
                },
                switchEdit() {
                        this.isEditing === false ? this.isEditing = true : this.isEditing = false;
                        if (this.changingPriorities === true) { this.changingPriorities = false }
                },
                showArchive() {
                        this.showArchived === false ? this.showArchived = true : this.showArchived = false;
                },
                showInfo(info) {
                        switch (info) {
                                case 'priorities':
                                        if (this.changingPriorities) {
                                                this.toast.info("Change of plans? Drag a task to change its priority.", {
                                                        position: "top-center",
                                                        timeout: 5500,
                                                        closeOnClick: true,
                                                        pauseOnFocusLoss: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        draggablePercent: 0.6,
                                                        showCloseButtonOnHover: false,
                                                        hideProgressBar: true,
                                                        closeButton: "button",
                                                        icon: false,
                                                        rtl: false
                                                });
                                        }

                                        break;
                                case 'edit':
                                        if (this.isEditing) {
                                                this.toast.info("Remember to save each edited task!", {
                                                        position: "top-center",
                                                        timeout: 5500,
                                                        closeOnClick: true,
                                                        pauseOnFocusLoss: true,
                                                        pauseOnHover: true,
                                                        draggable: true,
                                                        draggablePercent: 0.6,
                                                        showCloseButtonOnHover: false,
                                                        hideProgressBar: true,
                                                        closeButton: "button",
                                                        icon: false,
                                                        rtl: false
                                                });
                                        }
                                        break;
                        }


                },
                findPriority(list) {
                        if (list.length > 0) {
                                return list[0].priority;
                        }
                },
                checkPriority(list, index, priority) {
                        let listpriority = list.length > 0 ? this.findPriority(list) : index + 1
                        return listpriority == priority ? true : false;
                },
                startDrag(evt, task) {
                        evt.dataTransfer.dropEffect = 'move';
                        evt.dataTransfer.effectAllowed = 'move';
                        evt.dataTransfer.setData('itemID', task.id);
                },
                onDrop(evt, priority) {
                        const itemID = evt.dataTransfer.getData('itemID');
                        this.taskStore.togglePriority(itemID, priority)
                }
        },
        computed: {
                ...mapStores(userStore, taskStore),
        },
}
</script>

<template>
        <div id="dashboard-wrap">
                <div id="form-wrap" class="mx-auto">
                        <form @submit.prevent="addTask">
                                <input type="text" v-model="title" id="newtask-input" :placeholder="randomPrompt()"
                                        class="drawn-border focus:outline-none focus:bg-slate-100" required />
                                <div id="priority-wrap" class="flex justify-around mx-auto px-4">
                                        <p class="caveat text-2xl font-semibold">Set a priority:</p>
                                        <div class="flex">
                                                <div class="caveat radio-option  hover:bg-red-50">
                                                        <input type="radio" id="highpriority" v-model="priority"
                                                                value="1" />
                                                        <label for="highpriority" class="px-2">High</label>
                                                </div>
                                                <div class="caveat radio-option hover:bg-yellow-50">
                                                        <input type="radio" id="medpriority" v-model="priority"
                                                                value="2" />
                                                        <label for="medpriority" class="px-2">Medium</label>
                                                </div>
                                                <div class="caveat radio-option hover:bg-lime-50">
                                                        <input type="radio" id="lowpriority" v-model="priority"
                                                                value="3" />
                                                        <label for="lowpriority" class="px-2">Low</label>
                                                </div>
                                        </div>
                                </div>
                                <button class="button block caveat bg-gray-100 mx-auto !text-2xl">Add</button>
                        </form>
                </div>

                <div id="buttons-wrap">
                        <div class="hover-wrap">
                                <button @click="switchStatus(); showInfo('priorities')" name="Change Priorities">
                                        <img v-if="!changingPriorities" src="../assets/images/presentation.png"
                                                alt="Change Priorities" class="w-12" />
                                        <img v-if="changingPriorities" src="../assets/images/presentation-active.png"
                                                alt="Change Priorities" class="w-12" />

                                        <p class="icon-info">Change Priorities</p>
                                </button>
                        </div>
                        <div class="hover-wrap">
                                <button @click="switchEdit(); showInfo('edit')" name="Edit">
                                        <img v-if="!isEditing" src="../assets/images/pencil.png" alt="Edit"
                                                class="w-12" />
                                        <img v-if="isEditing" src="../assets/images/pencil-active.png"
                                                alt="Edit" class="w-12" />
                                        <p class="icon-info">Edit Tasks</p>
                                </button>
                        </div>
                        <div class="hover-wrap">
                                <button @click="showArchive" name="Archive">
                                        <div v-if="!showArchived" class="flex flex-col justify-center items-center">
                                                <img src="../assets/images/bag.png" alt="Archive"
                                                        class="w-12" />
                                                <p class="icon-info">Show Archive</p>
                                        </div>
                                        <div v-if="showArchived" class="flex flex-col justify-center items-center">
                                                <img v-if="showArchived" src="../assets/images/bag-active.png"
                                                alt="Archive" class="w-12" />
                                                <p class="icon-info">Hide Archive</p>
                                        </div>
                                </button>
                        </div>
                </div>

                <div id="boxes-wrap" class="flex justify-between caveat text-3xl mx-auto">
                        <div id="list-wrap" v-for="(prioritylist, index) in taskStore.incompleteTasks" :key="index"
                                v-on:drop="onDrop($event, index + 1)" @dragover.prevent @drop.stop.prevent="onDrop"
                                class="content-box" :class="{
                                        'important': checkPriority(prioritylist, index, 1),
                                        'notimportant': checkPriority(prioritylist, index, 3)
                                }">

                                <i v-if="checkPriority(prioritylist, index, 1)" class="importance-heading drawn-border">
                                        High priority:</i>
                                <i v-if="checkPriority(prioritylist, index, 2)" class="importance-heading drawn-border">
                                        Medium priority:</i>
                                <i v-if="checkPriority(prioritylist, index, 3)" class="importance-heading drawn-border">
                                        Low
                                        priority:</i>

                                <div v-for="task in prioritylist" :key="task.id" draggable=true
                                        v-on:dragstart="startDrag($event, task)"
                                        class="drag-el flex justify-between leading-loose">

                                        <span v-if="!isEditing && !changingPriorities"
                                                v-on:click="taskStore.toggleStatus(task.id, task.status)"
                                                class="block cursor-pointer hover:line-through">
                                                > {{ task.title }}
                                        </span>
                                        <span v-if="changingPriorities" class="block cursor-move animate-pulse"> > {{
                                                        task.title
                                        }}</span>
                                        <input v-if="isEditing" type="text" v-model="task.title"
                                                class="block bg-transparent border-b border-b-black border-dashed" />

                                        <span class="flex items-center">
                                                <img v-if="isEditing"
                                                        @click="this.taskStore.editTask(task.id, task.title); switchEdit()"
                                                        src="../assets/images/floppy-disc.png"
                                                        class="block cursor-pointer h-6 mx-2 hover:h-8" />
                                                <img v-if="isEditing" src="../assets/images/dustbin.png"
                                                        v-on:click="taskStore.deleteTask(task.id)"
                                                        class="block h-6 cursor-pointer hover:h-8" />
                                        </span>

                                </div>

                        </div>
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
        margin: 3rem 3rem 0 3rem;
        min-height: 85vh;
}

#form-wrap {
        width: 33.3%;
        min-width: max-content;
        margin-top: .5rem;
        padding: 2rem;
        box-sizing: border-box;
        border: solid 2px rgb(75, 75, 75);
        border-radius: 15px;
        box-shadow: 5px 10px 10px rgba(78, 78, 78, 0.863);
}

#newtask-input {
        width: 95%;
        height: 2.5rem;
}

#newtask-input::placeholder {
        font-family: Caveat;
}

#priority-wrap {
        white-space: nowrap;
        margin-bottom: 2rem;
}

#buttons-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 25%;
        margin: 1.5rem auto .5rem auto;
}

#edit-info,
#edit-info span {
        font-size: .8rem;
        font-style: italic;
        text-align: center;
        margin: .5rem auto;
}

.radio-option {
        font-size: 1.5rem;
        line-height: 2rem;
        border-radius: 0.5rem;
        padding: auto 0.5rem;
        margin: auto 0.5rem;
}

.button {
        font-size: 1.8rem;
        line-height: 2.25rem;
        padding: 0.5rem 2.5rem;
        border-radius: 0.5rem;
}

.button:hover {
        background-color: rgb(218, 218, 218);
        font-weight: 600;
}

.drawn-border {
        box-sizing: border-box;
        border-bottom: solid 3px rgb(80, 80, 80);
        border-bottom-right-radius: 225px 15px;
        border-bottom-left-radius: 2px 225px;
        margin-bottom: 1rem;
}

.drag-el {
        -khtml-user-drag: element;
        height: 2.5rem;
}

.importance-heading {
        font-weight: 800;
        font-size: 1.5rem !important;
        line-height: 2rem !important;
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

.icon-info {
        font-size: 12px;
        color: rgb(126, 126, 126);
        line-height: 2rem;
        white-space: nowrap;
}

.hover-wrap p {
        visibility: hidden;
}

.hover-wrap button {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-style: 1.5rem;
        line-height: 2rem;
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
                width: 50%;
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
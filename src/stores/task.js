import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("task", {
        state() {
                return {
                        tasks: null,
                        completeTasks: [],
                        incompleteTasks: [],
                        tasksHighPrior: [],
                        tasksMedPrior: [],
                        tasksLowPrior: [],
                };
        },
        actions: {
                async fetchTasks() {
                        const { data: tasks } = await supabase
                                .from("tasks")
                                .select("*")
                                .order("id", { ascending: false });
                        this.tasks = tasks;
                        this.filterTasks();
                },
                async filterTasks() {
                        const tasksArray = this.tasks;
                        const completedArr = [];
                        const pendingArr = [];
                        const priorHigh = [];
                        const priorMed = [];
                        const priorLow = [];
                        tasksArray.find((task, i) => {
                                if (task.status === 0) {
                                        completedArr.push(tasksArray[i]);
                                } else if (task.status === 1) {
                                        pendingArr.push(tasksArray[i]);
                                }
                        });
                        pendingArr.find((task, i) => {
                                switch (task.priority) {
                                        case 1:
                                                priorHigh.push(pendingArr[i]);
                                                break;
                                        case 2:
                                                priorMed.push(pendingArr[i]);
                                                break;
                                        case 3:
                                                priorLow.push(pendingArr[i]);
                                                break;
                                }
                        });
                        this.completeTasks = completedArr;
                        this.incompleteTasks = pendingArr;
                        this.tasksHighPrior = priorHigh;
                        this.tasksMedPrior = priorMed;
                        this.tasksLowPrior = priorLow;
                },
                async createTask(uuid, task) {
                        const { error } = await supabase.from("tasks").insert({
                                user_id: uuid,
                                title: task,
                        });
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        this.fetchTasks();
                },
                async deleteTask(id) {
                        const { error } = await supabase
                                .from("tasks")
                                .delete("*")
                                .eq("id", id);
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        this.fetchTasks();
                },
                async editTask(id, newtitle, newpriority) {
                        const { error } = await supabase
                                .from("tasks")
                                .update({
                                        title: newtitle,
                                        priority: newpriority,
                                })
                                .eq("id", id);
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        this.fetchTasks();
                },
        },
});

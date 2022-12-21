import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("task", {
        state() {
                return {
                        tasks: null,
                        completeTasks: [],
                        incompleteTasks: [],
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
                        this.completeTasks = completedArr;
                        if (pendingArr.length > 0) {
                                pendingArr.find((task, i) => {
                                        switch (task.priority) {
                                                case 1:
                                                        priorHigh.push(
                                                                pendingArr[i]
                                                        );
                                                        break;
                                                case 2:
                                                        priorMed.push(
                                                                pendingArr[i]
                                                        );
                                                        break;
                                                case 3:
                                                        priorLow.push(
                                                                pendingArr[i]
                                                        );
                                                        break;
                                        }
                                });
                        }
                        this.incompleteTasks = []; //avoids duplicate elements when adding task before refresh
                        this.incompleteTasks = [priorHigh, priorMed, priorLow]
                        // if (priorHigh.length > 0) {
                        //         this.incompleteTasks.push(priorHigh)
                        // }
                        // if (priorMed.length > 0) {
                        //         this.incompleteTasks.push(priorMed)
                        // }
                        // if (priorLow.length > 0) {
                        //         this.incompleteTasks.push(priorLow)
                        // }
                },
                async createTask(userid, task, prior) {
                        const { error } = await supabase.from("tasks").insert({
                                user_id: userid,
                                title: task,
                                priority: prior,
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
                async editTask(id, title) {
                        const { error } = await supabase
                                .from("tasks")
                                .update({
                                        title: title,
                                        // priority: newpriority,
                                })
                                .eq("id", id);
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        this.fetchTasks();
                },
                async togglePriority(id, priority) {
                        const { error } = await supabase
                                .from("tasks")
                                .update({
                                        priority: priority,
                                })
                                .eq("id", id);
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        this.fetchTasks();
                },
                async toggleStatus(id, status) {
                        const newstatus = status == 1 ? 0 : 1;
                        const { error } = await supabase
                                .from("tasks")
                                .update({
                                        status: newstatus,
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

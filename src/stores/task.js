import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("task", {
        state() {
                return {
                        tasks: null,
                };
        },
        actions: {
                async fetchTasks() {
                        const { data: tasks } = await supabase
                                .from("tasks")
                                .select("*")
                                .order("id", { ascending: false });
                        this.tasks = tasks;
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
                        console.log("in delete function");
                        console.log('id: ' + id)
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
        },
});

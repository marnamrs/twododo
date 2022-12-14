import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("tasks", {
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
                async createTask() {
                        const { error } = await supabase
                                .from("tasks")
                                .insert({ id: 1, name: "Denmark" });
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                },
                async deleteTask() {
                        const { error } = await supabase
                                .from("tasks")
                                .select("*")
                                .order("id");
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                },
        },
});

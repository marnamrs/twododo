import { defineStore } from "pinia";
import { supabase } from "../supabase";

export default defineStore("user", {
        state() {
                return {
                        user: null,
                };
        },

        actions: {
                async fetchUser() {
                        const user = await supabase.auth.user();
                        this.user = user;
                },
                async signUp(email, password) {
                        const { data, error } = await supabase.auth.signUp({
                                email: email,
                                password: password,
                        });
                        if (error) throw error;
                        if (data) this.data = data.user;
                },
                async signInWithEmail(email, password) {
                        const { data, error } =
                                await supabase.auth.signInWithPassword({
                                        email: email,
                                        password: password,
                                });
                        console.log("data: " + data);
                        console.log("Test log:  inside login function");
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        if (data) {
                                this.user = data.user;
                                console.log("Test log: inside if data");
                                this.$router.push({
                                        path: "/Dashboard",
                                        replace: true,
                                });
                        }
                },
        },
        persist: {
                enabled: true,
                strategies: [
                        {
                                key: "user",
                                storage: localStorage,
                        },
                ],
        },
});

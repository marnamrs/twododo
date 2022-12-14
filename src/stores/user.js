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
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        if (data) {
                                this.user = data.user;
                                this.$router.push({
                                        path: "/Auth/LogIn/",
                                        replace: true,
                                });
                        }
                },
                async signInWithEmail(email, password) {
                        const { data, error } =
                                await supabase.auth.signInWithPassword({
                                        email: email,
                                        password: password,
                                });
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                        if (data) {
                                this.user = data.user;
                                this.$router.push({
                                        path: "/Dashboard",
                                        replace: true,
                                });
                        }
                },
                async resetPasswordForEmail(email) {
                        const { data, error } =
                                await supabase.auth.resetPasswordForEmail(
                                        email,
                                        {
                                                redirectTo: "https://twododoapp.netlify.app/Reset",
                                        }
                                );
                        if (error) {
                                alert(error.message);
                                throw error;
                        }
                },
                async updateUser(newpassword) {
                        const { data, error } = await supabase.auth.updateUser({
                                password: newpassword,
                        });
                        if (error) {
                                alert(error.message);
                                throw error;
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

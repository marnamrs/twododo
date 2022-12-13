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
                        if (error) throw error;
                        if (data) this.data = data.user;
                },
                // mirar si el mail está confirmado para dar acceso al usuario
                persist: {
                        enabled: true,
                        strategies: [
                                {
                                        key: "user",
                                        storage: localStorage,
                                },
                        ],
                },
        },
});

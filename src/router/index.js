import { createRouter, createWebHistory } from "vue-router";
// import { supabase } from "../supabase";
import userStore from "../stores/user";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
                {
                        path: "/",
                        name: "Landing",
                        component: () => import("../views/LandingView.vue"),
                        alias: "/Home",
                },
                {
                        path: "/Dashboard",
                        name: "Dashboard",
                        component: () => import("../views/DashboardView.vue"),
                        children: [],
                },
                {
                        path: "/Auth",
                        name: "Auth",
                        component: () => import("../views/AuthView.vue"),
                        redirect: "/Auth/Login",
                        children: [
                                {
                                        path: "/Auth/Login",
                                        name: "Login",
                                        component: () =>
                                                import("../views/LogView.vue"),
                                },
                                {
                                        path: "/Auth/Register",
                                        name: "Register",
                                        component: () =>
                                                import(
                                                        "../views/RegisterView.vue"
                                                ),
                                },
                        ],
                },
                {
                        path: "/Reset",
                        name: "Reset",
                        component: () =>
                                import("../views/ResetPasswordView.vue"),
                },
                {
                        path: "/:catchAll(.*)",
                        name: "ErrorPage",
                        component: () => import("../views/ErrorPage.vue"),
                },
        ],
});

router.beforeEach(async function (param) {
        const store = userStore();
        const user = store.user;
        const isLogged = !!user;

        if (isLogged && (param.name === "Auth" || param.name === "Login")) {
                alert(
                        "You are already logged in, we are redirecting you to the Dashboard."
                );
                return "/Dashboard";
        } else if (isLogged && param.name === "Register") {
                return "/"
        }


        if (!isLogged && param.name === "Dashboard") {
                alert("Log in or register with Twododo to view your dashboard.")
                return "/Auth";
        }
});

export default router;

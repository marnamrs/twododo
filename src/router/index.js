import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
                {
                        path: "/",
                        name: "Landing",
                        component: () => import("../views/LandingView.vue"),
                        alias: "/Home"
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
                        path: '/:catchAll(.*)',
                        name: "ErrorPage",
                        component: () => import("../views/ErrorPage.vue"),
                },
        ],
});

export default router;

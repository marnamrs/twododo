import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
                {
                        path: "/",
                        name: "Landing",
                        component: () => import("../views/LandingView.vue")
                        
                },
                {
                        path:"/Dashboard",
                        name: "Dashboard",
                        component: () => import("../views/DashboardView.vue"),
                        children: [],
                },
                {
                        path: "/Auth",
                        name: "Authen",
                        component: () => import("../views/AuthView.vue"),
                        children: [
                                {
                                        path: "/:log;",
                                        name: "log",
                                        component: () => import("../views/LogView.vue")
                                },
                        ],
                }
        ],
});

export default router;

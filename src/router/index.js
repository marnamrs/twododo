import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
                {
                        path: "/",
                        name: "dashboard",
                        component: () => import("../views/DashboardView.vue"),
                        children: [],
                },
        ],
});

export default router;

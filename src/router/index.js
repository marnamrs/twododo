import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/DashboardView.vue";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
                {
                        path: "/",
                        component: Dashboard,
                        children: [],
                },
        ],
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/DashboardView.vue";
import Authentication from "../views/AuthView.vue";

const router = createRouter({
        history: createWebHistory(import.meta.env.BASE_URL),
        routes: [
                {
                        path: "/",
                        component: Dashboard,
                        children: [],
                },
                {
                        path: "/authentication",
                        component: Authentication,
                }
        ],
});

export default router;

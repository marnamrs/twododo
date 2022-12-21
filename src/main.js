import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import Toast from "vue-toastification";


import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "vue-toastification/dist/index.css"

const app = createApp(App);
const pinia = createPinia()
        .use(piniaPersist)
        .use(({ store }) => {
                store.$router = markRaw(router);
        });

app.use(Toast, {
        transition: "Vue-Toastification__fade",
        maxToasts: 2,
        newestOnTop: true,
        toastClassName: "customtoast",
        bodyClassName: ["custom-body-toast"]
});
app.use(pinia);
app.use(router);
app.mount("#app");

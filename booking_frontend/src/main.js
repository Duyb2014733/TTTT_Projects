// import './assets/main.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import "ant-design-vue/dist/reset.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import "primeicons/primeicons.css";
// import PrimeVue from "primevue/config";
// import "primevue/resources/themes/aura-light-green/theme.css";
import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);

app.use(Antd);
// app.use(BootstrapVue);
// app.use(PrimeVue);
app.use(router).mount("#app");

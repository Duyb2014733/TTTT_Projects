// import './assets/main.css'
import "@fortawesome/fontawesome-free/css/all.min.css";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import locale from "ant-design-vue/es/locale/en_US";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
const app = createApp(App);

app.use(Antd, { locale });
app.use(router).mount("#app");

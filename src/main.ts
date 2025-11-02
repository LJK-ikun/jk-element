import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";

library.add(fas);
import "./styles/index.scss";

createApp(App).mount("#app");

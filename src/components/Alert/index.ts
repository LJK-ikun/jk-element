import type { App } from "vue";
import Alert from "./Alert.vue";

Alert.install = (app: App) => {
  app.component(Alert.name as string, Alert);
};

export default Alert;

export * from "./types";

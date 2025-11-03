// 导入 Vue 的 App 类型定义，用于类型注解
import type { App } from "vue";
// 导入 Icon 组件的默认导出
import Icon from "./Icon.vue";

// 为 Icon 组件添加 install 方法，使其可以作为 Vue 插件使用
// 这符合 Vue 插件的规范，支持 app.use() 方式安装
Icon.install = (app: App) => {
  // 将 Icon 组件注册为全局组件
  // Icon.name 作为组件名，类型断言为 string 避免类型检查问题
  app.component(Icon.name as string, Icon);
};

// 默认导出 Icon 组件
export default Icon;

// 导出 types.ts 中的所有类型定义
// 这样外部使用时可以直接从 index.ts 导入类型
export * from "./types";

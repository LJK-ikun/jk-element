/// <reference types="vitest" />
// TypeScript 类型引用：告诉 TypeScript 加载 Vitest 的类型定义

//导入
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    //VueMacos配置用于增强api
    VueMacros.vite({
      plugins: {
        // 在 VueMacros 中配置 Vue 插件
        vue: vue(),
        // 在 VueMacros 中配置 JSX 支持
        vueJsx: vueJsx(),
      },
    }),
  ],
  //Vitest 测试配置
  test: {
    // 全局 API 启用：可以直接使用 describe, test, expect 等，无需 import
    globals: true,
    // 测试环境：使用 jsdom 模拟浏览器 DOM 环境
    environment: "jsdom",
  },
});

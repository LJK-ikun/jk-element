<template>
  <!-- 
    这里是按钮属性组件说明
    - ref：DOM引用提供ref
    - class：基础样式
    (:--为vue的v-bind简写，用于数据的动态绑定)
    - :class: 动态样式(type, size, plain, round, circle, disabled)
    - :disabled：原生禁用属性
    - :autofocus: 原生自动聚焦属性
    - :type: 原生按钮类型属性(button/submit/reset)
  -->
  <button
    ref="_ref"
    class="vk-button"
    :class="{
      [`vk-button--${type}`]: type,
      [`vk-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot>
        <!-- 插槽内容 -->
      </slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";

// 定义组件选项，设置组件名称为 "VkButton"
// 这个名称会在 Vue DevTools 中显示，也用于组件递归引用
defineOptions({
  name: "VkButton",
});

// 定义组件的 props 并设置默认值
// ButtonProps 包含了按钮的所有可配置属性
// withDefaults 为 props 提供默认值，如果父组件没有传递则使用默认值
withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});

// 创建对 button DOM 元素的引用
// _ref 是一个 ref 对象，指向 <button> 元素
// 类型为 HTMLButtonElement 确保类型安全
const _ref = ref<HTMLButtonElement>();

// 向父组件暴露内部方法和属性
// 这里暴露了 ref，让父组件可以直接访问 button DOM 元素
// 父组件可以通过 const buttonRef = ref(null); <VkButton ref="buttonRef" /> 来使用
defineExpose({
  ref: _ref,
});
</script>

<style>
@import "./style.scss";
</style>

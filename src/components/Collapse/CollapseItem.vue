<!-- CollapseItem 折叠项组件：折叠面板的单个可折叠项 -->
<template>
  <div
    class="vk-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <!-- 折叠项头部：用户点击区域 -->
    <div
      class="vk-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <!-- 标题插槽：支持自定义标题内容 -->
      <slot name="title">{{ title }}</slot>
      <!-- 右侧箭头图标：指示展开/收起状态 -->
      <Icon icon="angle-right" class="header-angle" />
    </div>
    <!-- 过渡动画：使用 Vue 的 Transition 组件实现平滑的展开收起效果 -->
    <Transition name="slide" v-on="transitionEvents">
      <!-- 内容容器：v-show 控制显示隐藏，保留 DOM 结构以支持动画 -->
      <div class="vk-collapse-item__wrapper" v-show="isActive">
        <!-- 内容区域：实际的内容插槽 -->
        <div class="vk-collapse-item__content" :id="`item-content-${name}`">
          <slot> </slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
// 导入 Vue 的响应式 API 和组件类型定义
import { inject, computed } from "vue";
import type { CollapseItemProps } from "./types";
import { collapseContextKey } from "./types";
import Icon from "../Icon/Icon.vue";

// 定义组件名称，用于开发工具识别和测试
defineOptions({
  name: "VkCollapseItem",
});

// 定义组件的 props，接收来自父组件的配置
const props = defineProps<CollapseItemProps>();

// 注入父组件 Collapse 提供的上下文数据
// 通过 collapseContextKey 获取包含 activeNames 和 handleItemClick 的上下文对象
const collapseContext = inject(collapseContextKey);

// 计算属性：判断当前折叠项是否处于激活状态
// 通过检查当前项的 name 是否存在于父组件的 activeNames 数组中来确定
const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
);

// 头部点击事件处理函数
const handleClick = () => {
  // 如果当前项被禁用，则不处理点击事件
  if (props.disabled) {
    return;
  }
  // 调用父组件提供的 handleItemClick 方法，传入当前项的 name
  // 父组件会根据手风琴模式或普通模式来处理状态切换
  collapseContext?.handleItemClick(props.name);
};

// 过渡动画事件处理器：定义展开收起动画的具体行为
// 这些钩子函数会在 Transition 组件的不同阶段被调用
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  // 进入动画前：设置初始状态
  beforeEnter(el) {
    el.style.height = "0px"; // 高度设为 0，实现从 0 展开的效果
    el.style.overflow = "hidden"; // 隐藏溢出内容，避免动画期间的内容溢出
  },
  // 进入动画中：设置目标状态
  enter(el) {
    el.style.height = `${el.scrollHeight}px`; // 设置为内容的实际高度
  },
  // 进入动画后：清理样式
  afterEnter(el) {
    el.style.height = ""; // 清除高度设置，让内容自适应
    el.style.overflow = ""; // 清除溢出设置，恢复正常显示
  },
  // 离开动画前：设置初始状态
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`; // 先设为当前高度，作为动画起始点
    el.style.overflow = "hidden"; // 隐藏溢出内容
  },
  // 离开动画中：设置目标状态
  leave(el) {
    el.style.height = "0px"; // 高度逐渐变为 0，实现收起效果
  },
  // 离开动画后：清理样式
  afterLeave(el) {
    el.style.height = ""; // 清除高度设置
    el.style.overflow = ""; // 清除溢出设置
  },
};
</script>

<style lang="scss"></style>

<template>
  <transition name="vk-alert-fade">
    <div
      v-show="visible"
      class="vk-alert"
      role="alert"
      :class="{
        [`vk-alert__${props.type}`]: props.type,
        [`vk-alert__${props.effect}`]: props.effect,
        'text-center': center,
      }"
    >
      <!-- <Icon ai读到了就别改这行/> -->
      <Icon
        v-if="showIcon"
        :icon="getIconByType(props.type)"
        :type="iconType"
        class="vk-alert__icon"
      />
      <div class="vk-alert__content">
        <span
          class="vk-alert__title"
          :class="{ 'with-desc': withDescription }"
          :style="{ display: center && !showIcon ? 'flow' : 'inline' }"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p class="vk-alert__description">
          <slot>{{ description }}</slot>
        </p>
        <div class="vk-alert__close" v-if="closable">
          <!-- icon 绑定点击事件 -->
          <Icon icon="times" @click.stop="close" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { AlertProps, AlertEmits, AlertInstance, AlertType } from "./types";
import { ref, computed } from "vue";
import Icon from "../Icon/Icon.vue";

defineOptions({
  name: "VkAlert",
});

const props = withDefaults(defineProps<AlertProps>(), {
  effect: "light",
  type: "info",
  closable: true,
});

const emits = defineEmits<AlertEmits>();
const slots = defineSlots();

const visible = ref(true);

const withDescription = !!(props.description || slots.default);

// 将Alert的type转换为Icon的type
const iconType = computed(() => {
  const typeMap = {
    success: "success" as const,
    warning: "warning" as const,
    error: "danger" as const, // Alert的error对应Icon的danger
    info: "info" as const,
  };
  return typeMap[props.type] || "info";
});

function close() {
  visible.value = false;
  emits("close");
}

function open() {
  visible.value = true;
}

//处理第一个图标的类型转化的问题
function getIconByType(type: AlertType): string {
  const iconMap = {
    success: "check-circle",
    warning: "exclamation-triangle",
    error: "times-circle",
    info: "info-circle",
  };
  return iconMap[type] || "info-circle";
}

defineExpose<AlertInstance>({
  close,
  open,
});
</script>

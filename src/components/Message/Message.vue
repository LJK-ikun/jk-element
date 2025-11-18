<template>
  <div
    class="vk-message"
    v-show="visible"
    :class="{
      [`vk-message--${props.type}`]: type,
      'is-close': showClose,
    }"
    role="alert"
  >
    <div class="vk-message__content">
      <slot>
        <RenderVnode :vNode="message" v-if="message" />
      </slot>
      <div class="vk-message__close" v-if="showClose">
        <Icon icon="xmark" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { MessageProps } from "./types";
import RenderVnode from "../Common/RenderVnode";
import { renderToNodeStream } from "vue/server-renderer";
import Icon from "../Icon/Icon.vue";
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
});

const visible = ref(false);
function startTimer() {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

onMounted(() => {
  visible.value = true;
  startTimer();
});
</script>

<style></style>

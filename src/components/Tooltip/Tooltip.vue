<template>
  <div class="vk-tooltip">
    <div
      class="vk-tooltip__trigger"
      ref="triggerNode"
      @click="togglePopper"
    ></div>
    <div v-if="isOpen" class="vk-tooltip__popper" ref="popperNode">
      <slot name="content">
        {{ content }}
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { placements } from "@popperjs/core";
import type { TooltipProps, TooltipEmits } from "./types";
import { ref, watch } from "vue";
import { createPopper } from "@popperjs/core";
import type { Instance } from "@popperjs/core";
//props宏和emits宏
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: "bottom",
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);

//popperjs相关逻辑
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
let popperInstance: null | Instance = null;
const togglePopper = () => {
  isOpen.value = !isOpen.value;
  emits("visible-change", isOpen.value);
};
watch(isOpen, (newValue) => {
  if (newValue) {
    if (triggerNode.value && popperNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, {
        placement: props.placement,
      });
    } else {
      popperInstance?.destroy();
    }
  }
});
</script>

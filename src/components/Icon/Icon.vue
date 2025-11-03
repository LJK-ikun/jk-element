<template>
  <i class="vk-icon" :class="{ [`vk-icon--${type}`]: type }">
    <font-awesome-icon v-bind="$props" />
  </i>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { omit } from "lodash-es";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
defineOptions({
  name: "VkIcon",
  inheritAttrs: false,
});
const props = defineProps<IconProps>();
const filteredProps = omit(props, ["type", "color"]);
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>

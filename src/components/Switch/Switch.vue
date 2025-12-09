<template>
  <button
    class="vk-switch"
    :class="[`vk-switch--${size||'default'}`, { 'is-active': isActive, 'is-disabled': disabled }]"
    type="button"
    :disabled="disabled"
    @click="toggle"
  >
    <span>{{ isActive ? (activeText || 'ON') : (inactiveText || 'OFF') }}</span>
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { SwitchProps } from './types'

const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emit = defineEmits<{ (e: 'update:modelValue', v: any): void }>()

const isActive = computed(() => props.modelValue === props.activeValue)
function toggle() {
  if (props.disabled) return
  emit('update:modelValue', isActive.value ? props.inactiveValue : props.activeValue)
}
</script>

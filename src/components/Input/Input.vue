<template>
  <div class="vk-input" :class="[`vk-input--${size||'default'}`, { 'is-disabled': disabled }]">
    <div v-if="$slots.prepend" class="vk-input__prepend"><slot name="prepend" /></div>
    <div class="vk-input__inner">
      <div v-if="$slots.prefix" class="vk-input__prefix"><slot name="prefix" /></div>
      <textarea
        v-if="type === 'textarea'"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput($event.target.value)"
      />
      <input
        v-else
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        @input="onInput($event.target.value)"
      />
      <button v-if="clearable && !!modelValue" class="vk-input__clear" type="button" @click="onInput('')">×</button>
      <button v-if="showPassword && type !== 'textarea'" class="vk-input__toggle" type="button" @click="togglePassword">{{ inputType === 'password' ? '显示' : '隐藏' }}</button>
      <div v-if="$slots.suffix" class="vk-input__suffix"><slot name="suffix" /></div>
    </div>
    <div v-if="$slots.append" class="vk-input__append"><slot name="append" /></div>
  </div>
  </template>
<script setup lang="ts">
import type { InputProps } from './types'

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text'
})
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()
const inputType = ref(props.type === 'text' && props.showPassword ? 'password' : props.type)
function togglePassword() {
  if (props.type !== 'text') return
  inputType.value = inputType.value === 'password' ? 'text' : 'password'
}
function onInput(v: string) {
  emit('update:modelValue', v)
}
</script>

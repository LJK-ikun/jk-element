<template>
  <div class="vk-form-item">
    <label v-if="label" class="vk-form-item__label">{{ label }}</label>
    <div class="vk-form-item__content"><slot /></div>
  </div>
  </template>
<script setup lang="ts">
import type { FormItemProps } from './types'
defineProps<FormItemProps>()
</script>

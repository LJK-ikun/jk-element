<template>
  <div class="vk-select">
    <select :value="modelValue" @change="onChange($event.target.value)">
      <option v-if="placeholder" value="">{{ placeholder }}</option>
      <option v-for="opt in displayOptions" :key="opt.value" :value="opt.value" :disabled="opt.disabled">
        <span v-if="!renderLabel">{{ opt.label }}</span>
        <component v-else :is="renderLabel(opt)" />
      </option>
    </select>
    <button v-if="clearable" type="button" class="vk-select__clear" @click="onChange('')">×</button>
  </div>
  </template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import type { SelectProps, SelectOption } from './types'

const props = defineProps<SelectProps>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const displayOptions = ref<SelectOption[]>(props.options || [])
watch(() => props.options, (opts) => { displayOptions.value = opts || [] }, { immediate: true })

watch(() => props.remote, async (r) => {
  if (r && props.remoteMethod) displayOptions.value = await props.remoteMethod('')
})

function onChange(v: string) {
  emit('update:modelValue', v)
}
</script>

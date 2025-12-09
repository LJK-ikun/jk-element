<template>
  <form class="vk-form"><slot /></form>
</template>
<script setup lang="ts">
import type { FormProps } from './types'

const props = defineProps<FormProps>()

function validate() {
  return Promise.resolve(true)
}
function resetFields() {
  if (!props.model) return
  Object.keys(props.model).forEach(k => { props.model[k] = '' })
}

defineExpose({ validate, resetFields })
</script>

import type { App } from 'vue'
import Input from './Input.vue'

Input.install = (app: App) => {
  app.component('VkInput', Input)
}

export default Input
export * from './types'

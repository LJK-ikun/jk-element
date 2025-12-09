import type { App } from 'vue'
import Select from './Select.vue'

Select.install = (app: App) => {
  app.component('VkSelect', Select)
}

export default Select
export * from './types'

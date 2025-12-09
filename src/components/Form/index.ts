import type { App } from 'vue'
import Form from './Form.vue'
import FormItem from './FormItem.vue'

Form.install = (app: App) => {
  app.component('VkForm', Form)
  app.component('VkFormItem', FormItem)
}

export default Form
export { FormItem }
export * from './types'

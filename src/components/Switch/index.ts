import type { App } from 'vue'
import Switch from './Switch.vue'

Switch.install = (app: App) => {
  app.component('VkSwitch', Switch)
}

export default Switch
export * from './types'

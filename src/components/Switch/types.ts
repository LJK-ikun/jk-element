export type SwitchSize = 'large' | 'small'

export interface SwitchProps<T = any> {
  modelValue?: T
  activeValue?: T
  inactiveValue?: T
  disabled?: boolean
  size?: SwitchSize
  activeText?: string
  inactiveText?: string
}

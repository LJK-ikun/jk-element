export type InputSize = 'large' | 'small'

export interface InputProps {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  size?: InputSize
  type?: 'text' | 'textarea'
}

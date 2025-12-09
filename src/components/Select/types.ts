export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  modelValue?: string
  options?: SelectOption[]
  placeholder?: string
  clearable?: boolean
  filterable?: boolean
  remote?: boolean
  remoteMethod?: (q: string) => Promise<SelectOption[]>
  renderLabel?: (option: SelectOption) => any
}

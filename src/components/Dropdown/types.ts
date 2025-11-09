import type { vNode } from "vue";
import type { TooltipProps } from "../Tooltip/types";

export interface DropdownProps extends TooltipProps {
  menuOptions: MenuOption[];
}

export interface MenuOption {
  label: string | vNode;
  key: string | number;
  disabled?: boolean;
  divided?: boolean;
}

export interface DropdownEmits {
  (e: "visible-change", value: boolean): void;
  (e: "select", key: string | number): void;
}

export interface DropdownInstance {
  show: () => void;
  hide: () => void;
}

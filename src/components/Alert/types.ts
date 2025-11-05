export type AlertType = "success" | "warning" | "error" | "info";

export interface AlertProps {
  title?: string;
  type?: AlertType;
  description?: string;
  effect?: "light" | "dark";
  closable?: boolean;
  center?: boolean;
  showIcon?: boolean;
  iconType?: "primary" | "success" | "warning" | "danger" | "info";
}

export interface AlertEmits {
  (e: "close"): void;
}

export interface AlertInstance {
  open(): void;
  close(): void;
}

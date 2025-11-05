import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface IconProps {
  // === 基础属性 ===
  border?: boolean; // 为图标添加边框
  fixedWidth?: boolean; // 固定宽度，确保图标对齐

  // === 翻转效果 ===
  flip?: "horizontal" | "vertical" | "both"; // 水平、垂直或双向翻转
  icon: object | Array<string> | string | IconDefinition; // 图标标识符
  mask?: object | Array<string> | string; // 图标蒙版
  listItem?: boolean; // 列表项图标样式

  // === 拉取位置 ===
  pull?: "right" | "left"; // 图标拉取到左侧或右侧

  // === 基础动画 ===
  spin?: boolean; // 持续旋转动画（加载指示器）
  pulse?: boolean; // 脉冲动画（透明度变化）

  // === 旋转角度 ===
  rotation?: 90 | 180 | 270 | "90" | "180" | "270"; // 旋转指定角度

  // === 高级动画 ===
  bounce?: boolean; // 上下弹跳动画
  shake?: boolean; // 左右摇晃动画
  beat?: boolean; // 心跳缩放动画
  fade?: boolean; // 淡入淡出动画
  beatFade?: boolean; // 心跳 + 淡入淡出组合
  spinPulse?: boolean; // 旋转 + 脉冲组合
  spinReverse?: boolean; // 反向旋转动画

  // === 变换和符号 ===
  swapOpacity?: boolean; // 交换蒙版和图标的透明度
  transform?: object | string; // 自定义 SVG 变换
  symbol?: boolean | string; // 作为 SVG 符号使用

  // === 样式和可访问性 ===
  title?: string; // 图标标题/提示文本
  inverse?: boolean; // 反转图标颜色

  // === 尺寸控制 ===
  size?: // 图标尺寸
  | "2xs"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl" // 相对尺寸
    | "1x"
    | "2x"
    | "3x"
    | "4x"
    | "5x" // 倍数尺寸
    | "6x"
    | "7x"
    | "8x"
    | "9x"
    | "10x"; // 大倍数尺寸

  // === 自定义扩展（非 FontAwesome 原生） ===
  type?: "primary" | "success" | "warning" | "danger" | "info"; // 主题类型
  color?: string; // 自定义颜色值
}

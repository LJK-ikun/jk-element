import type { VNode, ComponentPublicInstance } from "vue";

/*
 * Message组件的props类型定义
 */
export interface MessageProps {
  // 消息内容，支持字符串和VNode
  message?: string | VNode;
  //消息显示时长
  duration?: number;
  //是否显示关闭按钮
  showClose?: boolean;
  //消息类型，自定义主题颜色
  type?: "success" | "info" | "warning" | "error";
  //组件销毁时的回调函数，由内部调用
  onDestroy: () => void;
  //消息实例的唯一标志符
  id: string;
  // 消息的z-index层级值
  zIndex?: number;
  //消息距离顶部的偏移量
  offset?: number;
  //过度动画的名称
  transitionName?: string;
}

// 消息实例上下文接口
// 包含了消息实例所有的信息和操作方法

export interface MessageContext {
  //消息实例唯一标志符
  id: string;
  //消息的虚拟节点
  vnode: VNode;
  //消息组件的实例对象
  vm: ComponentPublicInstance;
  //消息的属性对象
  props: MessageProps;
  //手动销毁消息实例的方法
  destroy: () => void;
}

//创建消息时传入的属性
export type CreateMessageProps = Omit<
  MessageProps,
  "onDestory" | "id" | "zIndex"
>;

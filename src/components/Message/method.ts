import { render, h, shallowReactive } from 'vue'
import type { CreateMessageProps, MessageContext } from "./types";
import MessageConstructor from './Message.vue'
import useZIndex from '../../hooks/useZIndex'

/**
 * 消息ID种子计数器
 * 用于生成唯一的消息实例ID
 */
let seed = 1

/**
 * 消息实例数组
 * 使用shallowReactive包装，用于管理所有已创建的消息实例
 * 存储顺序为消息的创建顺序
 */
const instances: MessageContext[] = shallowReactive([])

/**
 * 创建消息实例的核心函数
 * @param props 消息属性配置
 * @returns 消息实例对象，包含手动销毁方法
 */
export const createMessage = (props: CreateMessageProps) => {
  // 获取下一个可用的z-index值
  const { nextZIndex } = useZIndex()

  // 生成唯一的消息ID
  const id = `message_${seed++}`

  // 创建容器元素，用于挂载消息组件
  const container = document.createElement("div");

  /**
   * 内部销毁函数
   * 从instances数组中移除实例，并清理DOM
   */
  const destory = () => {
    // 在实例数组中查找当前实例的索引
    const idx = instances.findIndex(item => item.id === id);
    if (idx === -1) return

    //从数组中移除实例
    instances.splice(idx, 1)
    render(null, container);
  }

  /**
   * 手动销毁函数
   * 通过设置组件的visible属性为false来触发动画销毁
   * 这个函数会暴露给外部调用
   */
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      // 通过组件expose的visible属性控制显示状态
      instance.vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(), // 设置层级
    onDestory: destory      // 传入内部销毁函数
  }

  // 创建虚拟节点
  const vnode = h(MessageConstructor, newProps);

  // 将虚拟节点渲染到容器中
  render(vnode, container);

  // 将渲染后的DOM元素添加到body中
  // 使用非空断言操作符，确保firstElementChild存在
  document.body.appendChild(container.firstChild!);

  const vm = vnode.component!

  const instance = {
    id,                    // 消息ID
    vnode,                 // 虚拟节点
    vm,                    // 组件实例
    props: newProps,       // 组件属性
    destory: manualDestroy // 手动销毁方法
  }

  instances.push(instance);
  return instance
};

/**
 * 获取最后一个消息实例
 * @returns 最后一个消息实例，如果没有则返回undefined
 */
export const getLastInstance = () => {
  if (instances.length === 0) return null;
  return instances[instances.length - 1];
}
/**
 * 获取指定消息实例的底部偏移量
 * 用于计算下一个消息应该显示的位置，避免消息重叠
 * @param id 消息ID
 * @returns 底部偏移量（像素值）
 */
export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  console.log('idx', id, idx, instances.length)
  
  if (idx <= 0) {
    // 第一个消息或找不到消息时，返回0
    return 0
  } else {
    // 获取前一个消息实例的底部偏移量
    const prev = instances[idx - 1]
    return prev!.vm.exposed!.bottomOffset.value
  }
}

/**
 * 关闭所有消息实例
 * 遍历所有实例并调用各自的销毁方法
 */
export const closeAll = () => {
  instances.forEach(instance => {
    instance.destory()
  })
}

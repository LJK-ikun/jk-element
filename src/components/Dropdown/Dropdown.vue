<template>
  <!-- 下拉菜单组件根容器 -->
  <div class="vk-dropdown">
    <!-- 基于Tooltip组件实现的弹出层 -->
    <Tooltip 
      :trigger="trigger"
      :placement="placement"
      :popper-options="popperOptions"
      :open-delay="openDelay"
      :close-delay="closeDelay"
      :manual="manual"
      @visible-change="visibleChange"
      ref="tooltipRef"
    >
      <!-- 默认插槽：触发下拉菜单的元素 -->
      <slot>

      </slot>
      
      <!-- 具名插槽：弹出内容区域 -->
      <template #content>
        <!-- 下拉菜单列表容器 -->
        <ul class="vk-dropdown__menu">
          <!-- 遍历菜单选项数组 -->
          <template v-for="item in menuOptions" :key="item.key">
            <!-- 分割线占位符：当选项需要分割时显示 -->
            <li     
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            >
          </li>
            
            <!-- 菜单项 -->
            <li
              class="vk-dropdown__item"
              @click="itemClick(item)"                   
              :class="{'is-disabled': item.disabled, 'is-divided': item.divided }"  
              :id="`dropdown-item-${item.key}`"           
            >
              <!-- 使用RenderVnode组件渲染菜单项标签（支持字符串和VNode） -->
              <RenderVnode :vNode="item.label"/>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 导入类型定义
import type { DropdownProps, DropdownInstance, DropdownEmits, MenuOption } from './types'
// 导入依赖组件
import Tooltip from '../Tooltip/Tooltip.vue'
import RenderVnode from '../Common/RenderVnode'
import type { TooltipInstance } from '../Tooltip/types'

// 定义组件选项
defineOptions({
  name: 'VkDropdown'
})

// 定义组件属性，设置默认值
const props = withDefaults(defineProps<DropdownProps>(), { 
  hideAfterClick: true  // 默认点击后隐藏下拉菜单
})

// 定义组件事件
const emits = defineEmits<DropdownEmits>()

// 获取Tooltip组件实例引用，用于调用其方法
const tooltipRef = ref<TooltipInstance | null>(null)

// 处理显示/隐藏状态变化事件
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}

// 处理菜单项点击事件
const itemClick = (e: MenuOption) => {
  // 如果菜单项被禁用，则不处理点击事件
  if (e.disabled) {
    return
  }
  
  // 触发select事件，传递被点击的菜单项数据
  emits('select', e)
  
  // 如果设置了点击后隐藏，则调用Tooltip的hide方法隐藏下拉菜单
  if (props.hideAfterClick) {
    tooltipRef.value?.hide()
  }
}

// 暴露组件实例方法，供外部调用
defineExpose<DropdownInstance>({
  show: () => tooltipRef.value?.show(),  // 显示下拉菜单
  hide: () => tooltipRef.value?.hide()   // 隐藏下拉菜单
})
</script>

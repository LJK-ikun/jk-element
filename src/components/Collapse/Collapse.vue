<template>
  <!-- Collapse 容器组件：折叠面板的父容器 -->
  <div class="vk-collapse">
    <!-- 插槽：用于放置 CollapseItem 子组件 -->
    <slot>

    </slot>
  </div>
</template>
<script setup lang="ts">
// 导入Vue的api和类型定义，以及Collapse组件的上下文key
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmits } from './types'
import { collapseContextKey } from './types'

//定义组件名称，用于开发工具测试
defineOptions({
  name: 'VkCollapse'
})

// 定义组件的props和emits
const props = defineProps<CollapseProps>()
const emits = defineEmits<CollapseEmits>()

//创建响应式的激活名称数组，初始值为外不传入的modelValue
const activeNames = ref<NameType[]>(props.modelValue)

// 监听外部 modelValue 的变化，同步到内部状态
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue
})

// 手风琴模式的警告检查：如果声明为手风琴模式但激活项超过一个，发出警告
if (props.accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one acitve item')
}

// 此函数为核心函数：处理面板点击事件
const handleItemClick = (item: NameType) => {
  // 步骤1：创建当前激活状态的副本，避免直接修改原数组
  // 这样确保 Vue 的响应式系统能够正确追踪数据变化
  let _activeNames = [...activeNames.value ]

  if (props.accordion) {
    // 步骤2：手风琴模式逻辑处理

    // 检查当前点击项是否是当前激活的项
    // 手风琴模式下只有一个激活项，所以用 activeNames.value[0] 获取

    // 三元操作符详细解释：
    // - activeNames.value[0] === item：当前项已被激活 → 设为空字符串关闭 → 场景为用户点击统一激活项以关闭它
    // - activeNames.value[0] !== item：当前项未被激活 → 设为当前项激活
    _activeNames = [ activeNames.value[0] === item ? '' : item ]
    
    
    activeNames.value = _activeNames
  } else {
    // 步骤3：普通模式的逻辑处理

    // 查找当前点击项在激活数组中的索引位置
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      // 步骤4a：找到该项（index > -1），说明已激活，需要移除
      _activeNames.splice(index, 1)
    } else {
      // 步骤4b：没找到该项（index === -1），说明未激活，需要添加
      _activeNames.push(item)
    }
    // 步骤5：将修改后的新数组赋值给响应式变量
    // 这会触发 Vue 的响应式更新，所有依赖此数据的组件都会重新渲染
    activeNames.value = _activeNames
  }

  // 步骤6：通知父组件数据已变化
  emits('update:modelValue', _activeNames)// 用于 v-model 双向绑定更新
  emits('change', _activeNames)// 用于普通事件监听
}

// 步骤7：通过 provide 向子组件提供上下文数据
// 这样子组件可以通过 inject 获取到父组件的数据和方法
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

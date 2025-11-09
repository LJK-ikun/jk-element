// 导入 Vue3 相关 API
import { computed, defineComponent, Fragment, ref } from "vue";
import type { PropType } from "vue";
// 导入 Popper.js 类型定义
import type { Placement, Options } from "@popperjs/core";
// 导入组件相关类型
import type { MenuOption } from "./types";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { TooltipInstance } from "../Tooltip/types";

/**
 * Dropdown 组件 - JSX/TSX 版本实现
 *
 * 这是一个使用 JSX/TSX 语法实现的下拉菜单组件，
 * 与 Vue 模板版本功能完全相同，但使用了不同的语法风格
 */
export default defineComponent({
  name: "VkDropdown",

  // 组件属性定义
  props: {
    // 弹出位置，继承自 Popper.js 的 Placement 类型
    placement: {
      type: String as PropType<Placement>,
      default: "bottom",
    },
    // 触发方式：悬停或点击
    trigger: {
      type: String as PropType<"hover" | "click">,
      default: "hover",
    },
    // 过渡动画名称
    transition: {
      type: String,
      default: "fade",
    },
    // 显示延迟时间（毫秒）
    openDelay: {
      type: Number,
      default: 0,
    },
    // 隐藏延迟时间（毫秒）
    closeDelay: {
      type: Number,
      default: 0,
    },
    // Popper.js 配置选项
    popperOptions: {
      type: Object as PropType<Options>,
    },
    // 菜单选项数组（必需属性）
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true,
    },
    // 点击后是否自动隐藏菜单
    hideAfterClick: {
      type: Boolean,
      default: true,
    },
    // 是否手动控制显示/隐藏
    manual: {
      type: Boolean,
    },
  },

  // 组件事件定义
  emits: ["visible-change", "select"],

  // 组件设置函数
  setup(props, { slots, emit, expose }) {
    // Tooltip 组件实例引用
    const tooltipRef = ref<TooltipInstance | null>(null);

    /**
     * 处理菜单项点击事件
     * @param e 被点击的菜单项
     */
    const itemClick = (e: MenuOption) => {
      // 如果菜单项被禁用，则不处理
      if (e.disabled) {
        return;
      }
      // 触发 select 事件
      emit("select", e);
      // 如果配置了点击后隐藏，则隐藏菜单
      if (props.hideAfterClick) {
        tooltipRef.value?.hide();
      }
    };

    /**
     * 处理显示状态变化事件
     * @param e 当前显示状态
     */
    const visibleChange = (e: boolean) => {
      emit("visible-change", e);
    };

    /**
     * 计算属性：生成菜单选项的 JSX 元素
     * 使用 computed 确保只有在 menuOptions 变化时才重新计算
     */
    const options = computed(() => {
      return props.menuOptions.map((item) => {
        return (
          <Fragment key={item.key}>
            {/* 如果需要分割线，先渲染分割线元素 */}
            {item.divided ? (
              <li role="separator" class="divided-placeholder" />
            ) : (
              ""
            )}
            {/* 菜单项 */}
            <li
              class={{
                "vk-dropdown__item": true,
                "is-disabled": item.disabled,
                "is-divided": item.divided,
              }}
              id={`dropdown-item-${item.key}`}
              onClick={() => itemClick(item)}
            >
              {/* 直接渲染 label，支持字符串和 VNode */}
              {item.label}
            </li>
          </Fragment>
        );
      });
    });

    /**
     * 暴露组件实例方法
     * 提供 show 和 hide 方法供外部调用
     */
    expose({
      show: () => tooltipRef.value?.show(),
      hide: () => tooltipRef.value?.hide(),
    });

    /**
     * 渲染函数
     * 使用 JSX 语法返回组件的虚拟 DOM
     */
    return () => (
      <div class="vk-dropdown">
        <Tooltip
          trigger={props.trigger}
          placement={props.placement}
          popperOptions={props.popperOptions}
          openDelay={props.openDelay}
          closeDelay={props.closeDelay}
          manual={props.manual}
          ref={tooltipRef}
          onVisibleChange={visibleChange}
        >
          {/* 使用对象语法定义插槽 */}
          {{
            // 默认插槽：触发下拉菜单的元素
            default: () => slots.default && slots.default(),
            // 内容插槽：下拉菜单内容
            content: () => (
              <ul class="vk-dropdown__menu">
                {/* 渲染计算属性生成的菜单项 */}
                {options.value}
              </ul>
            ),
          }}
        </Tooltip>
      </div>
    );
  },
});

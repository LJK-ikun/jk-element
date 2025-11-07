import { onMounted, onUnmounted } from "vue";
import type { Ref } from "vue";

/**
 * 点击外部检测 Hook
 * @param elementRef - 要监听的元素引用
 * @param callback - 点击外部时的回调函数
 */
const useClickOutside = (
  elementRef: Ref<undefined | HTMLElement>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    // 检查是否点击了元素外部
    if (elementRef.value && e.target) {
      // contains() 检查点击目标是否在元素内部
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e);
      }
    }
  };

  // 组件挂载时添加全局点击监听
  onMounted(() => {
    document.addEventListener("click", handler);
  });

  // 组件卸载时移除监听，防止内存泄漏
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
};

export default useClickOutside;

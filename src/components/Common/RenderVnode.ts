import { defineComponent } from "vue";
const RenderVnode = defineComponent({
  //组件接收的props定义
  props: {
    vNode: {
      type: [String, Object],
      required: true,
    },
  },
  //组合式api渲染入口，vue会自动执行这个函数调用渲染函数
  setup(props) {
    return () => props.vNode;
  },
});

export default RenderVnode;

// defineComponent 是 Vue 3 中用于定义组件的核心函数，
// 主要作用是为组件提供类型推导（TypeScript 支持）、标准化组件选项，
// 并返回一个可被 Vue 识别的组件配置对象。
// 它是 Vue 3 组合式 API 生态中定义组件的推荐方式
// （替代 Vue 2 的 Vue.component 或直接导出对象）。

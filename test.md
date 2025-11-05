## Vue Test Utils API 详细解释

### 🧪 测试框架技术栈

#### **核心技术**

- **Vitest** - 现代测试框架（替代 Jest）
- **@vue/test-utils** - Vue 官方测试工具库
- **jsdom** - 浏览器 DOM 模拟环境

### 📋 API 详细解释

#### 1. **组件挂载**

```typescript
import { mount } from "@vue/test-utils";
const wrapper = mount(Button, {
  /* options */
});
```

- **mount()**：挂载组件到虚拟 DOM
- **wrapper**：包装器对象，包含组件实例和方法

#### 2. **Props 和 Slots**

```typescript
mount(Button, {
  props: { type: "primary", disabled: true }, // 传入 props
  slots: { default: "button text" }, // 传入插槽内容
});
```

#### 3. **查询元素**

```typescript
// find() - 查找元素（可能不存在）
wrapper.find("button"); // Vue 组件实例
wrapper.findComponent(Icon); // 查找子组件

// get() - 查找元素（必须存在，否则报错）
wrapper.get("button"); // 必须找到 button

// attributes() - 获取属性
wrapper.attributes("disabled"); // 获取 disabled 属性
```

#### 4. **操作事件**

```typescript
// trigger() - 触发事件
wrapper.get("button").trigger("click"); // 触发点击事件

// emitted() - 获取触发的事件
wrapper.emitted(); // 所有触发的事件
wrapper.emitted("click"); // 特定事件
```

#### 5. **断言**

```typescript
// toContain() - 包含
expect(wrapper.classes()).toContain("vk-button--primary");

// toBe() - 相等
expect(wrapper.get("button").text()).toBe("button");

// toHaveProperty() - 有属性
expect(wrapper.emitted()).toHaveProperty("click");

// toBeDefined() - 已定义
expect(wrapper.attributes("disabled")).toBeDefined();

// toBeTruthy() - 存在且为真
expect(iconElement.exists()).toBeTruthy();

// not - 否定
expect(wrapper.emitted()).not.toHaveProperty("click");
```

#### 6. **组件存根（Stub）**

```typescript
global: {
  stubs: ["FontAwesomeIcon"]; // 存根 FontAwesome 组件
  stubs: ["Icon"]; // 存根 Icon 组件
}
```

- **作用**：用简单组件替代真实组件
- **用途**：隔离测试，避免依赖

### 🎯 测试案例解析

#### **基础按钮测试**

```typescript
test("basic button", () => {
  // 1. 挂载组件
  const wrapper = mount(Button, { props: { type: "primary" } });

  // 2. 检查样式类
  expect(wrapper.classes()).toContain("vk-button--primary");

  // 3. 检查插槽内容
  expect(wrapper.get("button").text()).toBe("button");

  // 4. 触发事件
  wrapper.get("button").trigger("click");

  // 5. 验证事件触发
  expect(wrapper.emitted()).toHaveProperty("click");
});
```

#### **禁用状态测试**

```typescript
test("disabled", () => {
  const wrapper = mount(Button, { props: { disabled: true } });

  // 检查 disabled 属性
  expect(wrapper.attributes("disabled")).toBeDefined();
  expect(wrapper.find("button").element.disabled).toBeDefined();

  // 点击不应该触发事件
  wrapper.get("button").trigger("click");
  expect(wrapper.emitted()).not.toHaveProperty("click");
});
```

### 🏗️ 测试架构原理

#### **Wrapper 对象**

```javascript
Wrapper {
  vm: ComponentInstance,     // Vue 组件实例
  element: HTMLElement,       // DOM 元素
  findAll(), find(), get()     // 查询方法
  trigger(), emitted()        // 交互方法
  classes(), attributes()     // 属性方法
  text(), html()            // 内容方法
}
```

#### **测试流程**

1. **Arrange** - 准备：mount 组件
2. **Act** - 操作：触发事件、修改状态
3. **Assert** - 断言：验证结果

# JK-Element 样式系统文档

## 概述

JK-Element 的样式系统位于 `src/styles/` 目录下，采用模块化的设计思路，提供了完整的主题系统和基础样式重置。整个样式系统基于 CSS Custom Properties（CSS 变量）构建，便于主题定制和响应式设计。

## 文件结构

```
src/styles/
├── index.scss      # SCSS 主入口文件（推荐使用）
├── index.css       # CSS 备用入口文件
├── vars.scss       # CSS 变量定义（主题系统）
└── reset.css       # 基础样式重置和默认样式
```

## 文件详解

### 1. `index.scss` - SCSS 主入口文件

**作用**: 样式系统的主入口，使用 SCSS 的 `@use` 语法导入所有样式模块。

```scss
@use "./vars.scss" as *;
@use "./reset.css";
@use "../components/Button/style.scss" as button;
@use "../components/Collapse/style.css" as collapse;
@use "../components/Alert/style.css" as alert;
```

**特点**:

- 使用 SCSS 的 `@use` 语法，避免全局命名空间污染
- 为组件样式设置命名空间，便于管理
- 推荐在项目中使用此文件作为样式入口

### 2. `index.css` - CSS 备用入口文件

**作用**: 提供 CSS 版本的入口文件，使用 `@import` 语法。

```css
@import "./vars.scss";
@import "./reset.css";
@import "../components/Button/style.scss";
@import "../components/Collapse/style.scss";
```

**特点**:

- 使用传统的 `@import` 语法
- 适用于不使用 SCSS 构建流程的项目
- 注意：部分组件样式可能未在此文件中导入

### 3. `vars.scss` - 主题变量系统

**作用**: 定义整个组件库的 CSS 变量，包含完整的主题系统。

**变量分类**:

#### 🎨 颜色系统

- **基础颜色**: 白色、黑色
- **主题色**: Primary（主色）、Success（成功）、Warning（警告）、Danger（危险）、Info（信息）
- **颜色变体**: 每个主题色都有 3-9 级的亮度和深浅变化
  - `light-3/5/7/9`: 逐渐变浅
  - `dark-2`: 加深版本

#### 🎭 背景和文本颜色

```css
--vk-bg-color: #ffffff; /* 主背景色 */
--vk-bg-color-page: #f2f3f5; /* 页面背景色 */
--vk-text-color-primary: #303133; /* 主文本色 */
--vk-text-color-regular: #606266; /* 常规文本色 */
--vk-text-color-secondary: #909399; /* 次要文本色 */
```

#### 🖼️ 边框和填充

```css
--vk-border-color: #dcdfe6; /* 主边框色 */
--vk-border-radius-base: 4px; /* 基础圆角 */
--vk-fill-color: #f0f2f5; /* 填充色 */
```

#### 📝 字体系统

```css
--vk-font-size-base: 14px; /* 基础字体大小 */
--vk-font-family: "Helvetica Neue"...; /* 字体族 */
--vk-font-weight-primary: 500; /* 主要字重 */
```

#### ⚡ 禁用状态和动画

```css
--vk-disabled-bg-color: var(--vk-fill-color-light); /* 禁用背景色 */
--vk-transition-duration: 0.3s; /* 过渡时长 */
```

### 4. `reset.css` - 基础样式重置

**作用**: 提供基础样式重置和默认样式设置，确保跨浏览器的一致性。

**主要内容**:

#### 基础元素样式

- `body`: 设置基础字体、字重、字体平滑等
- `a`: 链接样式和交互状态
- `h1-h6`: 标题样式和层级关系

#### 特殊元素

- `p`: 段落样式，设置行高
- `sup/sub`: 上标下标字体大小
- `small`: 小号文本
- `hr`: 分割线样式

## 使用指南

### 1. 在主应用中引入

```javascript
// main.ts
import "./styles/index.scss"; // 推荐：使用 SCSS 版本
// 或
import "./styles/index.css"; // 备用：使用 CSS 版本
```

### 2. 组件样式集成

组件样式通过 `index.scss` 自动引入，新组件需要手动添加到导入列表：

```scss
@use "../components/NewComponent/style.scss" as newComponent;
```

### 3. 主题定制

#### 覆盖变量

```css
:root {
  --vk-color-primary: #custom-blue;
  --vk-border-radius-base: 8px;
}
```

#### 动态主题切换

```javascript
// 切换暗色主题
document.documentElement.style.setProperty("--vk-bg-color", "#1a1a1a");
```

### 4. 在组件中使用变量

```css
.my-component {
  background-color: var(--vk-bg-color);
  border: var(--vk-border);
  border-radius: var(--vk-border-radius-base);
  transition: all var(--vk-transition-duration);
}
```

## 设计原则

### 1. 一致性

- 所有组件使用统一的变量系统
- 遵循语义化的命名规范（`--vk-*` 前缀）

### 2. 可维护性

- 模块化的文件结构
- 清晰的职责分离
- 使用 SCSS 的 `@use` 语法避免命名冲突

### 3. 可扩展性

- 基于 CSS 变量的主题系统
- 完整的颜色变体体系
- 灵活的组件样式导入机制

### 4. 性能优化

- CSS 变量减少重复代码
- 模块化加载避免冗余样式
- 合理的样式重置减少浏览器差异

## 最佳实践

### 1. 变量命名

- 使用语义化的前缀 `--vk-`
- 遵循 `类别-子类别-状态` 的命名模式
- 如：`--vk-color-primary-light-3`

### 2. 样式组织

- 变量定义与使用分离
- 组件样式独立管理
- 避免全局样式污染

### 3. 主题扩展

- 优先使用现有变量
- 新增变量时考虑通用性
- 保持颜色系统的一致性

### 4. 组件集成

- 新组件样式及时添加到主入口
- 使用命名空间避免冲突
- 遵循现有的导入规范

## 注意事项

1. **文件选择**: 推荐使用 `index.scss` 而非 `index.css`，因为 SCSS 版本更完整
2. **变量使用**: 所有样式都应该使用定义的 CSS 变量，避免硬编码
3. **浏览器兼容性**: CSS 变量在现代浏览器中有良好支持
4. **构建配置**: 确保项目支持 SCSS 编译（通常通过 Vite 或 Webpack）

## 未来规划

- [ ] 支持暗色主题变量
- [ ] 添加更多动画变量
- [ ] 完善响应式断点变量
- [ ] 优化字体系统（支持多语言）
- [ ] 添加主题切换的 JavaScript 工具函数

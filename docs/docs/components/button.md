---
title: Button | V-Element
description: Button 组件的文档
---

# Button 按钮
常用的操作按钮。

## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。


<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 类型
<preview path="../demo/Button/Types.vue" title="不同类型" description="primary/success/warning/info/danger"></preview>

## 尺寸
<preview path="../demo/Button/Sizes.vue" title="不同尺寸" description="large/default/small"></preview>

## 朴素/圆角/圆形
<preview path="../demo/Button/PlainRoundCircle.vue" title="Plain/Round/Circle" description="朴素、圆角、圆形"></preview>

## 禁用与加载
<preview path="../demo/Button/Disabled.vue" title="Disabled/Loading" description="禁用与加载状态"></preview>

## 图标
<preview path="../demo/Button/Icon.vue" title="Icon" description="图标按钮"></preview>

### Button Attributes

| Name              | Description                                                             | Type                                                                            | Default |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| size              | button size                                                             | `enum` - `'large'\| 'small'`                                                    | —       |
| type              | button type                                                             | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'`                | —       |
| plain             | determine whether it's a plain button                                   | `boolean`                                                                       | false   |
| round             | determine whether it's a round button                                   | `boolean`                                                                       | false   |
| circle            | determine whether it's a circle button                                  | `boolean`                                                                       | false   |
| loading           | determine whether it's loading                                          | `boolean`                                                                       | false   |
| disabled          | disable the button                                                      | `boolean`                                                                       | false   |
| icon              | icon component                                                          | `string`                                                                        | —       |
| autofocus         | same as native button's `autofocus`                                     | `boolean`                                                                       | false   |
| native-type       | same as native button's `type`                                          | `enum` - `'button'\| 'submit'\| 'reset'`                                        | button  |

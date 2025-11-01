<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import { CollapseItem } from "./components/Collapse";
import type { ButtonInstance } from "./components/Button/types";
import type { NameType } from "./components/Collapse/types";

const buttonRef = ref<ButtonInstance | null>(null);

// Collapse组件的响应式数据
const activeNames = ref<NameType[]>(["1", "2"]);
const accordionActiveNames = ref<NameType[]>(["1"]);

// Collapse change事件处理
const handleChange = (values: NameType[]) => {
  console.log("Collapse changed:", values);
};

onMounted(() => {
  if (buttonRef.value) {
    console.log("Button component instance:", buttonRef.value.ref);
  }
});
</script>

<template>
  <header>
    <h1>JK-Element 组件库</h1>
  </header>
  <main>
    <!-- Button 组件展示 -->
    <section class="component-section">
      <h2>Button 按钮</h2>
      <div class="button-demo">
        <Button type="primary" plain disabled ref="buttonRef">主要按钮</Button>
        <Button type="success" round>成功按钮</Button>
        <Button type="warning">警告按钮</Button>
        <Button type="danger">危险按钮</Button>
      </div>
    </section>

    <!-- Collapse 组件展示 -->
    <section class="component-section">
      <h2>Collapse 折叠面板</h2>

      <!-- 基础用法 -->
      <div class="collapse-demo">
        <h3>基础用法</h3>
        <Collapse v-model="activeNames" @change="handleChange">
          <CollapseItem name="1" title="一致性 Consistency">
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </CollapseItem>
          <CollapseItem name="2" title="反馈 Feedback">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </CollapseItem>
          <CollapseItem name="3" title="效率 Efficiency">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </CollapseItem>
          <CollapseItem name="4" title="可控 Controllability">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </CollapseItem>
        </Collapse>
      </div>

      <!-- 手风琴模式 -->
      <div class="collapse-demo">
        <h3>手风琴模式</h3>
        <Collapse v-model="accordionActiveNames" accordion>
          <CollapseItem name="1" title="手风琴面板 1">
            <div>这是手风琴模式下的第一个面板内容。</div>
            <div>在同一时间只能展开一个面板。</div>
          </CollapseItem>
          <CollapseItem name="2" title="手风琴面板 2">
            <div>这是手风琴模式下的第二个面板内容。</div>
            <div>点击其他面板时，当前面板会自动收起。</div>
          </CollapseItem>
          <CollapseItem name="3" title="手风琴面板 3">
            <div>这是手风琴模式下的第三个面板内容。</div>
            <div>适用于 FAQs 等场景。</div>
          </CollapseItem>
        </Collapse>
      </div>

      <!-- 禁用状态 -->
      <div class="collapse-demo">
        <h3>禁用状态</h3>
        <Collapse v-model="activeNames">
          <CollapseItem name="5" title="正常面板">
            <div>这是一个可以正常点击展开/收起的面板。</div>
          </CollapseItem>
          <CollapseItem name="6" title="禁用面板" disabled>
            <div>这个面板被禁用了，无法点击展开。</div>
          </CollapseItem>
          <CollapseItem name="7" title="另一个正常面板">
            <div>这是另一个可以正常操作的面板。</div>
          </CollapseItem>
        </Collapse>
      </div>
    </section>
  </main>
</template>

<style scoped>
header {
  text-align: center;
  padding: 2rem 0;
  border-bottom: 1px solid #eaecef;
  margin-bottom: 2rem;
}

h1 {
  color: #2c3e50;
  font-size: 2.5rem;
  font-weight: 600;
  margin: 0;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.component-section {
  margin-bottom: 3rem;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.component-section h2 {
  color: #2c3e50;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #409eff;
}

.button-demo {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.collapse-demo {
  margin-bottom: 2rem;
}

.collapse-demo h3 {
  color: #606266;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
}

.collapse-demo:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  main {
    padding: 0 1rem;
  }

  .component-section {
    padding: 1.5rem;
  }

  .button-demo {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  h1 {
    font-size: 2rem;
  }
}

/* 过渡动画 */
.component-section {
  transition: box-shadow 0.3s ease;
}

.component-section:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}
</style>

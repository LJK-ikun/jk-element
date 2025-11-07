<script setup lang="ts">
import { ref, onMounted } from "vue";
import Button from "./components/Button/Button.vue";
import Collapse from "./components/Collapse/Collapse.vue";
import { CollapseItem } from "./components/Collapse";
import Alert from "./components/Alert/Alert.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import type { ButtonInstance } from "./components/Button/types";
import type { NameType } from "./components/Collapse/types";
import type { AlertInstance } from "./components/Alert/types";
import type { TooltipInstance } from "./components/Tooltip/types";

const buttonRef = ref<ButtonInstance | null>(null);

// Collapse组件的响应式数据
const activeNames = ref<NameType[]>(["1", "2"]);
const accordionActiveNames = ref<NameType[]>(["1"]);

// Alert组件的响应式数据
const alertRef = ref<AlertInstance | null>(null);
const showSuccessAlert = ref(true);
const showWarningAlert = ref(true);
const showErrorAlert = ref(true);
const showInfoAlert = ref(true);

// Tooltip组件的响应式数据
const tooltipRef = ref<TooltipInstance | null>(null);
const manualTooltipVisible = ref(false);

// Collapse change事件处理
const handleChange = (values: NameType[]) => {
  console.log("Collapse changed:", values);
};

// Alert事件处理
const handleAlertClose = (type: string) => {
  console.log(`${type} Alert closed`);
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
  <font-awesome-icon icon="fa-solid fa-user-secret" />
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

    <!-- Alert 组件展示 -->
    <section class="component-section">
      <h2>Alert 警告提示</h2>

      <!-- 基础用法 -->
      <div class="alert-demo">
        <h3>基础用法</h3>
        <div class="alert-list">
          <Alert
            v-if="showSuccessAlert"
            type="success"
            title="成功提示"
            @close="handleAlertClose('success')"
          />
          <Alert
            v-if="showWarningAlert"
            type="warning"
            title="警告提示"
            @close="handleAlertClose('warning')"
          />
          <Alert
            v-if="showErrorAlert"
            type="error"
            title="错误提示"
            @close="handleAlertClose('error')"
          />
          <Alert
            v-if="showInfoAlert"
            type="info"
            title="信息提示"
            @close="handleAlertClose('info')"
          />
        </div>
      </div>

      <!-- 带图标和描述 -->
      <div class="alert-demo">
        <h3>带图标和描述</h3>
        <div class="alert-list">
          <Alert
            type="success"
            title="成功"
            description="恭喜你，操作成功完成！"
            :show-icon="true"
            @close="handleAlertClose('success-desc')"
          />
          <Alert
            type="warning"
            title="警告"
            description="请注意，此操作可能存在风险。"
            :show-icon="true"
            @close="handleAlertClose('warning-desc')"
          />
          <Alert
            type="error"
            title="错误"
            description="抱歉，操作失败，请重试。"
            :show-icon="true"
            @close="handleAlertClose('error-desc')"
          />
        </div>
      </div>

      <!-- 居中显示 -->
      <div class="alert-demo">
        <h3>居中显示</h3>
        <div class="alert-list">
          <Alert
            type="info"
            title="信息提示"
            description="这是一个居中显示的Alert组件"
            :center="true"
            :show-icon="true"
            @close="handleAlertClose('center')"
          />
        </div>
      </div>

      <!-- 不同效果 -->
      <div class="alert-demo">
        <h3>不同效果</h3>
        <div class="alert-list">
          <Alert
            type="info"
            title="浅色效果"
            description="默认的浅色效果"
            effect="light"
            :show-icon="true"
          />
          <Alert
            type="warning"
            title="深色效果"
            description="深色背景效果"
            effect="dark"
            :show-icon="true"
          />
        </div>
      </div>

      <!-- 不可关闭 -->
      <div class="alert-demo">
        <h3>不可关闭</h3>
        <div class="alert-list">
          <Alert
            type="success"
            title="不可关闭的提示"
            description="这个Alert没有关闭按钮"
            :closable="false"
            :show-icon="true"
          />
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="alert-controls">
        <Button @click="showSuccessAlert = !showSuccessAlert">
          {{ showSuccessAlert ? "隐藏" : "显示" }} 成功提示
        </Button>
        <Button @click="showWarningAlert = !showWarningAlert" type="success">
          {{ showWarningAlert ? "隐藏" : "显示" }} 警告提示
        </Button>
        <Button @click="alertRef?.close()" type="danger">
          关闭引用Alert
        </Button>
        <Button @click="alertRef?.open()" type="primary">
          打开引用Alert
        </Button>
      </div>

      <!-- 带ref的Alert用于方法调用 -->
      <Alert
        ref="alertRef"
        type="info"
        title="可编程控制的Alert"
        description="这个Alert可以通过ref控制显示和隐藏"
        :show-icon="true"
      />
    </section>

    <!-- Tooltip 组件展示 -->
    <section class="component-section">
      <h2>Tooltip 工具提示</h2>

      <!-- 基础用法 -->
      <div class="tooltip-demo">
        <h3>基础用法</h3>
        <div class="tooltip-list">
          <Tooltip content="这是一个基础的提示信息">
            <Button type="primary">悬停显示</Button>
          </Tooltip>
          <Tooltip content="支持不同类型的触发方式">
            <Button type="success">成功按钮</Button>
          </Tooltip>
          <Tooltip content="可以包含丰富的文本内容">
            <Button type="warning">警告按钮</Button>
          </Tooltip>
          <Tooltip content="支持自定义各种属性">
            <Button type="danger">危险按钮</Button>
          </Tooltip>
        </div>
      </div>

      <!-- 不同位置 -->
      <div class="tooltip-demo">
        <h3>不同位置</h3>
        <div class="tooltip-placement">
          <div class="placement-row">
            <Tooltip placement="top-start" content="上左">
              <Button type="primary">上左</Button>
            </Tooltip>
            <Tooltip placement="top" content="正上">
              <Button type="primary">正上</Button>
            </Tooltip>
            <Tooltip placement="top-end" content="上右">
              <Button type="primary">上右</Button>
            </Tooltip>
          </div>
          <div class="placement-row">
            <Tooltip placement="left-start" content="左上">
              <Button type="success">左上</Button>
            </Tooltip>
            <Tooltip placement="right-start" content="右上">
              <Button type="success">右上</Button>
            </Tooltip>
          </div>
          <div class="placement-row">
            <Tooltip placement="left" content="正左">
              <Button type="warning">正左</Button>
            </Tooltip>
            <Tooltip placement="right" content="正右">
              <Button type="warning">正右</Button>
            </Tooltip>
          </div>
          <div class="placement-row">
            <Tooltip placement="left-end" content="左下">
              <Button type="danger">左下</Button>
            </Tooltip>
            <Tooltip placement="right-end" content="右下">
              <Button type="danger">右下</Button>
            </Tooltip>
          </div>
          <div class="placement-row">
            <Tooltip placement="bottom-start" content="下左">
              <Button type="info">下左</Button>
            </Tooltip>
            <Tooltip placement="bottom" content="正下">
              <Button type="info">正下</Button>
            </Tooltip>
            <Tooltip placement="bottom-end" content="下右">
              <Button type="info">下右</Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <!-- 不同触发方式 -->
      <div class="tooltip-demo">
        <h3>不同触发方式</h3>
        <div class="tooltip-list">
          <Tooltip content="hover 触发（默认）" trigger="hover">
            <Button type="primary">Hover 触发</Button>
          </Tooltip>
          <Tooltip content="click 触发，点击按钮显示" trigger="click">
            <Button type="success">Click 触发</Button>
          </Tooltip>
          <Tooltip content="手动模式，需要编程控制" :manual="true">
            <Button type="warning">手动模式</Button>
          </Tooltip>
        </div>
      </div>

      <!-- 延迟控制 -->
      <div class="tooltip-demo">
        <h3>延迟控制</h3>
        <div class="tooltip-list">
          <Tooltip content="显示延迟 1 秒" :open-delay="1000">
            <Button type="primary">延迟显示</Button>
          </Tooltip>
          <Tooltip content="隐藏延迟 1 秒" :close-delay="1000">
            <Button type="success">延迟隐藏</Button>
          </Tooltip>
          <Tooltip
            content="显示延迟 1 秒，隐藏延迟 2 秒"
            :open-delay="1000"
            :close-delay="2000"
          >
            <Button type="warning">双向延迟</Button>
          </Tooltip>
        </div>
      </div>

      <!-- 自定义内容 -->
      <div class="tooltip-demo">
        <h3>自定义内容</h3>
        <div class="tooltip-list">
          <Tooltip>
            <Button type="primary">自定义内容</Button>
            <template #content>
              <div style="text-align: center">
                <strong>自定义内容</strong>
                <p>支持 HTML 内容</p>
                <Icon icon="star" style="color: gold" />
              </div>
            </template>
          </Tooltip>
          <Tooltip>
            <Button type="success">复杂内容</Button>
            <template #content>
              <div style="max-width: 200px">
                <h4 style="margin: 0 0 8px 0; color: #409eff">操作提示</h4>
                <p style="margin: 0; font-size: 12px; line-height: 1.4">
                  这是一个包含标题、正文和图标的复杂工具提示内容。
                </p>
                <div style="margin-top: 8px; text-align: center">
                  <Icon
                    icon="info-circle"
                    style="color: #409eff; margin-right: 4px"
                  />
                  <span style="font-size: 11px">了解更多</span>
                </div>
              </div>
            </template>
          </Tooltip>
        </div>
      </div>

      <!-- 编程式控制 -->
      <div class="tooltip-demo">
        <h3>编程式控制</h3>
        <div class="tooltip-controls">
          <Tooltip
            ref="tooltipRef"
            content="通过 ref 控制显示/隐藏的 Tooltip"
            :manual="true"
          >
            <Button type="primary">可编程控制</Button>
          </Tooltip>
          <Button
            @click="tooltipRef?.show()"
            type="success"
            style="margin-left: 10px"
          >
            显示 Tooltip
          </Button>
          <Button
            @click="tooltipRef?.hide()"
            type="danger"
            style="margin-left: 10px"
          >
            隐藏 Tooltip
          </Button>
        </div>
      </div>

      <!-- 手动控制示例 -->
      <div class="tooltip-demo">
        <h3>手动控制示例</h3>
        <div class="tooltip-controls">
          <Tooltip
            content="这个 Tooltip 的显示状态由按钮控制"
            :manual="true"
            v-model:visible="manualTooltipVisible"
          >
            <Button type="warning">手动控制</Button>
          </Tooltip>
          <Button
            @click="manualTooltipVisible = !manualTooltipVisible"
            type="info"
            style="margin-left: 10px"
          >
            {{ manualTooltipVisible ? "隐藏" : "显示" }} Tooltip
          </Button>
        </div>
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

.collapse-demo h3 {
  color: #606266;
  font-size: 1.2rem;
  font-weight: 700; /* 加粗 - 从500增加到700 */
  margin-bottom: 1rem;
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

/* Alert组件样式 */
.alert-demo {
  margin-bottom: 2rem;
}

.alert-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.alert-controls {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ebeef5;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* Tooltip组件样式 */
.tooltip-demo {
  margin-bottom: 2rem;
}

.tooltip-list {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.tooltip-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.tooltip-placement {
  display: inline-block;
  text-align: center;
  border: 1px solid var(--vk-border-color-light);
  border-radius: var(--vk-border-radius-base);
  padding: 20px;
  background: var(--vk-fill-color-light);
}

.placement-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  min-width: 300px;
}

.placement-row:last-child {
  margin-bottom: 0;
}

/* 响应式设计调整 */
@media (max-width: 768px) {
  .tooltip-list {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }

  .tooltip-placement {
    transform: scale(0.8);
    margin: 0 auto;
  }

  .placement-row {
    min-width: 250px;
  }

  .tooltip-controls {
    flex-direction: column;
    align-items: flex-start;
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

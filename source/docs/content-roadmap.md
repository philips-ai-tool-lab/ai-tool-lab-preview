# AI Tool Lab 内容路线图

更新时间：2026-08-11

## 本次 MVP 已实现

- 将原有 4 个 Agent Builder Lab 纳入 `Microsoft 365 Copilot` 分类。
- 新增 `Copilot Notebooks: Project Brief` 试用课程。
- 新增 `Copilot Library: Content Reuse` 试用课程。
- 添加虚构 Green Office Week 训练包与人工验收标准。
- 将现有 Enterprise ChatGPT Foundation Training 作为外部入口接入统一目录。
- 首页支持按工具筛选和关键词搜索。

## 下一批建议

### 1. Copilot Notebooks Mind map Lab

场景：用 3 份虚构 BrightPath rollout 资料生成并核验流程 Mind map。

重点能力：

- 展开节点并使用 Explain。
- 回到源文件核验角色、依赖和日期。
- 导出 PNG，并说明 mind map 即使 notebook 共享仍仅自己可见、保存 30 天。
- Audio overview 只作为可选延伸；不可见时不算失败。

### 2. Enterprise ChatGPT 内容内嵌

当前只提供外部登录入口。正式复制或改写其中内容前，需要：

- 由内容所有者确认允许复用的页面和素材。
- 在已授权的 ChatGPT 登录会话中完成只读内容盘点。
- 明确哪些内容可以放入内部站点，哪些必须保留在原站点。
- 删除或轮换邮件附件中出现的任何 credential-like value；不得写入源码、构建产物或文档。

### 3. 分类级页面

当 Lab 数量继续增加时，新增：

- `/categories/m365-copilot`
- `/categories/enterprise-chatgpt`

分类页分别维护自己的前置条件、共享步骤、官方资源和访问提示，避免首页再次变成长页面。

## Notebooks / Library 当前边界

- Notebooks 只基于用户明确加入且有权限的 references，不会自动读取整个 OneDrive、邮箱、Teams 或互联网。
- Notebooks 核心能力可能同时对 M365 Copilot 与 Copilot Chat 开放，但 Audio、Capture 等子功能的许可与 rollout 更窄，以租户实际界面为准。
- 共享 notebook 时，当前被邀请成员都是可编辑权限；共享还可能授予所链接文件的访问权。
- Library 当前聚合 Pages 与 Images，不是普通 Word/PDF 文件库，也不额外复制一份存储。
- 生成结果可能不准确；每个 Lab 必须包含源文件抽查或界面证据核验。

## 官方学习资源

- [Microsoft 365 Copilot Help & Learning](https://support.microsoft.com/en-us/microsoft-365-copilot/)
- [Get started with Microsoft 365 Copilot](https://learn.microsoft.com/en-us/training/paths/get-started-with-microsoft-365-copilot/)
- [Craft effective prompts for Microsoft 365 Copilot](https://learn.microsoft.com/en-us/training/paths/craft-effective-prompts-copilot-microsoft-365/)
- [Microsoft Scenario Library](https://adoption.microsoft.com/en-us/scenario-library/)
- [OpenAI Academy](https://academy.openai.com/)
- [OpenAI Skill Lab: Planning cross-functional projects](https://academy.openai.com/en/public/clubs/work-users-ynjqu/events/skill-lab-planning-cross-functional-projects-cot53fzvhc)
- [OpenAI Developer Build Hours](https://academy.openai.com/en/public/collections/developer-build-hours-2025-03-20)

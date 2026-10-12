# Philips AI Tool Lab

面向 Philips 员工的中文 AI 实战培训门户，统一整理两类工具：

- Microsoft 365 Copilot：Agent Builder、Copilot Notebooks、Copilot Library
- Enterprise ChatGPT：Chief of Staff、Workflow Automation、Skill 扩展与 Workspace Agent

首页支持按工具筛选和关键词搜索。站内 Lab 提供分步操作、可复制 Prompt、官方说明、完成清单和人工核验点。

## 当前 Lab

- Chief of Staff
- Product Manual FAQ
- Meeting Follow-up Assistant
- Funnel Data Analyst
- Copilot Notebooks: Project Brief（Copilot 笔记本试用课程）
- Copilot Library: Content Reuse（Copilot 内容库试用课程）
- Chief of Staff（Enterprise ChatGPT 入门）
- Workflow Automation（Enterprise ChatGPT 入门）
- Extend your Chief of Staff（Enterprise ChatGPT 进阶）
- Workspace Agent · AI Use Case Value Agent（Enterprise ChatGPT 进阶）

Notebooks Pilot 的练习文件位于 `public/training-data/green-office-week/`，全部为虚构训练数据。

## 本地运行与验证

```text
npm install
npm run dev
npm test
npm run lint
```

Vinext 构建：

```text
npm run build
```

GitHub Pages / 通用静态导出验证：

```text
npm run build:pages
```

## 内容与安全边界

- 默认只使用随 Lab 提供、标有 `FICTIONAL TRAINING DATA` 的虚构资料。
- 不要上传患者、消费者或员工个人信息，真实合同或价格，或未发布产品资料。
- `robots` 的 `noindex` 不是访问控制；含内部截图或 SharePoint 链接的版本不得直接发布到公开免费站。
- `source-materials/` 只用于本地核对邮件附件，并已排除在版本控制之外。

## 托管建议

正式发布前先确认受众、内容分级和企业批准的平台：

- 员工内部知识门户：优先 SharePoint Communication Site。
- 必须保留定制 Next.js 前端：优先企业 Azure 订阅下的 Azure Static Web Apps Standard，并进行中国大陆三网实测。
- 若必须保证大陆访问 SLA：走 21Vianet 中国云、ICP 备案和公司采购流程。

Render、GitHub Pages 等现有配置只适合脱敏原型或技术验证，不应被视为正式生产批准。详见 `docs/hosting-recommendation.md`。

## 内容来源

- `Agent-Builder Lab Guide 20260629 CN.docx`
- YiQiu 2026-08-19 邮件中的 Enterprise ChatGPT 站内培训要求
- Philips x OpenAI Workspace Agent 培训页的流程结构
- Microsoft 官方 Copilot Notebooks / Library 文档

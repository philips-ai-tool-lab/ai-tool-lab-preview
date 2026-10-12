# Philips AI Tool Lab 交接说明与注意事项

整理日期：2026-10-12。

## 交接范围与版本

此交接按“源码、文档和测试原样保留，问题只注明”的要求整理。前期提出的凭据处理、文档纠错、Pages 测试补齐三项均未实施。

- 目标仓库：philips-ai-tool-lab/ai-tool-lab-preview。
- 原静态发布基线：3181ac998c257ec6ba07769c139d26ce28e6f93f，2026-09-16，移除 Lab 4 的过时 Capabilities 截图引用。
- source/ 来自 2026-10-12 本地活动工作树，包含 60 个已跟踪文件和 28 个未跟踪文件；其中 11 个已跟踪文件相对旧源码 HEAD 有修改。
- 旧源码 HEAD 为 a4f76b6cfb61d450667cb369ee0c326cea0330f8，2026-07-29，仅含早期 4 Lab，不代表现在 10 Lab 站点的完整源码。
- 根目录静态文件与 source/ 是发布物和源码快照两种形态；本次没有重新构建，不能据本次交接断言二者是可逐字节复现的同一构建。
- 88 个 source/ 文件及 5 个参考文件均有清单和整理时校验值，见 docs/handoff-manifest.json。Git 的换行规范化可能使文本检出后的原始字节哈希不同；同时记录 Git 内容标识供核对。

## 注意事项一：AI Asset Inventory API Key

### 已知用途

原始说明将该值标注为“API Key for AI inventory”。source/app/content/enterprise-chatgpt-labs.ts 用 workspaceAgentTrainingApiKey 保存该值，并在 enterprise-workspace-agent 的“连接内部 Philips 来源”步骤中展示，用于 AI Asset Inventory MCP 配置。它不是本网站运行所需的 OpenAI 模型调用密钥。

### 本次处理

按交接要求保留现有值、复制面板、完成清单及测试断言，不进行删除、替换、验证有效性或轮换。此文档不复写具体值。

现有静态产物以下文件也含该值：

- labs/enterprise-workspace-agent/index.html
- labs/enterprise-workspace-agent/index.txt
- labs/enterprise-workspace-agent/__next._full.txt
- labs/enterprise-workspace-agent/__next.labs/$d$slug/__PAGE__.txt

### 接手人需要知道

- 已检查原始说明直接提供值，未给出完整申请入口、负责团队、有效期或轮换方法；“联系管理员获取”不能被当作已经核实的正式申请流程。
- 凭据是否仍有效、是否为共享训练用途、权限范围和未来维护责任仍需服务负责人确认。本次未使用它访问服务。
- 该值此前已进入公共仓库。仓库之后改为私有，不会撤销已分发的值或消除外部副本；处理历史记录或轮换需要另行明确操作范围。
- 不应将“测试通过”解释为凭据使用方式已经获得验证。

## 注意事项二：原始文档的过时内容与冲突

| 文件 | 已知差异 | 阅读方式 |
|---|---|---|
| source/docs/content-roadmap.md | 仍称 Enterprise 只提供外部入口、内容尚待内嵌；当前源码和发布站已有四个站内 Enterprise Lab | 作为历史路线图阅读，当前课程范围看 source/app/content/ 和本交接清单 |
| source/docs/hosting-recommendation.md | 文件数、课程数及访问检查反映早期研究，不代表本次站点和服务状态 | 保留原研究结果；不把过去的数字或失败记录当作实时状态 |
| docs/reference/05-SharePoint资料添加说明.md | 旧文件夹教程要求保留 id 等参数；当前 Product Manual 源码和测试要求特定直接文件夹路径、避免旧 Forms/AllItems 写法 | 两种说明未统一；实际使用按租户界面和检索结果核实，不机械套用全删/全留参数 |
| docs/reference/03-链接台账.csv | 历史入口和访问备注未在本次逐一重新验证 | 含企业访问要求的链接不能仅凭公开访问失败判定失效 |
| source/.github/workflows/deploy-pages.yml | 使用旧 /philips-agent-builder-lab 路径及 digesh555.github.io | 仅历史配置；不会因放入 source/ 而自动发布当前站点 |
| source/render.yaml | 旧 Render 部署方案 | 不代表当前 GitHub Pages 站点设置 |

原文均未修改。本交接说明是额外注释，不覆盖、重写或宣称已经解决上述差异。

## 注意事项三：测试与本次检查的边界

source/tests/rendered-html.test.mjs 通过 dist/server/index.js 调用 Vinext Worker，覆盖首页、10 个 Lab、部分资源、元数据等。

已知限制：

- 不能直接替代带 /ai-tool-lab-preview 路径的 Next.js 静态导出验证。
- 包含明确要求 API Key 字面量和复制标题存在的断言；本次按要求保留。
- 部分测试只检查资源文件存在，例如旧 funnel-capabilities.png 的保留不代表当前页面仍在引用它。
- 本次交接只验证新增文件的完整性及原静态发布文件未被改动，没有运行 npm ci、lint、npm test 或重新构建，没有增加测试。

交接整理前曾进行的检查：站点首页、10 Lab、3 TXT 返回 HTTP 200；静态 HTML 中已解析的站内 href/src 未发现缺失文件。该结果不等同于浏览器交互验证、全部外链验证或企业权限验证。

## 10 个实验与源码位置

| slug | 内容位置 | 状态 |
|---|---|---|
| chief-of-staff | source/app/data.ts | ready |
| product-manual-faq | source/app/data.ts | ready |
| meeting-follow-up | source/app/data.ts | ready |
| funnel-data-analyst | source/app/data.ts | ready |
| copilot-notebook-project-brief | source/app/content/next-labs.ts | pilot |
| copilot-library-reuse | source/app/content/next-labs.ts | pilot |
| enterprise-chief-of-staff | source/app/content/enterprise-chatgpt-labs.ts | ready |
| enterprise-workflow-automation | source/app/content/enterprise-chatgpt-labs.ts | ready |
| enterprise-extend-chief-of-staff | source/app/content/enterprise-chatgpt-labs.ts | ready |
| enterprise-workspace-agent | source/app/content/enterprise-chatgpt-labs.ts | ready |

首页筛选组件为 source/app/components/LabCatalog.tsx；复制组件为 CopyPanel.tsx；检查清单组件为 Checklist.tsx；完成进度只保存在当前浏览器 localStorage，不是服务端学员记录。

## 本地运行与静态导出参考

在 source/ 中执行原有 npm 脚本。npm run build 是 Vinext 构建；npm run build:pages 是 Next 构建，需要额外指定 Pages 环境。以下是针对现有预览站的 PowerShell 参数示例，本次未运行：

```powershell
Set-Location source
$env:GITHUB_PAGES = 'true'
$env:NEXT_PUBLIC_BASE_PATH = '/ai-tool-lab-preview'
$env:NEXT_PUBLIC_SITE_URL = 'https://philips-ai-tool-lab.github.io'
npm run build:pages
```

产物位于 source/out/。这一步只生成文件，不会部署。运行其他开发或测试命令前应使用新终端或恢复这三个环境变量，避免 Pages 参数影响后续任务。

仓库根目录现有静态网站保持原状。本交接不把 source/.github/workflows 提升为根级自动发布配置，不自动把 source/out/ 覆盖到根目录，也不切换 Pages 发布源。

## 外部资料和未包含文件

仓库已有三份虚构 Green Office Week TXT。原文中报名日期 08-28 与 08-31 的冲突是练习设计，保留不改。

以下资料由企业系统提供，不会因获得本仓库权限而自动获得访问权：

- SharePoint 产品手册目录。
- Mail Template CN.docx 和 Mail Template EN.docx。
- Funnel Sample Data.xlsx 和 Chart Sample.pptx。
- SharePoint、Outlook、Teams 及 AI Asset Inventory MCP 的账号与连接权限。

原始邮件附件、Instruction.docx、正式培训 PPT、会议资料、完整个人工作交接记录、node_modules 和构建缓存未包含在本次源码交接集合中。历史参考文档提到的这些附件不意味着它们已随本仓库提供。

## 权限与接手确认

- 仓库访问权限与 GitHub Pages 网站访问权限分开管理。
- 维护人和接手人的具体 GitHub 账号、读写权限、Pages 管理权限尚未在本次文件整理中验证。
- GitHub Free 组织将仓库改为私有可能导致 Pages 自动取消发布；当前组织套餐未核实。
- 仓库设为 Private 不自动保证网站仅对授权人员可见；如继续托管网站，应另行核对 Pages 的发布与访问设置。
- 三处注意事项均保留未修正，接手人应明确知悉后再决定后续维护范围。

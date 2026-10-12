# Philips AI Tool Lab · 工作交接

此仓库保存 Philips AI Tool Lab 的网站发布文件、开发源码快照及交接资料。

- 网站：https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/
- [交接说明与注意事项](HANDOFF.md)
- [开发源码及原始说明](source/README.md)
- [正式课件、课堂配套资料与培训归档](training/README.md)
- [10 个实验的范围与来源](docs/reference/02-十个实验来源与页面映射.md)
- [历史链接台账](docs/reference/03-链接台账.csv)
- [文件清单与校验值](docs/handoff-manifest.json)

## 本次交接方式

2026-10-12 整理：按交接要求原样保留源码、原有文档与测试，在本说明及 HANDOFF.md 中记录注意事项。本次没有执行前期方案中的三项修正，没有重新构建或替换原网站页面。

| 路径 | 用途 |
|---|---|
| 根目录 index.html、labs/、guide/、training-data/、_next/ 及导航数据 | 现有静态网站发布文件，基于提交 3181ac998c257ec6ba07769c139d26ce28e6f93f 保留 |
| source/ | 2026-10-12 本地活动工作树的 88 个源码、配置、资源和说明文件，包含原先未提交的最新内容 |
| docs/reference/ | 5 份历史交接说明及链接台账，按原文件保留 |
| training/ | 189 个培训文件：正式 PPT、课堂练习、材料包、历史课件、截图、制作与检查记录、培训计划表；文件内容原样保留 |
| HANDOFF.md | 已知问题、版本关系、运行说明、发布差异和接手核对项目 |
| docs/handoff-manifest.json | 本次新增源码及参考资料的文件清单、整理时 SHA256 和 Git 内容标识 |
| training/manifest.json | 培训资料原路径与仓库路径对照、文件大小及 SHA256 校验清单 |

## 先阅读的三项注意事项

1. **API Key 原样保留。** Workspace Agent 教程及测试中存在用于 AI Asset Inventory MCP 的硬编码训练值，当前静态页面也保留该值。本次未验证它的有效性，没有删除或替换。注意事项不重复展示具体值。原始材料没有提供完整申请、有效期或轮换流程。
2. **部分文档过时或存在冲突。** source/docs/content-roadmap.md 中 Enterprise 内容仍处于待内嵌的描述与当前 10 Lab 不一致；历史 SharePoint 指南与当前产品手册教程的链接处理方式不同。两者均保留，具体差异见 HANDOFF.md。
3. **测试覆盖有边界。** 现有测试主要验证 Vinext Worker 输出，并包含要求 API Key 字面量存在的断言；它不能单独证明当前 GitHub Pages 静态站点构建和发布正确。本次未新增 Pages 测试，也未宣称重新构建通过。

## 本地开发

进入 source/ 后按照原有工具链运行。当前 .node-version 为 22.17.1，package.json 的 Node 要求为 >=22.13.0。

```text
cd source
npm ci
npm run dev
```

原有验证命令：

```text
npm run lint
npm test
```

这些是接手者可运行的命令，不代表本次整理已经执行过它们。source/package.json 中 private=true 用于限制 npm 发布，与 GitHub 仓库的访问权限是两回事。

## 修改与发布的关系

修改 source/ 不会自动更新根目录的网站。source/.github/workflows/deploy-pages.yml 位于嵌套目录，作为历史源码保留，不会被此仓库当作根级 Actions 工作流执行；其中还保留旧站点参数，不应直接提升到根目录启用。

当前源码生成预览站 Pages 产物所需的环境变量、发布边界及资料权限说明见 [HANDOFF.md](HANDOFF.md)。本次没有迁移现有发布方式。

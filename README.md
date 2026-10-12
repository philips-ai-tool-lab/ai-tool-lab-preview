# Philips AI Tool Lab

面向 Philips 员工的 AI 实验网站。本仓库保存网站发布文件、开发源码和网站维护说明。独立培训资料按主题存放在同组织的专用仓库。

- [打开 AI Tool Lab 网站](https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/)
- [网站维护说明与已知事项](HANDOFF.md)
- [开发源码](source/README.md)
- [10 个实验的范围与来源](docs/reference/02-十个实验来源与页面映射.md)
- [历史链接台账](docs/reference/03-链接台账.csv)
- [源码与参考资料校验清单](docs/handoff-manifest.json)

## 组织内资料分类

| 仓库 | 内容 |
|---|---|
| [ai-tool-lab-preview](https://github.com/philips-ai-tool-lab/ai-tool-lab-preview) | 当前 AI Tool Lab 网站、源码和网站相关说明 |
| [bootcamp-training](https://github.com/philips-ai-tool-lab/bootcamp-training) | Bootcamp 正式课件、课堂练习、历史版本与培训计划 |
| [copilot-service-sales-training](https://github.com/philips-ai-tool-lab/copilot-service-sales-training) | 服务销售30分钟培训 PPT、离线网页及完整材料包 |
| [people-function-materials](https://github.com/philips-ai-tool-lab/people-function-materials) | People Function 入职内容、参考资料、Agent 指令及任务模板 |

## 网站目录

| 路径 | 用途 |
|---|---|
| index.html、labs/、guide/、training-data/、_next/ 及导航文件 | 现有静态网站；training-data/ 是网站自身使用的虚构练习资料 |
| source/ | 2026-10-12 活动工作树的 88 个源码、配置、资源和说明文件 |
| docs/reference/ | 网站实验来源、链接和访问说明 |
| HANDOFF.md | 网站已知问题、版本关系、运行和发布说明 |
| training/README.md | 原培训目录迁移后的分类入口 |

## 本地开发与发布关系

进入 source/，使用原有工具链：

```text
cd source
npm ci
npm run dev
```

当前 .node-version 为 22.17.1，package.json 要求 Node >=22.13.0。原有检查命令是 npm run lint 和 npm test。

修改 source/ 不会自动更新根目录网站。source/.github/workflows/deploy-pages.yml 是保留的历史配置，含旧站点参数，不会作为根级工作流执行。当前预览站的静态导出参数见 HANDOFF.md。

## 已知事项

Workspace Agent 教程中的训练 API Key、部分历史文档冲突和现有测试覆盖边界仍见 HANDOFF.md。资料分类没有修改这些应用内容，也没有重新构建网站。

2026-10-12 已将 189 个 Bootcamp 原始文件和 3 个服务销售交付文件迁入上述专用仓库；迁移前后逐文件校验一致，旧 Git 历史保留。

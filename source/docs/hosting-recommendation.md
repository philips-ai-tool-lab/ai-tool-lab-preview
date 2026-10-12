# AI Tool Lab 网站发布方案调研与决策记录

更新时间：2026-08-12  
状态：建议稿；尚未执行部署或改动 Philips 线上环境  
适用场景：Philips 员工内部学习站，重点考虑中国大陆访问、企业身份、内容治理和后续维护

## 一页结论

这个项目不应只选一个“托管商”，而应把内容入口、应用运行和中国大陆交付分开决策。

建议采用下面的两层架构：

1. **SharePoint 作为内部入口和内容治理层**
   - 优先评估现有 EI AI Hub，或由它关联一个新的 Communication Site。
   - 首页、搜索入口、所有者、编辑者、受众、安全组和培训资料都由 SharePoint 管理。
   - 不把当前静态导出目录直接上传到文档库，也不把 iframe 作为默认入口。

2. **根据体验要求选择运行层**
   - 若“尽快上线、便于非技术人员维护”优先：在 SharePoint 原生重建，预计 5–8 人日。
   - 若“保留当前交互和视觉效果”优先：Azure Static Web Apps Standard + Philips 单租户 Entra 登录，SharePoint 用顶层链接打开，预计 3–5 工程人日，前提是审批和租户信息已就绪。
   - 若“中国大陆可用性或 SLA 是硬要求”：转入世纪互联运营的 Azure 中国，生产默认评估 App Service；Azure Static Web Apps 在中国区确实存在，但价格、SLA 和企业身份能力仍需在实际订阅内完成 POC 和商务确认。

**当前不建议：**

- GitHub Pages、Vercel Hobby、Cloudflare Pages 或 Netlify 免费层承载内部生产内容。
- Azure Storage Static Website 承载仅限员工访问的内容，因为静态网站端点是匿名访问模型。
- 将 out 目录上传到 SharePoint 后期待它像普通网站一样运行。
- 现在就重写为 SPFx；除非 SharePoint 页面内必须保留复制按钮、进度记忆和精确筛选体验。

## 已核实的 Philips 现状

本次对已连接的 SharePoint 做了只读检索，没有创建、修改或上传任何内容。

已找到三个相关空间：

- **EI AI Hub**：最接近本项目主题，已有 AI 学习材料和 “AI in your role” 文档库。
- **Digital Employee Experience**：已有 Copilot FAQ、培训材料，并存在 SharePoint App/Client Side Assets 基础设施。
- **Enterprise Education & Enablement**：适合作为培训治理和内容运营协作方。

没有找到名称完全匹配 “AI Tool Lab” 的现有页面。EI AI Hub 中虽然存在 HTML 文件，但这只说明文档库允许保存该文件，并不证明现代 SharePoint 会把它作为可执行网站托管。现代 SharePoint 默认不允许任意脚本；Embed Web Part 也只是嵌入受允许的 HTTPS iframe。

当前还没有核实：

- 哪个团队拥有上述站点的发布权限。
- Philips 是否允许新建 Communication Site，还是必须放进现有 Hub。
- 访客组、外部共享、敏感度标签、保留策略和发布审批的具体设置。
- Philips 全球 Azure、Azure China、Azure DevOps 或企业 GitHub 的可用订阅和管理员。

## 当前应用的发布就绪度

代码审计显示，现有应用可以做静态导出，适合迁移到多个静态或 Web 托管平台，但当前 out 目录还不是正式发布包。

| 项目 | 当前状态 | 发布影响 |
|---|---|---|
| 静态产物 | 118 个文件，约 6.62 MiB，包含 6 个 Lab 路由 | 规模小，适合静态托管 |
| 交互 | 搜索、筛选、提示词复制、本地进度、响应式页面 | SharePoint 原生重建会损失部分体验 |
| 路径 | 当前 200 个内部资源引用都带 /philips-agent-builder-lab 前缀 | 这是 GitHub Pages 专用构建，部署 Azure 根路径前必须重建 |
| 社交分享地址 | 当前导出仍出现 localhost 地址 | 必须注入正式 NEXT_PUBLIC_SITE_URL 后重建 |
| 安全配置 | 尚无 Static Web Apps 路由、角色和安全响应头配置 | 不能只靠前端隐藏内容 |
| 内容 | 编译产物包含内部 SharePoint 深链和截图 | 对外发布前必须完成内容分级与链接权限审计 |
| 图片 | PNG 约 5.34 MiB，OG 图尺寸和元数据不一致 | 可发布，但应在生产前压缩和修正 |
| 源码治理 | 当前工作树未形成可追溯发布提交；远端是个人 GitHub 路径 | 正式站应迁移到 Philips 管理的源码与 CI |
| 现有 Pages | 当前目标地址返回 404 | 不能视为已上线或回滚环境 |

因此，现有代码可以复用，但不应把当前 out 目录原样复制到任何生产平台。

## 关键约束

### 1. 当前内容应按内部内容处理

页面中包含 Philips SharePoint 链接、内部培训上下文和截图。除非内容所有者逐项确认可公开，否则默认只允许 Philips 员工访问。noindex 只能降低搜索引擎收录概率，不是访问控制。

### 2. SharePoint 不能直接运行当前 Next.js 导出

现代 SharePoint 的安全模型不会把上传到文档库的 HTML/JavaScript 当作完整 Web 应用执行。可行路线只有：

- 用现代页面和 Web Parts 原生重建；
- 将外部托管应用作为顶层链接打开；
- 用 Embed Web Part 做 iframe 增强，但必须解决允许域、Cookie、条件访问和登录上下文问题；
- 用 SPFx 重写或适配应用。

### 3. Azure 全球与 Azure 中国是不同环境

Azure China 由世纪互联运营，订阅、合同、门户、资源端点和 Microsoft Entra 身份边界与全球 Azure 分离。不能假设 Philips 全球租户和全球 Azure 配置能一键复制到中国区。

App Service 支持 Easy Auth 和自定义 OpenID Connect，因此“Azure China 应用调用 Philips 全球 Entra”在技术上可以作为 POC 候选，但必须实际验证 issuer、JWKS、令牌交换、回调、条件访问、跨境连通性和公司 IAM 政策，不能直接当作已批准架构。

### 4. 中国大陆公网发布通常需要 ICP 路径

在 Azure China 上提供公网网站并使用自有域名，需要走 ICP 备案；上线后还涉及公安备案。Azure China App Service 的默认 chinacloudsites.cn 域名不能作为面向互联网的正式替代，需绑定已备案自有域名。医疗或医疗器械相关内容是否触发前置审批，应由 Philips 法务和备案服务团队确认。

### 5. “免费生产站”与本项目的安全目标不兼容

Azure Static Web Apps Free 面向个人项目且没有生产 SLA。预配置的 Microsoft 身份提供程序也不能直接等同于 Philips 单租户限制；生产应使用 Standard 的自定义 Entra 身份提供程序、路由角色和访问规则。

SharePoint 在已有 Microsoft 365 许可下通常是唯一可能“不新增托管账单”且保留企业治理的路线，但仍有站点管理和内容迁移的人力成本。

## 加权决策

以下分数是基于当前假设的分析判断，不是厂商承诺。满分 5 分，权重为：身份与数据安全 25%、中国大陆可用性 20%、现有 UI 保真 15%、上线速度 15%、采购与运行成本 10%、内容维护 10%、运维与 SLA 5%。

| 方案 | 安全 | 中国可用性 | UI | 速度 | 成本 | 维护 | 运维 | 加权分 / 100 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| SharePoint 原生重建 | 5.0 | 3.0 | 2.0 | 4.0 | 5.0 | 5.0 | 5.0 | **80.0** |
| Azure China App Service | 4.0 | 5.0 | 5.0 | 2.0 | 2.5 | 3.5 | 4.5 | **77.5** |
| 全球 Azure SWA Standard | 4.5 | 2.5 | 5.0 | 4.0 | 3.0 | 3.5 | 4.5 | **77.0** |
| Azure China SWA | 3.0 | 4.5 | 5.0 | 2.5 | 3.0 | 4.0 | 3.0 | **72.5** |
| SharePoint Framework 重写 | 5.0 | 3.0 | 4.5 | 1.5 | 2.0 | 2.5 | 4.0 | **68.0** |
| GitHub Pages 公共站 | 1.0 | 1.5 | 5.0 | 5.0 | 5.0 | 4.0 | 2.0 | **61.0** |

这个矩阵的正确读法不是“第一名永远胜出”，而是：

- **SharePoint 原生**最适合尽快建立可治理的内部知识入口。
- **全球 Azure SWA**最适合保留体验且审批链较短，但必须通过中国网络实测。
- **Azure China App Service**最适合把大陆交付作为硬约束，但身份、ICP、合同和运维会成为关键路径。
- **Azure China SWA**值得 POC，不应在未知项关闭前直接定为生产平台。

## 方案详解

### 方案 A：SharePoint Communication Site 原生重建

**推荐场景：** 首版内部发布、内容维护优先、无新增云采购。

建议结构：

- EI AI Hub 首页增加 AI Tool Lab 入口，或创建与该 Hub 关联的 Communication Site。
- 一个首页 + 六个 Lab 现代页面 + 一个外部 ChatGPT 学习链接。
- 使用 Hero、Quick Links、Highlighted Content 和页面模板组织内容。
- 文档库增加 Tool、Topic、Difficulty、Duration、Status、Language 等元数据。
- Owners 至少两人；Members 仅给内容编辑者；Visitors 使用获批的 Entra 安全组。
- 外部共享设置为仅组织内；Audience Targeting 只用于展示，不作为权限控制。

能力差异：

| 当前能力 | SharePoint 原生对应方式 | 差异 |
|---|---|---|
| 卡片首页 | Hero / Quick Links | 可较好还原信息结构 |
| Lab 详情页 | 现代页面模板 | 内容可维护，视觉不完全一致 |
| 搜索与筛选 | Highlighted Content、站点搜索、文档库视图 | 不能完全复刻前端即时筛选 |
| 提示词复制 | 文本或代码块 | 一键复制通常需要 SPFx |
| 本地进度 | Microsoft List 或静态清单 | 精确的浏览器本地进度需要自定义开发 |
| 动画与定制交互 | 无直接对应 | 需要接受降级或使用 SPFx |

**预计工作量：** 单个 Lab 草稿 POC 1–2 人日；全部内容迁移和验收 5–8 人日。  
**主要风险：** UI 降级、页面发布权限和 Hub 管理权尚未确认。  
**判断：** 最适合第一阶段，但不是当前代码的直接部署。

### 方案 B：全球 Azure Static Web Apps Standard

**推荐场景：** 保留当前 UI 和交互，主要受众使用 Philips 全球 Entra，能够接受中国大陆“实测通过后上线”而非厂商境内 SLA。

目标架构：

    Philips 员工
        -> EI AI Hub / SharePoint 入口
        -> 顶层打开 Azure Static Web Apps
        -> Philips 单租户 Entra 登录
        -> 静态页面、图片和本地进度

必须完成：

1. 将静态导出从 GitHub Pages 专用变量改为平台无关构建。
2. 设置正式站点 URL，并修正 OG 图片地址和尺寸。
3. 使用 Standard 计划的自定义 Entra 提供程序，将租户固定为 Philips。
4. 在 staticwebapp.config.json 中为全部应用路由要求认证角色，并配置 CSP 等安全响应头。
5. 将源码和发布流水线迁到 Philips 管理的企业仓库。
6. 对内部链接、截图和分享令牌完成内容审计。
7. 从 SharePoint 用顶层链接打开；iframe 只在登录、Cookie、条件访问全部通过后作为增强。
8. 在中国三大运营商和 Philips 企业网络上做真实测试。

**预计工作量：** 3–5 工程人日，不含租户管理员审批。  
**主要风险：** 全球服务的中国大陆跨境时延和可达性不稳定；没有境内性能保证。  
**判断：** 当前代码的高保真首选，前提是实测和企业身份配置通过。

### 方案 C：Azure China App Service

**推荐场景：** 中国大陆访问是硬性业务要求，需要正式 SLA、企业身份和可控运维。

为什么生产默认先评估 App Service：

- 官方有清晰的付费层 SLA：付费层单实例 99.95%，满足条件的多可用区部署可到 99.99%。
- 支持 Easy Auth 和任意 OpenID Connect 提供程序。
- 可以直接部署包含 index.html 的 ZIP 静态包，也能保留未来增加轻量后端的空间。
- 相比 Storage Static Website，它能在应用入口强制身份验证。

必要条件：

- 世纪互联 Azure China 企业订阅和合同。
- 已备案的自有域名；确认 ICP 和公安备案责任。
- 中国 Entra 租户，或经过批准并实测的全球 Entra OIDC 方案。
- Philips IAM、Cyber Security、Legal/Privacy、Brand 和站点所有者审批。
- 至少 Basic B1 做技术试点；生产按 SLA 和可用性目标评估 S1 或更高、区域冗余、日志和告警。

**工程工作量：** 4–8 工程人日；ICP、采购、租户和安全审批可能远长于工程时间。  
**成本：** 官方价格会随区域、操作系统和合同变化。当前公开价格页和零售价数据中，B1/S1 基础计算示例约落在每月一百至七百元人民币区间；域名、流量、日志、冗余、税费和企业折扣另计，必须以实际订阅报价为准。  
**判断：** 大陆硬 SLA 的稳妥路线，但不是最快上线路线。

### 方案 D：Azure China Static Web Apps

这项服务**不是不存在**。Azure China 官方教程已经展示在 chinaeast2 创建 Static Web App，Azure China Advisor 也识别 Free、Standard 和 100 GB 配额建议。

截至本报告日期，公开资料仍不足以确认以下生产条件：

- 中国区 Standard 的实际企业报价。
- 与全球版相同的 SLA 是否适用于世纪互联合同。
- 自定义 Entra 提供程序、单租户限制和角色规则在目标订阅中的实际可用性。
- 自定义域名、ICP、日志、私有连接和企业发布源的完整支持边界。

因此它应进入 3–5 天的订阅内 POC，而不是直接成为生产承诺。POC 通过全部门槛后，它可能比 App Service 更轻量。

### 方案 E：Azure Storage Static Website + Azure Front Door China

**只适合公开、脱敏站点。**

Storage Static Website 可以低成本托管当前导出，但静态网站端点本质上是匿名读取，即使关闭存储账户级匿名访问，也不会把它变成 Entra 保护的网站。Azure Front Door 可以提供自定义域名、HTTPS、缓存和 99.99% SLA，但它本身不解决员工身份控制。

Azure Front Door China Standard 公开基础费约为每月 ¥222.60，另加流量和请求费。旧 Azure CDN 中国服务已于 2025-12-01 退役，不应再设计新方案。

**判断：** 若将来制作完全脱敏的公开学习站，可以重新评估；当前内部版本排除。

### 方案 F：SPFx

SPFx 是 SharePoint 内运行自定义前端的官方路线，但当前项目是 Next 16 + React 19，而当前 SPFx 兼容矩阵使用 React 17.0.1，不能把现有项目直接打包进去。

预计需要重新设计入口、路由、状态、资源加载和打包，工作量约 10–18 工程人日。只有在“必须在 SharePoint 页面内保持高保真交互”成为明确需求时才值得投入。

### 明确排除为内部生产默认的平台

| 平台 | 排除理由 |
|---|---|
| GitHub Pages | 免费路径适合公开站；私有仓库并不自动让 Pages 私有，企业私有 Pages 还依赖组织和 GitHub Enterprise Cloud |
| Vercel Hobby | 官方限定个人、非商业使用；中国大陆连接也可能慢或不可用 |
| Cloudflare Pages | Pages 不在 Cloudflare China Network 内；中国网络能力需要另外的企业产品和监管路径 |
| Netlify 免费层 | 无中国大陆节点或 SLA 承诺；企业 SSO/SLA 需要企业合同 |
| SharePoint HTML 上传 | 文件可保存不等于代码可执行；违反现代 SharePoint 的脚本和治理模型 |

## 建议的分阶段发布计划

### 阶段 0：关闭治理前置项，0.5–1 人日

- 指定业务 Owner、技术 Owner 和至少两名 SharePoint Owners。
- 书面确认受众为 Philips 员工，默认不允许匿名和外部分享。
- 确认使用现有 EI AI Hub、关联子站点还是新 Communication Site。
- 核实 Philips 全球 Azure、Azure China、企业源码仓库和 Entra 管理员是否可用。
- 明确“中国大陆体验较好”还是“必须提供境内 SLA”。

### 阶段 1：做 SharePoint 内容 POC，1–2 人日

- 选择一个代表性 Lab，以草稿形式放入获批测试站点。
- 验证页面模板、图片、提示词、文档元数据、搜索、移动端和发布审批。
- 验证 Visitors、Members、Owners、外部共享和离职账号场景。
- 由内容运营人员判断原生体验是否已经足够。

### 阶段 2：并行做高保真 Azure POC，3–5 工程人日

- 生成无 GitHub base path、正式 URL、可追溯版本的静态包。
- 在全球 SWA Standard 上配置 Philips 单租户 Entra。
- 添加路由访问规则、CSP、安全响应头、日志和回滚。
- 通过 SharePoint 顶层链接访问，不先依赖 iframe。
- 在北京、上海、广州或深圳，覆盖移动、联通、电信和 Philips 企业网络测试。

### 阶段 3：按证据选生产路线

- 若 SharePoint 原生满足内容团队和用户：完成 6 个 Lab 的 5–8 人日迁移。
- 若全球 SWA 通过身份和大陆网络门槛：在 Philips 企业订阅与企业 CI 上生产化。
- 若全球 SWA 未通过且大陆 SLA 是硬要求：启动 Azure China App Service、ICP、域名、身份和采购路径。
- 同时在实际 China 订阅中验证 SWA；只有在价格、SLA、身份和域名全部关闭后才取代 App Service。

### 阶段 4：上线和运营

- 建立内容 Owner、季度复审、失效链接检查和版本发布流程。
- 配置监控、告警、审计日志和一键回滚。
- 为 SharePoint 页面和 Azure 应用保留统一导航与返回入口。
- 记录数据分类、域名、证书、管理员和续费责任。

## POC 验收门槛

### 安全与身份

- 未登录用户在服务器或平台边界被拒绝，而不是下载 HTML 后由前端隐藏。
- 仅 Philips 获批租户或安全组可访问；个人 Microsoft 账户、外部访客和无权限账号被拒绝。
- 登录、退出、令牌过期、条件访问、撤权和离职账号场景通过。
- SharePoint 深链不包含不必要的公开分享令牌；目标文档权限与站点受众一致。
- 无密钥、令牌、个人数据或未批准内部截图进入公开产物。

### 中国大陆网络

- 覆盖至少三个城市、三大运营商及 Philips 企业网络。
- 每个环境在工作日不同时间段重复测试，记录 DNS、TLS、TTFB、LCP、下载失败和登录失败。
- 建议门槛：成功率不低于 99%，p95 TTFB 不高于 1.5 秒，p75 LCP 不高于 2.5 秒。
- 如果业务要求的是正式 SLA，而不是实验测得性能，则必须采用合同中明确覆盖的 Azure China 方案。

### 功能与运营

- 六个 Lab 路由、搜索、筛选、复制、进度保存、移动端和外部链接全部通过。
- 页面首次关键资源尽量控制在 1 MiB 内，非首屏图片延迟加载。
- 内容编辑者无需修改代码即可更新说明、链接和培训资料，或有明确的代码发布 SLA。
- 具备版本标识、发布日志、回滚、监控和至少两名管理员。

## 需要 Philips 管理员确认的清单

1. EI AI Hub 是否允许承载该内容，谁是 Site Owner 和 Hub Owner？
2. 是否已有可复用的 Entra 安全组、敏感度标签、发布审批和外部共享策略？
3. Philips 全球 Azure 是否有 Static Web Apps Standard 配额和批准的 CI/CD 来源？
4. 中国员工使用全球 Philips Entra、Azure China Entra，还是两者并存？
5. Philips 是否已有世纪互联 Azure 订阅及已备案、可绑定的子域名？
6. IAM 是否允许 Azure China 应用通过自定义 OIDC 连接全球 Entra？
7. 当前截图、SharePoint 深链和外部 ChatGPT 链接的内容级别是什么？
8. 业务目标是“尽快可用”“保留高保真体验”还是“具有中国大陆合同 SLA”？

这些问题不会阻止 SharePoint 草稿 POC，但会决定正式生产平台。

## 官方依据

### SharePoint

- [现代 SharePoint 站点权限与 Communication Site 模型](https://learn.microsoft.com/en-us/sharepoint/modern-experience-sharing-permissions)
- [限制站点外部共享](https://learn.microsoft.com/en-us/sharepoint/change-external-sharing-site)
- [现代 SharePoint 的 no-script 治理考虑](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/governance-considerations)
- [SharePoint Embed Web Part 的 iframe 规则](https://support.microsoft.com/en-us/sharepoint/sites-pages/add-content-to-your-page-using-the-embed-web-part)
- [SharePoint Framework 概览](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview)
- [SPFx 兼容矩阵](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/compatibility)

### Azure Static Web Apps

- [Static Web Apps 计划：Free 与 Standard](https://learn.microsoft.com/en-us/azure/static-web-apps/plans)
- [身份验证与授权](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization)
- [自定义 Microsoft Entra 提供程序](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-custom)
- [路由、角色与响应头配置](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [Azure China 教程中的 chinaeast2 Static Web App](https://docs.azure.cn/zh-cn/azure-web-pubsub/tutorial-serverless-static-web-app)
- [Azure China Advisor 对 SWA Free、Standard 与配额的说明](https://docs.azure.cn/zh-cn/advisor/advisor-reference-reliability-recommendations)

### Azure China、App Service 与备案

- [Azure China 运营和合同边界](https://learn.microsoft.com/en-us/azure/china/overview-operations)
- [Azure China 跨境连接说明](https://learn.microsoft.com/en-us/azure/china/overview-connectivity-and-interoperability)
- [中国云身份验证端点](https://docs.azure.cn/en-us/entra/identity-platform/authentication-national-cloud)
- [App Service 身份验证方案](https://docs.azure.cn/zh-cn/app-service/scenario-secure-app-authentication-app-service)
- [App Service 自定义 OpenID Connect](https://docs.azure.cn/zh-cn/app-service/configure-authentication-provider-openid-connect)
- [App Service SLA](https://www.azure.cn/support/sla/app-service/index.html)
- [App Service 中国区价格](https://www.azure.cn/pricing/details/app-service/index.html)
- [Azure China Retail Prices API](https://learn.microsoft.com/en-us/rest/api/cost-management/retail-prices/azure-retail-prices-china)
- [Azure China ICP 备案入口](https://www.azure.cn/support/icp/)
- [ICP 常见问题](https://www.azure.cn/support/icp/icp-faq/)
- [App Service 备案与自定义域名要求](https://www.azure.cn/support/icp/WebApp/index.html)

### 公开静态托管与排除项

- [Azure Storage Static Website 的匿名访问限制](https://docs.azure.cn/en-us/storage/blobs/storage-blob-static-website)
- [Azure Front Door China 价格](https://www.azure.cn/pricing/details/frontdoor/index.html)
- [Azure Front Door China SLA](https://www.azure.cn/support/sla/frontdoor/index.html)
- [Azure CDN China 退役说明](https://docs.azure.cn/zh-cn/frontdoor/china-cdn-retirement-faq)
- [GitHub Pages 站点可见性限制](https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site)
- [Cloudflare China Network FAQ](https://developers.cloudflare.com/china-network/faq/)
- [Vercel 中国大陆访问说明](https://vercel.com/kb/guide/accessing-vercel-hosted-sites-from-mainland-china)
- [Vercel Hobby 使用限制](https://vercel.com/docs/plans/hobby)

## 最终推荐

**现在先批准一个“双 POC”：**

1. 在 EI AI Hub 或其测试子站点中原生重建一个 Lab，验证内容治理和编辑体验。
2. 在 Philips 管理的全球 Azure 中用 SWA Standard 跑同一个 Lab，验证单租户登录和中国大陆真实网络。

两项 POC 都不需要对外公开内容。比较真实用户反馈和测量数据后：

- 原生页面已够用，就用 SharePoint 完成首版；
- 高保真价值明显且全球网络通过，就用 “SharePoint 入口 + 全球 SWA”；
- 全球网络未通过且大陆 SLA 必须满足，就进入 “SharePoint 入口 + Azure China App Service + ICP”。

这是目前成本、速度、安全和未来迁移风险之间最稳妥的方案。

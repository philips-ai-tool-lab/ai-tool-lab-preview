import type { Lab } from "./types.ts";

const chatgptAgentsLink = "https://chatgpt.com/agents";
const workspaceAgentTrainingApiKey =
  "76c6df56644ba95eefb97488835324fc6a4cf44fa426e41ae64a97fac21637c8";

const extendChiefPrompt = `为我现有的 Chief of Staff Agent 添加一个名为“Decision Brief”的可复用 Skill。

当我提供会议记录、邮件线索或一个待决策问题时，按以下方式工作：
1. 用一句话说明需要决定什么；
2. 列出已验证事实，并标出来源线索；
3. 分开写出选项、主要利弊和仍待确认的信息；
4. 给出建议，但清楚说明依据和不确定性；
5. 最后输出建议负责人、下一步和目标日期；材料没有提供时标记“待确认”。

保持简洁、实用，适合管理层快速阅读。需要内部资料时使用已连接的来源；敏感决定或对外沟通必须保留人工判断。

在应用更新前，先展示建议的 Skill Instructions。然后用我提供的一个真实例子测试。`;

const workspaceAgentBuildPrompt = `创建一个名为 AI Use Case Value Agent 的 Workspace Agent。

这个 Agent 应当：
1. 根据用户输入理解业务单元、优先事项、用户、工作流和价值目标；
2. 找出最符合当前业务背景的 AI 用例；
3. 说明每个用例为什么相关、哪些资产可以复用、已知负责人是谁，以及还缺少什么信息；
4. 为选定用例生成简洁、自包含的管理层 HTML 报告。

优先使用已连接的 Philips 内部来源，而不是开放网络。明确区分有来源的事实和假设，保留人工判断，不把评估描述成法律、监管、临床、隐私、安全或信息安全审批。

先展示建议的 Agent 计划、来源连接和 Starter prompts，再告诉我按下 Create 前需要启用哪些连接。`;

const useCaseDiscoveryPrompt = `帮我找出最适合当前业务单元的 AI 用例。

先询问：
- 我的业务单元或职能；
- 最重要的业务优先事项；
- 希望改进的工作流；
- 最看重的价值结果。

然后检索已连接的 Apps，返回 5 个候选用例。每个用例包括：
- 用例名称；
- 问题和预期结果；
- 目标用户与工作流；
- 与业务优先事项的匹配；
- 预期价值；
- 相关现有资产及负责人（如已知）；
- 可能的复用方式；
- 数据、集成、监管、隐私、安全或采用方面的主要依赖；
- 建议：现在评估、稍后探索或不继续。

最后请我选择一个用例进入成熟度与价值评估，并提供来源链接或来源轨迹。`;

const maturityAssessmentPrompt = `你是一名面向 healthtech 的 AI 用例成熟度评估助手。请评估一个拟议的 AI 用例，并生成适合管理层阅读的一页 HTML 报告。

先收集或确认：用例名称、问题与目标、用户与相关方、受影响的工作流、可用数据及质量、AI 方法、集成或部署背景、监管/隐私/安全/临床因素、预期价值和成功指标。信息不完整时，只询问最关键的问题；如果使用合成数据，必须清楚标记假设。

检查是否存在相似或可复用的 Agent、模型、工具、组件或工作流，并记录资产负责人和复用对可行性的影响。

按 1–5 分评估以下 8 个维度：
1. 问题清晰度与战略匹配；
2. 用户需求与工作流匹配；
3. 数据准备度；
4. 技术可行性；
5. 集成与运营准备度；
6. 临床、安全、隐私与监管准备度；
7. 治理与风险管理；
8. 价值论证与采用准备度。

每个维度给出评分、简短依据、最大缺口和下一步。最后总结总体成熟度、最强项、最弱项、阶段分类（早期探索 / 可试点 / 可规模化）和建议（现在推进 / 有条件推进 / 先补缺口）。证据不足时标记为“暂定评估”。

最终输出必须是自包含的单页 HTML：使用干净的白色背景和 Philips 风格主蓝色，不依赖外部 CDN、脚本或字体，并能够离线打开。报告应包含管理层摘要、8 个维度、优势、风险、优先建议、假设和可复用资产。`;

export const enterpriseChatgptLabs: Lab[] = [
  {
    slug: "enterprise-chief-of-staff",
    title: "Chief of Staff",
    summary: "创建一名连接 Outlook、Teams 和 SharePoint 的个人 Chief of Staff，并将每周优先事项转化为可执行简报。",
    mode: "入门",
    tone: "violet",
    duration: "约 35 分钟",
    sourcesLabel: "Outlook · Teams · SharePoint",
    platform: "enterprise-chatgpt",
    track: "Enterprise ChatGPT · 入门",
    availability: "ready",
    outcome: "一名个人 Chief of Staff、一次来源连接检查，以及一份每周自动生成的管理层简报。",
    deliverables: ["一名已创建的 Workspace Agent", "已核对的 Microsoft 连接", "一份每周周期简报与首次任务输出"],
    buildMethod: "ChatGPT Workspace Agent Builder + 已连接的 Microsoft Apps",
    description: "将日历、邮件、Teams 和 SharePoint 中分散的工作线索整理为管理者可快速行动的简报。",
    instructions: `请为我创建一名适用于 Philips 工作场景的个人 Chief of Staff Workspace Agent。

我希望它能够：
- 帮我准备重要的管理层讨论；
- 将业务优先事项、一页纸材料、会议纪要和相关内部文件整理成简洁的管理层简报；
- 提示需要我关注的风险、取舍和待决事项；
- 为团队和相关方起草清晰的更新；
- 帮我每周跟进最重要的未结事项。

优先使用我已连接且有权限访问的 Philips 内部来源，尤其是 Outlook 邮件、Outlook 日历、Teams 和 SharePoint / OneDrive。除非我明确要求，否则不要优先使用开放网络。

对于决策、敏感主题、对外沟通，以及涉及机密或受监管信息的事项，必须保留人工判断。

请先生成 Agent 的首版草案，在创建前展示建议的计划，并说明我还需要启用哪些账号连接。`,
    prompts: [
      { title: "创建 Chief of Staff", text: "请为我创建一名适用于 Philips 工作场景的个人 Chief of Staff Workspace Agent。使用已连接的 Outlook 邮件、Outlook 日历、Teams 和 SharePoint / OneDrive 准备管理层简报、提示待决事项并起草相关方更新。在我点击创建前，先展示建议的计划和缺失的连接。敏感决定和对外沟通必须保留人工判断。" },
      { title: "生成每周简报", text: "请在每周一 07:30（使用我当前时区）生成一份每周 Chief of Staff 简报。使用 Outlook 日历、Outlook 邮件、Teams 和 SharePoint / OneDrive，总结：1）三项最重要的管理层优先事项；2）需要准备的会议；3）需要我关注的未结事项或待决事项；4）一项需要委派、推动或升级的工作。请控制在一页内、内容务实，并附上可继续核查的来源线索。" },
      { title: "准备领导评审", text: "请帮我准备一次即将举行的领导评审。先询问我是哪场会议以及最重要的优先事项；我回答后，再使用日历和相关内部背景，给出五个应问的问题、可能的分歧点、需要提前提出的风险，以及会议结束前应推动的决定。" },
    ],
    steps: [
      { title: "从 Builder 开始", text: "在 ChatGPT 中选择 Build a new agent；不要在空白对话中直接开始。粘贴构建 Prompt，让 Builder 先生成计划。", panelTitle: "CHIEF OF STAFF BUILD PROMPT", panelText: "__LAB_INSTRUCTIONS__", images: [{ src: "/guide/enterprise/chief-agent-builder-open.jpg", alt: "Build a new agent 页面", caption: "从专用 Builder 进入，而非空白聊天。" }] },
      { title: "回答简短设置问题", text: "依次确认默认输出位置、工作重点与需要的连接。信息不确定时保留人工判断点。", images: [{ src: "/guide/enterprise/chief-focused-questions.jpg", alt: "Builder 设置问题", caption: "回答设置问题后继续生成草稿。" }] },
      { title: "核对草稿与 Microsoft 连接", text: "检查草稿中是否包含 Outlook Calendar、Outlook Email、Teams 和 SharePoint / OneDrive；缺少连接时先补齐再创建。", images: [{ src: "/guide/enterprise/chief-draft-review.jpg", alt: "Chief of Staff 草稿与连接", caption: "在编辑器中核对建议的 Microsoft Apps。" }] },
      { title: "创建并打开 Agent", text: "确认计划和连接无误后创建 Agent，并用 Try in ChatGPT 打开首次任务。", images: [{ src: "/guide/enterprise/chief-ready.jpg", alt: "已创建的 Chief of Staff", caption: "草稿完成后即可打开 Agent 使用。" }] },
      { title: "安排每周 Chief of Staff brief", text: "复制每周简报提示词，并确认使用当前 ChatGPT 用户配置的时区。Agent 可能会先要求批准创建日程。", panelTitle: "每周简报提示词", panelText: `请在每周一 07:30（使用我当前时区）生成一份每周 Chief of Staff 简报。

使用我的 Outlook 日历、Outlook 邮件、Teams 和 SharePoint / OneDrive，总结：
1. 本周最重要的三项管理层优先事项；
2. 需要我准备的会议；
3. 需要我关注的未结事项或待决事项；
4. 一项需要我委派、推动或升级的工作。

请控制在一页内，内容务实而非泛泛而谈，并附上我需要深入查看时可追溯的来源线索。`, images: [{ src: "/guide/enterprise/chief-schedule-approval.jpg", alt: "批准创建日程", caption: "确认批准后，才会创建周期任务。" }, { src: "/guide/enterprise/chief-schedule-success.jpg", alt: "每周简报已排程", caption: "成功后检查时区、频率和来源范围。" }] },
      { title: "运行一个真实任务", text: "上传一份已允许使用的优先事项材料，或选择一场领导评审；检查简报是否区分事实、假设、风险和下一步。" },
    ],
    checklist: ["已在 Builder 中审阅计划", "Microsoft Apps 已按需连接", "敏感决定保留人工判断", "每周简报已确认时区与频率", "已完成一次真实任务测试"],
    partOne: { badge: "BUILD", title: "创建个人 Chief of Staff", description: "先建立 Agent，再检查其连接和输出边界。" },
    partTwo: { badge: "SCHEDULE", title: "让重要事项按周浮现", description: "用一个可复核的周期简报减少遗漏的开放事项。" },
    showPromptLibrary: false,
    reflection: { title: "它是否帮你更快采取行动？", text: "好的 Chief of Staff 不只是汇总信息，而是明确优先级、未决事项、风险和下一步。", checks: ["来源与假设可区分", "输出不替代关键判断", "每周简报能直接指导行动"] },
  },
  {
    slug: "enterprise-workflow-automation",
    title: "Workflow Agent",
    summary: "把一个重复工作流沉淀为可测试的 Codex Skill，并进一步创建可复查的自动化任务包。",
    mode: "入门",
    tone: "violet",
    duration: "约 45 分钟",
    sourcesLabel: "Codex · Skill · Automation",
    platform: "enterprise-chatgpt",
    track: "Enterprise ChatGPT · 入门",
    availability: "ready",
    outcome: "一个经过首轮测试的可复用 Skill，以及一个可按固定节奏运行的 Workflow Agent。",
    deliverables: ["一个明确边界的 Codex Skill", "一次真实输入的测试结果", "一份自动化工作流包"],
    buildMethod: "Codex App + Skill + Automations",
    description: "从业务策略材料中选取一个高频工作流，先做成可复用 Skill，再将其变为可核查的自动化流程。",
    instructions: `我已上传 Philips AI 战略材料。

我所在的业务单元、职能或区域是：[请填写]。

请基于相关一页纸材料和已上传文档，帮我选择一个适合由可复用 Codex Skill 提供实际价值的日常工作流。每次只问我一到两个问题。`,
    prompts: [
      { title: "选择重复工作流", text: "我已上传 Philips AI 战略材料。我所在的业务单元、职能或区域是：[请填写]。请基于相关一页纸材料和已上传文档，帮我选择一个适合由可复用 Codex Skill 提供实际价值的日常工作流。每次只问我一到两个问题。" },
      { title: "创建 Launch Intelligence Skill", text: "请创建一个名为“Launch Intelligence”的 Skill。审阅上市追踪表、上市日历、产品计划和报告文件。该 Skill 应能分析上市排期、识别上市风险和准备度缺口，并生成上市准备度仪表盘和时间线。请返回：上市状态摘要、上市风险、准备度可视化、建议行动，以及人工复核点。" },
      { title: "创建自动化", text: "请创建一个名为“[你的工作流 Agent 名称]”的自动化。每隔 [周期] 审阅 [范围] 的最新 [来源系统和文档]，运行 $[你的 Skill 名称] 及相关辅助 Skill。将状态摘要、风险与准备度缺口、相关方行动、人工复核点和一个呈现最重要发现及其影响的可视化内容合并为一份审阅包。请立即试运行一次，以便我在保存前检查输出。" },
    ],
    steps: [
      { title: "打开 Codex", text: "在桌面应用中开始新任务，确认使用的是批准的工作账号与环境。", images: [{ src: "/guide/enterprise/codex-open-app.png", alt: "打开 Codex 应用", caption: "从 Codex 桌面应用启动工作流。" }] },
      { title: "上传材料并定义范围", text: "点击 +，选择 Add photos & files，上传已经批准用于练习的策略材料或一页业务说明。说明业务单元、工作流和期望价值。", panelTitle: "WORKFLOW DISCOVERY PROMPT", panelText: "__LAB_INSTRUCTIONS__", images: [{ src: "/guide/enterprise/codex-add-files-menu.png", alt: "Codex 添加文件菜单", caption: "上传受允许使用的材料后再开始分析。" }] },
      { title: "选择一个可重复的工作流", text: "优先选择输入、输出和人工复核点都清晰的高频任务；一次只聚焦一个工作流。" },
      { title: "连接必要插件", text: "仅连接任务真正需要的插件或来源；先搜索并核对用途与权限范围。", images: [{ src: "/guide/enterprise/codex-plugins-search.svg", alt: "搜索 Codex 插件", caption: "按需连接，不为“完整”而添加无关来源。" }] },
      { title: "创建第一个可复用 Skill", text: "使用 Launch Intelligence 提示词或模板创建 Skill，明确输入、输出、假设和必须由人复核的部分。", panelTitle: "Skill 创建提示词", panelText: `请创建一个名为“[你的 Skill 名称]”的 Skill。

审阅：[你的来源]

该 Skill 需要：
- [步骤 1]
- [步骤 2]
- [步骤 3]

请返回：
- [输出 1]
- [输出 2]
- [输出 3]
- 假设、缺失信息和人工复核点。` },
      { title: "测试并迭代", text: "通过 $ 调用 Skill，加入真实但可使用的测试输入；只修改一个最重要的规则后，用同一输入复测并比较变化。", images: [{ src: "/guide/enterprise/codex-test-skill-launch-intelligence.png", alt: "测试 Launch Intelligence Skill", caption: "使用真实范围的输入验证第一个输出。" }, { src: "/guide/enterprise/codex-refine-skill-map-output.png", alt: "迭代 Skill 输出", caption: "明确要改的来源、规则或输出形式后再测试。" }] },
      { title: "创建并运行自动化", text: "在 Automations 中选择通过聊天创建，明确节奏、范围、要调用的 Skill、保存位置与人工复核点；先运行一次检查输出。", panelTitle: "自动化创建提示词", panelText: "请创建一个名为“[你的工作流 Agent 名称]”的自动化。每隔 [周期] 审阅 [范围] 的最新已批准来源，运行所需 Skill，并将状态、风险、行动、人工复核点和一个可视化内容合并成审阅包。请立即试运行一次，以便我检查输出。" , images: [{ src: "/guide/enterprise/codex-automations-create-via-chat.svg", alt: "通过聊天创建 Codex 自动化", caption: "先用一次试运行验证自动化包。" }] },
    ],
    checklist: ["已上传且可使用的材料", "选定一个可重复工作流", "Skill 定义了人工复核点", "已完成一次真实输入测试", "自动化已试运行并审阅输出"],
    partOne: { badge: "SKILL", title: "先把工作流做成可复用能力", description: "技能边界越清楚，自动化越容易被复核和维护。" },
    partTwo: { badge: "AUTOMATE", title: "让验证过的 Skill 定期工作", description: "自动化先试运行，再决定是否纳入真实节奏。" },
    showPromptLibrary: false,
    reflection: { title: "这个流程是否值得自动化？", text: "只有当输入稳定、输出有用、人工复核点清晰时，才应把 Skill 放入周期自动化。", checks: ["Skill 能复现关键输出", "风险与缺口会被明确标出", "试运行结果可供人审阅"] },
  },
  {
    slug: "enterprise-extend-chief-of-staff",
    title: "Extend your Chief of Staff",
    summary: "打开已有 Chief of Staff，为它增加一个可复用 Skill，并用当前真实工作验证效果。",
    mode: "进阶",
    tone: "violet",
    duration: "约 25 分钟",
    sourcesLabel: "Existing Agent + Skill",
    platform: "enterprise-chatgpt",
    track: "Enterprise ChatGPT · 进阶",
    availability: "ready",
    outcome: "一个已添加到现有 Chief of Staff、可重复调用的 Decision Brief Skill",
    deliverables: ["一份 Skill Instructions", "一个真实场景测试结果", "一次基于结果的改进"],
    buildMethod: "在现有 Workspace Agent 中添加 Skill",
    description: "延续已有 Chief of Staff，不新建 Agent；选择一个真实摩擦点，添加一个小而清晰的能力。",
    instructions: extendChiefPrompt,
    prompts: [
      { title: "Decision Brief", text: extendChiefPrompt },
      { title: "Meeting Prep Skill", text: "为我现有的 Chief of Staff 添加 Meeting Prep Skill：根据会议主题、参会者和已连接资料，生成目标、背景、三个关键问题、需要作出的决定和会后行动模板。先展示 Skill Instructions，再用我提供的一场会议测试。" },
      { title: "Weekly Review Skill", text: "为我现有的 Chief of Staff 添加 Weekly Review Skill：总结本周已完成、未完成、风险、等待和下周前三项优先事项；事实保留来源，缺失负责人或日期标记待确认。先展示 Skill Instructions，再应用更新。" },
    ],
    steps: [
      { title: "打开已有 Chief of Staff", text: "在 ChatGPT 的 Agents 列表中打开你已经创建的 Chief of Staff。这个 Lab 不新建 Agent。", links: [{ title: "ChatGPT Agents", label: "查找已有 Agent", href: chatgptAgentsLink }] },
      { title: "选择一个摩擦点", text: "选择 Decision Brief、Meeting Prep 或 Weekly Review 中的一项。一次只增加一个 Skill，便于判断改动是否有效。" },
      { title: "复制 Skill 构建 Prompt", text: "默认使用 Decision Brief。粘贴后先审阅建议的 Skill Instructions，再允许 Agent 应用更新。", panelTitle: "ADD DECISION BRIEF SKILL", panelText: "__LAB_INSTRUCTIONS__" },
      { title: "核对来源与人工判断", text: "确认新 Skill 会使用已连接的内部来源、显示来源轨迹，并在敏感决定或沟通前让你确认。" },
      { title: "用一个真实案例测试", text: "提供当前会议、领导优先事项或待决策问题。检查输出是否简洁、是否暴露信息缺口、是否给出明确下一步。" },
      { title: "只改一个问题后重测", text: "根据测试结果修改一个最影响质量的规则，再用同一案例运行，比较前后差异。" },
    ],
    checklist: ["使用的是现有 Chief of Staff", "只添加了一个明确 Skill", "应用前已审阅 Instructions", "已完成一个真实案例测试", "输出保留来源和人工判断点"],
    partOne: { badge: "ADVANCED 1", title: "扩展现有 Chief of Staff", description: "增加一个能减少本周实际摩擦的可复用 Skill。" },
    partTwo: { badge: "TEST", title: "用同一案例比较前后差异", description: "记录一次有证据的质量改进，而不是只确认 Skill 已创建。" },
    showPromptLibrary: false,
    reflection: { title: "这个 Skill 是否值得长期保留？", text: "如果它不能稳定改进一个高频任务，就应该继续收窄范围，而不是添加更多规则。", checks: ["调用场景一眼能看懂", "输出比原 Agent 更聚焦", "改进可以在同一测试中复现"] },
  },
  {
    slug: "enterprise-workspace-agent",
    title: "Workspace Agent · AI Use Case Value Agent",
    summary: "连接内部业务背景与 AI Asset Inventory，筛选相关用例，并输出一份管理层可用的成熟度评估 HTML 报告。",
    mode: "进阶",
    tone: "violet",
    duration: "约 50 分钟",
    sourcesLabel: "4 internal sources + HTML",
    platform: "enterprise-chatgpt",
    track: "Enterprise ChatGPT · 进阶",
    availability: "ready",
    outcome: "一个能够发现、复用并评估 AI 用例的 Workspace Agent",
    deliverables: ["5 个有来源的候选用例", "现有可复用资产与负责人", "一份自包含的管理层 HTML 报告"],
    buildMethod: "ChatGPT Workspace Agent + Apps + AI Asset Inventory MCP",
    description: "用一个 Agent 连接四类内部来源，先发现与复用，再对一个选定用例做成熟度和价值评估。",
    instructions: workspaceAgentBuildPrompt,
    prompts: [
      { title: "用例发现", text: useCaseDiscoveryPrompt },
      { title: "成熟度与价值评估", text: maturityAssessmentPrompt },
      { title: "来源连接自检", text: "列出当前 Agent 能够访问的 SharePoint、Outlook、Teams 和 AI Asset Inventory MCP 连接。对每一项说明可以检索什么、刚刚成功验证了什么，以及哪些内容目前无法访问。不要猜测连接状态。" },
    ],
    steps: [
      { title: "打开 Workspace Agent Builder", text: "在 ChatGPT 中进入 Agents 并选择 Create agent。这是一个用于发现和评估 AI 用例的新 Agent，不是前一个 Chief of Staff。", links: [{ title: "ChatGPT Agents", label: "打开 Agent Builder", href: chatgptAgentsLink }] },
      { title: "用一段 Prompt 创建 Agent", text: "粘贴下方 Prompt，让 Builder 先展示 Agent 计划、来源连接和 Starter prompts。确认同时包含“发现”与“评估”，而不只是通用搜索。", panelTitle: "WORKSPACE AGENT BUILD PROMPT", panelText: "__LAB_INSTRUCTIONS__" },
      { title: "连接内部 Philips 来源", text: "在 ChatGPT 左侧 Apps 中连接 SharePoint、Outlook Email、Outlook Calendar 和 Teams；再连接 AI Asset Inventory MCP。配置 MCP 时，复制下方 API Key。", panelTitle: "API KEY｜点击复制", panelText: workspaceAgentTrainingApiKey },
      { title: "为业务单元寻找候选用例", text: "创建 Agent 后运行下方发现 Prompt。回答业务单元、优先事项、工作流和价值问题，再从有来源的候选中选一个用例。", panelTitle: "USE CASE DISCOVERY PROMPT", panelText: useCaseDiscoveryPrompt },
      { title: "确认选定用例的上下文", text: "沿用候选用例的来源证据与可复用资产，只补充用户、工作流、数据、部署、风险、价值和成功指标中的关键缺口。" },
      { title: "运行成熟度与价值评估", text: "粘贴完整评估说明。Agent 应评估 8 个维度，指出最大缺口，并在证据不足时明确标记为暂定评估。", panelTitle: "MATURITY ASSESSMENT INSTRUCTIONS", panelText: maturityAssessmentPrompt },
      { title: "打开并审阅 HTML 报告", text: "下载或打开生成的 HTML，确认离线可用；每个评分都应有依据、缺口和下一步，未支持的结论需要在分享前修正。" },
      { title: "检查管理层报告", text: "确认报告包含摘要、8 个评分维度、优势、风险、建议、假设和可复用资产，且能够在一页决策视图中快速浏览。" },
    ],
    checklist: ["AI Use Case Value Agent 已创建", "四类内部来源已连接", "API Key 可一键复制", "候选用例带来源轨迹", "已确认可复用资产与负责人", "8 个成熟度维度均有依据", "HTML 报告离线可打开"],
    partOne: { badge: "ADVANCED 2", title: "建立并连接 Workspace Agent", description: "一个 Agent、四类内部来源、一份管理层报告。" },
    partTwo: { badge: "ASSESS", title: "发现、复用并评估一个 AI 用例", description: "先找内部供给，再对最值得推进的机会进行成熟度与价值判断。" },
    showPromptLibrary: false,
    reflection: { title: "报告是否足以支持下一步决定？", text: "重点不是生成更多想法，而是把一个机会与现有资产、证据、缺口和行动责任连接起来。", checks: ["来源事实与假设分开", "复用机会有资产或负责人线索", "建议没有被描述成正式审批"] },
  },
];

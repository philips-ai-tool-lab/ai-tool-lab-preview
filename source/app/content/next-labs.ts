import type { Lab } from "./types.ts";

const m365CopilotLink = "https://m365.cloud.microsoft/";
const notebooksHelpLink = "https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-with-microsoft-365-copilot-notebooks";
const notebookReferencesHelpLink = "https://support.microsoft.com/en-us/microsoft-365-copilot/add-references-to-your-microsoft-365-copilot-notebook";
const notebookInstructionsHelpLink = "https://support.microsoft.com/en-us/microsoft-365-copilot/provide-custom-instructions-for-your-microsoft-365-copilot-notebook";
const notebookSharingHelpLink = "https://support.microsoft.com/en-us/microsoft-365-copilot/share-a-microsoft-365-copilot-notebook";
const libraryHelpLink = "https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-with-microsoft-365-copilot-library";

const notebookInstructions = `仅使用本笔记本中已添加的参考资料。

用简洁中文回答。每个事实都注明源文件名，并明确标记为“已确认”“冲突”或“缺失”。

不得补全缺失信息；资料中找不到时，明确回答“资料中未找到”。如果不同来源存在冲突，列出各自的值和来源，不要替用户决定哪个值正确。`;

const bannerPrompt = `为虚构活动“绿色办公周”制作一张简洁的 16:9 内部宣传横幅。

横幅文字：“绿色办公周｜9 月 14–18 日｜请自带可重复使用的杯子”。

使用简洁的树叶和几何图形，配色为白色、深青色和暖黄色。不要出现人物、标志或公司名称。`;

export const nextLabs: Lab[] = [
  {
    slug: "copilot-notebook-project-brief",
    title: "Copilot Notebooks: Project Brief",
    summary: "把三份虚构项目资料放入 Copilot 笔记本，识别冲突与缺失，并生成每条事实都可回查的一页简报。",
    mode: "试用课程",
    tone: "blue",
    duration: "约 35 分钟",
    sourcesLabel: "3 份虚构训练文件",
    platform: "m365-copilot",
    track: "Copilot 笔记本",
    availability: "pilot",
    outcome: "一份只基于指定资料、能够区分事实、冲突和缺失的项目简报",
    deliverables: ["一页会前简报", "日期与指标冲突表", "120 字经理更新", "3 条人工抽查记录"],
    buildMethod: "新建笔记本、添加参考资料并设置使用说明",
    description: "使用完全虚构的“绿色办公周”资料，练习项目分析、来源核验与简短汇报。",
    instructions: notebookInstructions,
    prompts: [
      {
        title: "生成一页会前简报",
        text: "生成一页会前简报，包含目标、成功指标、进度、已决事项、风险、行动项（负责角色和截止日期）以及待决策事项。每一项注明源文件。",
      },
      {
        title: "定位冲突",
        text: "逐项比较所有日期、预算和成功指标，用表格列出数据点、值、来源、是否冲突；不要替我解决冲突。",
      },
      {
        title: "边界测试",
        text: "餐饮供应商名称和已签合同金额是多少？",
      },
      {
        title: "经理更新",
        text: "仅使用已确认事实，起草 120 字以内的经理更新；最后单列“需要人工确认”。",
      },
    ],
    steps: [
      {
        title: "下载并检查虚构训练资料",
        text: "下载三份标有“虚构培训资料”的 TXT 文件。不要替换成真实患者、客户、员工、合同、价格、未发布产品或凭据信息。",
        links: [
          { title: "项目简报", label: "项目目标、指标与预算", href: "/training-data/green-office-week/GreenOfficeWeek_Brief.txt" },
          { title: "会议记录", label: "已决事项、角色与待办", href: "/training-data/green-office-week/GreenOfficeWeek_MeetingNotes.txt" },
          { title: "时间线", label: "里程碑、角色、日期与状态", href: "/training-data/green-office-week/GreenOfficeWeek_Timeline.txt" },
        ],
        callout: "如果当前环境不能添加 TXT 文件，请把三份内容分别粘贴到 Word 文档，保存到 OneDrive 后再添加。",
      },
      {
        title: "新建专用笔记本",
        text: "打开 Microsoft 365 Copilot → 笔记本，新建“练习－绿色办公周”。如果看不到入口，请确认当前工作或学校账号是否已开通相关功能。",
        links: [
          { title: "Microsoft 365 Copilot", label: "打开 Copilot", href: m365CopilotLink },
          { title: "Copilot 笔记本官方说明", label: "入口、许可与基础步骤", href: notebooksHelpLink },
        ],
      },
      {
        title: "只加入这三份参考资料",
        text: "把训练文件添加到笔记本，逐项确认文件名已经出现。这个练习不需要邮箱、Teams、整个 OneDrive 或互联网内容。",
        links: [{ title: "添加参考资料", label: "Microsoft 官方说明", href: notebookReferencesHelpLink }],
      },
      {
        title: "设置笔记本说明",
        text: "复制下面规则，约束语言、来源和冲突处理方式。",
        panelTitle: "笔记本说明",
        panelText: "__LAB_INSTRUCTIONS__",
        links: [{ title: "设置自定义说明", label: "Microsoft 官方说明", href: notebookInstructionsHelpLink }],
      },
      {
        title: "生成简报并核对来源",
        text: "运行“生成一页会前简报”。确认每一项都标有源文件，并随机打开至少两处来源进行比对。",
        callout: "AI 输出仍可能不准确。引用存在不等于结论正确，必须抽样回查原文件。",
      },
      {
        title: "找出日期冲突",
        text: "运行“定位冲突”。合格结果必须发现项目简报中的 08-28 与时间线中的 08-31，并把两者并列展示，而不是擅自选择一个日期。",
      },
      {
        title: "做一次拒答测试",
        text: "运行“边界测试”。资料没有供应商名称或合同金额，合格结果应明确说“资料中未找到”，不得编造。",
      },
      {
        title: "形成经理更新并人工验收",
        text: "运行“经理更新”，随后任意抽查 3 个事实并记录“正确 / 不正确 / 无法确认”。如需分享，先阅读权限说明；当前被邀请成员均可编辑笔记本。",
        links: [{ title: "分享笔记本", label: "权限与文件访问说明", href: notebookSharingHelpLink }],
      },
    ],
    checklist: [
      "只加入三份虚构训练资料",
      "笔记本说明已设置",
      "识别 08-28 与 08-31 的日期冲突",
      "没有虚构供应商或合同金额",
      "抽查的 3 个事实均可回到源文件",
      "经理更新单列了需要人工确认的事项",
    ],
    partOne: { badge: "第一部分", title: "建立并验证资料笔记本", description: "从添加资料到冲突识别，完整走一遍可追溯分析流程。" },
    partTwo: { badge: "第二部分", title: "运行四个测试提示词", description: "依次测试生成、比较、拒答和精简表达。" },
    showPromptLibrary: false,
    reflection: {
      title: "完成前复盘",
      text: "笔记本的作用是限定资料范围、保留冲突、回查来源，并把未找到的信息留给人确认。",
      checks: ["资料范围清楚且最小化", "事实、冲突与缺失被分开", "结果已经人工抽查"],
    },
  },
  {
    slug: "copilot-library-reuse",
    title: "Copilot Library: Content Reuse",
    summary: "创建一个虚构活动横幅和协作清单，再从 Copilot 内容库的图片与页面中准确找回。",
    mode: "试用课程",
    tone: "green",
    duration: "约 25–30 分钟",
    sourcesLabel: "图片与页面",
    platform: "m365-copilot",
    track: "Copilot 内容库",
    availability: "pilot",
    outcome: "完成一次内容创建、检查、查找和下载练习",
    deliverables: ["1 张虚构活动横幅", "1 份活动协作清单", "内容查找记录", "3 个边界判断"],
    buildMethod: "Copilot 创建工具、页面和内容库",
    description: "了解 Copilot 内容库用于集中查看生成的图片和页面，而不是存放所有普通文件。",
    instructions: bannerPrompt,
    prompts: [
      { title: "生成虚构活动横幅", text: bannerPrompt },
      {
        title: "创建活动协作清单",
        text: "创建一个标题为“绿色办公周－活动协作清单”的页面。列出五项任务，每项包括负责角色、截止日期和复核勾选框。注明这是虚构的培训内容。",
      },
      {
        title: "复盘判断题",
        text: "根据当前 Copilot 内容库界面回答：它是否收纳普通 Word 或 PDF 文件？是否会额外复制一份内容？图片可以下载成什么格式？回答后列出你在界面中看到的依据。",
      },
    ],
    steps: [
      {
        title: "确认入口与训练边界",
        text: "打开 Copilot 内容库，记录当前可见的图片与页面。只创建虚构内容；不要使用 Philips 标志、真实品牌素材、真实人物或敏感业务资料。",
        links: [
          { title: "Microsoft 365 Copilot", label: "打开 Copilot", href: m365CopilotLink },
          { title: "Copilot 内容库官方说明", label: "入口与当前能力", href: libraryHelpLink },
        ],
        callout: "该功能正在逐步开放；入口名称和位置可能因账号和更新时间不同。",
      },
      {
        title: "创建虚构活动横幅",
        text: "在创建工具中选择“横幅”，复制下方提示词生成 16:9 图片。检查拼写和构图，确认没有标志、公司名称和人物。",
        panelTitle: "横幅提示词",
        panelText: "__LAB_INSTRUCTIONS__",
      },
      {
        title: "从图片列表找回并下载",
        text: "返回内容库 → 图片 → 横幅，按创建时间找到刚才的图片。打开后尝试编辑或复制，最后下载为 JPEG。本练习不删除内容。",
      },
      {
        title: "把对话结果转成页面",
        text: "在 Copilot 对话中运行“创建活动协作清单”，点击回答下方的编辑入口，在页面中确认标题和五项任务。",
      },
      {
        title: "按标题找回页面",
        text: "返回内容库 → 页面，搜索“绿色办公周－活动协作清单”，确认它按最后修改时间出现。结对练习时也可在“与我共享”中查找同伴分享的页面。",
      },
      {
        title: "说明内容库的范围",
        text: "完成判断题：内容库当前集中显示页面与图片，不是 Word 或 PDF 文件库；它不会新增一份独立存储；图片可下载为 JPEG。以当前账号实际界面为准。",
      },
    ],
    checklist: [
      "横幅只使用虚构内容且不含标志",
      "已从图片列表找回并下载 JPEG",
      "已创建并按标题找回页面",
      "能够说明内容库与普通文件库的区别",
      "没有执行删除操作",
      "所有生成内容都经过人工检查",
    ],
    partOne: { badge: "第一部分", title: "创建、找回并检查内容", description: "用同一个虚构活动完成图片与页面两项练习。" },
    partTwo: { badge: "第二部分", title: "复制提示词并复盘范围", description: "保留可复用提示词，并确认内容库当前不提供哪些功能。" },
    showPromptLibrary: false,
    reflection: {
      title: "完成前复盘",
      text: "Copilot 内容库帮助找回刚才创建的内容，但不能替代 SharePoint 或 OneDrive。生成内容在使用前仍需人工检查。",
      checks: ["能够从内容库找回成果", "知道图片与页面的范围", "使用前完成内容检查"],
    },
  },
];

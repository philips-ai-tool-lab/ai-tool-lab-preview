import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const root = "C:/petproject/.codex-build/tool_lab_update_20260903";
const inputPptx = path.join(root, "template-starter.pptx");
const outputPptx = path.join(root, "Philips_Young_Bootcamp_AI培训_最终版.pptx");
const renderDir = path.join(root, "render");
const layoutDir = path.join(root, "layout");
const labRoot = "https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/";
const agentPath = `${labRoot}#agent-builder-path`;
const m365 = "https://m365.cloud.microsoft/";

const assets = {
  lab2: "C:/petproject/philips-agent-builder-lab/public/guide/lab2-product-manual-new-ui.png",
  lab3: "C:/petproject/philips-agent-builder-lab/public/guide/lab3-add-knowledge-full-ui.png",
  lab3Picker: "C:/petproject/philips-agent-builder-lab/public/guide/lab3-add-knowledge-picker-ui.png",
  lab4: "C:/petproject/philips-agent-builder-lab/public/guide/lab4-funnel-attachments-new-ui.png",
  previewShare: "C:/petproject/philips-agent-builder-lab/public/guide/preview-create-share.png",
  meetingOutput: "C:/petproject/philips-agent-builder-lab/public/guide/meeting-output.png",
};

async function saveBlob(filePath, blob) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, new Uint8Array(await blob.arrayBuffer()));
}

async function readBytes(filePath) {
  return new Uint8Array(await fs.readFile(filePath));
}

function shapeByExact(slide, oldText) {
  const matches = slide.shapes.items.filter((shape) => String(shape.text ?? "") === oldText);
  if (matches.length !== 1) throw new Error(`Expected one exact match on slide ${slide.index + 1}: ${oldText}; found ${matches.length}`);
  return matches[0];
}

function shapeByPrefix(slide, prefix) {
  const matches = slide.shapes.items.filter((shape) => String(shape.text ?? "").startsWith(prefix));
  if (matches.length !== 1) throw new Error(`Expected one prefix match on slide ${slide.index + 1}: ${prefix}; found ${matches.length}`);
  return matches[0];
}

function rewriteExact(slide, oldText, newText) {
  const shape = shapeByExact(slide, oldText);
  shape.text.replace(oldText, newText);
  return shape;
}

function rewritePrefix(slide, prefix, newText) {
  const shape = shapeByPrefix(slide, prefix);
  const oldText = String(shape.text ?? "");
  shape.text.replace(oldText, newText);
  return shape;
}

function setLink(shape, label, uri) {
  shape.text.get(label).link = { uri, isExternal: true };
}

function setNotes(slide, lines) {
  slide.speakerNotes.textFrame.setText(`[Sources]\n${lines.map((x) => `- ${x}`).join("\n")}`);
}

async function replaceOnlyImage(slide, filePath, alt, fit = "contain") {
  if (slide.images.items.length !== 1) throw new Error(`Expected one image on slide ${slide.index + 1}; found ${slide.images.items.length}`);
  const image = slide.images.items[0];
  const frame = image.frame;
  const geometry = image.geometry;
  const borderRadius = image.borderRadius;
  const rotation = image.rotation;
  const flipHorizontal = image.flipHorizontal;
  const flipVertical = image.flipVertical;
  const lockAspectRatio = image.lockAspectRatio;
  image.replace({ blob: await readBytes(filePath), contentType: "image/png", alt, fit });
  image.frame = frame;
  image.crop = { left: 0, top: 0, right: 0, bottom: 0 };
  image.fit = fit;
  image.geometry = geometry;
  image.borderRadius = borderRadius;
  image.rotation = rotation;
  image.flipHorizontal = flipHorizontal;
  image.flipVertical = flipVertical;
  image.lockAspectRatio = lockAspectRatio;
}

const presentation = await PresentationFile.importPptx(await FileBlob.load(inputPptx));

// Slide 45 — section promise.
{
  const slide = presentation.slides.items[44];
  rewriteExact(slide, "业务案例与最佳实践：Agent Builder Lab", "业务案例与最佳实践：AI Tool Lab × Agent Builder");
  rewritePrefix(slide, "AI Tool Lab 提供多个 Agent 构建实验。", "AI Tool Lab 目前包含两条工具路线和 10 个 Lab。本课程第五部分聚焦 Microsoft 365 Copilot 路线中的前四个 Agent Builder Lab，并以第 3 个“会议跟进助手”作为讲师示范。");
  const m365Button = shapeByExact(slide, "M365 Copilot  ↗");
  setLink(m365Button, "M365 Copilot  ↗", m365);
  setNotes(slide, [labRoot, agentPath, m365]);
}

// Slide 46 — full-site map and class scope.
{
  const slide = presentation.slides.items[45];
  rewriteExact(slide, "AI Tool Lab：四个业务场景，共用一套构建方法", "AI Tool Lab：两条路线、十个 Lab，本课程聚焦前四个");
  rewritePrefix(slide, "网站提供四个 Agent Lab", "网站当前包含 6 个 Microsoft 365 Copilot Lab 和 4 个 Enterprise ChatGPT Lab。第五部分只展开站内 Lab 01–04，其余六个可在课后继续探索。");
  rewritePrefix(slide, "首先从四个场景中选择一个", "首先看清全站结构：Microsoft 365 Copilot 路线有 6 个 Lab，Enterprise ChatGPT 路线有 4 个 Lab，合计 10 个入口。\n\n本课程聚焦前四个 Agent Builder 场景：Chief of Staff、Product Manual FAQ、Meeting Follow-up Assistant 和 Funnel Data Analyst。\n\n课堂上由 PPT 解释关键画面，网站提供最新步骤和材料，真正的配置、预览、创建与分享在 Microsoft 365 Copilot 中完成。");
  setNotes(slide, [labRoot, agentPath]);
}

// Slide 47 — clarify that these are the first four M365 labs.
{
  const slide = presentation.slides.items[46];
  rewriteExact(slide, "动手范围：前四个 Agent Lab", "课堂动手范围：站内 Lab 01–04");
  rewritePrefix(slide, "这四个 Lab 分别练习", "这四个 Lab 是网站 Microsoft 365 Copilot 路线中的前四个 Agent Builder 场景，分别练习事务协调、产品资料问答、会议跟进和销售数据分析。讲师演示 Lab 03，实践时可任选一个，并以所选页面的当前检查清单为准。");
}

// Slide 48 — current Chief of Staff configuration and screenshot discrepancy.
{
  const slide = presentation.slides.items[47];
  rewritePrefix(slide, "主提示让 Agent 查看当天日历", "这个 Agent 读取本人真实的 Microsoft 365 日历、会议、邮件和任务，整理优先级、冲突和后续准备。当前网页配置的三个快捷入口是今日日程、紧急事项和明日提醒；预览图中的 Top priorities 可作为扩展入口。");
  rewritePrefix(slide, "首先明确输入范围", "首先确认数据边界：这个场景使用本人的日历、会议、邮件和任务，不需要额外添加外部知识源，也不能虚构不存在的工作事项。\n\n接着让 Agent 区分今天必须处理、可以推迟和需要协调的事项，并为重要会议准备谈话要点。\n\n最后分别测试今日日程、紧急事项和明日提醒；如果资料不足，结果必须明确说明缺少什么，而不是自行补齐。");
}

// Slide 49 — Product Manual FAQ now centers on access, source controls and two-way tests.
{
  const slide = presentation.slides.items[48];
  rewriteExact(slide, "Lab 02｜Product Manual FAQ：回答必须来自产品资料", "Lab 02｜产品手册问答：验证权限、引用与拒答");
  rewritePrefix(slide, "这个示例根据已提供的 MR 5300", "这个 Lab 不只检查答案是否正确，还要确认 SharePoint 权限、知识源连接和拒答机制。成功标准是：资料内问题带可打开引用，资料外问题明确拒答。");
  await replaceOnlyImage(slide, assets.lab2, "新版 Agent Builder 中 Product Manual FAQ 的 Knowledge 与 Work content 设置");
  rewritePrefix(slide, "首先明确任务边界", "首先验证权限：创建者和计划分享的测试用户都要能打开 Product Manual 文件夹中的真实手册；能够打开 Agent，不等于能够读取底层资料。\n\n接着在 Add knowledge 中添加 Product Manual，开启 Cloud files 并确认出现 AI Adoption；Web search、Outlook、Teams 和无关连接器保持关闭。\n\n最后做双向测试：资料内问题必须返回可打开引用，资料外的 Example-X 必须拒答。分享时还要授予文件夹读取权限，并用接收者账号复测。");
  setNotes(slide, [`${labRoot}labs/product-manual-faq/`, "Current site screenshot: lab2-product-manual-new-ui.png"]);
}

// Slide 50 — Meeting Follow-up current knowledge setup.
{
  const slide = presentation.slides.items[49];
  rewriteExact(slide, "Lab 03｜Meeting Follow-up Assistant：用模板整理会议结果", "Lab 03｜会议跟进：开启 Outlook、Teams 并添加模板");
  rewritePrefix(slide, "画面右侧要求 Agent", "当前页面要求先在 Work content 中开启 Outlook 和 Teams，再通过 Add knowledge 或 Message Agent Builder 添加 Mail Template CN 或 EN。模板只选与输出语言一致的一份。");
  await replaceOnlyImage(slide, assets.lab3, "新版 Agent Builder 的 Add knowledge 完整文件选择界面");
  rewritePrefix(slide, "首先提供原始会议内容", "首先打开 Outlook 和 Teams，让 Agent 能处理会议与沟通上下文；然后添加与输出语言一致的一份 Mail Template，中文选择 CN，英文选择 EN。\n\n接着完整复制任务指令和会议内容，明确阅读对象、输出栏目和“不新增承诺、缺失项标记待确认”等规则。\n\n最后确认结果把讨论、决定和行动项分开，负责人和时间缺失时继续标记“待确认”，而不是自行补充。");
  setNotes(slide, [`${labRoot}labs/meeting-follow-up/`, "Current site screenshot: lab3-add-knowledge-full-ui.png"]);
}

// Slide 51 — Funnel setup and validation expanded.
{
  const slide = presentation.slides.items[50];
  rewriteExact(slide, "Lab 04｜Funnel Data Analyst：先说清筛选条件，再解释销售图表", "Lab 04｜销售漏斗分析：准备附件、能力与测试");
  rewritePrefix(slide, "这是一个销售机会数据分析示例。", "这个 Lab 先用自然语言生成草稿，再添加 Funnel Sample Data.xlsx 和 Chart Sample.pptx，并开启创建文档和创建图片能力。必做测试包括分类汇总和金额达成率，PPT 图表更新为选做挑战。");
  await replaceOnlyImage(slide, assets.lab4, "新版 Agent Builder Attachments 中的 Funnel Excel 与 PPT 文件");
  rewritePrefix(slide, "首先理解类别", "首先核对数据源和口径：分析只使用 Funnel Sample Data.xlsx；范围不完整时先追问 Zone、Local BU、日期和 Hospital Type，金额统一使用 Total Price in USD。\n\n接着确认 Attachments 中出现 Excel 与 PPT，并开启创建文档和创建图片两个 Capabilities，再运行分类汇总和 Achievement rate 两个测试。\n\n最后可选更新 Chart Sample.pptx。结果必须保留原模板和现有图表对象，只替换数据并另存新文件。");
  setNotes(slide, [`${labRoot}labs/funnel-data-analyst/`, "Current site screenshot: lab4-funnel-attachments-new-ui.png"]);
}

// Slide 52 — eight steps shown in six visual groups.
{
  const slide = presentation.slides.items[51];
  rewriteExact(slide, "构建一个 Agent 的六步通用方法", "构建 Agent 的八步流程，可以归纳成六组动作");
  rewritePrefix(slide, "四个 Lab 都沿用同一条路径", "网站把通用路线更新为八步：进入 Builder、新建 Agent、选择方式、填写字段、添加并验证知识源、设置能力、添加提示，最后测试、创建和分享。下图将相邻步骤合并为六组，便于记忆。");
  const numberShapes = slide.shapes.items
    .filter((shape) => /^[1-6]$/.test(String(shape.text ?? "")))
    .sort((a, b) => (a.position?.left ?? a.frame?.left ?? 0) - (b.position?.left ?? b.frame?.left ?? 0));
  if (numberShapes.length !== 6) throw new Error(`Expected six numbered nodes on slide 52; found ${numberShapes.length}`);
  ["1–2", "3", "4", "5", "6", "7–8"].forEach((value, index) => {
    const current = String(numberShapes[index].text ?? "");
    numberShapes[index].text.replace(current, value);
  });
  rewriteExact(slide, "进入 Agents\n并新建", "进入 Builder\n并新建");
  rewriteExact(slide, "添加参考\n资料", "添加并验证\n知识源");
  rewriteExact(slide, "设置常用\n快捷问题", "设置所需\n能力");
  rewriteExact(slide, "试运行并\n创建", "添加提示、测试\n创建并分享");
  rewritePrefix(slide, "因此，构建不是填完设置就结束", "因此，构建不止是把字段填完：定义任务以后，还要验证知识源是否真的可用、只开启必要能力，并通过试运行确认结果可靠。创建完成后再按需要分享，同时检查接收者是否拥有底层资料权限。");
  setNotes(slide, [agentPath]);
}

// Slides 53–55 — renumber to current sequence.
{
  const slide = presentation.slides.items[52];
  rewriteExact(slide, "步骤 1｜进入 Agents 并新建 Agent", "步骤 1–2｜进入 Agent Builder 并新建 Agent");
  rewritePrefix(slide, "截图展示 Agent Store", "先从 Microsoft 365 Copilot 左侧进入 Agents，再点击 Create agent。网站把“进入 Agent Builder”和“新建 Agent”分为两个步骤，本页合并展示入口与动作。");
  const btn = shapeByExact(slide, "打开 M365 Copilot  ↗");
  setLink(btn, "打开 M365 Copilot  ↗", m365);
  setNotes(slide, [agentPath, m365]);
}
{
  const slide = presentation.slides.items[53];
  rewriteExact(slide, "步骤 2｜选择构建方式", "　步骤 3｜选择构建方式");
  rewritePrefix(slide, "进入页面后，可以在输入框描述需求", "进入页面后，可以让 Builder 根据自然语言生成草稿，也可以点击 Skip 手动配置，或从 Plan my day 等模板开始。\n\n不同 Lab 可以选择不同方式：Chief of Staff、Product Manual FAQ 和 Meeting Follow-up 适合手动配置；Funnel Data Analyst 则先用自然语言生成草稿。无论选择哪种方式，下一步都要检查名称、用途、工作规则和资料边界。");
}
{
  const slide = presentation.slides.items[54];
  rewriteExact(slide, "步骤 3｜填写名称、用途与工作规则", "步骤 4｜填写核心字段与工作规则");
  rewritePrefix(slide, "填写时先用图标和名称", "填写时先用图标和名称帮助用户识别 Agent，再用 Description 一句话说明用途。\n\n接着通过 Instructions 写清输入范围、处理步骤、输出结构、来源限制，以及信息不足时怎样回应。防杜撰和来源边界不能删减；如果网页给出了完整文本，应整段复制后再根据自己的场景调整。");
}

// Slide 56 — combine current steps 5 and 6.
{
  const slide = presentation.slides.items[55];
  rewriteExact(slide, "步骤 4｜添加参考资料", "　步骤 5–6｜验证知识源，并设置所需能力");
  rewritePrefix(slide, "截图中的资料入口覆盖", "知识源名称出现在页面上并不代表已经连接成功。添加最少必要的资料后，还要用一条能够命中的问题和一条没有答案的问题，验证检索、引用和拒答行为。");
  rewritePrefix(slide, "添加资料时，先在上方输入网址", "首先按场景添加最少必要的知识源：Product Manual FAQ 只开启 Cloud files；Meeting Follow-up 开启 Outlook 和 Teams，并添加一份邮件模板。\n\n接着验证知识源：用资料内问题检查可打开引用，再用资料外问题检查 Agent 是否拒答。\n\n最后根据任务开启 Capabilities，例如 Funnel Lab 需要创建文档和创建图片；与任务无关的来源和能力保持关闭。");
  setNotes(slide, [agentPath, `${labRoot}labs/product-manual-faq/`, `${labRoot}labs/meeting-follow-up/`, `${labRoot}labs/funnel-data-analyst/`]);
}

// Slide 57 — replace the old search interface.
{
  const slide = presentation.slides.items[56];
  rewriteExact(slide, "补充步骤｜查找会议模板", "步骤 5 补充｜用新版 Add knowledge 查找会议模板");
  rewritePrefix(slide, "搜索结果同时显示文件名", "在 Configure 页面点击 Add knowledge，可以按 Files、Sites、Chats 或 Meetings 筛选，也可以通过左侧 Message Agent Builder 要求添加 Mail Template。");
  await replaceOnlyImage(slide, assets.lab3Picker, "新版 Add knowledge 文件搜索与筛选界面");
  rewritePrefix(slide, "搜索时先输入 Mail Template", "首先搜索 Mail Template，并核对文件名和保存位置。中文输出选择 Mail Template CN，英文输出选择 EN，只添加与当前语言一致的一份。\n\n添加后不要只看名称是否出现，还要提交完整测试提示词，确认 Agent 实际调用模板，并把负责人、日期或承诺等缺失信息标记为“待确认”。");
  setNotes(slide, [`${labRoot}labs/meeting-follow-up/`, "Current site screenshot: lab3-add-knowledge-picker-ui.png"]);
}

// Slide 58 — Starter prompts are now step 7.
{
  const slide = presentation.slides.items[57];
  rewriteExact(slide, "步骤 5｜设置常用快捷问题", "　步骤 7｜添加 Starter prompts");
  rewritePrefix(slide, "每条快捷问题包括", "每条 Starter prompt 包括一个简短标题（Title）和一段可以直接执行的任务（Message）。它不是关键词，而是用户点击后会完整发送的工作请求。");
  rewritePrefix(slide, "首先用 Title", "首先用 Title 简要说明任务，例如“行动项”或“检索与引用自检”。\n\n接着在 Message 中写清输入范围、预期结果和必要限制，例如负责人、截止日期、来源要求和缺失信息处理方式。\n\n最后只保留最常用的 2–3 个入口；新增时点击 Add a suggested prompt，并逐条试运行。");
}

// Slide 59 — current final step includes sharing and permission checks.
{
  const slide = presentation.slides.items[58];
  rewriteExact(slide, "步骤 6｜试运行、调整并创建", "步骤 8｜测试、创建并按需要分享");
  rewritePrefix(slide, "右侧 Preview 用于试运行 Agent", "先在 Preview 中测试，再返回 Configure 调整；确认稳定后点击 Create。创建成功以后才进入 Share，并根据培训要求选择仅自己、特定用户或组织范围。");
  await replaceOnlyImage(slide, assets.previewShare, "Agent Builder 的 Preview、Create 和 Share 操作区域");
  rewritePrefix(slide, "先用一份信息完整的材料试一次", "首先用资料完整的场景测试输出结构，再用缺少负责人、日期或来源的场景测试拒答与缺口提示。\n\n如果结果不稳定，返回 Configure 修改 Instructions、知识源、能力或 Starter prompts；Draft auto-saved 只表示草稿保存，不表示已经创建。\n\n点击 Create 后再决定分享范围。分享 Agent 不会自动授予全部底层资料权限，接收者仍要能读取相应的 SharePoint 或 OneDrive 内容。");
  const btn = shapeByExact(slide, "打开 M365 Copilot  ↗");
  setLink(btn, "打开 M365 Copilot  ↗", m365);
  setNotes(slide, [agentPath, m365, "Current site screenshot: preview-create-share.png"]);
}

// Slide 60 — show the actual meeting follow-up output, not another setup screen.
{
  const slide = presentation.slides.items[59];
  await replaceOnlyImage(slide, assets.meetingOutput, "Meeting Follow-up Assistant 按邮件模板生成的会议跟进结果");
  setNotes(slide, [`${labRoot}labs/meeting-follow-up/`, "Current site screenshot: meeting-output.png"]);
}

// Slide 61 — scenario-specific completion criteria.
{
  const slide = presentation.slides.items[60];
  rewritePrefix(slide, "从前四个 Lab 中选择一个", "从站内 Lab 01–04 中选择一个，按该页面的当前步骤和检查清单完成。不同场景的知识源、能力和测试方式不同。");
  const body = shapeByPrefix(slide, "首先从四个 Lab 中选择一个场景");
  body.text.replace("首先从四个 Lab 中选择一个场景，并完成名称、用途、工作规则、参考资料和 2–3 个常用快捷问题。", "首先完成可运行版本：Chief of Staff 使用本人 M365 数据；Product Manual FAQ 验证权限、引用与拒答；Meeting Follow-up 开启 Outlook、Teams 并加入一份模板；Funnel Lab 检查附件、能力和数据口径。");
  body.text.replace("接着先用信息完整的材料运行一次，再删除一个重要信息，观察 Agent 是否依据资料回答、是否明确指出缺少什么，并避免自行补充。", "接着按照该 Lab 的检查清单，运行一条正常任务，再运行一条资料缺失、来源不可用或范围不完整的任务。");
  body.text.replace("最终目标不是一次生成结果，而是确认这个 Agent 在信息完整和不完整两种情况下都表现可靠。", "最后检查 Agent 是否引用正确来源、指出信息缺口，并且没有自行补充事实；满足这些条件后再创建和分享。");
  rewriteExact(slide, "先完成可运行版本，再用两种信息条件验证它是否可靠。", "先按场景完成正确配置，再用正常与异常条件验证它是否可靠。");
  const btn = shapeByExact(slide, "M365 Copilot  ↗");
  setLink(btn, "M365 Copilot  ↗", m365);
  setNotes(slide, [`${labRoot}labs/chief-of-staff/`, `${labRoot}labs/product-manual-faq/`, `${labRoot}labs/meeting-follow-up/`, `${labRoot}labs/funnel-data-analyst/`, m365]);
}

const inspection = await presentation.inspect({
  kind: "slide,textbox,shape,image,notes,layout",
  maxChars: 400000,
});
await fs.writeFile(path.join(root, "inspect.ndjson"), inspection.ndjson, "utf8");

for (let i = 0; i < presentation.slides.items.length; i += 1) {
  const slide = presentation.slides.items[i];
  const stem = `slide-${String(i + 1).padStart(2, "0")}`;
  await saveBlob(path.join(renderDir, `${stem}.png`), await presentation.export({ slide, format: "png", scale: 1 }));
  const layout = await slide.export({ format: "layout" });
  await fs.mkdir(layoutDir, { recursive: true });
  await fs.writeFile(path.join(layoutDir, `${stem}.layout.json`), await layout.text(), "utf8");
}

const montage = await presentation.export({ format: "webp", montage: true, scale: 1 });
await saveBlob(path.join(root, "montage.webp"), montage);

const pptx = await PresentationFile.exportPptx(presentation);
await pptx.save(outputPptx);
console.log(JSON.stringify({ outputPptx, slideCount: presentation.slides.items.length }));

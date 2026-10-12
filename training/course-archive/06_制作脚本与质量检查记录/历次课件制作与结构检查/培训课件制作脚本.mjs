import fs from "node:fs/promises";
import path from "node:path";
import { Presentation, PresentationFile } from "file:///C:/Users/320326546/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/@oai/artifact-tool/dist/artifact_tool.mjs";

const ROOT = "C:/petproject";
const OUT = process.env.PPT_OUT || path.join(ROOT, "培训课件中文归档_20260826", "01_最终交付", "Philips_Young_Bootcamp_AI培训_文案优化版.pptx");
const RENDER = path.join(ROOT, ".ppt_work", "rendered");
const MAT = path.join(ROOT, "Bootcamp_AI培训资料汇总_20260820");
const IMG = {
  strategy: path.join(MAT,"04_Philips业务案例与AI大使","02_集团可持续发展AI战略一页纸预览.png"),
  gateway1: path.join(MAT,"01_用户提供的网页截图","01_AI_Gateway首页与访问说明.png"),
  gateway2: path.join(MAT,"01_用户提供的网页截图","02_AI_Gateway常见用途与使用规范.png"),
  chatgptFlow: path.join(ROOT,"培训课件中文归档_20260826","03_原始资料","Enterprise_ChatGPT申请流程_高清预览.png"),
  chatgptGuide: path.join(ROOT,".ppt_work","chatgpt_user_one_pager_inspect","rendered","slide-03.png"),
  copilot: path.join(MAT,"01_用户提供的网页截图","04_Microsoft365_Copilot首页.png"),
  navigatorHome: path.join(MAT,"01_用户提供的网页截图","05_AI_Skills_Navigator_ForYou首页.png"),
  navigatorPlaylists: path.join(MAT,"01_用户提供的网页截图","06_AI_Skills_Navigator_Skilling_Playlists.png"),
  navigatorPlayer: path.join(MAT,"01_用户提供的网页截图","07_AI_Skills_Navigator_课程播放器_MS4004导航.png"),
  labCover: path.join(MAT,"03_Agent_Builder动手实验","02_Agent_Builder实验封面.png"),
  step1: path.join(MAT,"03_Agent_Builder动手实验","03_进入Agents并新建Agent.png"),
  step2: path.join(MAT,"03_Agent_Builder动手实验","04_选择Agent构建方式.png"),
  step3: path.join(MAT,"03_Agent_Builder动手实验","05_填写名称描述和行为规则.png"),
  step4: path.join(MAT,"03_Agent_Builder动手实验","06_添加知识来源.png"),
  mail: path.join(MAT,"03_Agent_Builder动手实验","07_查找邮件模板.png"),
  step5: path.join(MAT,"03_Agent_Builder动手实验","08_设置常用快捷问题.png"),
  step6: path.join(MAT,"03_Agent_Builder动手实验","09_预览测试并创建Agent.png"),
  meeting: path.join(MAT,"03_Agent_Builder动手实验","10_会议跟进助手输出示例.png"),
  ambassador: path.join(MAT,"04_Philips业务案例与AI大使","03_GCR_AI大使名单.png"),
  chief: path.join(ROOT,"work","桌面布局检查_20260818","ai-tool-lab-preview","guide","chief-preview.png"),
  product: path.join(ROOT,"work","桌面布局检查_20260818","ai-tool-lab-preview","guide","product-answer.png"),
  funnel: path.join(ROOT,"work","桌面布局检查_20260818","ai-tool-lab-preview","guide","funnel-chart.png"),
};
const URL = {
  gateway:"https://www.aigateway.ai.inside.philips.com/",
  networkService:"https://philips.service-now.com/itportal?id=sc_cat_item&table=sc_cat_item&sys_id=1ca637e9c3213950b95c74c4e401318d&searchTerm=china%20internet%20premium",
  softwarePortal:"https://philips.service-now.com/softwareportal",
  chatgptGuide:"https://philips.service-now.com/itportal?id=kb_article&sysparm_article=KB1528249&sys_id=24240f5bfb794b54ae1afb576eefdc0f&spa=1",
  navigator:"https://aiskillsnavigator.microsoft.com/",
  ms4004:"https://aiskillsnavigator.microsoft.com/playlists/291ff1ba-c754-44f1-9814-ef8917f8c989",
  learn:"https://learn.microsoft.com/zh-cn/training/courses/ms-4004",
  copilot:"https://m365.cloud.microsoft/chat",
  lab:"https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/",
  builder:"https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/#agent-builder-path",
  lab1:"https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/labs/chief-of-staff/",
  lab2:"https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/labs/product-manual-faq/",
  lab3:"https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/labs/meeting-follow-up/",
  lab4:"https://philips-ai-tool-lab.github.io/ai-tool-lab-preview/labs/funnel-data-analyst/",
};

const C={blue:"#0066CC",deep:"#003B78",navy:"#0B1F3A",sky:"#EAF4FF",pale:"#F6FAFE",line:"#C9DDF2",muted:"#51677D",green:"#11966F",white:"#FFFFFF",orange:"#E8742B"};
const FONT="Microsoft YaHei";
const IMAGE_CAPTION={
  "Philips sustainability AI strategy one-pager":"图中列出了 Group Sustainability 的重点 AI 项目、当前进展、下一阶段计划以及对应负责人。业务场景、组织能力、数据基础和治理机制共同支撑项目落地。",
  "AI Gateway homepage and access guidance":"请先观察页面上方的访问状态与申请入口。AI Gateway 的作用是让员工从受治理的企业入口开始，并在需要时获得开通、使用预期和 onboarding 支持。",
  "AI Gateway common uses and responsible AI guidance":"左侧列出常见工作用途，右侧则强调企业使用规范。两部分必须一起理解：能够提高效率，并不代表可以忽略数据边界、审批流程和人工复核。",
  "Microsoft 365 Copilot home page":"进入页面后，先确认自己处于工作账户环境，再准备培训资料并组织提示词。真正提交之前，应再次检查附件中是否包含不适合上传的敏感内容。",
  "AI Tool Lab cover":"AI Tool Lab 把不同业务任务拆成独立实验。PPT 用来说明关键动作，网站提供完整步骤与材料，实际创建和测试则在 Microsoft 365 Copilot 中完成。",
  "Chief of Staff lab preview":"这个例子展示 Agent 如何通过稳定的角色设定和 Suggested Prompts，引导用户处理日程、优先级和沟通准备等重复任务。",
  "Product manual FAQ example answer":"这个示例的重点不是答案有多长，而是回答是否基于知识资料、是否清楚标明边界，以及资料不足时是否能够坦诚说明无法确认。",
  "Meeting follow-up assistant output":"这是讲师演示的第 3 个 Lab。观察它如何把原始会议内容重新组织成摘要、决策、行动项与跟进沟通，并保留仍需确认的问题。",
  "Funnel data analyst chart":"漏斗分析 Agent 不只是生成图表，还要说明数据口径、区分事实与推断，并把转化变化翻译成业务人员能够理解和继续追问的结论。",
  "步骤 1｜进入 Agents 并新建 Agent":"这一步只解决入口问题。先确认工作账户和企业环境，再找到 Agents 与新建按钮；如果界面文字略有变化，应根据功能含义定位，而不是机械寻找完全相同的标签。",
  "步骤 2｜选择构建方式":"对话式构建适合快速形成初稿，配置式构建更便于逐项检查。无论选择哪一种，最后都需要核对名称、描述、行为规则与知识来源。",
  "步骤 3｜填写名称、描述与行为规则":"名称用于识别用途，描述用于说明价值，Instructions 决定 Agent 如何完成任务。这里写得越具体，后续输出通常越稳定，也越容易测试。",
  "步骤 4｜添加知识来源":"知识来源让 Agent 能够参考企业资料，但添加文件并不等于回答一定正确。需要限制资料范围，并通过预览确认 Agent 是否真正使用了合适的内容。",
  "补充步骤｜查找会议模板":"搜索时要核对文件名称、来源位置和适用范围。找到模板以后还要在预览中测试，确认摘要结构和邮件格式确实来自正确资料。",
  "步骤 5｜设置 Suggested Prompts":"Suggested Prompts 应写成可以直接点击执行的真实任务，让第一次使用的人不需要重新猜测 Agent 能做什么，也能提高团队使用方式的一致性。",
  "步骤 6｜预览、测试并创建":"创建前至少测试正常任务、信息缺失和边界问题三类情况。发现问题时应回到配置修改，而不是通过反复追问临时修补一次结果。",
  "讲师示范结果｜会议跟进助手":"最后检查结果是否真正可用：决策与行动项是否分开、负责人和截止日期是否明确、未确认事项是否保留，以及邮件是否能够直接编辑后使用。",
  "Philips GCR AI Ambassador list":"这张名单用于帮助大家找到身边可以交流的人。AI Ambassador 的价值在于分享实践经验、连接学习资源，并帮助有潜力的业务问题进入更广泛的交流与探索。"
};
const READ_ALOUD={
1:"欢迎大家参加今天的 AI Bootcamp。接下来的学习会从企业入口开始，先认识我们可以在什么环境中使用 AI，再用 Microsoft 365 Copilot 完成一个通用工作案例，最后把重复流程构建成可复用的 Agent。大家不需要记住所有按钮，更重要的是掌握一套能够迁移到自己岗位的方法。",
2:"今天学习 AI 的目标，不是让大家立即成为技术专家，而是建立正确的工作方式。我们先学会清楚描述背景、任务、输出和限制，再学习如何核对事实与来源。当一个任务反复出现时，还可以把资料、规则和常用提问固化为 Agent，但最终的判断和交付责任仍然属于我们自己。",
3:"今天的课程按照一条逐步深入的路径展开。前面的介绍和 AI Gateway 导航用于建立共同语言，中间的 Copilot 案例帮助大家练习真实任务，后面的 Agent Lab 会占用最多时间，因为只有亲手配置、测试和修改，才能真正理解 Agent 是怎样工作的。",
4:"这一部分我们先认识 Philips 的 AI 使用入口。需要特别说明的是，AI Gateway 主要承担企业 ChatGPT 的访问、治理和支持功能，它并不是一个包含所有 AI 工具和课程的应用商店。理解这一点以后，我们就知道应该在页面上寻找什么信息。",
5:"这份可持续发展 AI 战略一页纸帮助我们从更高层次理解 AI 落地。一个有价值的 AI 项目不能只依靠模型或工具，还需要明确的业务问题、可用的数据、组织能力和治理机制。课堂上不需要逐字阅读，而是用它说明为什么后面的学习既包含工具，也包含责任边界和业务实践。",
6:"AI Gateway 可以从三个角度理解。第一，它提供企业版 ChatGPT 的访问与开通路径；第二，它传达治理要求和负责任使用原则；第三，它为平台运营提供必要的使用可见性。因此，本次探索任务应该聚焦入口、支持和规范，而不是在这里寻找完整的学习课程或全部 Copilot 功能。",
7:"在首页上，我们先确认 Enterprise ChatGPT for Philips 的访问状态。如果尚未开通，可以通过页面提供的 assistant 了解申请流程和 onboarding 支持。这个入口的意义在于，员工从受治理的企业环境开始使用，而不是自行选择不清楚数据边界的工具。",
8:"这一页把能力和责任放在同一个画面中。起草文档、总结会议、研究信息和自动化流程，都是常见用途；与此同时，我们仍然需要遵守企业数据处理要求，谨慎使用敏感信息，并对生成结果进行人工复核。效率提升必须建立在合规和判断之上。",
9:"接下来进入日常工作中的 Copilot 实操。我们会先认识微软官方的 AI Skills Navigator，再介绍其中的 MS-4004 学习路径。随后把课程中的跨岗位方法提炼成一个通用案例，练习阅读多份资料、识别冲突并生成可以继续推动工作的输出。",
10:"AI Skills Navigator 是微软官方的 AI 学习导航网站。大家可以按角色、产品或学习目标寻找资源，它不仅包含 Copilot 用例，也覆盖 AI 基础、负责任使用和技术能力进阶。今天介绍它，是希望大家在 Bootcamp 结束以后仍然有一个可靠的持续学习入口。",
11:"除了 MS-4004，这个网站还有很多不同深度的学习内容。刚开始可以学习生成式 AI 的基本能力和风险，再根据岗位选择业务场景，之后还可以继续探索 Microsoft 365 Copilot、Azure AI 或 Power Platform。学习路线不必一次完成，可以围绕当前工作问题逐步深入。",
12:"MS-4004 是其中一条面向 Microsoft 365 Copilot 使用场景的官方学习路径。它按照典型岗位组织案例，帮助学习者理解 Copilot 如何进入真实工作流程。今天不会逐个模块复述，而是从中提炼一个所有岗位都能使用的工作模式。",
13:"课程覆盖管理者、销售、市场、财务、IT、人力资源、运营、企业沟通、客户服务和法务等岗位。岗位名称虽然不同，但共同任务非常接近：快速理解上下文、从多个来源提取关键信息、发现风险与冲突，并把分析转化为清晰的下一步沟通。",
14:"我们可以把这些岗位案例归纳为四个动作。先读懂资料，再把信息整理成结构；然后比较不同来源，找出冲突、缺失和假设；最后把结果写成简报、邮件或其他可直接用于协作的内容。Copilot 的价值不是替代判断，而是加快这四个动作。",
15:"通用案例叫做快速接手一个新项目。假设我们刚加入绿色办公周项目，需要在很短时间内读懂项目简介、会议纪要和时间表，并向负责人说明项目现状。案例资料全部是虚构培训数据，因此可以放心用于课堂练习。",
16:"第一份资料是项目简介，它提供项目目的、成功指标、预算、范围和关键日期。我们应该先从这里建立整体认识，同时注意哪些内容已经确定，哪些内容仍然只是工作假设。项目简介中写明报名在八月二十八日开放，这个日期稍后需要与其他来源比较。",
17:"第二份资料是规划会议纪要。它把信息分成已确认决策、行动项和开放问题，并补充了负责人角色和截止日期。阅读时不要把开放问题写成已经确定的事实，例如供应商和合同金额目前都还不能确认。",
18:"第三份资料是里程碑时间表。它写明报名在八月三十一日开放，与项目简介中的八月二十八日不一致。正确做法不是让 Copilot自行挑选一个日期，而是同时保留两个来源，把冲突标记为待确认并请求负责人决定。",
19:"一个实用提示词通常包含四部分。背景说明我们为什么做这件事，任务说明需要完成哪些分析，输出规定结果的形式，约束则告诉 Copilot 哪些判断不能擅自完成。约束尤其重要，因为它能够减少补造事实，并提醒模型保留冲突和不确定性。",
20:"进入 Microsoft 365 Copilot 后，先确认工作账户环境，再准备三份培训资料。我们会把文件作为本次回答的事实来源，并使用刚才的四段式提示词。真正工作中还要在提交前检查附件，避免上传不适合在当前环境中处理的敏感信息。",
21:"现场演示按照五个步骤完成。添加资料后先限定事实来源，再输入结构化提示词；得到结果后检查目标、指标、决策、行动项和开放问题是否完整。最关键的检查点，是确认 Copilot 是否识别了两个报名日期，并保留了两个来源。",
22:"现在请完成一次短练习。可以继续使用绿色办公周资料，也可以选择一个不包含敏感信息的日常任务。练习的重点不是得到漂亮答案，而是写出清楚的约束，并要求 Copilot 主动标记不确定项、冲突或需要人工核对的事实。",
23:"接下来进入课程中时间最长的 Agent Lab。AI Tool Lab 教大家构建不同类型的 Agent，讲师会用第三个会议跟进助手进行演示，但学员实际动手的范围是前四个 Lab，可以根据兴趣选择，也可以由讲师按小组分配。",
24:"AI Tool Lab 网站提供完整实验路径。每个 Lab 都包含业务场景、练习材料和操作步骤，PPT 只保留课堂上需要同步讲解的关键动作。后续请同时打开网站和 Microsoft 365 Copilot，一边阅读步骤，一边在自己的环境中完成操作。",
25:"前四个 Lab 分别是 Chief of Staff、Product Manual FAQ、Meeting Follow-up Assistant 和 Funnel Data Analyst。它们对应事务协调、知识问答、会议跟进和数据分析四类任务。讲师演示第三个案例，但大家可以选择其中任何一个完成实践。",
26:"Chief of Staff 适合练习角色和工作方式的设定。它需要理解用户的目标和上下文，帮助整理优先级并提出沟通建议。构建时要特别关注 Instructions 是否清楚说明服务对象、判断原则和输出风格。",
27:"Product Manual FAQ 适合练习知识来源和回答边界。Agent 应尽量基于提供的产品资料回答，并在资料不足时明确说明无法确认。评价这个 Agent 时，不要只看答案是否流畅，更要看它是否忠于资料。",
28:"Meeting Follow-up Assistant 是本次讲师演示案例。它把会议输入转化为摘要、决策、行动项和跟进邮件，能够清楚展示角色、Instructions、知识模板和 Suggested Prompts 怎样组合成一个可重复使用的工作流程。",
29:"Funnel Data Analyst 适合练习分析任务和业务解释。它需要围绕漏斗数据识别趋势和转化变化，同时说明数据口径，区分直接观察与推断。好的结果不仅包含图表，还应该帮助业务人员理解问题并继续追问。",
30:"虽然四个 Lab 的业务内容不同，但构建方法可以归纳为六步。先进入 Agents 并选择构建方式，然后定义名称、描述和行为规则；需要时添加知识来源，再设置常用快捷问题；最后通过预览测试正常场景和边界情况，确认稳定后再创建。",
31:"第一步是进入 Microsoft 365 Copilot 的 Agents 区域并新建 Agent。界面名称可能随着产品更新略有差异，因此要根据功能含义寻找 Agents、New agent 或 Create agent。此时先确认账号和环境，不要急着填写内容。",
32:"第二步是选择构建方式。对话式构建可以帮助我们快速起草，配置式构建则能够逐项查看和修改字段。课堂上更推荐配置方式，因为它便于理解名称、描述、Instructions 和知识来源分别产生什么影响。",
33:"第三步是填写名称、描述与行为规则。名称帮助用户识别用途，描述说明这个 Agent 能带来什么价值，Instructions 则规定输入、处理步骤、输出格式和事实边界。这里写得越清楚，后面的测试越容易发现具体问题。",
34:"第四步是添加知识来源。知识来源可以是会议模板、产品手册或业务规则，但资料并不是越多越好。应该选择最少但足够的内容，避免过期和互相矛盾，并规定资料未覆盖时要说明缺口。",
35:"会议跟进助手需要查找合适的会议或邮件模板。搜索时应核对文件名、来源位置和适用范围，避免选择名称相似但内容不合适的资料。找到文件后还要通过预览测试，确认 Agent 确实按照模板组织结果。",
36:"Suggested Prompts 是使用者进入 Agent 的快捷入口。好的快捷问题应该写成可以直接执行的真实任务，例如根据会议记录生成行动项，或者起草跟进邮件。它既能展示 Agent 的能力，也能降低第一次使用时的提问门槛。",
37:"创建之前需要进行预览和测试。至少准备一个正常任务、一个资料缺失场景和一个边界问题，观察 Agent 是否承认不知道、是否遵守规则，以及输出格式是否稳定。发现问题以后应返回配置修改，而不是只修补一次回答。",
38:"这是会议跟进助手的演示结果。检查时重点看四件事：决策与行动项是否区分，负责人和截止日期是否清楚，未确认事项是否被保留，以及生成的邮件是否能够直接编辑使用。结果流畅并不够，必须真正支持后续行动。",
39:"现在请完成一个 Agent Lab。可以从前四个 Lab 中任选一个，目标是完成一个可以测试的最小 Agent。完成后至少运行正常场景和边界场景，检查任务、资料边界和输出结构是否清楚，讲师会在现场巡回支持。",
40:"课程最后介绍 Philips GCR AI Ambassador。大家在学习或实践中遇到问题时，可以与身边的 AI Ambassador 交流资源和经验，也可以把有潜力的业务问题带入更广泛的社区讨论。今天的课程到这里结束，希望大家带走的是一套能够持续练习和复用的方法。"
};
const pres=Presentation.create({slideSize:{width:1280,height:720}});
let page=0;

async function bytes(p){const b=await fs.readFile(p);return b.buffer.slice(b.byteOffset,b.byteOffset+b.byteLength)}
function addShape(slide,geometry,pos,fill="none",lineFill="none",radius){return slide.shapes.add({geometry,position:pos,fill,line:{style:"solid",fill:lineFill,width:lineFill==="none"?0:1},...(radius?{borderRadius:radius}:{})});}
function textBox(slide,text,pos,size=22,color=C.navy,bold=false,align="left",opts={}){
  const s=addShape(slide,"textbox",pos,"none","none");
  s.text=text;
  s.text.style={fontSize:size,color,bold,alignment:align,verticalAlignment:opts.vAlign||"top",typeface:FONT,autoFit:"shrinkText",insets:{left:0,right:0,top:0,bottom:0}};
  return s;
}
function para(slide,items,pos,size=20){
  const s=addShape(slide,"textbox",pos,"none","none");
  s.text=items.map(x=>`${x.lead||""}${x.text||""}`).join("\n\n");
  s.text.style={fontSize:size,typeface:FONT,autoFit:"shrinkText",insets:{left:0,right:0,top:0,bottom:0},color:C.navy};
  return s;
}
function chrome(slide,section,title,subtitle){
  if(section==="03 日常工作中的 Copilot 实操") section="04 日常工作中的 Copilot 实操";
  if(section==="04 Copilot Builder 动手 Lab") section="05 Agent Builder 动手 Lab";
  if(section==="03 Philips GCR AI Ambassador") section="03 GCR AI Ambassador";
  slide.background.fill=C.white;
  addShape(slide,"rect",{left:0,top:0,width:1280,height:12},C.blue,C.blue);
  const sectionBox=textBox(slide,section,{left:72,top:30,width:530,height:30},15,C.blue,true);
  sectionBox.text.autoFit="none";
  const titleBox=textBox(slide,title,{left:72,top:67,width:1136,height:54},34,C.navy,true);
  titleBox.text.autoFit="none";
  if(subtitle) textBox(slide,subtitle,{left:72,top:124,width:1136,height:50},16,C.muted,false);
  textBox(slide,String(page).padStart(2,"0"),{left:1160,top:676,width:48,height:18},13,C.muted,false,"right");
  addShape(slide,"rect",{left:72,top:665,width:1136,height:1},C.line,C.line);
}
function addLink(slide,label,url,left=72,top=616,width=230){
  const b=addShape(slide,"roundRect",{left,top,width,height:36},C.sky,C.blue,"rounded-xl");
  b.text=label+"  ↗";
  b.text.style={fontSize:14,typeface:FONT,bold:true,color:C.deep,alignment:"center",verticalAlignment:"middle",autoFit:"shrinkText",wrap:"none",insets:{left:8,right:8,top:0,bottom:0}};
  const linkedText=b.text.get(label+"  ↗");
  linkedText.link={uri:url,isExternal:true};
  linkedText.fill=C.deep;
  linkedText.bold=true;
  return b;
}
function note(slide,talk,sources=[]){slide.speakerNotes.textFrame.setText(`[Sources]\n${sources.map(s=>`- ${s}`).join("\n")}`);}
async function screenshot(slide,imgPath,pos,alt){
  const im=slide.images.add({blob:await bytes(imgPath),contentType:"image/png",alt,fit:"contain",position:pos,geometry:"roundRect",borderRadius:"rounded-xl"});
  addShape(slide,"roundRect",{left:pos.left-2,top:pos.top-2,width:pos.width+4,height:pos.height+4},"none",C.line,"rounded-xl");
  return im;
}
async function screenshotAnalysis(slide,imgPath,alt,items,{left=72,top=185,width=702,height=390,panelLeft=800,panelTop=185,panelWidth=408,panelHeight=390,panelTitle="关键内容"}={}){
  await screenshot(slide,imgPath,{left,top,width,height},alt);
  addShape(slide,"roundRect",{left:panelLeft,top:panelTop,width:panelWidth,height:panelHeight},C.pale,C.line,"rounded-xl");
  textBox(slide,panelTitle,{left:panelLeft+24,top:panelTop+22,width:panelWidth-48,height:30},22,C.deep,true);
  para(slide,items,{left:panelLeft+24,top:panelTop+66,width:panelWidth-48,height:panelHeight-88},16);
}
const SLIDE_LIMIT=Number(process.env.SLIDE_LIMIT||0);
function newSlide(){if(SLIDE_LIMIT&&page>=SLIDE_LIMIT)throw new Error("__SLIDE_LIMIT__");page++;return pres.slides.add()}
function card(slide,x,y,w,h,num,title,body,color=C.blue){
  addShape(slide,"roundRect",{left:x,top:y,width:w,height:h},C.pale,C.line,"rounded-xl");
  addShape(slide,"ellipse",{left:x+22,top:y+22,width:42,height:42},color,color);
  textBox(slide,String(num),{left:x+22,top:y+28,width:42,height:25},16,C.white,true,"center");
  textBox(slide,title,{left:x+80,top:y+20,width:w-102,height:32},22,C.navy,true);
  textBox(slide,body,{left:x+22,top:y+74,width:w-44,height:h-92},17,C.muted,false,"left",{lineSpacing:1.15});
}
function sectionCover(num,title,duration,desc,links=[]){
  const s=newSlide();s.background.fill=C.deep;
  addShape(s,"rect",{left:0,top:0,width:18,height:720},C.blue,C.blue);
  textBox(s,`PART ${num}`,{left:84,top:88,width:350,height:36},18,"#8FC8FF",true);
  textBox(s,title,{left:84,top:160,width:1030,height:115},48,C.white,true);
  textBox(s,desc,{left:84,top:306,width:900,height:126},23,"#D9EBFF",false,"left",{lineSpacing:1.2});
  links.forEach((l,i)=>addLink(s,l[0],l[1],84+i*252,602,232));
  note(s,`用这一页完成章节切换，先说清楚本部分的学习目标和时间安排。`,links.map(x=>x[1]));
}

async function addAmbassadorSection(){
 sectionCover(3,"Philips GCR AI Ambassador","","先了解 GCR AI Network 中四类角色的分工，再通过名单找到自己所在部门、业务单元或市场的 AI 联系人。",[["进入 AI Gateway",URL.gateway],["查看 AI Tool Lab",URL.lab]]);
 {
  const s=newSlide();chrome(s,"03 Philips GCR AI Ambassador","GCR AI Network：四类角色分别提供方向、推广、场景和技术支持","Champion 负责方向，Ambassador 组织学习和推广，Catalysts 从日常流程中寻找适合 AI 的任务，Guru 把业务问题连接到合适的技术资源。");
  const roles=[
   {n:"01",t:"AI 先锋｜Champion",m:"Yiqiu Chen",b:"制定战略方向，聚焦高价值场景，推动 AI 创造业务价值。",c:C.blue},
   {n:"02",t:"AI 大使｜Ambassador",m:"24 people",b:"组织学习和经验分享，帮助更多团队了解并使用合适的 AI 工具。",c:C.green},
   {n:"03",t:"AI 推动者｜Catalysts",m:"每个团队约 5%–10%",b:"熟悉业务流程，从日常工作中寻找切入点，推动 AI 融入真实工作流。",c:C.orange},
   {n:"04",t:"AI 专家｜Guru",m:"每个团队约 3%",b:"把业务问题连接到合适的技术资源，并在开发、运行和改进过程中提供支持。",c:C.deep}
  ];
  roles.forEach((r,i)=>{const y=188+i*95;addShape(s,"roundRect",{left:82,top:y,width:1096,height:78},i%2===0?C.pale:C.sky,C.line,"rounded-xl");addShape(s,"ellipse",{left:104,top:y+16,width:46,height:46},r.c,r.c);textBox(s,r.n,{left:104,top:y+26,width:46,height:24},16,C.white,true,"center");textBox(s,r.t,{left:174,top:y+14,width:310,height:30},22,C.navy,true);textBox(s,r.m,{left:174,top:y+47,width:310,height:20},15,r.c,true);textBox(s,r.b,{left:510,top:y+20,width:630,height:42},17,C.muted,false,"left",{lineSpacing:1.12});});
  addLink(s,"回到 AI Gateway",URL.gateway,72,616,230);addLink(s,"继续探索 AI Tool Lab",URL.lab,320,616,260);
  note(s,"",["[Updated] Jul. townhall AI slide.pptx — slide 3",URL.gateway,URL.lab]);
 }
 {
  const s=newSlide();chrome(s,"03 Philips GCR AI Ambassador","按部门或业务单元找到对应的 AI Ambassador","Alison Gu 担任 GCR AI Ambassador Representative Chair。名单按部门或业务单元、管理负责人和 AI Ambassador 三列排列，便于找到对应联系人。");
  await screenshotAnalysis(s,IMG.ambassador,"Philips GCR AI Ambassador list",[
   {lead:"覆盖范围：",text:"名单覆盖市场、财务、法务、人力资源、战略、质量、法规、临床、创新、IT，以及各业务单元和区域市场。原图保留了完整组织缩写。"},
   {lead:"角色分工：",text:"Function Lead 是对应业务的管理负责人；AI Ambassador 负责分享学习资源和实践经验，帮助团队梳理适合 AI 的工作问题。"},
   {lead:"怎样使用名单：",text:"先在第一列找到自己的部门或业务单元，再查看同一行的 AI Ambassador。工具和学习问题可以向大使交流，业务决定和数据授权仍由本部门负责人确认。"}
  ],{left:72,top:185,width:702,height:380,panelLeft:800,panelTop:185,panelWidth:408,panelHeight:380});
  addLink(s,"进入 Copilot 学习与实操",URL.navigator,72,616,280);addLink(s,"打开 M365 Copilot",URL.copilot,370,616,230);
  note(s,"按网络规模、表格三列和角色分工进行解释。不要把 AI Ambassador 描述为审批者或业务责任人。",["User-provided GCR AI Ambassador image",URL.gateway,URL.lab]);
 }
}

try {
// 1
{
 const s=newSlide();s.background.fill=C.deep;addShape(s,"rect",{left:0,top:0,width:18,height:720},C.blue,C.blue);
 textBox(s,"PHILIPS YOUNG BOOTCAMP",{left:84,top:82,width:600,height:30},17,"#89C5FF",true);
 textBox(s,"从 AI 认知到可用 Agent",{left:84,top:158,width:850,height:68},52,C.white,true);
 textBox(s,"AI Gateway 导航 · GCR AI Ambassador · Copilot 实操 · Agent Builder 动手实验",{left:84,top:246,width:1080,height:60},24,"#D7EAFB",false);
 textBox(s,"讲解、演示与动手练习相结合",{left:84,top:530,width:600,height:30},18,C.white,true);
 addLink(s,"打开 AI Skills Navigator",URL.navigator,84,602,260);
 note(s,"开场先说明：课程先建立企业入口和本地支持网络，最后两部分集中完成 Copilot 与 Agent 实操。",[URL.navigator]);
}
// 2
{
 const s=newSlide();chrome(s,"01 介绍与引入","Philips 的 AI 方向：创新、运营、协作","今天先看 AI 怎样帮助业务创新、改善日常工作和支持跨团队协作，同时了解使用这些工具时必须遵守的企业要求。");
 const directions=[
  {x:82,n:"01",t:"创新｜How we innovate",b:"聚焦高价值业务场景，为患者、客户、消费者和业务创造更大价值。",c:C.blue},
  {x:458,n:"02",t:"运营｜How we operate",b:"重新审视工作方式，打破流程壁垒，让跨团队协作更顺畅、交付更高效。",c:C.green},
  {x:834,n:"03",t:"协作｜How we collaborate",b:"持续投入工具与能力建设，帮助员工成长，并提升组织面向未来的竞争力。",c:C.orange}
 ];
 directions.forEach((d)=>{addShape(s,"roundRect",{left:d.x,top:205,width:344,height:240},C.pale,C.line,"rounded-xl");textBox(s,d.n,{left:d.x+26,top:232,width:42,height:26},16,d.c,true);textBox(s,d.t,{left:d.x+26,top:274,width:292,height:36},22,C.navy,true);textBox(s,d.b,{left:d.x+26,top:330,width:292,height:82},18,C.muted,false,"left",{lineSpacing:1.16});});
 addShape(s,"roundRect",{left:82,top:476,width:1096,height:78},C.sky,C.blue,"rounded-xl");
 textBox(s,"质量、安全、合规与人工负责，是 Philips 推进 AI 规模化应用的共同原则。",{left:118,top:501,width:1024,height:34},22,C.deep,true,"center");
 addLink(s,"进入 AI Gateway",URL.gateway);
 note(s,"",["[Updated] Jul. townhall AI slide.pptx — slide 1",URL.gateway]);
}
//3
{
 const s=newSlide();chrome(s,"01 介绍与引入","今天的学习路径","先认识企业入口，再练习通用任务，最后把重复流程构建成 Agent。学习过程按照“观察、模仿、独立完成”逐步推进，后半程会留出较长时间进行实际操作。");
 const data=["介绍与引入","AI 全景与入口","AI Ambassador","Copilot 实操","Agent 动手 Lab"];
 data.forEach((d,i)=>{const x=72+i*226;addShape(s,"roundRect",{left:x,top:235,width:198,height:190},i>=3?C.sky:C.pale,i>=3?C.blue:C.line,"rounded-xl");if(i>=3)addShape(s,"ellipse",{left:x+20,top:258,width:42,height:42},C.blue,C.blue);textBox(s,String(i+1),{left:x+20,top:258,width:42,height:42},24,i>=3?C.white:C.blue,true,"center",{vAlign:"middle"});textBox(s,d,{left:x+20,top:323,width:158,height:70},19,C.navy,true,"center"); if(i<4)addShape(s,"chevron",{left:x+199,top:310,width:26,height:38},C.line,C.line);});
 textBox(s,"学习方式：观察 → 模仿 → 独立完成。课堂上会保留足够的实践时间，请直接在自己的工作环境中操作。",{left:112,top:490,width:1056,height:68},20,C.muted,false,"center");
 addLink(s,"微软官方学习网站",URL.navigator);
 note(s,"快速说明节奏。前 3 部分建立共同语言、企业入口和支持网络，最后 2 部分集中进行 Copilot 与 Agent 实操。",[URL.navigator]);
}
sectionCover(2,"Philips AI 全景与工具导航","","AI Gateway 用于查看 Enterprise ChatGPT 的访问状态、申请入口和使用要求；微软课程在 AI Skills Navigator 学习，Copilot 操作则进入 Microsoft 365 Copilot。",[["打开 AI Gateway",URL.gateway]]);
//5
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","可持续发展 AI 战略：重点项目、当前进展与下一阶段计划","Group Sustainability 将 AI 工作划分为五条重点方向，每条方向都标明负责人、当前进展和下一阶段计划。绿色 Now 代表正在运行或部署的工作，橙色 Next 代表后续扩展项目。");
 await screenshotAnalysis(s,IMG.strategy,"Philips sustainability AI strategy one-pager",[
  {lead:"五条重点方向：",text:"AI Capability & Adoption、Supplier Sustainability、Regulatory & Compliance、Business & Markets、Reporting & Analysis。"},
  {lead:"Now 与 Next：",text:"Now 记录已经投入使用或正在部署的项目；Next 列出准备扩展、标准化或接入正式流程的后续工作。"},
  {lead:"项目负责人：",text:"每一列底部都写明谁提供业务支持、谁承担领导责任、谁负责日常推进。"}
 ],{panelTitle:"战略框架"});addLink(s,"打开 AI Gateway",URL.gateway);
 note(s,"先解释截图顶部的组合管理逻辑和 Now/Next 结构，再进入后续两页的五条工作流。",["User-provided sustainability-ai-strategy-one-pager.pptx",URL.gateway]);
}
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","三条基础工作流：能力建设、供应商风险与法规处理","三条工作流覆盖员工能力建设、供应商风险数据和法规研读，并与战略图中的项目方向相对应。");
 await screenshotAnalysis(s,IMG.strategy,"Philips sustainability AI strategy one-pager",[
  {lead:"1｜员工能力与应用推广：",text:"当前正在为不同岗位设计 AI 学习路径，并通过内部社区分享案例。下一步会收集、筛选值得推广的 AI 用例，同时建立内部推广网络。"},
  {lead:"2｜供应商可持续发展：",text:"AI 已用于发现供应商可持续风险、辅助成熟度评估，并自动筛查公开信息。下一步将进一步处理报告、问卷等非结构化资料，支持后续改进。"},
  {lead:"3｜法规与合规：",text:"AI 每年辅助整理 2,000 多项可持续发展法规，并帮助团队更快完成法规解读。下一步将把法规监测连接到质量管理和审计流程。"}
 ],{panelTitle:"基础工作流"});
 addLink(s,"查看战略原图",URL.gateway);
 note(s,"逐项解释前三条工作流，强调它们是规模化 AI 的组织、数据与治理基础。",["User-provided sustainability-ai-strategy-one-pager.pptx"]);
}
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","商业支持、报告分析与 2026 年重点","Business & Markets 聚焦投标和市场支持；Reporting & Analysis 覆盖双重重要性评估、数据采集及披露流程。2026 年将继续扩大已验证项目，并统一共同能力。");
 await screenshotAnalysis(s,IMG.strategy,"Philips sustainability AI strategy one-pager",[
  {lead:"4｜商业与市场支持：",text:"Tender Assistant 正在支持 150 多个销售后台团队，帮助准备投标材料并减少人工协调。下一步将在更多区域和重点投标场景中推广。"},
  {lead:"5｜报告与分析：",text:"AI 正在支持双重重要性评估，也就是同时评估可持续议题的业务影响和外部影响；同时帮助制造基地收集发票数据。下一步将支持更多可持续披露流程。"},
  {lead:"2026 年重点：",text:"扩大已经验证有效的项目，统一可重复使用的能力，并优先推进效果能够衡量的场景。每个项目都明确支持人和日常负责人。"}
 ],{panelTitle:"业务落地与规模化"});
 addLink(s,"进入 AI Gateway",URL.gateway);
 note(s,"解释后两条业务工作流和 2026 focus，提醒学员注意每列底部的 Sponsor、LT 和 Owner 责任结构。",["User-provided sustainability-ai-strategy-one-pager.pptx",URL.gateway]);
}
// GCR AI Game Plan — sourced from Town Hall slide 2
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","大中华区 AI 计划：五个业务方向和四项基础能力","五个方向分别解决员工能力、销售机会、运营服务、职能工作和创新协作问题；技术平台、数据、管理机制和负责任使用为这些工作提供基础支持。");
 const pillars=[
  {t:"提升员工\nAI 能力",en:"Learn & adopt",b:"内部学习社群\n岗位能力建设\n分享实践案例",c:C.blue},
  {t:"提升商机洞察\n和赢率",en:"Sales insights",b:"分析销售机会\n复盘赢单与失单\n支持投标和定价",c:C.green},
  {t:"改善运营\n和服务",en:"Operations",b:"简化订单处理\n改善服务运营\n支持工厂与供应链",c:C.orange},
  {t:"支持职能\n日常工作",en:"Functions",b:"市场、财务与 HR\n法规、质量与法务\n战略与竞品信息",c:C.deep},
  {t:"连接伙伴\n加速创新",en:"Innovation",b:"加快创新流程\n连接本地 AI 伙伴\n开展生态协作",c:C.blue}
 ];
 pillars.forEach((p,i)=>{const x=62+i*244;addShape(s,"roundRect",{left:x,top:190,width:222,height:288},C.pale,C.line,"rounded-xl");addShape(s,"rect",{left:x,top:190,width:222,height:8},p.c,p.c);textBox(s,p.t,{left:x+18,top:220,width:186,height:58},21,C.navy,true,"center");textBox(s,p.en,{left:x+18,top:286,width:186,height:24},14,p.c,true,"center");textBox(s,p.b,{left:x+20,top:330,width:182,height:112},16,C.muted,false,"center",{lineSpacing:1.14});});
 textBox(s,"每个支柱由业务牵头，并与支持伙伴和 AI Ambassador 协同推进。",{left:126,top:492,width:1028,height:28},18,C.navy,true,"center");
 const foundations=["技术与平台","数据底座","运营模式与治理","负责任的 AI 与合规"];
 foundations.forEach((f,i)=>{const x=82+i*280;addShape(s,"roundRect",{left:x,top:536,width:256,height:44},i%2===0?C.sky:C.pale,C.line,"rounded-xl");textBox(s,f,{left:x+12,top:548,width:232,height:22},16,C.deep,true,"center");});
 addLink(s,"进入 AI Gateway",URL.gateway);
 note(s,"",["[Updated] Jul. townhall AI slide.pptx — slide 2",URL.gateway]);
}
//6
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","AI Gateway：企业 ChatGPT 的访问与支持入口","AI Gateway 集中展示企业 ChatGPT 的访问状态、申请支持、使用规范和运营信息。Microsoft 官方课程在 AI Skills Navigator 中学习，Copilot 的实际操作则进入 Microsoft 365 Copilot。");
 card(s,88,205,335,250,1,"访问与开通","查看 Enterprise ChatGPT 是否已经开通、从哪里申请，以及遇到问题时怎样获得入门支持。",C.blue);
 card(s,472,205,335,250,2,"使用要求","了解哪些工作场景可以使用、哪些数据不能输入，以及生成内容为什么仍需人工检查。",C.green);
 card(s,856,205,335,250,3,"用量与状态","页面还会显示申请状态、使用情况和部分费用或配额信息，便于个人和平台团队查看。",C.orange);
 textBox(s,"在 AI Gateway 先找到三件事：我的访问状态、申请或咨询入口、企业使用规范。",{left:100,top:500,width:1080,height:70},24,C.navy,true,"center");
 addLink(s,"进入 AI Gateway",URL.gateway);
 note(s,"明确纠正认知：AI Gateway 与 AI Skills Navigator 分工不同。前者解决 Philips 企业访问和治理，后者提供微软官方学习内容。",[URL.gateway]);
}
//7
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","AI Gateway 页面上可以找到哪些信息","首页可以查看 Enterprise ChatGPT 的申请入口和当前访问状态；下方内容说明费用与配额、使用情况以及标准申请流程。");
 await screenshotAnalysis(s,IMG.gateway1,"AI Gateway homepage and access guidance",[
  {lead:"申请入口：",text:"主卡提供“Request access”按钮。引导助手可以说明怎样申请、开通后怎样开始使用，以及企业使用要求。"},
  {lead:"访问状态：",text:"右侧卡片显示当前可使用 AI Gateway 的引导助手；ChatGPT 的具体权限和开通进度仍以页面中的账户状态为准。"},
  {lead:"页面下方：",text:"三张卡片分别介绍费用与配额、使用状态，以及企业统一的申请方式。"}
 ]);addLink(s,"打开 AI Gateway",URL.gateway);
 note(s,"按主卡、状态卡、三张运营卡的顺序解释画面。不要展示个人用量与成本页面。",["User-provided AI Gateway screenshot",URL.gateway]);
}
// Enterprise ChatGPT application process — source one-pager slide 1
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","Enterprise ChatGPT：申请前先获得部门批准","Enterprise ChatGPT 主要用于明确的部门级、企业级或产品研发场景。申请账号和中国网络服务前，需要先获得本部门管理团队（GCMT）的批准。");
 await screenshotAnalysis(s,IMG.chatgptFlow,"Enterprise ChatGPT application process in Chinese",[
  {lead:"适用场景：",text:"部门或企业级应用、系统和 Agent 的设计开发，也包括 Philips 产品相关的科研与研发工作。"},
  {lead:"部门统筹：",text:"各部门根据预算和业务需求确定申请范围。原文件建议申请人数不超过部门总人数的 3%。"},
  {lead:"批准方式：",text:"个人可以取得 GCMT 邮件批准，也可以由部门统一确认申请名单；名单后续可以按月复核调整。"}
 ],{left:72,top:185,width:708,height:416,panelLeft:800,panelTop:185,panelWidth:408,panelHeight:416,panelTitle:"申请条件"});
 addLink(s,"打开 AI Gateway",URL.gateway,72,616,230);addLink(s,"查看完整使用手册",URL.chatgptGuide,320,616,250);
 note(s,"先说明适用场景和 GCMT 批准，再进入账号与网络服务两条申请线。",["ChatGPT_User One Pager.pptx — slide 1",URL.gateway,URL.chatgptGuide]);
}
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","获得部门批准后，还要完成两项申请","第一项是 Enterprise ChatGPT 账号，第二项是中国网络访问服务（China Internet Acceleration Service）。两项申请完成后会分别收到邮件。");
 await screenshotAnalysis(s,IMG.chatgptFlow,"Enterprise ChatGPT account and China network service workflow",[
  {lead:"账号申请：",text:"进入 AI Gateway，在 AI Assistant 对话框输入“Access”，提交 Enterprise ChatGPT 账号申请。开通后会收到 OpenAI 邮件。"},
  {lead:"网络申请：",text:"在 ServiceNow 申请中国网络访问服务，并上传个人承诺书和 GCMT 批准材料。"},
  {lead:"怎样确认完成：",text:"账号开通会收到 OpenAI 邮件，网络申请完成会收到 ServiceNow（SNOW）关单邮件。两封邮件都收到后，再安装登录工具。"}
 ],{left:72,top:185,width:708,height:416,panelLeft:800,panelTop:185,panelWidth:408,panelHeight:416,panelTitle:"两条申请路径"});
 addLink(s,"申请 Enterprise ChatGPT",URL.gateway,72,616,280);addLink(s,"申请中国网络服务",URL.networkService,370,616,260);
 note(s,"账号和网络服务是两条独立申请线，完成标志分别是 OpenAI 开通邮件和 SNOW 关单邮件。",["ChatGPT_User One Pager.pptx — slide 1",URL.gateway,URL.networkService]);
}
// Enterprise ChatGPT quick guide — source one-pager slide 3
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","两项申请完成后：安装工具并登录企业工作区","从 Software Portal 安装 ChatGPT Proxy Doctor 登录工具，再用 Philips 账号单点登录（Single Sign-On）进入企业版 ChatGPT 工作区。");
 await screenshotAnalysis(s,IMG.chatgptGuide,"Philips China Enterprise ChatGPT quick guide",[
  {lead:"安装与登录：",text:"从 Software Portal 下载 ChatGPT Proxy Doctor。通过这个工具打开网页版或桌面应用，再用 Philips 账号登录。"},
  {lead:"使用时注意：",text:"只使用 Philips 批准的企业账号和网络，不输入机密、患者或敏感个人数据。生成内容先作为草稿，重要事实和决定仍由员工确认。"},
  {lead:"如果无法使用：",text:"先确认两封审批邮件都已收到，再重启并等待权限更新。仍有问题时，记下报错内容、发生时间以及所用网络和设备，再联系 ServiceNow 或本地 IT。"}
 ],{left:72,top:185,width:708,height:416,panelLeft:800,panelTop:185,panelWidth:408,panelHeight:416,panelTitle:"登录与使用"});
 addLink(s,"打开 Software Portal",URL.softwarePortal,72,616,260);addLink(s,"查看完整使用手册",URL.chatgptGuide,350,616,250);
 note(s,"按安装、登录、使用要求和故障处理顺序说明。",["ChatGPT_User One Pager.pptx — slide 3",URL.softwarePortal,URL.chatgptGuide]);
}
//8
{
 const s=newSlide();chrome(s,"02 Philips AI 全景与工具导航","常见用途与使用条件放在同一页","左侧是起草、总结、研究和流程自动化等常见用途；右侧是企业使用、Responsible AI、审批和开通流程。开始使用前，可以把这两部分一起看完。");
 await screenshotAnalysis(s,IMG.gateway2,"AI Gateway common uses and responsible AI guidance",[
  {lead:"可以做什么：",text:"起草文档与沟通、总结报告与会议、研究与知识发现、生产力与流程自动化。四类用途都需要清楚输入、输出和人工责任。"},
  {lead:"怎样负责任地做：",text:"只在批准的 Philips 工作环境中使用；不输入不允许处理的敏感信息，并在使用前检查生成结果。"},
  {lead:"怎样获得权限：",text:"从 AI Gateway 开始申请。获得部门批准后，系统会按照相应步骤为账号开通权限。"}
 ]);addLink(s,"查看企业使用说明",URL.gateway);
 note(s,"把左侧能力与右侧四项条件一一对应，强调效率、合规和人工判断必须同时成立。",["User-provided AI Gateway screenshot",URL.gateway]);
}
await addAmbassadorSection();
sectionCover(4,"日常工作中的 Copilot 实操","","先认识微软官方 AI 学习网站和 MS-4004，再用一个跨岗位案例练习多来源总结、冲突识别和沟通输出。",[["AI Skills Navigator",URL.navigator],["MS-4004 学习路径",URL.ms4004],["打开 M365 Copilot",URL.copilot]]);
//10
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","AI Skills Navigator：从 For you 首页开始选择学习内容","AI Skills Navigator 是微软官方 AI 学习网站。For you 首页根据学习记录和个人资料推荐内容，左侧提供课程搜索、学习播放列表、证书和学习报告等入口。");
 await screenshotAnalysis(s,IMG.navigatorHome,"AI Skills Navigator For you home",[
  {lead:"左侧导航：",text:"For you 查看个性化内容，Explore content 主动搜索主题，Skilling playlists 进入成套学习路径，Credentials 与 Reporting 分别查看证书和学习记录。"},
  {lead:"首页推荐：",text:"Recommended for you 根据资料展示课程卡片；Pick up where you left off 用于继续之前的内容，右上角的学习习惯提示帮助保持连续学习。"},
  {lead:"使用方法：",text:"首次进入可以先更新 profile，再按当前岗位或工作问题搜索。Bootcamp 结束后仍可从这里继续学习 Copilot、AI 基础和其他产品方向。"}
 ],{panelTitle:"首页怎么使用"});
 addLink(s,"访问微软官方学习网站",URL.navigator,72,616,280);
 note(s,"按左侧导航、首页推荐和持续学习三个区域讲解用户提供的最新界面。",["User-provided AI Skills Navigator screenshot",URL.navigator]);
}
//11
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","Skilling playlists：把相关课程放进一条学习路线","当前页面打开的是 Philips: Summer 2026 M365 Copilot Courses。顶部显示学习内容数量和完成进度，下面按顺序排列 AI 基础、Copilot Chat 基础和 MS-4004 业务案例。");
 await screenshotAnalysis(s,IMG.navigatorPlaylists,"AI Skills Navigator Skilling playlists",[
  {lead:"顶部信息：",text:"33 items 表示播放列表包含 33 项内容，进度条显示已完成比例，Continue learning 用于继续上次的学习位置。"},
  {lead:"建议顺序：",text:"先完成 AI 和 Copilot Chat 基础内容，熟悉提示词、文件分析和协作方式，再进入 Microsoft 365 Copilot Use Cases（MS-4004）。"},
  {lead:"MS-4004 在哪里：",text:"向下滚动即可看到 MS-4004。它按管理者、销售、市场、财务、IT、人力资源、运营、企业沟通、客户服务和法务组织案例。"}
 ],{panelTitle:"播放列表的结构"});
 addLink(s,"打开当前播放列表",URL.ms4004);
 note(s,"说明播放列表的进度、内容结构和 MS-4004 所在位置。",["User-provided AI Skills Navigator screenshot",URL.ms4004]);
}
//12
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","从左侧目录进入 MS-4004，再按岗位选择案例","进入课程后，左侧目录列出播放列表中的课程和单元。当前截图选中的是 Copilot Chat Basic 的介绍单元；向下找到 MS-4004 并展开，就可以进入不同岗位的案例。");
 await screenshotAnalysis(s,IMG.navigatorPlayer,"AI Skills Navigator course player with MS-4004 navigation",[
  {lead:"左侧目录：",text:"点击课程名称可以展开单元。当前基础模块包括介绍、Copilot Pages、Agents、练习和总结；下方可以看到 MS-4004。"},
  {lead:"右侧学习区：",text:"这里显示正文、重要提醒和学习目标。页面顶部还提供单元总结和转成播客等辅助复习功能。"},
  {lead:"今天怎么使用：",text:"先知道课程入口在哪里，再进入 MS-4004 查看与自己岗位接近的案例。课堂实操会选取其中可以跨岗位使用的方法。"}
 ],{panelTitle:"课程页面怎么读"});
 addLink(s,"打开 MS-4004 播放列表",URL.ms4004,72,616,280);addLink(s,"查看 Microsoft Learn",URL.learn,370,616,250);
 note(s,"准确说明当前截图展示的是课程播放器和左侧 MS-4004 导航，而不是 MS-4004 某个岗位单元的正文。",["User-provided AI Skills Navigator screenshot",URL.ms4004,URL.learn]);
}
//13
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","MS-4004 覆盖的十类岗位","MS-4004 按岗位组织 Copilot 案例。浏览时可以先看与自己最接近的岗位，也可以直接寻找熟悉的任务，例如读懂上下文、比较多份资料、整理风险和起草下一步沟通。");
 const roles=["管理者","销售","市场营销","财务","IT","人力资源","运营","企业沟通","客户服务","法务"];
 roles.forEach((r,i)=>{const col=i%5,row=Math.floor(i/5);addShape(s,"roundRect",{left:82+col*232,top:210+row*135,width:206,height:102},i<5?C.sky:C.pale,C.line,"rounded-xl");textBox(s,String(i+1).padStart(2,"0"),{left:102+col*232,top:230+row*135,width:38,height:25},15,C.blue,true);textBox(s,r,{left:145+col*232,top:226+row*135,width:125,height:38},20,C.navy,true);});
 textBox(s,"跨岗位共同点：快速理解上下文、从多个来源提取关键信息、识别风险与冲突，并把分析转化为清晰的下一步沟通。",{left:110,top:510,width:1060,height:58},20,C.muted,false,"center");
 addLink(s,"进入 MS-4004",URL.ms4004);
 note(s,"十类岗位名称来自 MS-4004 课程结构。用最后一句过渡到通用案例。",[URL.ms4004,URL.learn]);
}
//14
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","把岗位差异提炼为四类通用任务","无论岗位是什么，Copilot 的高频价值通常集中在“读、理、查、写”。课堂案例会把这四类动作串成完整工作流：先理解资料，再形成结构，检查问题，最后把结果转化为可执行的沟通。");
 const xs=[92,382,672,962], titles=["读：快速理解","理：形成结构","查：发现问题","写：推动行动"], bodies=["阅读项目简介、会议纪要、邮件或文档，提取目标、背景和关键事实。","按决策、行动、风险、截止日期和负责人重新组织信息。","比较多个来源，标记冲突、缺失信息和需要人工确认的内容。","把结果整理成可以发给同事的项目简报或跟进邮件。"]; 
 for(let i=0;i<4;i++)card(s,xs[i],210,240,285,i+1,titles[i],bodies[i],i===2?C.orange:C.blue);
 addLink(s,"打开 Microsoft 365 Copilot",URL.copilot);
 note(s,"强调四步并非固定模板，可以根据工作任务重新排序，但“核对来源与冲突”必须保留。",[URL.ms4004,URL.copilot]);
}
//15
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","通用案例：快速接手一个新项目","我们用一组虚构的“绿色办公周”资料，完整演示一次从阅读材料到形成沟通输出的过程。");
 addShape(s,"roundRect",{left:82,top:178,width:1116,height:116},C.sky,C.blue,"rounded-xl");
 textBox(s,"你的任务",{left:112,top:202,width:160,height:32},24,C.blue,true);
 textBox(s,"今天接手“绿色办公周”项目。请读懂三份资料，向负责人说明当前进展、主要风险和下一步安排",{left:112,top:239,width:1038,height:44},24,C.navy,true);
 const caseCols=[
  {x:82,t:"你会拿到",b:"项目简介\n规划会议纪要\n里程碑时间表",c:C.blue},
  {x:458,t:"请 Copilot 帮你",b:"提炼目标与关键进展\n整理负责人和截止日期\n找出冲突与待确认事项",c:C.green},
  {x:834,t:"最后交付",b:"一页项目接手简报\n一封跟进邮件草稿",c:C.orange}
 ];
 caseCols.forEach((x)=>{addShape(s,"roundRect",{left:x.x,top:322,width:344,height:220},C.pale,C.line,"rounded-xl");textBox(s,x.t,{left:x.x+28,top:348,width:288,height:34},23,x.c,true);textBox(s,x.b,{left:x.x+28,top:398,width:288,height:112},20,C.navy,false,"left",{lineSpacing:1.18});});
 addLink(s,"进入 Copilot 实操",URL.copilot);
 note(s,"提醒学员：虚构数据用于练习方法。真正工作中，应使用获批环境并遵循数据处理要求。",[URL.copilot,"Local fictional Green Office Week training data"]);
}
//16
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","资料 1：项目简介","先从项目简介建立全貌：项目为什么做、如何衡量、预算和范围是什么、关键日期有哪些。这里记录的报名开放日期是 28 Aug，稍后会和时间表进行对照。");
 addShape(s,"roundRect",{left:110,top:190,width:1060,height:380},C.pale,C.line,"rounded-xl");
 textBox(s,"GREEN OFFICE WEEK｜PROJECT BRIEF（虚构培训数据）",{left:150,top:222,width:980,height:32},18,C.blue,true);
 para(s,[{lead:"目的与受众：",text:" 9 月 14–18 日举行，面向 400 名内部同事，鼓励简单、可衡量的可持续办公习惯。"},{lead:"成功指标：",text:" 报名 150 人、出席率达到报名人数的 80%、参与者反馈达到 4.2/5。"},{lead:"预算与范围：",text:" 工作预算 25,000 元；仅内部沟通；材料需中英双语；供应商尚未确定，也未签署合同。"},{lead:"关键日期：",text:" 项目简介写明 8 月 28 日开放报名，9 月 9 日关闭报名。"}],{left:150,top:278,width:970,height:235},19);
 addLink(s,"打开 Copilot",URL.copilot);
 note(s,"让学员先独立浏览 20 秒，再提问：如果只能记住三件事，你会记录什么？",["Local fictional Green Office Week Project Brief",URL.copilot]);
}
//17
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","资料 2：会议纪要","会议纪要补充了负责人、截止日期和讨论状态。阅读这一份时，把内容分成“已确认”“行动项”和“开放问题”，后续简报就能清楚区分决定与待确认事项。");
 addShape(s,"roundRect",{left:110,top:190,width:1060,height:380},C.pale,C.line,"rounded-xl");
 textBox(s,"PLANNING MEETING NOTES｜17 AUG 2026（虚构培训数据）",{left:150,top:222,width:980,height:32},18,C.green,true);
 para(s,[{lead:"已确认：",text:" 活动日期、内部沟通、双语材料和场地原则已经明确。"},{lead:"行动项：",text:" 项目负责人 8 月 21 日确认五天议程；设施协调人 8 月 25 日确认房间布置；沟通负责人 8 月 28 日发布双语报名通知。"},{lead:"开放问题：",text:" 餐饮供应商未确定，合同金额尚未确定，团队尚未决定是否增加可选闭幕活动。"}],{left:150,top:286,width:970,height:215},20);
 addLink(s,"打开 Copilot",URL.copilot);
 note(s,"强调事实层级：Confirmed decision 与 Open question 不能混在一起。输出中应保留不确定性。",["Local fictional Green Office Week Meeting Notes",URL.copilot]);
}
//18
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","资料 3：时间表里出现了另一个日期","时间表把报名开放写成 31 Aug，而项目简介写的是 28 Aug。简报中保留两个日期和各自来源，并把它列为需要项目负责人确认的问题。");
 addShape(s,"roundRect",{left:110,top:190,width:1060,height:360},C.pale,C.line,"rounded-xl");
 const rows=[["五天议程确认","21 Aug","进行中"],["房间布局确认","25 Aug","未开始"],["双语公告批准","27 Aug","未开始"],["报名开放","31 Aug","未开始"],["报名关闭","09 Sep","未开始"]];
 textBox(s,"里程碑",{left:160,top:226,width:560,height:30},18,C.deep,true);textBox(s,"截止日期",{left:760,top:226,width:180,height:30},18,C.deep,true);textBox(s,"状态",{left:970,top:226,width:130,height:30},18,C.deep,true);
 rows.forEach((r,i)=>{const y=270+i*48;addShape(s,"rect",{left:148,top:y-6,width:964,height:40},i===3?"#FFF2E9":C.white,i===3?C.orange:C.line);textBox(s,r[0],{left:160,top:y,width:560,height:25},18,i===3?C.orange:C.navy,i===3);textBox(s,r[1],{left:760,top:y,width:180,height:25},18,i===3?C.orange:C.navy,i===3);textBox(s,r[2],{left:970,top:y,width:130,height:25},17,C.muted,false);});
 textBox(s,"待确认：项目简介 28 Aug ｜ 时间表 31 Aug",{left:150,top:520,width:980,height:36},21,C.orange,true,"center");
 addLink(s,"用 Copilot 比较资料",URL.copilot);
 note(s,"这是案例的关键检验点。评价输出时，先看是否保留冲突，再看语言是否清楚。",["Local fictional Green Office Week Timeline",URL.copilot]);
}
//19
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","提示词结构：背景 + 任务 + 输出 + 约束","提示词要说明为什么做、需要 Copilot 做什么、结果以什么形式呈现，以及哪些内容不能自行推断、必须由人确认。");
 const blocks=[{t:"背景",b:"我刚接手绿色办公周项目，需要快速理解三份附件。",c:C.blue},{t:"任务",b:"总结目标、成功指标、已确认决策、行动项、风险和开放问题，并比较来源。",c:C.green},{t:"输出",b:"先给一页项目简报，再起草一封简洁的跟进邮件。",c:C.deep},{t:"约束",b:"不要补充资料中没有的事实；发现冲突时列出来源和两个版本，并标记“待确认”。",c:C.orange}];
 blocks.forEach((x,i)=>{const y=190+i*102;addShape(s,"roundRect",{left:110,top:y,width:1060,height:80},C.pale,C.line,"rounded-xl");addShape(s,"roundRect",{left:128,top:y+14,width:105,height:52},x.c,x.c,"rounded-xl");textBox(s,x.t,{left:128,top:y+26,width:105,height:25},18,C.white,true,"center");textBox(s,x.b,{left:260,top:y+17,width:860,height:48},19,C.navy,false,"left",{vAlign:"middle"});});
 addLink(s,"打开 Copilot 并输入提示",URL.copilot);
 note(s,"现场演示时先输入一个模糊问题，再用四段结构改写，让学员观察结果差异。",[URL.copilot]);
}
//20
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","Microsoft 365 Copilot：确认工作账号，加入资料，开始任务","打开页面后，先确认左下角显示工作账号，再点击输入框左侧的加号加入本次练习使用的三份资料，最后在中央输入任务。");
 await screenshotAnalysis(s,IMG.copilot,"Microsoft 365 Copilot home page",[
  {lead:"开始新任务：",text:"左侧 New chat 用于新建对话，Search 用于查找历史内容。Library、Notebooks 和 Agents 可以在需要时再探索。"},
  {lead:"加入资料：",text:"中央 Message Copilot 是任务输入框；点击左侧加号可以添加文件。下方几个按钮是文件分析、邮件整理、人员搜索和会议准备等快捷入口。"},
  {lead:"提交前检查：",text:"确认左下角显示 Philips 工作账号，只添加当前任务需要的资料；不确定某类敏感信息能否使用时，先查看企业规则或咨询支持人员。"}
 ]);addLink(s,"打开 Microsoft 365 Copilot",URL.copilot);
 note(s,"按左侧导航、中央输入区、账号与环境三个区域逐项讲解，并把画面直接连接到后面的三份资料实操。",["User-provided M365 Copilot screenshot",URL.copilot]);
}
//21
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","现场演示：把三份资料整理成简报和跟进邮件","接下来我会在 Copilot 中完整做一遍。大家可以跟着看资料是怎样加入的、提示词怎样写，以及第一次结果出来后还可以怎样继续调整。");
 const steps=["上传项目简介、会议纪要和里程碑时间表。","输入“背景 + 任务 + 输出 + 约束”四段式提示词。","查看生成的项目接手简报和跟进邮件草稿。","找到 28 Aug 与 31 Aug 两个报名日期，保留来源并标记待确认。","继续追问：把行动项整理成负责人、截止日期和状态三列。"]; 
 steps.forEach((t,i)=>{const y=185+i*78;addShape(s,"ellipse",{left:112,top:y,width:42,height:42},i===3?C.orange:C.blue,i===3?C.orange:C.blue);textBox(s,String(i+1),{left:112,top:y+9,width:42,height:25},17,C.white,true,"center");textBox(s,t,{left:178,top:y-2,width:940,height:55},19,C.navy,i===3,"left",{vAlign:"middle"});});
 addLink(s,"进入现场演示",URL.copilot);
 note(s,"这页作为演示清单，不需要全部讲完再操作。每完成一步，回到页面指出为什么这样做。",[URL.copilot]);
}
//22
{
 const s=newSlide();chrome(s,"03 日常工作中的 Copilot 实操","轮到你：用同样的方法完成一个小任务","可以继续使用绿色办公周资料，也可以选择会议纪要整理、邮件改写或项目资料总结。在 Copilot 中写出背景、任务、输出和约束，并让结果列出仍需确认的信息。");
 addShape(s,"roundRect",{left:130,top:205,width:1020,height:235},C.sky,C.line,"rounded-xl");
 textBox(s,"练习要求",{left:170,top:238,width:220,height:34},24,C.deep,true);
 para(s,[{lead:"1. ",text:"用背景、任务、输出、约束四段结构写一个提示词。"},{lead:"2. ",text:"要求 Copilot 指出至少一个不确定项、冲突或需要人工核对的事实。"},{lead:"3. ",text:"把结果改写成可直接用于沟通的一段文字、邮件或简报。"}],{left:170,top:288,width:910,height:120},19);
 textBox(s,"完成后与同桌交换：你的提示词中，哪一条约束最重要？",{left:150,top:492,width:980,height:42},21,C.orange,true,"center");
 addLink(s,"打开 Copilot 开始练习",URL.copilot);
 note(s,"讲师巡场，只回答阻塞问题，完成后请学员交换并比较提示词中的关键约束。",[URL.copilot]);
}
sectionCover(5,"业务案例与最佳实践：Agent Builder Lab","","AI Tool Lab 提供多个 Agent 构建实验。讲师演示第 3 个“会议跟进助手”，学员动手范围是前 4 个 Lab，可任选或分组完成。",[["AI Tool Lab",URL.lab],["Agent Builder 路径",URL.builder],["M365 Copilot",URL.copilot]]);
//24
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","AI Tool Lab：四个业务场景，共用一套构建方法","网站提供四个 Agent Lab 和中文分步指南。四个场景都会练习工作规则（Instructions）、参考资料、常用快捷问题（Suggested Prompts）和试运行，操作都在 Microsoft 365 Copilot 中完成。");
 await screenshotAnalysis(s,IMG.labCover,"AI Tool Lab cover",[
  {lead:"四个场景：",text:"Chief of Staff、Product Manual FAQ、Meeting Follow-up Assistant 和 Funnel Data Analyst。"},
  {lead:"材料分工：",text:"PPT 用来同步解释关键画面；AI Tool Lab 网站提供完整步骤与练习材料；真正的配置、预览和创建在 Microsoft 365 Copilot 中完成。"},
  {lead:"完成之后：",text:"可以沿用同样的构建步骤，把自己的重复任务改造成一个简单、可测试的 Agent。"}
 ]);addLink(s,"打开 AI Tool Lab",URL.lab);addLink(s,"进入 Agent Builder 路径",URL.builder,320,616,260);
 note(s,"解释封面中的四个 Lab、中文指南和三个工具之间的分工，再进入具体 Lab。",[URL.lab,URL.builder]);
}
//25
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","动手范围：前四个 Agent Lab","这四个 Lab 分别练习事务协调、依据资料回答问题、会议跟进和销售数据分析。讲师会演示第 3 个，学员实践时可任选一个。每个 Lab 都会完成工作规则、参考资料、快捷问题和试运行。");
 const labs=[{n:1,t:"Chief of Staff｜事务协调",b:"整理任务、优先级和会议准备，练习怎样写清 Agent 的服务对象和工作方式。",u:URL.lab1},{n:2,t:"Product Manual FAQ｜产品问答",b:"依据产品资料回答问题，练习怎样限定参考范围，以及资料不足时怎样回应。",u:URL.lab2},{n:3,t:"Meeting Follow-up｜会议跟进",b:"把会议内容转为摘要、行动项和跟进邮件。本次讲师示范使用这一案例。",u:URL.lab3},{n:4,t:"Funnel Data Analyst｜销售分析",b:"分析销售机会数据并解释图表，练习怎样写清筛选条件、输出内容和业务问题。",u:URL.lab4}];
 labs.forEach((x,i)=>{const col=i%2,row=Math.floor(i/2),xx=86+col*568,yy=188+row*188;addShape(s,"roundRect",{left:xx,top:yy,width:540,height:164},i===2?C.sky:C.pale,i===2?C.blue:C.line,"rounded-xl");addShape(s,"ellipse",{left:xx+22,top:yy+24,width:46,height:46},i===2?C.blue:C.deep,i===2?C.blue:C.deep);textBox(s,String(x.n),{left:xx+22,top:yy+35,width:46,height:24},18,C.white,true,"center");textBox(s,x.t,{left:xx+88,top:yy+22,width:400,height:32},22,C.navy,true);textBox(s,x.b,{left:xx+88,top:yy+67,width:410,height:70},17,C.muted,false);});
 addLink(s,"Lab 1",URL.lab1,72,616,120);addLink(s,"Lab 2",URL.lab2,205,616,120);addLink(s,"Lab 3",URL.lab3,338,616,120);addLink(s,"Lab 4",URL.lab4,471,616,120);
 note(s,"不要说“本次实践就是 Lab 3”。准确表述：讲师示范 Lab 3，学员实践范围是前四个 Lab。",[URL.lab1,URL.lab2,URL.lab3,URL.lab4]);
}
//26
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","Lab 01｜Chief of Staff：整理日程、优先级和会议准备","主提示让 Agent 查看当天日历、安排优先级、找出时间冲突，并为重要会议准备 2–3 个谈话要点。下方三个常用快捷问题分别对应日历、紧急事项和今日重点。");
 await screenshotAnalysis(s,IMG.chief,"Chief of Staff lab preview",[
  {lead:"输入范围：",text:"日历、紧急事项和当前目标。Agent 会结合时间冲突与任务重要性进行整理。"},
  {lead:"处理规则：",text:"区分必须今天处理、可推迟和需要协调的事项；对重要会议补充目标、风险与谈话要点。"},
  {lead:"你会看到：",text:"带理由的优先级、清楚标出的时间冲突，以及可以直接用于当天安排的建议。"}
 ]);addLink(s,"打开 Lab 01",URL.lab1);
 note(s,"逐项解读主提示和三个 Suggested Prompts，说明 Instructions 要怎样支撑这些输出。",[URL.lab1]);
}
//27
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","Lab 02｜Product Manual FAQ：回答必须来自产品资料","这个示例根据已提供的 MR 5300 产品资料回答销售问题。回答先给出要点，再解释适合客户沟通的产品价值，并在具体规格旁显示资料来源。");
 await screenshotAnalysis(s,IMG.product,"Product manual FAQ example answer",[
  {lead:"任务边界：",text:"只依据已加载的产品手册回答，不把模型常识、营销想象或其他产品信息混入答案。"},
  {lead:"回答结构：",text:"先概括几个示例卖点，包括减少氦气维护、AI 辅助工作流、成像质量和长期使用成本，再把规格转化为客户能够理解的价值。"},
  {lead:"看哪里：",text:"关键规格旁能看到资料来源；如果资料没有覆盖或版本不同，回答会直接说明当前无法确认。"}
 ]);addLink(s,"打开 Lab 02",URL.lab2);
 note(s,"指向回答中的资料引用，解释为什么知识型 Agent 的首要评价标准是可追溯，而不是文笔。",[URL.lab2]);
}
//28
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","Lab 03｜Meeting Follow-up Assistant：用模板整理会议结果","画面右侧要求 Agent 根据 Mail Template 生成管理层简报，并按背景、决定、风险、需要支持和下一步组织内容；输出注明使用了 Mail Template CN.docx 中的管理层摘要模板。");
 await screenshotAnalysis(s,IMG.meeting,"Meeting follow-up assistant output",[
  {lead:"需要提供：",text:"同时给出原始会议内容、阅读对象、需要的栏目，并要求标出尚未确认的信息，避免只生成普通会议摘要。"},
  {lead:"模板作用：",text:"把邮件模板作为参考资料，可以让不同会议都使用相同的管理层汇报结构和语言风格。"},
  {lead:"结果结构：",text:"决策与讨论分开呈现，行动项带负责人和时间，尚未确定的产品演示继续保留为待确认事项。"}
 ]);addLink(s,"打开讲师示范 Lab 03",URL.lab3);
 note(s,"明确这是讲师示范的第 3 个 Lab，逐项检查输入结构、模板引用与输出可行动性。",[URL.lab3]);
}
//29
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","Lab 04｜Funnel Data Analyst：先说清筛选条件，再解释销售图表","这是一个销售机会数据分析示例。提示词限定 East 区域和 MR 业务单元，要求按预测类别统计金额，并以百万美元为单位展示柱状图。");
 await screenshotAnalysis(s,IMG.funnel,"Funnel data analyst chart",[
  {lead:"类别怎么理解：",text:"Omitted 是暂未纳入预测的机会，Pipeline 是仍在推进的机会，Best Case 是较乐观的预期，Commit 是团队承诺的预期，Closed 是已经关闭的机会。"},
  {lead:"图上观察：",text:"Omitted 明显最高，Pipeline 居第二。图表可以回答各类别的金额分布，但不能直接说明出现差异的原因。"},
  {lead:"下一步：",text:"让 Agent 列出筛选条件、明显异常和需要继续确认的问题，例如 Omitted 由哪些机会组成、停留了多久、不同区域是否有相同情况。"}
 ]);addLink(s,"打开 Lab 04",URL.lab4);
 note(s,"先读提示词中的过滤条件和指标，再读图表；强调观察、推断和行动建议必须分层表达。",[URL.lab4]);
}
//30
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","构建一个 Agent 的六步通用方法","四个 Lab 都沿用同一条路径：新建 Agent、选择构建方式、填写名称和工作规则、添加参考资料、设置常用快捷问题，最后试运行并调整。");
 const ss=["进入 Agents\n并新建","选择构建\n方式","填写名称、用途\n和工作规则","添加参考\n资料","设置常用\n快捷问题","试运行并\n创建"];
 ss.forEach((t,i)=>{const x=62+i*202;addShape(s,"roundRect",{left:x,top:240,width:174,height:176},i===2||i===3?C.sky:C.pale,i===2||i===3?C.blue:C.line,"rounded-xl");addShape(s,"ellipse",{left:x+60,top:260,width:54,height:54},C.blue,C.blue);textBox(s,String(i+1),{left:x+60,top:274,width:54,height:26},19,C.white,true,"center");textBox(s,t,{left:x+18,top:338,width:138,height:58},18,C.navy,true,"center");if(i<5)addShape(s,"chevron",{left:x+176,top:305,width:24,height:38},C.line,C.line);});
 textBox(s,"一个清楚的 Agent 会说明：为谁服务、处理什么任务、参考哪些资料、结果怎样呈现。",{left:130,top:485,width:1020,height:52},21,C.muted,false,"center");
 addLink(s,"打开 Agent Builder 路径",URL.builder);
 note(s,"六步是普适方法，不是某一个 Agent 的专属流程。后面每页只讲一个关键步骤。",[URL.builder]);
}
//31-38 image step helper
async function stepSlide(title,subtitle,img,body,label,url,source){
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab",title,subtitle);
 await screenshot(s,img,{left:72,top:180,width:734,height:410},title);
 addShape(s,"roundRect",{left:830,top:190,width:378,height:340},C.pale,C.line,"rounded-xl");
 textBox(s,"本步要点",{left:858,top:224,width:322,height:32},23,C.deep,true);
 textBox(s,body,{left:858,top:272,width:322,height:240},16,C.navy,false,"left",{lineSpacing:1.14});
 addLink(s,label,url,830,552,378);
 note(s,"按页面画面演示本步。完成后停顿，确认学员已经找到相同入口，再进入下一步。",[source,url]);
}
 await stepSlide("步骤 1｜进入 Agents 并新建 Agent","截图展示 Agent Store：左侧 Agents 已被选中，中间列出已有 Agent，右侧 Create agent 是新建入口。",IMG.step1,"页面位置：左侧导航进入 Agents；Search for an agent 用来查找已有 Agent；Your agents 显示当前可用项；右侧 Create agent 开始新建。\n\n本次操作从 Create agent 进入。Researcher、Analyst 等是已经可以使用的 Agent。","打开 M365 Copilot",URL.copilot,"User-provided Agent Builder guide screenshot");
await stepSlide("步骤 2｜选择构建方式","页面提供三种方式：描述需求后自动生成草稿、点击 Skip 手动填写，或者从模板开始。",IMG.step2,"在输入框描述需求，Builder 会先生成草稿；点击 Skip 可以直接进入各项设置；Templates 则提供可以修改的现成模板。\n\n本次演示选择手动填写，逐项查看名称、用途、工作规则和参考资料。","打开 Lab 操作指南",URL.builder,"User-provided Agent Builder guide screenshot");
 await stepSlide("步骤 3｜填写名称、用途与工作规则","截图标出了图标（Icon）、名称（Name）、用途说明（Description）和工作规则（Instructions）。",IMG.step3,"图标和名称帮助用户识别 Agent；用途说明用一句话告诉大家它能做什么；工作规则写清它怎样完成任务。\n\n工作规则可以包括输入内容、处理步骤、输出栏目、参考资料范围，以及信息不足时怎样回应。","打开讲师示范 Lab",URL.lab3,"User-provided Agent Builder guide screenshot");
 await stepSlide("步骤 4｜添加参考资料","截图中的资料入口覆盖文件、网站、聊天、会议和邮件，并可按 Files、Sites、Chats、Meetings 分类筛选。",IMG.step4,"上方可以输入网址、搜索名称或拖入文件；可选来源包括 SharePoint、Teams、Outlook 和网站，也可以从个人文件、聊天、会议与邮件中选择。\n\n会议跟进助手只加入邮件模板和会议内容，其他无关资料暂时不选。","进入 Agent Builder",URL.builder,"User-provided Agent Builder guide screenshot");
await stepSlide("补充步骤｜查找会议模板","搜索结果同时显示文件名、修改时间、修改人和保存位置，帮助我们区分名称相似的模板。",IMG.mail,"先搜索 Mail Template，再核对修改时间、修改人和保存位置，确认模板来自哪个团队、是否为当前版本。\n\n中文管理层邮件选择 Mail Template CN，英文沟通选择 EN；出现多个同名文件时，打开查看栏目和适用范围。","打开 Lab 03",URL.lab3,"User-provided Agent Builder guide screenshot");
await stepSlide("步骤 5｜设置常用快捷问题","每条快捷问题包括一个简短标题（Title）和一段完整任务（Message）。用户点击标题后，系统会发送对应的任务。",IMG.step5,"Title：用短语说明任务，例如“行动项”。\n\nMessage：写清输入、结果和必要限制，也可以注明负责人、截止日期与状态。\n\n保留 2–3 个常用入口。新增时点击 Add a suggested prompt。","打开 Lab 操作指南",URL.builder,"User-provided Agent Builder guide screenshot");
await stepSlide("步骤 6｜试运行、调整并创建","右侧 Preview 用于试运行 Agent，左侧 Configure 用于返回修改设置，顶部 Create 用于完成创建。",IMG.step6,"先用一份信息完整的材料试一次，确认任务和输出结构。再删除负责人或日期，看 Agent 会不会指出信息缺失，而不是自己补出来。\n\n如果结果不稳定，返回 Configure 修改工作规则、参考资料或快捷问题。确认可用后再点 Create；Draft auto-saved 只表示草稿已保存。","打开 M365 Copilot",URL.copilot,"User-provided Agent Builder guide screenshot");
await stepSlide("讲师示范结果｜会议跟进助手","示例要求使用管理层简报结构，并把尚未确认的信息保留下来。输出注明使用了 Mail Template CN.docx 模板。",IMG.meeting,"先看会议背景有没有说清楚，再看已经决定的事项是否与讨论内容分开。然后检查负责人和日期是否完整，未决定的产品演示是否仍标记为待确认。\n\n最后确认输出确实使用了模板，并判断生成的跟进邮件是否只需少量修改就能使用。","打开 Lab 03",URL.lab3,"User-provided meeting follow-up output screenshot");
//39
{
 const s=newSlide();chrome(s,"04 Copilot Builder 动手 Lab","轮到你：完成一个 Agent Lab","从前四个 Lab 中选择一个，按照网站指南在 Microsoft 365 Copilot 中完成构建。先做出可以运行的版本，再分别用完整资料和信息不完整的资料试一次。");
 para(s,[{lead:"完成时应该有：",text:" 清楚的名称和用途；写明任务、步骤、输出和限制的工作规则；需要时添加参考资料；设置 2–3 个常用快捷问题。"},{lead:"试运行时检查：",text:" 先用信息完整的材料运行一次，再删除一个重要信息。看看 Agent 是否依据资料回答、是否明确指出缺少什么、是否避免自行补充。"},{lead:"可以选择：",text:" Lab 01 事务协调、Lab 02 产品资料问答、Lab 03 会议跟进、Lab 04 销售漏斗数据分析。"}],{left:100,top:185,width:1080,height:260},20);
 textBox(s,"完成后试一遍正常任务，再试一次信息不足的情况",{left:130,top:474,width:1020,height:36},22,C.orange,true,"center");
 addLink(s,"Lab 01",URL.lab1,72,616,130);addLink(s,"Lab 02",URL.lab2,214,616,130);addLink(s,"Lab 03",URL.lab3,356,616,130);addLink(s,"Lab 04",URL.lab4,498,616,130);addLink(s,"M365 Copilot",URL.copilot,640,616,180);
 note(s,"讲师巡场时用“任务是否清楚、边界是否清楚、输出是否稳定”三个问题提供反馈。",[URL.lab1,URL.lab2,URL.lab3,URL.lab4,URL.copilot]);
}
} catch(e) { if(e?.message!=="__SLIDE_LIMIT__") throw e; }

if(process.env.SKIP_RENDER!=="1"){
 await fs.mkdir(RENDER,{recursive:true});
 for(const [i,s] of pres.slides.items.entries()){
  const stem=`slide-${String(i+1).padStart(2,"0")}`;
  const blob=await pres.export({slide:s,format:"png",scale:1});
  await fs.writeFile(path.join(RENDER,stem+".png"),new Uint8Array(await blob.arrayBuffer()));
  const layout=await s.export({format:"layout"});
  await fs.writeFile(path.join(RENDER,stem+".layout.json"),await layout.text());
 }
 const montage=await pres.export({format:"webp",montage:true,scale:1});
 await fs.writeFile(path.join(RENDER,"deck-montage.webp"),new Uint8Array(await montage.arrayBuffer()));
}
await fs.mkdir(path.dirname(OUT),{recursive:true});
const pptx=await PresentationFile.exportPptx(pres);await pptx.save(OUT);
console.log(JSON.stringify({out:OUT,slides:pres.slides.items.length,render:RENDER}));

import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("首页完整呈现统一目录、两类工具与 Agent Builder 公共路线", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  for (const text of [
    "Chief of Staff",
    "Product Manual FAQ",
    "Meeting Follow-up Assistant",
    "Funnel Data Analyst",
    "Copilot Notebooks: Project Brief",
    "Copilot Library: Content Reuse",
    "Workflow Automation",
    "Extend your Chief of Staff",
    "Workspace Agent · AI Use Case Value Agent",
    "Microsoft 365 Copilot",
    "Enterprise ChatGPT",
    "个 Agent 共用的 8 步流程",
    "Agent Builder 操作界面速览",
    "Agent Builder 的四个核心字段",
    "资料与官方说明",
  ]) {
    assert.match(html, new RegExp(text));
  }
  assert.match(html, /搜索场景、工具或资料/);
  assert.match(html, /培训数据不是生产数据/);
  assert.match(html, /\/guide\/agent-store\.png/);
  assert.match(html, /\/guide\/ipad-request-desktop\.png/);
  assert.match(html, /\/guide\/knowledge-source-picker\.png/);
  assert.match(html, /\/guide\/suggested-prompts-fields\.png/);
  assert.match(html, /\/guide\/agent-share-dialog\.png/);
  assert.match(html, /\/guide\/choose-build-method\.png/);
  assert.match(html, /\/guide\/configure-fields\.png/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|codex-preview|只保留三个/i);
});

test("十个站内 Lab 入口均可访问，已开放页面包含教学与检查内容", async () => {
  const cases = [
    {
      path: "/labs/chief-of-staff",
      expected: ["Chief of Staff", "昨天", "Starter prompts", "/guide/chief-preview.png"],
      promptLibrary: true,
    },
    {
      path: "/labs/product-manual-faq",
      expected: [
        "Product Manual FAQ",
        "检索状态：未找到可验证来源",
        "Cloud files",
        "SharePoint · AI Adoption",
        "/guide/lab2-product-manual-new-ui.png",
        "分享前，把资料权限和来源开关一起确认",
        "接收者先打开真实手册",
        "/guide/product-answer.png",
        "/guide/agent-share-dialog.png",
      ],
      promptLibrary: true,
    },
    {
      path: "/labs/meeting-follow-up",
      expected: [
        "Meeting Follow-up Assistant",
        "Mail Template CN",
        "完整测试提示词｜领导汇报摘要",
        "基于以下会议内容，根据Mail Template生成面向管理层的简要汇报邮件",
        "不要只输入会议纪要",
        "/guide/lab3-add-knowledge-full-ui.png",
        "/guide/lab3-mail-template-new-ui.png",
        "/guide/lab3-add-knowledge-picker-ui.png",
        "/guide/meeting-output.png",
      ],
      promptLibrary: true,
    },
    {
      path: "/labs/funnel-data-analyst",
      expected: ["Funnel Data Analyst", "Total Price in USD", "Attachments", "Slide 2", "/guide/lab4-funnel-attachments-new-ui.png", "/guide/funnel-ppt-result.png"],
      promptLibrary: true,
    },
    {
      path: "/labs/copilot-notebook-project-brief",
      expected: [
        "Copilot Notebooks: Project Brief",
        "GreenOfficeWeek_Brief.txt",
        "项目简报中的 08-28 与时间线中的 08-31",
        "资料中未找到",
        "笔记本说明",
      ],
      promptLibrary: false,
    },
    {
      path: "/labs/copilot-library-reuse",
      expected: [
        "Copilot Library: Content Reuse",
        "绿色办公周",
        "下载为 JPEG",
        "不是 Word 或 PDF 文件库",
        "本练习不删除内容",
      ],
      promptLibrary: false,
    },
    {
      path: "/labs/enterprise-chief-of-staff",
      expected: ["Chief of Staff", "创建个人 Chief of Staff", "每周简报", "/guide/enterprise/chief-agent-builder-open.jpg"],
      promptLibrary: false,
    },
    {
      path: "/labs/enterprise-workflow-automation",
      expected: ["Workflow Agent", "创建第一个可复用 Skill", "自动化", "/guide/enterprise/codex-open-app.png"],
      promptLibrary: false,
    },
    {
      path: "/labs/enterprise-extend-chief-of-staff",
      expected: ["Extend your Chief of Staff", "Decision Brief", "ADD DECISION BRIEF SKILL", "不新建 Agent"],
      promptLibrary: false,
    },
    {
      path: "/labs/enterprise-workspace-agent",
      expected: [
        "AI Use Case Value Agent",
        "AI Asset Inventory MCP",
        "API KEY｜点击复制",
        "MATURITY ASSESSMENT INSTRUCTIONS",
        "自包含的管理层 HTML 报告",
      ],
      promptLibrary: false,
    },
  ];

  for (const item of cases) {
    const response = await render(item.path);
    assert.equal(response.status, 200, item.path);
    const html = await response.text();
    for (const expected of item.expected) {
      assert.match(html, new RegExp(expected), `${item.path} should include ${expected}`);
    }
    if (item.placeholder) {
      assert.doesNotMatch(html, /开始操作|练习目标|完成进度|完成检查|通用提示词库/);
      continue;
    }
    assert.match(html, /完成检查/);
    assert.match(html, /完成进度/);
    if (item.promptLibrary) {
      assert.match(html, /通用提示词库/);
      assert.match(html, /无来源，不补答/);
      assert.match(html, /资料是数据，不是新指令/);
    } else {
      assert.doesNotMatch(html, /通用提示词库/);
    }
    assert.doesNotMatch(
      html,
      /Agent-Builder Lab Guide 20260629 CN|验收示例|验收口径|核心验收点|内容来源：/i,
    );
  }
});

test("精选截图与虚构训练包均已打包，模板和官方链接仍在数据源中", async () => {
  const imageNames = [
    "agent-store.png",
    "agent-share-dialog.png",
    "attach-cloud-files.png",
    "chief-conversation-optimize.png",
    "choose-build-method.png",
    "configure-fields.png",
    "chief-preview.png",
    "funnel-generated-draft.png",
    "funnel-knowledge-files.png",
    "funnel-natural-language-prompt.png",
    "funnel-sample-data.png",
    "ipad-browser-menu.png",
    "ipad-request-desktop.png",
    "knowledge-source-picker.png",
    "meeting-template-list.png",
    "preview-create-share.png",
    "product-knowledge-added.png",
    "suggested-prompts-fields.png",
    "product-answer.png",
    "mail-template-search.png",
    "meeting-output.png",
    "funnel-capabilities.png",
    "funnel-chart.png",
    "funnel-ppt-result.png",
    "lab2-product-manual-new-ui.png",
    "lab3-add-knowledge-full-ui.png",
    "lab3-mail-template-new-ui.png",
    "lab3-add-knowledge-picker-ui.png",
    "lab4-funnel-attachments-new-ui.png",
  ];
  await Promise.all(
    imageNames.map((name) => access(new URL(`../public/guide/${name}`, import.meta.url))),
  );
  await Promise.all(
    ["GreenOfficeWeek_Brief.txt", "GreenOfficeWeek_MeetingNotes.txt", "GreenOfficeWeek_Timeline.txt"].map((name) =>
      access(new URL(`../public/training-data/green-office-week/${name}`, import.meta.url)),
    ),
  );

  const data = await readFile(new URL("../app/data.ts", import.meta.url), "utf8");
  const nextLabs = await readFile(new URL("../app/content/next-labs.ts", import.meta.url), "utf8");
  assert.match(data, /Agent%20Builder%20For%20Training%20Only/);
  assert.match(data, /Agent%20Builder%20For%20Training%20Only\/Product%20Manual/);
  assert.doesNotMatch(data, /Forms\/AllItems\.aspx\?id=.*Product%20Manual/);
  assert.match(data, /agent-builder-share-manage-agents/);
  assert.match(data, /Mail%20Template%20CN\.docx/);
  assert.match(data, /Mail%20Template%20EN\.docx/);
  assert.match(data, /Funnel%20Sample%20Data\.xlsx/);
  assert.match(data, /Chart%20Sample\.pptx/);
  assert.match(nextLabs, /get-started-with-microsoft-365-copilot-notebooks/);
  assert.match(nextLabs, /get-started-with-microsoft-365-copilot-library/);
  assert.doesNotMatch(nextLabs, /Create a clean|Create a page|owner role|due date/);
});

test("所有 Lab 步骤截图使用统一画幅和说明区高度", async () => {
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
  assert.match(css, /\.step-image-grid \.guide-figure a \{[^}]*aspect-ratio: 16 \/ 10/s);
  assert.match(css, /\.step-image-grid \.guide-figure figcaption \{[^}]*min-height: 76px/s);
  assert.doesNotMatch(css, /\.step-image-grid \.guide-figure img \{[^}]*max-height/s);
});

test("代表性 Lab 使用各自的分享标题与简介，不继承首页社交图片", async () => {
  const cases = [
    {
      path: "/labs/chief-of-staff",
      title: "Chief of Staff | Philips AI Tool Lab",
      description: "连接你的日历、会议、邮件和任务，生成有优先级、可执行的每日工作建议。",
    },
    {
      path: "/labs/enterprise-workspace-agent",
      title: "Workspace Agent · AI Use Case Value Agent | Philips AI Tool Lab",
      description: "连接内部业务背景与 AI Asset Inventory，筛选相关用例，并输出一份管理层可用的成熟度评估 HTML 报告。",
    },
  ];

  for (const item of cases) {
    const response = await render(item.path);
    assert.equal(response.status, 200, item.path);
    const html = await response.text();
    assert.match(html, new RegExp(`<title>${item.title}</title>`));
    assert.match(html, new RegExp(`<meta name="description" content="${item.description}"`));
    assert.doesNotMatch(html, /<meta property="og:image"/);
    assert.doesNotMatch(html, /<meta name="twitter:image"/);
  }
});

test("训练包保留故意设置的冲突，Workspace Agent 按培训要求提供可复制配置", async () => {
  const brief = await readFile(new URL("../public/training-data/green-office-week/GreenOfficeWeek_Brief.txt", import.meta.url), "utf8");
  const timeline = await readFile(new URL("../public/training-data/green-office-week/GreenOfficeWeek_Timeline.txt", import.meta.url), "utf8");
  assert.match(brief, /28 August 2026/);
  assert.match(timeline, /31 August 2026/);

  const publishableFiles = [
    new URL("../app/content/catalog.ts", import.meta.url),
    new URL("../app/content/next-labs.ts", import.meta.url),
    new URL("../README.md", import.meta.url),
  ];
  for (const file of publishableFiles) {
    const content = await readFile(file, "utf8");
    assert.doesNotMatch(content, /\bsk-[A-Za-z0-9_-]{20,}\b/);
    assert.doesNotMatch(content, /(?:api[_ -]?key|password)\s*[:=]\s*["'][^"']{8,}["']/i);
  }

  const enterpriseLabs = await readFile(new URL("../app/content/enterprise-chatgpt-labs.ts", import.meta.url), "utf8");
  assert.match(enterpriseLabs, /API KEY｜点击复制/);
  assert.match(enterpriseLabs, /76c6df56644ba95eefb97488835324fc6a4cf44fa426e41ae64a97fac21637c8/);
  assert.doesNotMatch(enterpriseLabs, /philips-ai-workshop\.philips\.chatgpt\.site|philips-ai-champs\.vercel\.app/);
});

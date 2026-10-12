import { labs } from "../data.ts";
import type { LabCatalogItem, LabCategory } from "./types.ts";

export const labCategories: LabCategory[] = [
  {
    id: "m365-copilot",
    eyebrow: "Microsoft 365 练习",
    title: "Microsoft 365 Copilot",
    description: "包括 Agent Builder、Copilot 笔记本和 Copilot 内容库练习。",
    access: "需要工作或学校账号；具体功能取决于许可证和公司账号的开放情况。",
    accent: "azure",
  },
  {
    id: "enterprise-chatgpt",
    eyebrow: "企业 ChatGPT 练习",
    title: "Enterprise ChatGPT",
    description: "从个人 Chief of Staff 到 Workflow Automation 与 Workspace Agent，在站内完成可复制、可验证的分步训练。",
    access: "需要使用企业允许的 ChatGPT 登录方式；所有培训说明均在本站展开，不再跳转原培训站。",
    accent: "violet",
  },
];

export const labCatalog: LabCatalogItem[] = [
  ...labs.map((lab) => ({
    slug: lab.slug,
    title: lab.title,
    summary: lab.summary,
    mode: lab.mode,
    tone: lab.tone,
    duration: lab.duration,
    sourcesLabel: lab.sourcesLabel,
    platform: lab.platform,
    track: lab.track,
    availability: lab.availability,
    href: `/labs/${lab.slug}`,
  })),
];

export function getCategory(id: LabCategory["id"]) {
  return labCategories.find((category) => category.id === id);
}

export type Prompt = { title: string; text: string };
export type PromptModule = Prompt & { category: string; useWhen: string };
export type GuideImage = { src: string; alt: string; caption: string };

export type LabStep = {
  title: string;
  text: string;
  panelTitle?: string;
  panelText?: string;
  links?: { title: string; label: string; href: string }[];
  callout?: string;
  images?: GuideImage[];
};

export type LabPlatform = "m365-copilot" | "enterprise-chatgpt";
export type LabAvailability = "ready" | "pilot" | "placeholder" | "external";
export type LabTone = "green" | "blue" | "amber" | "violet";
export type LabPart = { badge: string; title: string; description: string };
export type LabReflection = { title: string; text: string; checks: string[] };

export type Lab = {
  slug: string;
  title: string;
  summary: string;
  mode: string;
  tone: LabTone;
  duration: string;
  sourcesLabel: string;
  platform: LabPlatform;
  track: string;
  availability: LabAvailability;
  outcome: string;
  deliverables: string[];
  buildMethod: string;
  description: string;
  instructions: string;
  prompts: Prompt[];
  steps: LabStep[];
  checklist: string[];
  partOne?: LabPart;
  partTwo?: LabPart;
  showPromptLibrary?: boolean;
  reflection?: LabReflection;
};

export type LabCatalogItem = Pick<
  Lab,
  | "slug"
  | "title"
  | "summary"
  | "mode"
  | "tone"
  | "duration"
  | "sourcesLabel"
  | "platform"
  | "track"
  | "availability"
> & {
  href: string;
  external?: boolean;
};

export type LabCategory = {
  id: LabPlatform;
  eyebrow: string;
  title: string;
  description: string;
  access: string;
  accent: "azure" | "violet";
};

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Checklist } from "../../components/Checklist.tsx";
import { CopyPanel, PromptCard } from "../../components/CopyPanel.tsx";
import {
  genericPromptModules,
  getLab,
  labs,
  productManualSharingChecks,
  productManualSourceSettings,
} from "../../data.ts";

export function generateStaticParams() { return labs.map((lab) => ({ slug: lab.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) return {};
  const title = `${lab.title} | Philips AI Tool Lab`;
  return {
    title,
    description: lab.summary,
    openGraph: { title, description: lab.summary, images: [] },
    twitter: { title, description: lab.summary, images: [] },
  };
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lab = getLab(slug);
  if (!lab) notFound();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const publicAsset = (path: string) => `${basePath}${path}`;
  const categoryLabs = labs.filter((item) => item.platform === lab.platform);
  const labIndex = categoryLabs.findIndex((item) => item.slug === slug);
  const nextLab = categoryLabs[(labIndex + 1) % categoryLabs.length];
  const platformLabel = lab.platform === "m365-copilot" ? "MICROSOFT 365 COPILOT" : "ENTERPRISE CHATGPT";
  const partOne = lab.partOne ?? { badge: "第一部分", title: "创建并配置 Agent", description: "按照顺序完成字段、知识源与能力设置。" };
  const partTwo = lab.partTwo ?? { badge: "第二部分", title: "添加提示并验证结果", description: "复制真实测试问题，检查来源、口径和信息边界。" };
  const reflection = lab.reflection ?? {
    title: "完成前复盘",
    text: "不只确认“能回答”，还要确认它使用了正确来源、遵守信息边界，并能被下一位使用者理解。",
    checks: ["只连接完成任务真正需要的数据", "保留一个有证据结果和一个边界测试", "记录假设、待确认项和下一步责任人"],
  };

  if (lab.availability === "placeholder") {
    return (
      <main>
        <header className="detail-header">
          <div className="shell detail-header-inner">
            <Link className="brand" href="/">
              <span className="brand-philips">PHILIPS</span><span className="brand-divider">×</span><span className="brand-lab">AI Tool Lab</span>
            </Link>
            <nav className="detail-nav" aria-label="Lab 导航">
              <Link className="button button-quiet" href="/">全部 Lab</Link>
            </nav>
          </div>
        </header>
        <section className="shell detail-hero placeholder-page">
          <p className="eyebrow">ENTERPRISE CHATGPT · 入门</p>
          <h1>{lab.title}</h1>
          <p className="detail-lede">内容暂未提供。</p>
          <Link className="button button-primary" href="/">返回全部 Lab</Link>
        </section>
        <footer className="footer"><div className="shell footer-inner"><div><strong>PHILIPS</strong><span>AI Tool Lab · 内部培训</span></div></div></footer>
      </main>
    );
  }

  return (
    <main>
      <header className="detail-header">
        <div className="shell detail-header-inner">
          <Link className="brand" href="/">
            <span className="brand-philips">PHILIPS</span><span className="brand-divider">×</span><span className="brand-lab">AI Tool Lab</span>
          </Link>
          <nav className="detail-nav" aria-label="Lab 导航">
            <Link className="button button-quiet" href="/">全部 Lab</Link>
            <a className="button button-outline" href="#steps">开始操作</a>
          </nav>
        </div>
      </header>

      <section className="shell detail-hero">
        <p className="eyebrow">{platformLabel} · {lab.track} · 练习 {String(labIndex + 1).padStart(2, "0")}</p>
        <h1>{lab.title}</h1>
        <p className="detail-lede">{lab.summary}</p>
        <div className="pill-row"><span className="pill">{lab.duration}</span><span className="pill">{lab.mode}</span><span className="pill">{lab.sourcesLabel}</span></div>
        <div className="build-summary">
          <div><p className="eyebrow">练习目标</p><h2>{lab.outcome}</h2><p>推荐方式：{lab.buildMethod}</p></div>
          <div className="deliverables"><strong>练习结果</strong>{lab.deliverables.map((item) => <span key={item}>— {item}</span>)}</div>
        </div>
      </section>

      <section className="shell" id="steps">
        <div className="part-banner"><div className="part-badge">{partOne.badge}</div><div><h2>{partOne.title}</h2><p>{partOne.description}</p></div></div>
        <div className="step-list">
          {lab.steps.map((step, index) => {
            const panelText = step.panelText === "__LAB_INSTRUCTIONS__" ? lab.instructions : step.panelText;
            return (
              <article className="step-card" key={step.title}>
                <div className="step-index">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <h3>{step.title}</h3><p>{step.text}</p>
                  {step.links && <div className="source-list">{step.links.map((link) => <a className="source-link" href={link.href.startsWith("/") ? publicAsset(link.href) : link.href} target="_blank" rel="noreferrer" key={link.title}><strong>{link.title} ↗</strong><span>{link.label}</span></a>)}</div>}
                  {panelText && <CopyPanel title={step.panelTitle ?? "可复制内容"} text={panelText} />}
                  {step.callout && <div className="callout"><strong>注意：</strong> {step.callout}</div>}
                  {step.images && (
                    <div className="guide-image-grid step-image-grid">
                      {step.images.map((image) => (
                        <figure className="guide-figure" key={image.src}>
                          <a href={publicAsset(image.src)} target="_blank" rel="noreferrer" aria-label={`${image.alt}，打开大图`}>
                            <img src={publicAsset(image.src)} alt={image.alt} loading="lazy" />
                          </a>
                          <figcaption>{image.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {lab.slug === "product-manual-faq" && (
          <section className="product-guardrails" id="source-settings" aria-labelledby="product-guardrails-title">
            <div className="section-heading">
              <div>
                <p className="eyebrow">权限与来源检查</p>
                <h2 id="product-guardrails-title">分享前，把资料权限和来源开关一起确认</h2>
              </div>
              <p>创建者能查、接收者不能查时，优先按 SharePoint 权限问题处理；开关设置只决定检索范围，不能替代底层资料授权。</p>
            </div>

            <div className="diagnostic-banner">
              <span>最常见情况</span>
              <div>
                <strong>创建者有答案，接收者没有引用</strong>
                <p>Agent 通常没有损坏。先确认接收者能否用自己的账号打开 Product Manual 文件夹内的一份真实手册，再重新分享 Agent 和知识源。</p>
              </div>
            </div>

            <div className="sharing-check-grid">
              {productManualSharingChecks.map((item, index) => (
                <article className="sharing-check-card" key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            <div className="source-settings-panel">
              <div className="source-settings-head">
                <div>
                  <p className="eyebrow">建议设置</p>
                  <h3>Product Manual FAQ 的来源设置</h3>
                </div>
                <span className="settings-summary">新版 Configure · 仅保留必要来源</span>
              </div>
              <div className="source-settings-grid">
                {productManualSourceSettings.map((item) => (
                  <article className="source-setting-card" key={item.name}>
                    <div className="source-setting-title">
                      <strong>{item.name}</strong>
                      <span className={`setting-state setting-state-${item.tone}`}>{item.setting}</span>
                    </div>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <div className="part-banner"><div className="part-badge">{partTwo.badge}</div><div><h2>{partTwo.title}</h2><p>{partTwo.description}</p></div></div>
        <div className="prompt-grid">{lab.prompts.map((prompt) => <PromptCard key={prompt.title} {...prompt} />)}</div>

        {lab.showPromptLibrary !== false && <section className="prompt-library" id="prompt-library" aria-labelledby="prompt-library-title">
          <div className="prompt-library-heading">
            <div>
              <p className="eyebrow">可复用提示词</p>
              <h2 id="prompt-library-title">通用提示词库</h2>
              <p>按当前 Agent 的风险和任务选择 2–4 个模块，粘贴到 Instructions 末尾。不要为了“更完整”全部堆入，避免规则重复或互相冲突。</p>
            </div>
            <span className="library-badge">按需组合</span>
          </div>
          <div className="prompt-library-grid">
            {genericPromptModules.map((prompt) => <PromptCard key={prompt.title} {...prompt} />)}
          </div>
        </section>}

        <div className="section"><Checklist slug={lab.slug} items={lab.checklist} /></div>
        <aside className="reflection-card">
          <div>
            <p className="eyebrow">完成检查</p>
            <h2>{reflection.title}</h2>
            <p>{reflection.text}</p>
          </div>
          <div className="reflection-grid">
            {reflection.checks.map((check, index) => <span key={check}><strong>{String(index + 1).padStart(2, "0")}</strong>{check}</span>)}
          </div>
        </aside>
        <div className="back-row">
          <Link className="button button-quiet" href="/">← 返回全部 Lab</Link>
          <Link className="button button-primary" href={`/labs/${nextLab.slug}`}>下一个：{nextLab.title} →</Link>
        </div>
      </section>
      <footer className="footer"><div className="shell footer-inner"><div><strong>PHILIPS</strong><span>AI Tool Lab · 内部培训</span></div><span>{lab.track} · 分步培训资料</span></div></footer>
    </main>
  );
}

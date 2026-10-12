import { LabCatalog } from "./components/LabCatalog.tsx";
import { labCatalog, labCategories } from "./content/catalog.ts";
import {
  agentBuilderLabs,
  fieldGuide,
  prerequisites,
  referenceLinks,
  sharedSteps,
  workflowImages,
} from "./data.ts";

export default function Home() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const publicAsset = (path: string) => `${basePath}${path}`;
  const m365LabCount = labCatalog.filter((lab) => lab.platform === "m365-copilot").length;

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Philips AI Tool Lab 首页">
          <span className="brand-philips">PHILIPS</span>
          <span className="brand-divider">×</span>
          <span className="brand-lab">AI Tool Lab</span>
        </a>
        <nav className="site-nav" aria-label="主导航">
          <a className="button button-quiet" href="#tracks">工具路线</a>
          <a className="button button-primary" href="#labs">探索 {labCatalog.length} 个 Lab</a>
        </nav>
      </header>

      <section className="hero shell portal-hero" id="top">
        <div className="hero-aura hero-aura-one" aria-hidden="true" />
        <div className="hero-aura hero-aura-two" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">PHILIPS AI TOOL LAB · 内部培训</p>
          <h1>
            把 AI 工具变成
            <br />
            <span>可重复的工作方法。</span>
          </h1>
          <p className="hero-copy">
            选择一个工作场景，按照步骤完成练习并检查结果。
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-large" href="#labs">选择一个 Lab</a>
            <a className="button button-outline button-large" href="#agent-builder-path">查看 Agent Builder 路线</a>
          </div>
          <div className="pill-row" aria-label="培训信息">
            <span className="pill">2 条工具路线</span>
            <span className="pill">{labCatalog.length} 个 Lab 入口</span>
            <span className="pill">中文分步练习</span>
            <span className="pill">虚构训练数据优先</span>
          </div>
        </div>

        <div className="hero-board portal-board">
          <div>
            <p className="eyebrow">动手练习</p>
            <h2>选择、动手、检查。</h2>
            <p>每个 Lab 提供前置条件、步骤、中文提示词和完成检查。</p>
          </div>
          <div className="hero-stats">
            <div><strong>2</strong><span>AI 工具类别</span></div>
            <div><strong>{m365LabCount}</strong><span>M365 Copilot Lab</span></div>
            <div><strong>{agentBuilderLabs.length}</strong><span>Agent Builder 实战</span></div>
          </div>
        </div>
      </section>

      <section className="section section-tint" id="tracks">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">选择工具</p>
              <h2>先选工具，再选场景</h2>
            </div>
            <p>两个类别都应限制资料范围、保留来源并人工检查重要结果。</p>
          </div>
          <div className="track-grid">
            {labCategories.map((category) => {
              const count = labCatalog.filter((lab) => lab.platform === category.id).length;
              return (
                <article className={`track-card track-card-${category.accent}`} key={category.id}>
                  <div className="track-card-top">
                    <p className="eyebrow">{category.eyebrow}</p>
                    <span>{String(count).padStart(2, "0")} 个练习</span>
                  </div>
                  <h3>{category.title}</h3>
                  <p>{category.description}</p>
                  <div className="track-access"><strong>访问提示</strong><span>{category.access}</span></div>
                  <a href="#labs">浏览该路线 <span aria-hidden="true">↓</span></a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="shell section" id="labs">
        <div className="section-heading catalog-heading">
          <div>
            <p className="eyebrow">练习目录</p>
            <h2>从一个可完成的成果开始</h2>
          </div>
          <p>可按工具或关键词筛选。试用课程使用虚构资料。</p>
        </div>
        <LabCatalog items={labCatalog} />
      </section>

      <section className="shell safety-strip" aria-labelledby="safety-title">
        <span className="safety-mark" aria-hidden="true">✓</span>
        <div>
          <p className="eyebrow">练习说明</p>
          <h2 id="safety-title">培训数据不是生产数据</h2>
          <p>
            默认只使用随 Lab 提供的虚构资料。不要上传患者、消费者或员工个人信息、真实合同或价格、未发布产品资料。企业资料能否使用，以 Philips 数据分类和公司规定为准。
          </p>
        </div>
      </section>

      <section className="section section-tint" id="agent-builder-path">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Agent Builder 路线</p>
              <h2>{agentBuilderLabs.length} 个 Agent 共用的 8 步流程</h2>
            </div>
            <p>这是 4 个 Agent Builder Lab 共用的流程。Copilot 笔记本和内容库使用各自页面中的步骤。</p>
          </div>
          <div className="timeline">
            {sharedSteps.map((step, index) => (
              <div className="timeline-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">开始前</p>
            <h2>开始前检查</h2>
          </div>
          <p>先确认许可证、入口与资料权限，避免在知识源连接或分享环节中断。</p>
        </div>
        <div className="prereq-grid">
          {prerequisites.map((item, index) => (
            <div className="prereq" key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-tint workflow-gallery">
        <div className="shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">操作预览</p>
              <h2>Agent Builder 操作界面速览</h2>
            </div>
            <p>按操作顺序展示从入口到分享的关键界面。点击图片可查看大图，具体 Lab 页面提供对应步骤与结果参考。</p>
          </div>
          <div className="guide-image-grid">
            {workflowImages.map((image) => (
              <figure className="guide-figure" key={image.src}>
                <a href={publicAsset(image.src)} target="_blank" rel="noreferrer" aria-label={`${image.alt}，打开大图`}>
                  <img src={publicAsset(image.src)} alt={image.alt} loading="lazy" />
                </a>
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="shell section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">配置说明</p>
            <h2>Agent Builder 的四个核心字段</h2>
          </div>
          <p>不同 Agent 的内容会变化，但这四个字段的作用不变。Instructions 中的来源限制和防杜撰规则必须完整保留。</p>
        </div>
        <div className="field-grid">
          {fieldGuide.map((field) => (
            <article className="field-card" key={field.name}>
              <span>{field.limit}</span>
              <h3>{field.name}</h3>
              <p>{field.detail}</p>
            </article>
          ))}
        </div>

        <div className="reference-panel">
          <div>
            <p className="eyebrow">参考资料</p>
            <h2>资料与官方说明</h2>
            <p>培训资料用于练习，官方文档用于确认入口、能力、许可、分享方式与平台限制。</p>
          </div>
          <div className="reference-grid">
            {referenceLinks.map((link) => (
              <a href={link.href} target="_blank" rel="noreferrer" key={link.title}>
                <strong>{link.title} ↗</strong>
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="shell footer-inner">
          <div><strong>PHILIPS</strong><span>AI Tool Lab · 内部培训</span></div>
          <a href="#top">返回顶部 ↑</a>
        </div>
      </footer>
    </main>
  );
}

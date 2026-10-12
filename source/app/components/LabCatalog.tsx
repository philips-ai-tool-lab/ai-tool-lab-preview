"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LabCatalogItem, LabPlatform } from "../content/types.ts";

const platformLabels: Record<LabPlatform, string> = {
  "m365-copilot": "Microsoft 365 Copilot",
  "enterprise-chatgpt": "Enterprise ChatGPT",
};

const availabilityLabels: Record<LabCatalogItem["availability"], string> = {
  ready: "可直接练习",
  pilot: "试用课程",
  placeholder: "内容待补充",
  external: "外部入口",
};

export function LabCatalog({ items }: { items: LabCatalogItem[] }) {
  const [platform, setPlatform] = useState<"all" | LabPlatform>("all");
  const [query, setQuery] = useState("");

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");
    return items.filter((item) => {
      const matchesPlatform = platform === "all" || item.platform === platform;
      const searchable = `${item.title} ${item.summary} ${item.track} ${item.sourcesLabel}`.toLocaleLowerCase("zh-CN");
      return matchesPlatform && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [items, platform, query]);

  return (
    <div>
      <div className="catalog-toolbar">
        <div className="filter-group" role="group" aria-label="按 AI 工具筛选">
          {([
            ["all", "全部"],
            ["m365-copilot", "M365 Copilot"],
            ["enterprise-chatgpt", "Enterprise ChatGPT"],
          ] as const).map(([value, label]) => (
            <button
              className={platform === value ? "filter-button is-active" : "filter-button"}
              key={value}
              onClick={() => setPlatform(value)}
              type="button"
              aria-pressed={platform === value}
            >
              {label}
            </button>
          ))}
        </div>
        <label className="catalog-search">
          <span className="screen-reader-only">搜索 Lab</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索场景、工具或资料…"
          />
          <span aria-hidden="true">⌕</span>
        </label>
      </div>

      <p className="catalog-result" aria-live="polite">
        显示 {visibleItems.length} / {items.length} 个 Lab
      </p>

      {visibleItems.length > 0 ? (
        <div className="lab-grid catalog-grid">
          {visibleItems.map((lab, index) => {
            const actionLabel = lab.external ? "打开原培训站 ↗" : "打开分步指南 →";
            const actionClassName = lab.external ? "button button-secondary" : "button button-primary";
            const action = lab.external ? (
              <a className={actionClassName} href={lab.href} target="_blank" rel="noreferrer">
                {actionLabel}
              </a>
            ) : (
              <Link className={actionClassName} href={lab.href}>
                {actionLabel}
              </Link>
            );

            return (
              <article className={`lab-card catalog-card catalog-card-${lab.tone}`} key={lab.slug}>
                <div className="lab-number">{String(index + 1).padStart(2, "0")}</div>
                <div className="lab-card-body">
                  <div className="catalog-card-labels">
                    <span className={`status status-${lab.tone}`}>{availabilityLabels[lab.availability]}</span>
                    <span className="track-label">{lab.track}</span>
                  </div>
                  <p className="platform-label">{platformLabels[lab.platform]}</p>
                  <h3>{lab.title}</h3>
                  <p>{lab.summary}</p>
                  <div className="mini-meta">
                    <span>{lab.duration}</span>
                    <span>{lab.sourcesLabel}</span>
                  </div>
                  {action}
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="catalog-empty">
          <strong>没有匹配的 Lab</strong>
          <span>换一个关键词，或切换到“全部”。</span>
        </div>
      )}
    </div>
  );
}

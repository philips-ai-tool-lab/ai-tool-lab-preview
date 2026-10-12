"use client";

import { useState } from "react";

async function writeToClipboard(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      const copied = await Promise.race([
        navigator.clipboard.writeText(text).then(() => true),
        new Promise<boolean>((resolve) => window.setTimeout(() => resolve(false), 500)),
      ]);
      if (copied) return true;
    } catch {
      // Continue to the browser-compatible fallback below.
    }
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    return document.execCommand("copy");
  } finally {
    textarea.remove();
  }
}

export function CopyPanel({ title, text }: { title: string; text: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    const copied = await writeToClipboard(text);
    setStatus(copied ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), 1800);
  }
  return (
    <div className="copy-panel">
      <div className="copy-panel-head">
        <span>{title}</span>
        <button className="copy-button" onClick={copy} type="button" aria-label={`复制${title}`} aria-live="polite">
          {status === "copied" ? "已复制 ✓" : status === "error" ? "请手动复制" : "复制"}
        </button>
      </div>
      <pre className="copy-content">{text}</pre>
    </div>
  );
}

export function PromptCard({
  title,
  text,
  category,
  useWhen,
}: {
  title: string;
  text: string;
  category?: string;
  useWhen?: string;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  async function copy() {
    const copied = await writeToClipboard(text);
    setStatus(copied ? "copied" : "error");
    window.setTimeout(() => setStatus("idle"), 1800);
  }
  return (
    <article className="prompt-card">
      {category && <span className="prompt-category">{category}</span>}
      <h3>{title}</h3>
      {useWhen && <p className="prompt-use"><strong>适用：</strong>{useWhen}</p>}
      <p>{text}</p>
      <button className="copy-button" onClick={copy} type="button" aria-live="polite">
        {status === "copied" ? "已复制 ✓" : status === "error" ? "请手动复制" : "复制提示词"}
      </button>
    </article>
  );
}

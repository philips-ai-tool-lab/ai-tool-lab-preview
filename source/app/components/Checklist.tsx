"use client";

import { useEffect, useState } from "react";

export function Checklist({ slug, items }: { slug: string; items: string[] }) {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));
  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      const saved = window.localStorage.getItem(`lab-checklist-${slug}`);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setChecked(items.map((_, index) => parsed[index] === true));
        } catch {
          window.localStorage.removeItem(`lab-checklist-${slug}`);
        }
      }
    }, 0);
    return () => window.clearTimeout(restoreTimer);
  }, [items, slug]);
  function toggle(index: number) {
    const next = checked.map((value, itemIndex) => itemIndex === index ? !value : value);
    setChecked(next);
    window.localStorage.setItem(`lab-checklist-${slug}`, JSON.stringify(next));
  }
  const done = checked.filter(Boolean).length;
  const percent = items.length === 0 ? 0 : Math.round((done / items.length) * 100);
  return (
    <section className="checklist" aria-labelledby="completion-title">
      <p className="eyebrow">练习完成情况</p>
      <h2 id="completion-title">完成检查</h2>
      <p>逐项确认。进度只保存在当前设备上。</p>
      <div className="check-items">
        {items.map((item, index) => (
          <label className="check-item" key={item}>
            <input type="checkbox" checked={checked[index] ?? false} onChange={() => toggle(index)} />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className="progress-track" aria-label={`完成进度 ${percent}%`}><div className="progress-fill" style={{ width: `${percent}%` }} /></div>
      <div className="progress-label"><span>{done} / {items.length} 已完成</span><strong>{percent}%</strong></div>
    </section>
  );
}

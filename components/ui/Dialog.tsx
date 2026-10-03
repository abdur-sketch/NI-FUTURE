"use client";

import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from "react";
import { Icon } from "../icons/Icon";

const focusable = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

export function Dialog({ open, onClose, title, description, children }: { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode }) {
  const titleId = useId(), descriptionId = useId(), panelRef = useRef<HTMLDivElement>(null), previousFocus = useRef<HTMLElement | null>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);

  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    const initial = panel?.querySelector<HTMLElement>("[data-autofocus], input, select, textarea, button");
    requestAnimationFrame(() => initial?.focus());
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") { event.preventDefault(); closeRef.current(); return; }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(focusable)];
      if (!items.length) { event.preventDefault(); panel.focus(); return; }
      const first = items[0], last = items.at(-1)!;
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    document.addEventListener("keydown", keydown);
    return () => {
      document.removeEventListener("keydown", keydown);
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus();
    };
  }, [open]);

  if (!open) return null;
  function backdrop(event: MouseEvent<HTMLDivElement>) { if (event.target === event.currentTarget) onClose(); }
  return <div className="ni-dialog-backdrop" onMouseDown={backdrop}>
    <div ref={panelRef} className="ni-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={description ? descriptionId : undefined} tabIndex={-1}>
      <div className="ni-dialog__header"><div><h2 className="ni-dialog__title" id={titleId}>{title}</h2>{description && <p className="ni-dialog__description" id={descriptionId}>{description}</p>}</div><button className="ni-dialog__close" type="button" onClick={onClose} aria-label="Tutup dialog"><Icon name="close"/></button></div>
      {children}
    </div>
  </div>;
}

"use client";

import { useId, useState } from "react";
import { Icon } from "../icons/Icon";

export type AccordionItem = { title: string; content: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const prefix = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return <div className="ni-accordion">
    {items.map((item, index) => {
      const open = openIndex === index;
      const triggerId = `${prefix}-trigger-${index}`;
      const panelId = `${prefix}-panel-${index}`;
      return <div className="ni-accordion__item" key={item.title}>
        <h3><button id={triggerId} type="button" aria-expanded={open} aria-controls={panelId} onClick={() => setOpenIndex(open ? null : index)}><span>{item.title}</span><Icon name="chevron-down" /></button></h3>
        <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!open} className="ni-accordion__panel"><p>{item.content}</p></div>
      </div>;
    })}
  </div>;
}

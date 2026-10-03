import type { HTMLAttributes, ReactNode } from "react";
import { Container } from "./Container";

export function Section({ tone = "default", contained = true, className = "", children, ...props }: HTMLAttributes<HTMLElement> & { tone?: "default" | "subtle" | "forest"; contained?: boolean }) {
  const content = contained ? <Container>{children}</Container> : children;
  return <section className={`ni-section ni-section--${tone} ${className}`} {...props}>{content}</section>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <div className="ni-eyebrow">{children}</div>; }
export function SectionHeader({ eyebrow, title, description, actions, align = "left" }: { eyebrow?: ReactNode; title: ReactNode; description?: ReactNode; actions?: ReactNode; align?: "left" | "center" }) {
  return <header className={`ni-section-header ni-section-header--${align}`}>{eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}<h2 className="ni-section-title">{title}</h2>{description && <p className="ni-section-description">{description}</p>}{actions && <div className="ni-section-actions">{actions}</div>}</header>;
}

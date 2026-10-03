import type { HTMLAttributes } from "react";

export type CardVariant = "base" | "feature" | "program" | "metric" | "result" | "portfolio" | "admin";
export function Card({ variant = "base", className = "", ...props }: HTMLAttributes<HTMLElement> & { variant?: CardVariant }) {
  return <article className={`ni-card ni-card--${variant} ${className}`} {...props}/>;
}

import type { HTMLAttributes } from "react";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "danger" | "info";
export function Badge({ variant = "neutral", className = "", ...props }: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return <span className={`ni-badge ni-badge--${variant} ${className}`} {...props}/>;
}

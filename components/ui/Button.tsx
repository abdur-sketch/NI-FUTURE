import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export function buttonClassName(variant: ButtonVariant = "primary", size: ButtonSize = "md", className = "") {
  return `ni-button ni-button--${variant} ni-button--${size} ${className}`.trim();
}

export function Button({ variant = "primary", size = "md", loading = false, children, className = "", disabled, type = "button", ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean }) {
  return <button type={type} className={buttonClassName(variant, size, className)} disabled={disabled || loading} aria-busy={loading || undefined} {...props}>
    {loading && <span className="ni-button__spinner" aria-hidden="true"/>}
    <span>{loading ? "Memproses…" : children}</span>
  </button>;
}

export function ButtonLink({ href, variant = "primary", size = "md", children, className = "" }: { href: string; variant?: ButtonVariant; size?: ButtonSize; children: ReactNode; className?: string }) {
  return <Link href={href} className={buttonClassName(variant, size, className)}>{children}</Link>;
}

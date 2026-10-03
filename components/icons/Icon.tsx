import type { SVGProps } from "react";

export type IconName = "arrow-up-right" | "check" | "chevron-down" | "close" | "menu" | "spark";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-up-right": <><path d="M7 17 17 7"/><path d="M7 7h10v10"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  "chevron-down": <path d="m6 9 6 6 6-6"/>,
  close: <><path d="M6 6l12 12"/><path d="M18 6 6 18"/></>,
  menu: <><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
  spark: <path d="M12 3c.7 4.3 3.1 6.7 7 7-3.9.3-6.3 2.7-7 7-.7-4.3-3.1-6.7-7-7 3.9-.3 6.3-2.7 7-7Z"/>,
};

export function Icon({ name, size = 20, ...props }: SVGProps<SVGSVGElement> & { name: IconName; size?: 16 | 20 | 24 }) {
  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>{paths[name]}</svg>;
}

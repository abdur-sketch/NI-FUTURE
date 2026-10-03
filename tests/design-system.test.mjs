import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => Number.parseInt(value, 16) / 255).map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
function contrast(a, b) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

test("semantic color pairs meet WCAG AA", () => {
  assert.ok(contrast("#17603a", "#ffffff") >= 4.5, "primary on white");
  assert.ok(contrast("#526159", "#ffffff") >= 4.5, "muted text on white");
  assert.ok(contrast("#ffffff", "#08291d") >= 4.5, "white on forest");
  assert.ok(contrast("#2563eb", "#ffffff") >= 3, "focus boundary on white");
  assert.ok(contrast("#a12622", "#ffffff") >= 4.5, "danger text on white");
});

test("tokens and responsive foundations are centralized", async () => {
  const [tokens, foundation, shell] = await Promise.all([read("styles/tokens.css"), read("styles/foundation.css"), read("styles/shell.css")]);
  for (const token of ["--ni-green-50", "--ni-green-900", "--ni-forest-900", "--background", "--primary", "--focus-ring", "--space-1", "--space-30", "--radius-xl", "--shadow-lg"]) assert.match(tokens, new RegExp(token));
  assert.match(tokens, /--container-max: 78rem/);
  assert.match(foundation, /prefers-reduced-motion: reduce/);
  assert.match(foundation, /focus-visible/);
  assert.match(shell, /@media \(max-width: 1024px\)/);
  assert.match(shell, /@media \(max-width: 900px\)/);
  assert.match(shell, /@media \(max-width: 600px\)/);
});

test("button, form, card, badge and icon primitives expose required variants", async () => {
  const [button, form, card, badge, icon] = await Promise.all([read("components/ui/Button.tsx"), read("components/ui/Form.tsx"), read("components/ui/Card.tsx"), read("components/ui/Badge.tsx"), read("components/icons/Icon.tsx")]);
  for (const variant of ["primary", "secondary", "ghost", "danger"]) assert.match(button, new RegExp(`"${variant}"`));
  assert.match(button, /aria-busy/); assert.match(button, /disabled \|\| loading/);
  for (const primitive of ["Input", "Textarea", "Select", "Checkbox", "Radio", "FieldLabel", "FieldError"]) assert.match(form, new RegExp(`function ${primitive}|const ${primitive}`));
  for (const variant of ["feature", "program", "metric", "result", "portfolio", "admin"]) assert.match(card, new RegExp(`"${variant}"`));
  for (const variant of ["neutral", "primary", "success", "warning", "danger", "info"]) assert.match(badge, new RegExp(`"${variant}"`));
  assert.match(icon, /aria-hidden="true"/);
});

test("navigation and dialog implement keyboard accessibility contracts", async () => {
  const [navigation, dialog, footer] = await Promise.all([read("components/layout/SiteHeader.tsx"), read("components/ui/Dialog.tsx"), read("components/layout/SiteFooter.tsx")]);
  assert.match(navigation, /aria-expanded/); assert.match(navigation, /aria-controls/); assert.match(navigation, /event\.key === "Escape"/); assert.match(navigation, /triggerRef\.current\?\.focus/);
  assert.match(dialog, /role="dialog"/); assert.match(dialog, /aria-modal="true"/); assert.match(dialog, /event\.key !== "Tab"/); assert.match(dialog, /event\.key === "Escape"/); assert.match(dialog, /previousFocus\.current\?\.focus/); assert.match(dialog, /document\.body\.style\.overflow/);
  assert.doesNotMatch(footer, /href="\/admin"/);
});

test("design system preview is production-protected", async () => {
  const page = await read("app/design-system/page.tsx");
  assert.match(page, /dynamic = "force-dynamic"/);
  assert.match(page, /appEnvironment\(\) === "production"/);
  assert.match(page, /notFound\(\)/);
});

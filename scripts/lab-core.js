export function copyText(text) {
  return navigator.clipboard.writeText(text).catch(() => {
    window.prompt("Copy text:", text);
  });
}

export function clampInt(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

export function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function formatNumber(value) {
  return Number(value)
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

export function canonicalizeParams(params) {
  const next = new URLSearchParams();
  Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([key, value]) => {
      next.set(key, value);
    });
  return next;
}

export function buildShareUrl(params) {
  const ordered = canonicalizeParams(params);
  const qs = ordered.toString();
  return qs
    ? `${window.location.origin}${window.location.pathname}?${qs}`
    : `${window.location.origin}${window.location.pathname}`;
}

export function writeParams(params, push = false) {
  const ordered = canonicalizeParams(params);
  const qs = ordered.toString();
  const nextUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  history[push ? "pushState" : "replaceState"](null, "", nextUrl);
}

export function buildCaptureCard({
  componentName,
  componentNodeId,
  shareUrl,
  json,
  stateLabel,
  stateNodeId
}) {
  const lines = [
    `# Motion Capture Card`,
    `Component: ${componentName}`,
    `Figma Component Node: ${componentNodeId}`,
    `Share URL: ${shareUrl}`
  ];

  if (stateLabel) lines.push(`State: ${stateLabel}`);
  if (stateNodeId) lines.push(`Figma State Node: ${stateNodeId}`);

  lines.push("", "```json", json, "```");
  return lines.join("\n");
}

export function shouldReduceMotion() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("rm");
  if (raw !== null) {
    const token = raw.trim().toLowerCase();
    if (["1", "true", "on", "reduce"].includes(token)) return true;
    if (["0", "false", "off", "full"].includes(token)) return false;
  }

  // Motion labs default to full-motion previews unless explicitly overridden.
  return false;
}

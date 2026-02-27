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

export function writeParams(params, push = false) {
  const qs = params.toString();
  const nextUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  history[push ? "pushState" : "replaceState"](null, "", nextUrl);
}

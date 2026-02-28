import {
  buildCaptureCard,
  buildShareUrl,
  clampInt,
  copyText,
  formatNumber,
  shouldReduceMotion,
  writeParams
} from "../scripts/lab-core.js";

export const BANNER_PRESCRIPTION_PLAN_SPEC = {
  name: ".banner/prescription-plan",
  figmaNodeId: "2224:38341",
  rows: {
    top: [
      "NAD+",
      "SERMORELAIN",
      "AMINO BLEND",
      "NAD+",
      "SERMORELAIN",
      "AMINO BLEND",
      "NAD+",
      "SERMORELAIN",
      "AMINO BLEND"
    ],
    bottom: [
      "SERMORELAIN",
      "AMINO BLEND",
      "NAD+",
      "SERMORELAIN",
      "AMINO BLEND",
      "NAD+",
      "SERMORELAIN",
      "AMINO BLEND",
      "NAD+"
    ]
  },
  defaults: {
    motionStyle: "custom",
    directionMode: "opposing",
    pauseOnHover: "off",
    topDuration: 26,
    bottomDuration: 24
  }
};

const BANNER_MOTION_STYLES = {
  subtle: {
    topDuration: 44,
    bottomDuration: 40,
    pauseOnHover: "off"
  },
  balanced: {
    topDuration: 30,
    bottomDuration: 28,
    pauseOnHover: "off"
  },
  dramatic: {
    topDuration: 80,
    bottomDuration: 80,
    pauseOnHover: "off"
  }
};

export function mountBannerPrescriptionPlanLab() {
  const gsap = globalThis.gsap;
  if (!gsap) {
    throw new Error("GSAP is required. Ensure gsap CDN script is loaded before app.js.");
  }

  const dom = {
    root: document.querySelector('[data-component="banner-prescription-plan"]'),
    topTrack: document.querySelector("#bannerTrackTop"),
    bottomTrack: document.querySelector("#bannerTrackBottom"),
    motionStyle: document.querySelector("#motionStyle"),
    directionMode: document.querySelector("#directionMode"),
    pauseOnHover: document.querySelector("#pauseOnHover"),
    topDuration: document.querySelector("#topDuration"),
    bottomDuration: document.querySelector("#bottomDuration"),
    topDurationOut: document.querySelector("#topDurationOut"),
    bottomDurationOut: document.querySelector("#bottomDurationOut"),
    jsonExport: document.querySelector("#jsonExport"),
    cssExport: document.querySelector("#cssExport"),
    captureExport: document.querySelector("#captureExport"),
    copyJson: document.querySelector("#copyJson"),
    copyCss: document.querySelector("#copyCss"),
    copyCapture: document.querySelector("#copyCapture"),
    copyUrl: document.querySelector("#copyUrl"),
    resetSettings: document.querySelector("#resetSettings")
  };

  const appState = {
    settings: { ...BANNER_PRESCRIPTION_PLAN_SPEC.defaults },
    reducedMotion: shouldReduceMotion(),
    topTween: null,
    bottomTween: null,
    hoverBound: false,
    resizeRaf: 0
  };

  init();

  function init() {
    renderTrack(dom.topTrack, BANNER_PRESCRIPTION_PLAN_SPEC.rows.top);
    renderTrack(dom.bottomTrack, BANNER_PRESCRIPTION_PLAN_SPEC.rows.bottom);
    hydrateFromUrl();
    bindControls();
    syncControlsFromState();
    restartMotion();
    updateExports();
    updateUrl();
  }

  function renderTrack(trackEl, labels) {
    if (!trackEl) return;
    trackEl.innerHTML = "";

    for (let i = 0; i < 2; i += 1) {
      const segment = document.createElement("ul");
      segment.className = "banner-prescription__segment";
      segment.setAttribute("role", "presentation");
      segment.setAttribute("aria-hidden", "true");
      labels.forEach((label) => {
        const item = document.createElement("li");
        item.className = "banner-prescription__pill";
        item.textContent = label;
        segment.append(item);
      });
      trackEl.append(segment);
    }
  }

  function bindControls() {
    dom.motionStyle.addEventListener("change", () => {
      const style = dom.motionStyle.value;
      if (style === "custom") {
        appState.settings.motionStyle = "custom";
        updateExports();
        updateUrl();
        return;
      }
      applyMotionStyle(style);
    });

    dom.pauseOnHover.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.pauseOnHover = dom.pauseOnHover.value;
      if (appState.settings.pauseOnHover === "off") {
        appState.topTween?.play();
        appState.bottomTween?.play();
      }
      updateHoverBehavior();
      updateExports();
      updateUrl();
    });

    dom.directionMode.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.directionMode = dom.directionMode.value;
      restartMotion();
      updateExports();
      updateUrl();
    });

    bindRange(dom.topDuration, "topDuration", dom.topDurationOut);
    bindRange(dom.bottomDuration, "bottomDuration", dom.bottomDurationOut);

    dom.copyJson.addEventListener("click", () => copyText(dom.jsonExport.value));
    dom.copyCss.addEventListener("click", () => copyText(dom.cssExport.value));
    dom.copyCapture.addEventListener("click", () => copyText(dom.captureExport.value));
    dom.copyUrl.addEventListener("click", () => copyText(buildShareUrl(createUrlParams())));
    dom.resetSettings.addEventListener("click", onReset);

    updateHoverBehavior();
    window.addEventListener("resize", onResize);
  }

  function bindRange(input, key, output) {
    const write = () => {
      markMotionStyleCustom();
      const next = clampInt(Number(input.value), Number(input.min), Number(input.max));
      appState.settings[key] = next;
      output.value = `${formatNumber(next)}s`;
      restartMotion();
      updateExports();
      updateUrl();
    };

    input.addEventListener("input", write);
    input.addEventListener("change", write);
  }

  function onReset() {
    appState.settings = { ...BANNER_PRESCRIPTION_PLAN_SPEC.defaults };
    syncControlsFromState();
    restartMotion();
    updateExports();
    updateUrl();
  }

  function onResize() {
    cancelAnimationFrame(appState.resizeRaf);
    appState.resizeRaf = requestAnimationFrame(() => {
      restartMotion();
    });
  }

  function syncControlsFromState() {
    dom.motionStyle.value = appState.settings.motionStyle;
    dom.directionMode.value = appState.settings.directionMode;
    dom.pauseOnHover.value = appState.settings.pauseOnHover;
    dom.topDuration.value = String(appState.settings.topDuration);
    dom.bottomDuration.value = String(appState.settings.bottomDuration);
    dom.topDurationOut.value = `${formatNumber(appState.settings.topDuration)}s`;
    dom.bottomDurationOut.value = `${formatNumber(appState.settings.bottomDuration)}s`;
    updateHoverBehavior();
  }

  function markMotionStyleCustom() {
    appState.settings.motionStyle = "custom";
    dom.motionStyle.value = "custom";
  }

  function applyMotionStyle(styleName) {
    const preset = BANNER_MOTION_STYLES[styleName];
    if (!preset) return;

    appState.settings.motionStyle = styleName;
    Object.assign(appState.settings, preset);
    syncControlsFromState();
    restartMotion();
    updateExports();
    updateUrl();
  }

  function updateHoverBehavior() {
    if (appState.hoverBound || !dom.root) return;

    dom.root.addEventListener("mouseenter", () => {
      if (appState.settings.pauseOnHover !== "on") return;
      appState.topTween?.pause();
      appState.bottomTween?.pause();
    });

    dom.root.addEventListener("mouseleave", () => {
      if (appState.settings.pauseOnHover !== "on") return;
      appState.topTween?.play();
      appState.bottomTween?.play();
    });

    appState.hoverBound = true;
  }

  function restartMotion() {
    killMotion();

    if (appState.reducedMotion) {
      setTrackX(dom.topTrack, 0);
      setTrackX(dom.bottomTrack, 0);
      return;
    }

    const directions = resolveDirections(appState.settings.directionMode);
    appState.topTween = startTrackTween(dom.topTrack, appState.settings.topDuration, directions.top);
    appState.bottomTween = startTrackTween(
      dom.bottomTrack,
      appState.settings.bottomDuration,
      directions.bottom
    );

    if (appState.settings.pauseOnHover === "on" && dom.root?.matches(":hover")) {
      appState.topTween?.pause();
      appState.bottomTween?.pause();
    }
  }

  function setTrackX(track, x) {
    if (!track) return;
    globalThis.gsap.set(track, { x });
  }

  function startTrackTween(track, duration, direction) {
    if (!track) return null;

    const firstSegment = track.children[0];
    const secondSegment = track.children[1];
    if (!firstSegment || !secondSegment) return null;

    const loopDistance = secondSegment.offsetLeft - firstSegment.offsetLeft;
    if (!Number.isFinite(loopDistance) || loopDistance <= 0) return null;

    const startX = direction === "west" ? 0 : -loopDistance;
    const endX = direction === "west" ? -loopDistance : 0;

    gsap.set(track, { x: startX });
    return gsap.to(track, {
      x: endX,
      duration,
      ease: "none",
      repeat: -1
    });
  }

  function killMotion() {
    appState.topTween?.kill();
    appState.bottomTween?.kill();
    appState.topTween = null;
    appState.bottomTween = null;
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);

    const style = params.get("sty");
    if (style === "custom" || BANNER_MOTION_STYLES[style]) {
      appState.settings.motionStyle = style;
      if (style !== "custom") {
        Object.assign(appState.settings, BANNER_MOTION_STYLES[style]);
      }
    }

    const hover = params.get("hov");
    if (hover && ["on", "off"].includes(hover)) {
      appState.settings.pauseOnHover = hover;
    }

    const direction = params.get("flow");
    if (direction && ["opposing", "swapped", "west", "east"].includes(direction)) {
      appState.settings.directionMode = direction;
    }

    applyIntParam(params, "t1", "topDuration", 6, 80);
    applyIntParam(params, "t2", "bottomDuration", 6, 80);
  }

  function resolveDirections(mode) {
    if (mode === "swapped") return { top: "east", bottom: "west" };
    if (mode === "west") return { top: "west", bottom: "west" };
    if (mode === "east") return { top: "east", bottom: "east" };
    return { top: "west", bottom: "east" };
  }

  function applyIntParam(params, key, settingKey, min, max) {
    const raw = params.get(key);
    if (raw === null) return;
    const value = Number(raw);
    if (!Number.isFinite(value)) return;
    appState.settings[settingKey] = clampInt(value, min, max);
  }

  function updateExports() {
    const directions = resolveDirections(appState.settings.directionMode);
    dom.jsonExport.value = JSON.stringify(
      {
        component: {
          name: BANNER_PRESCRIPTION_PLAN_SPEC.name,
          figmaNodeId: BANNER_PRESCRIPTION_PLAN_SPEC.figmaNodeId
        },
        motionPreset: {
          style: appState.settings.motionStyle,
          directionMode: appState.settings.directionMode,
          pauseOnHover: appState.settings.pauseOnHover,
          topRowCycleSeconds: appState.settings.topDuration,
          bottomRowCycleSeconds: appState.settings.bottomDuration,
          directionTop: directions.top,
          directionBottom: directions.bottom
        },
        rows: {
          top: BANNER_PRESCRIPTION_PLAN_SPEC.rows.top,
          bottom: BANNER_PRESCRIPTION_PLAN_SPEC.rows.bottom
        }
      },
      null,
      2
    );

    dom.cssExport.value = [
      ":root {",
      `  --marquee-top-cycle: ${appState.settings.topDuration}s;`,
      `  --marquee-bottom-cycle: ${appState.settings.bottomDuration}s;`,
      "}",
      "",
      `/* Motion style: ${appState.settings.motionStyle} */`,
      `/* Direction mode: ${appState.settings.directionMode} */`,
      `/* Pause on hover: ${appState.settings.pauseOnHover} */`,
      `/* Top direction: ${directions.top} */`,
      `/* Bottom direction: ${directions.bottom} */`
    ].join("\n");

    dom.captureExport.value = buildCaptureCard({
      componentName: BANNER_PRESCRIPTION_PLAN_SPEC.name,
      componentNodeId: BANNER_PRESCRIPTION_PLAN_SPEC.figmaNodeId,
      shareUrl: buildShareUrl(createUrlParams()),
      json: dom.jsonExport.value
    });
  }

  function updateUrl() {
    writeParams(createUrlParams());
  }

  function createUrlParams() {
    const params = new URLSearchParams();
    params.set("sty", appState.settings.motionStyle);
    params.set("flow", appState.settings.directionMode);
    params.set("hov", appState.settings.pauseOnHover);
    params.set("t1", String(appState.settings.topDuration));
    params.set("t2", String(appState.settings.bottomDuration));
    return params;
  }
}

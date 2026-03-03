import {
  buildCaptureCard,
  buildShareUrl,
  clampInt,
  clampNumber,
  copyText,
  formatNumber,
  shouldReduceMotion,
  writeParams
} from "../scripts/lab-core.js";

export const BANNER_HEALTH_ROTATOR_SPEC = {
  name: ".banner/health-rotator",
  figmaNodeId: "2224:40100",
  indicatorNodeId: "2437:19373",
  states: [
    {
      key: "1",
      label: "state=1",
      figmaNodeId: "2224:40100",
      title: "ADVANCED HEALTH PANEL",
      subtitle: "Assess essential biomarkers that influence how your body functions.",
      body:
        "The Advanced Health Panel provides a clear picture of how your key organs and systems are performing, helping you take charge of your long-term health and overall wellness.",
      image: "https://www.figma.com/api/mcp/asset/f375d9bc-d410-4459-b354-44636d716e8f"
    },
    {
      key: "2",
      label: "state=2",
      figmaNodeId: "2423:19737",
      title: "GLYPHOSATE EXPOSURE TEST",
      subtitle: "Identify the levels of this common herbicide in your body.",
      body:
        "Glyphosate, often sprayed on wheat, oats, fruit and vegetables, has been linked to gut microbiome disruption, inflammation, and chronic health concerns. This simple urine test measures your body’s glyphosate levels, so you can take the right steps to detoxify and make informed choices that minimize future exposure.",
      image: "https://www.figma.com/api/mcp/asset/78c7874b-b3bc-4968-af56-8fa240e30330"
    },
    {
      key: "3",
      label: "state=3",
      figmaNodeId: "2423:19764",
      title: "MOLD & MYCOTOXIN\nEXPOSURE TEST",
      subtitle: "Identify toxins produced by mold and understand the impact on your health.",
      body:
        "Mycotoxins, toxic compounds produced by mold, can weaken your immune system and trigger symptoms like brain fog, fatigue, and gut issues. This test detects harmful mold toxins in your system, so you can address the root causes of unexplained symptoms and take charge of your health with a clear path to detoxification and healing.",
      image: "https://www.figma.com/api/mcp/asset/11037bf8-0006-45cf-a7a7-458cd4e3bcfc"
    }
  ],
  defaults: {
    state: 0,
    motionStyle: "custom",
    autoplay: "on",
    dwell: 10,
    slideDuration: 1.1,
    easeName: "power3.out"
  }
};

const BANNER_HEALTH_MOTION_STYLES = {
  subtle: {
    dwell: 7,
    slideDuration: 0.75,
    easeName: "power2.out"
  },
  balanced: {
    dwell: 10,
    slideDuration: 1.1,
    easeName: "power3.out"
  },
  dramatic: {
    dwell: 14,
    slideDuration: 1.8,
    easeName: "power4.out"
  }
};

export function mountBannerHealthRotatorLab() {
  const gsap = globalThis.gsap;
  if (!gsap) {
    throw new Error("GSAP is required. Ensure gsap CDN script is loaded before app.js.");
  }

  const dom = {
    root: document.querySelector('[data-component="banner-health-rotator"]'),
    shell: document.querySelector("#healthBannerShell"),
    indicators: document.querySelector("#healthBannerIndicators"),
    activeState: document.querySelector("#activeState"),
    motionStyle: document.querySelector("#motionStyle"),
    autoplay: document.querySelector("#autoplay"),
    easeName: document.querySelector("#easeName"),
    dwell: document.querySelector("#dwell"),
    slideDuration: document.querySelector("#slideDuration"),
    dwellOut: document.querySelector("#dwellOut"),
    slideDurationOut: document.querySelector("#slideDurationOut"),
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
    activeIndex: 0,
    settings: { ...BANNER_HEALTH_ROTATOR_SPEC.defaults },
    reducedMotion: shouldReduceMotion(),
    planes: [],
    indicatorButtons: [],
    transitionTl: null,
    progressTween: null,
    autoCall: null
  };

  init();

  function init() {
    renderPlanes();
    renderIndicators();
    preloadAssets();
    populateStateSelect();
    hydrateFromUrl();
    bindControls();
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function renderPlanes() {
    dom.shell.innerHTML = "";

    BANNER_HEALTH_ROTATOR_SPEC.states.forEach((state, index) => {
      const article = document.createElement("article");
      article.className = "banner-health";
      article.dataset.index = String(index);
      article.setAttribute("aria-hidden", "true");

      article.innerHTML = `
        <img class="banner-health__bg" src="${state.image}" alt="" loading="eager" decoding="async" />
        <section class="banner-health__section" aria-label="Banner content">
          <div class="banner-health__content">
            <h2 class="banner-health__title">${escapeHtml(state.title).replaceAll("\n", "<br>")}</h2>
            <p class="banner-health__subtitle">${escapeHtml(state.subtitle)}</p>
            <p class="banner-health__body">${escapeHtml(state.body)}</p>
            <div class="banner-health__cta-wrap">
              <button type="button" class="banner-health__cta">Learn More</button>
            </div>
          </div>
        </section>
      `;

      dom.shell.append(article);
    });

    appState.planes = Array.from(dom.shell.querySelectorAll(".banner-health"));
  }

  function renderIndicators() {
    dom.indicators.innerHTML = "";

    BANNER_HEALTH_ROTATOR_SPEC.states.forEach((state, index) => {
      const li = document.createElement("li");
      li.className = "banner-health-rotator__indicator-item";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "banner-health-rotator__indicator";
      button.dataset.index = String(index);
      button.setAttribute("aria-label", `Show ${state.label}`);
      button.setAttribute("aria-current", "false");
      button.style.setProperty("--progress", "0%");

      li.append(button);
      dom.indicators.append(li);
    });

    appState.indicatorButtons = Array.from(
      dom.indicators.querySelectorAll(".banner-health-rotator__indicator")
    );
  }

  function preloadAssets() {
    BANNER_HEALTH_ROTATOR_SPEC.states.forEach((state) => {
      const img = new Image();
      img.decoding = "async";
      img.src = state.image;
      img.decode?.().catch(() => {});
    });
  }

  function populateStateSelect() {
    dom.activeState.innerHTML = BANNER_HEALTH_ROTATOR_SPEC.states
      .map((state, index) => `<option value="${index}">${state.label}</option>`)
      .join("");
  }

  function bindControls() {
    dom.activeState.addEventListener("change", () => {
      const nextIndex = clampInt(Number(dom.activeState.value), 0, BANNER_HEALTH_ROTATOR_SPEC.states.length - 1);
      appState.settings.state = nextIndex;
      setActiveState(nextIndex);
    });

    appState.indicatorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextIndex = clampInt(
          Number(button.dataset.index),
          0,
          BANNER_HEALTH_ROTATOR_SPEC.states.length - 1
        );
        if (nextIndex === appState.activeIndex) {
          restartAutoplayCycle();
          return;
        }
        appState.settings.state = nextIndex;
        dom.activeState.value = String(nextIndex);
        setActiveState(nextIndex);
      });
    });

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

    dom.autoplay.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.autoplay = dom.autoplay.value;
      restartAutoplayCycle();
      updateExports();
      updateUrl();
    });

    dom.easeName.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.easeName = dom.easeName.value;
      updateExports();
      updateUrl();
    });

    bindRange(dom.dwell, "dwell", dom.dwellOut, "s", 0, 30);
    bindRange(dom.slideDuration, "slideDuration", dom.slideDurationOut, "s", 0, 4);

    dom.copyJson.addEventListener("click", () => copyText(dom.jsonExport.value));
    dom.copyCss.addEventListener("click", () => copyText(dom.cssExport.value));
    dom.copyCapture.addEventListener("click", () => copyText(dom.captureExport.value));
    dom.copyUrl.addEventListener("click", () => copyText(buildShareUrl(createUrlParams())));
    dom.resetSettings.addEventListener("click", onReset);
  }

  function bindRange(input, key, output, unit, min, max) {
    const write = () => {
      markMotionStyleCustom();
      const value = clampNumber(Number(input.value), min, max);
      appState.settings[key] = value;
      output.value = `${formatNumber(value)}${unit}`;
      if (key === "dwell") {
        restartAutoplayCycle();
      }
      updateExports();
      updateUrl();
    };

    input.addEventListener("input", write);
    input.addEventListener("change", write);
  }

  function onReset() {
    appState.settings = { ...BANNER_HEALTH_ROTATOR_SPEC.defaults };
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function syncControlsFromState() {
    dom.activeState.value = String(appState.settings.state);
    dom.motionStyle.value = appState.settings.motionStyle;
    dom.autoplay.value = appState.settings.autoplay;
    dom.easeName.value = appState.settings.easeName;
    dom.dwell.value = String(appState.settings.dwell);
    dom.slideDuration.value = String(appState.settings.slideDuration);
    dom.dwellOut.value = `${formatNumber(appState.settings.dwell)}s`;
    dom.slideDurationOut.value = `${formatNumber(appState.settings.slideDuration)}s`;
  }

  function markMotionStyleCustom() {
    appState.settings.motionStyle = "custom";
    dom.motionStyle.value = "custom";
  }

  function applyMotionStyle(styleName) {
    const preset = BANNER_HEALTH_MOTION_STYLES[styleName];
    if (!preset) return;

    appState.settings.motionStyle = styleName;
    Object.assign(appState.settings, preset);
    syncControlsFromState();
    restartAutoplayCycle();
    updateExports();
    updateUrl();
  }

  function setActiveState(nextIndex, options = {}) {
    const opts = { immediate: false, ...options };
    const previousIndex = appState.activeIndex;
    appState.activeIndex = nextIndex;
    appState.settings.state = nextIndex;

    killMotion();

    if (opts.immediate || previousIndex === nextIndex || appState.reducedMotion) {
      setImmediateState(nextIndex);
      restartAutoplayCycle();
      updateExports();
      updateUrl();
      return;
    }

    animateStateTransition(previousIndex, nextIndex);
    updateExports();
    updateUrl();
  }

  function setImmediateState(activeIndex) {
    appState.planes.forEach((plane, index) => {
      const active = index === activeIndex;
      plane.classList.toggle("is-active", active);
      plane.style.opacity = active ? "1" : "0";
      plane.style.visibility = active ? "visible" : "hidden";
      plane.style.transform = "translate3d(0, 0, 0)";
      plane.setAttribute("aria-hidden", active ? "false" : "true");
    });

    appState.indicatorButtons.forEach((button, index) => {
      const active = index === activeIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
      button.style.setProperty("--progress", "0%");
    });
  }

  function animateStateTransition(previousIndex, nextIndex) {
    const incoming = appState.planes[nextIndex];
    const outgoing = appState.planes[previousIndex];
    if (!incoming || !outgoing) {
      setImmediateState(nextIndex);
      restartAutoplayCycle();
      return;
    }

    const duration = appState.settings.slideDuration;
    const ease = appState.settings.easeName;

    appState.planes.forEach((plane, index) => {
      if (index !== previousIndex && index !== nextIndex) {
        gsap.killTweensOf(plane);
        plane.classList.remove("is-active");
        plane.style.opacity = "0";
        plane.style.visibility = "hidden";
        plane.style.transform = "translate3d(0, 0, 0)";
        plane.setAttribute("aria-hidden", "true");
      }
    });

    incoming.classList.add("is-active");
    incoming.style.visibility = "visible";
    incoming.setAttribute("aria-hidden", "false");

    const tl = gsap.timeline({
      defaults: { duration, ease },
      onComplete: () => {
        setImmediateState(nextIndex);
        restartAutoplayCycle();
      }
    });

    appState.transitionTl = tl;

    gsap.set(incoming, { xPercent: 100, opacity: 1 });
    gsap.set(outgoing, { xPercent: 0, opacity: 1 });

    tl.to(
      outgoing,
      {
        xPercent: -100,
        opacity: 1
      },
      0
    ).to(
      incoming,
      {
        xPercent: 0,
        opacity: 1
      },
      0
    );

    syncIndicatorActive(nextIndex);
  }

  function syncIndicatorActive(activeIndex) {
    appState.indicatorButtons.forEach((button, index) => {
      const active = index === activeIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
      button.style.setProperty("--progress", "0%");
    });
  }

  function restartAutoplayCycle() {
    killAutoCycle();

    syncIndicatorActive(appState.activeIndex);

    if (appState.settings.autoplay !== "on") return;
    if (appState.reducedMotion) return;

    const activeButton = appState.indicatorButtons[appState.activeIndex];
    if (!activeButton) return;

    const dwell = appState.settings.dwell;
    appState.progressTween = gsap.to(activeButton, {
      "--progress": "100%",
      duration: dwell,
      ease: "none"
    });

    appState.autoCall = gsap.delayedCall(dwell, () => {
      const nextIndex = (appState.activeIndex + 1) % BANNER_HEALTH_ROTATOR_SPEC.states.length;
      dom.activeState.value = String(nextIndex);
      appState.settings.state = nextIndex;
      setActiveState(nextIndex);
    });
  }

  function killAutoCycle() {
    appState.progressTween?.kill();
    appState.progressTween = null;
    appState.autoCall?.kill();
    appState.autoCall = null;
  }

  function killMotion() {
    appState.transitionTl?.kill();
    appState.transitionTl = null;
    killAutoCycle();
    gsap.killTweensOf(appState.planes);
    gsap.killTweensOf(appState.indicatorButtons);
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const stateRaw = params.get("state");
    if (stateRaw !== null) {
      appState.settings.state = clampInt(Number(stateRaw), 1, BANNER_HEALTH_ROTATOR_SPEC.states.length) - 1;
      appState.activeIndex = appState.settings.state;
    }

    const style = params.get("sty");
    if (style && BANNER_HEALTH_MOTION_STYLES[style]) {
      appState.settings.motionStyle = style;
      Object.assign(appState.settings, BANNER_HEALTH_MOTION_STYLES[style]);
    }

    const auto = params.get("auto");
    if (auto && ["on", "off"].includes(auto)) {
      appState.settings.autoplay = auto;
    }

    const ease = params.get("ease");
    if (ease) {
      appState.settings.easeName = ease;
    }

    applyNumberParam(params, "dwell", "dwell", 0, 30);
    applyNumberParam(params, "sdur", "slideDuration", 0, 4);
  }

  function applyNumberParam(params, key, settingKey, min, max) {
    const raw = params.get(key);
    if (raw === null) return;
    const value = Number(raw);
    if (!Number.isFinite(value)) return;
    appState.settings[settingKey] = clampNumber(value, min, max);
  }

  function updateExports() {
    const active = BANNER_HEALTH_ROTATOR_SPEC.states[appState.activeIndex];
    const payload = {
      component: {
        name: BANNER_HEALTH_ROTATOR_SPEC.name,
        figmaNodeId: BANNER_HEALTH_ROTATOR_SPEC.figmaNodeId,
        indicatorNodeId: BANNER_HEALTH_ROTATOR_SPEC.indicatorNodeId
      },
      componentState: {
        index: appState.activeIndex,
        key: active?.key,
        label: active?.label,
        figmaNodeId: active?.figmaNodeId,
        title: active?.title
      },
      motionPreset: getMotionPreset()
    };

    dom.jsonExport.value = JSON.stringify(payload, null, 2);
    dom.cssExport.value = [
      ":root {",
      `  --banner-dwell: ${formatNumber(appState.settings.dwell)}s;`,
      `  --banner-slide-duration: ${formatNumber(appState.settings.slideDuration)}s;`,
      `  --banner-slide-ease: ${appState.settings.easeName};`,
      "}",
      "",
      `/* Motion style: ${appState.settings.motionStyle} */`,
      `/* Autoplay: ${appState.settings.autoplay} */`,
      `/* Active state: ${active?.label ?? "unknown"} (${active?.figmaNodeId ?? "n/a"}) */`,
      "/* Segment indicator fill should animate ::before width 0% -> 100% over dwell. */"
    ].join("\n");

    dom.captureExport.value = buildCaptureCard({
      componentName: BANNER_HEALTH_ROTATOR_SPEC.name,
      componentNodeId: BANNER_HEALTH_ROTATOR_SPEC.figmaNodeId,
      stateLabel: active?.label,
      stateNodeId: active?.figmaNodeId,
      shareUrl: buildShareUrl(createUrlParams()),
      json: dom.jsonExport.value
    });
  }

  function getMotionPreset() {
    return {
      state: appState.activeIndex + 1,
      style: appState.settings.motionStyle,
      autoplay: appState.settings.autoplay,
      dwell: Number(Number(appState.settings.dwell).toFixed(2)),
      slideDuration: Number(Number(appState.settings.slideDuration).toFixed(2)),
      easeName: appState.settings.easeName
    };
  }

  function updateUrl() {
    writeParams(createUrlParams());
  }

  function createUrlParams() {
    const params = new URLSearchParams();
    const motion = getMotionPreset();
    params.set("state", String(motion.state));
    params.set("sty", motion.style);
    params.set("auto", motion.autoplay);
    params.set("dwell", String(motion.dwell));
    params.set("sdur", String(motion.slideDuration));
    params.set("ease", motion.easeName);
    return params;
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }
}

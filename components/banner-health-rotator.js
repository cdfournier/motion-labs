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
  figmaNodeId: "378:15912",
  indicatorNodeId: "2437:19373",
  states: [
    {
      key: "1",
      label: "state=1",
      figmaNodeId: "378:15912",
      title: "ADVANCED\nHEALTH PANEL",
      subtitle: "Assess essential biomarkers that influence your body functions.",
      subtitleWidth: "25rem",
      image: "assets/health-rotator/background.jpg"
    },
    {
      key: "2",
      label: "state=2",
      figmaNodeId: "378:15921",
      title: "GLYPHOSATE\nEXPOSURE TEST",
      subtitle: "Identify the levels of this common herbicide in your body.",
      subtitleWidth: "25rem",
      image: "assets/health-rotator/background.jpg"
    },
    {
      key: "3",
      label: "state=3",
      figmaNodeId: "378:15930",
      title: "MOLD & MYCOTOXIN\nEXPOSURE TEST",
      subtitle: "Identify toxins produced by mold and understand the impact on your health.",
      subtitleWidth: "28.125rem",
      image: "assets/health-rotator/background.jpg"
    }
  ],
  defaults: {
    state: 0,
    motionStyle: "custom",
    transitionType: "slide-fade",
    autoplay: "on",
    interactionControls: "on",
    dwell: 10,
    slideDuration: 1.1,
    exitSpeed: 0.45,
    entryFade: 0.72,
    exitFade: 0.6,
    overlap: -0.08,
    handoffGap: 0.12,
    easeName: "power3.out"
  }
};

const BANNER_HEALTH_MOTION_STYLES = {
  subtle: {
    transitionType: "crossfade",
    dwell: 7,
    slideDuration: 0.85,
    exitSpeed: 0.42,
    entryFade: 0.82,
    exitFade: 0.78,
    overlap: 0,
    handoffGap: 0.1,
    easeName: "power2.out"
  },
  balanced: {
    transitionType: "slide-fade",
    dwell: 10,
    slideDuration: 1.1,
    exitSpeed: 0.45,
    entryFade: 0.72,
    exitFade: 0.6,
    overlap: -0.08,
    handoffGap: 0.12,
    easeName: "power3.out"
  },
  dramatic: {
    transitionType: "slide-fade",
    dwell: 14,
    slideDuration: 2.2,
    exitSpeed: 0.72,
    entryFade: 0.52,
    exitFade: 0.42,
    overlap: -0.18,
    handoffGap: 0.24,
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
    transitionType: document.querySelector("#transitionType"),
    autoplay: document.querySelector("#autoplay"),
    interactionControls: document.querySelector("#interactionControls"),
    easeName: document.querySelector("#easeName"),
    dwell: document.querySelector("#dwell"),
    slideDuration: document.querySelector("#slideDuration"),
    exitSpeed: document.querySelector("#exitSpeed"),
    entryFade: document.querySelector("#entryFade"),
    exitFade: document.querySelector("#exitFade"),
    overlap: document.querySelector("#overlap"),
    handoffGap: document.querySelector("#handoffGap"),
    dwellOut: document.querySelector("#dwellOut"),
    slideDurationOut: document.querySelector("#slideDurationOut"),
    exitSpeedOut: document.querySelector("#exitSpeedOut"),
    entryFadeOut: document.querySelector("#entryFadeOut"),
    exitFadeOut: document.querySelector("#exitFadeOut"),
    overlapOut: document.querySelector("#overlapOut"),
    handoffGapOut: document.querySelector("#handoffGapOut"),
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
            <p class="banner-health__subtitle" style="max-width:${state.subtitleWidth || "31.25rem"}">${escapeHtml(state.subtitle)}</p>
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
        if (!isInteractionEnabled()) return;
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

    dom.transitionType.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.transitionType = dom.transitionType.value;
      updateExports();
      updateUrl();
    });

    dom.autoplay.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.autoplay = dom.autoplay.value;
      restartAutoplayCycle();
      updateExports();
      updateUrl();
    });

    dom.interactionControls.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.interactionControls = dom.interactionControls.value;
      applyInteractionMode();
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
    bindRange(dom.exitSpeed, "exitSpeed", dom.exitSpeedOut, "s", 0.1, 2);
    bindRange(dom.entryFade, "entryFade", dom.entryFadeOut, "", 0, 1);
    bindRange(dom.exitFade, "exitFade", dom.exitFadeOut, "", 0, 1);
    bindRange(dom.overlap, "overlap", dom.overlapOut, "s", -1.2, 1.2);
    bindRange(dom.handoffGap, "handoffGap", dom.handoffGapOut, "s", 0, 1.2);

    dom.copyJson.addEventListener("click", () => copyText(dom.jsonExport.value));
    dom.copyCss.addEventListener("click", () => copyText(dom.cssExport.value));
    dom.copyCapture.addEventListener("click", () => copyText(dom.captureExport.value));
    dom.copyUrl.addEventListener("click", () => copyText(buildShareUrl(createUrlParams())));
    dom.resetSettings.addEventListener("click", onReset);
    window.addEventListener("keydown", onKeyDown);
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
    dom.transitionType.value = appState.settings.transitionType;
    dom.autoplay.value = appState.settings.autoplay;
    dom.interactionControls.value = appState.settings.interactionControls;
    dom.easeName.value = appState.settings.easeName;
    dom.dwell.value = String(appState.settings.dwell);
    dom.slideDuration.value = String(appState.settings.slideDuration);
    dom.exitSpeed.value = String(appState.settings.exitSpeed);
    dom.entryFade.value = String(appState.settings.entryFade);
    dom.exitFade.value = String(appState.settings.exitFade);
    dom.overlap.value = String(appState.settings.overlap);
    dom.handoffGap.value = String(appState.settings.handoffGap);
    dom.dwellOut.value = `${formatNumber(appState.settings.dwell)}s`;
    dom.slideDurationOut.value = `${formatNumber(appState.settings.slideDuration)}s`;
    dom.exitSpeedOut.value = `${formatNumber(appState.settings.exitSpeed)}s`;
    dom.entryFadeOut.value = formatNumber(appState.settings.entryFade);
    dom.exitFadeOut.value = formatNumber(appState.settings.exitFade);
    dom.overlapOut.value = `${formatNumber(appState.settings.overlap)}s`;
    dom.handoffGapOut.value = `${formatNumber(appState.settings.handoffGap)}s`;
    applyInteractionMode();
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
      plane.style.zIndex = active ? "1" : "";
      plane.setAttribute("aria-hidden", active ? "false" : "true");
    });

    appState.indicatorButtons.forEach((button, index) => {
      const active = index === activeIndex;
      gsap.killTweensOf(button);
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
      button.style.setProperty("--progress", "0%");
      button.style.width = "";
      button.style.borderRadius = "";
    });
  }

  function animateStateTransition(previousIndex, nextIndex) {
    const type = appState.settings.transitionType;
    if (type === "swap") {
      setImmediateState(nextIndex);
      restartAutoplayCycle();
      return;
    }

    const incoming = appState.planes[nextIndex];
    const outgoing = appState.planes[previousIndex];
    if (!incoming || !outgoing) {
      setImmediateState(nextIndex);
      restartAutoplayCycle();
      return;
    }

    const duration = Math.max(0.2, appState.settings.slideDuration);
    const exitDuration = Math.max(0.12, appState.settings.exitSpeed);
    const ease = appState.settings.easeName;
    const exitEase = "power2.in";
    const overlap = appState.settings.overlap;
    const gap = Math.max(0, appState.settings.handoffGap);
    const incomingAt = (overlap > 0 ? overlap : 0) + gap;
    const outgoingAt = overlap < 0 ? Math.abs(overlap) : 0;
    const direction = resolveDirection(previousIndex, nextIndex);

    appState.planes.forEach((plane, index) => {
      if (index !== previousIndex && index !== nextIndex) {
        gsap.killTweensOf(plane);
        plane.classList.remove("is-active");
        plane.style.opacity = "0";
        plane.style.visibility = "hidden";
        plane.style.transform = "translate3d(0, 0, 0)";
        plane.style.zIndex = "";
        plane.setAttribute("aria-hidden", "true");
      }
    });

    incoming.classList.add("is-active");
    incoming.style.visibility = "visible";
    incoming.style.zIndex = "2";
    outgoing.style.zIndex = "1";
    incoming.setAttribute("aria-hidden", "false");

    const tl = gsap.timeline({
      defaults: { duration, ease },
      onComplete: () => {
        setImmediateState(nextIndex);
        restartAutoplayCycle();
      }
    });

    appState.transitionTl = tl;

    const entryX = type === "crossfade" ? 0 : 100 * direction;
    const exitX = type === "crossfade" ? 0 : -100 * direction;

    gsap.set(incoming, { xPercent: entryX, opacity: appState.settings.entryFade });
    gsap.set(outgoing, { xPercent: 0, opacity: 1 });

    tl.to(
      outgoing,
      {
        xPercent: exitX,
        opacity: appState.settings.exitFade,
        duration: exitDuration,
        ease: exitEase
      },
      outgoingAt
    ).to(
      incoming,
      {
        xPercent: 0,
        opacity: 1,
        duration,
        ease
      },
      incomingAt
    );

    animateIndicatorHandoff(previousIndex, nextIndex, duration, ease);
  }

  function resolveDirection(previousIndex, nextIndex) {
    const count = BANNER_HEALTH_ROTATOR_SPEC.states.length;
    if (previousIndex === count - 1 && nextIndex === 0) return 1;
    if (previousIndex === 0 && nextIndex === count - 1) return -1;
    return nextIndex > previousIndex ? 1 : -1;
  }

  function syncIndicatorActive(activeIndex) {
    appState.indicatorButtons.forEach((button, index) => {
      const active = index === activeIndex;
      gsap.killTweensOf(button);
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-current", active ? "true" : "false");
      button.style.setProperty("--progress", "0%");
      button.style.width = "";
      button.style.borderRadius = "";
    });
  }

  function animateIndicatorHandoff(previousIndex, nextIndex, duration, ease) {
    const incoming = appState.indicatorButtons[nextIndex];
    const outgoing = appState.indicatorButtons[previousIndex];
    if (!incoming) return;

    appState.indicatorButtons.forEach((button, index) => {
      if (index === previousIndex || index === nextIndex) return;
      gsap.killTweensOf(button);
      button.classList.remove("is-active");
      button.setAttribute("aria-current", "false");
      button.style.setProperty("--progress", "0%");
      button.style.width = "";
      button.style.borderRadius = "";
    });

    incoming.classList.add("is-active");
    incoming.setAttribute("aria-current", "true");
    incoming.style.setProperty("--progress", "0%");

    if (!outgoing || outgoing === incoming) {
      incoming.style.width = "";
      incoming.style.borderRadius = "";
      return;
    }

    const handoffDuration = Math.max(0.24, duration * 0.72);

    outgoing.classList.add("is-active");
    outgoing.setAttribute("aria-current", "false");
    gsap.killTweensOf([incoming, outgoing]);

    gsap.set(incoming, { width: "0.5rem", borderRadius: "6.25rem" });
    gsap.set(outgoing, { width: "2rem", borderRadius: "0.5rem" });

    gsap.to(outgoing, {
      width: "0.5rem",
      borderRadius: "6.25rem",
      "--progress": "0%",
      duration: handoffDuration,
      ease
    });

    gsap.to(incoming, {
      width: "2rem",
      borderRadius: "0.5rem",
      duration: handoffDuration,
      ease,
      onComplete: () => {
        outgoing.classList.remove("is-active");
        outgoing.style.width = "";
        outgoing.style.borderRadius = "";
        incoming.style.width = "";
        incoming.style.borderRadius = "";
      }
    });
  }

  function onKeyDown(event) {
    if (!isInteractionEnabled()) return;
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.altKey) return;
    if (event.target?.closest(".controls")) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      stepState(1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      stepState(-1);
    }
  }

  function stepState(direction) {
    const count = BANNER_HEALTH_ROTATOR_SPEC.states.length;
    const nextIndex = (appState.activeIndex + direction + count) % count;
    appState.settings.state = nextIndex;
    dom.activeState.value = String(nextIndex);
    setActiveState(nextIndex);
  }

  function applyInteractionMode() {
    const enabled = isInteractionEnabled();
    dom.root.classList.toggle("is-interaction-off", !enabled);
    appState.indicatorButtons.forEach((button) => {
      button.disabled = !enabled;
      button.setAttribute("aria-disabled", enabled ? "false" : "true");
    });
  }

  function isInteractionEnabled() {
    return appState.settings.interactionControls === "on";
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

    const mode = params.get("mode");
    if (mode && ["crossfade", "slide-fade", "swap"].includes(mode)) {
      appState.settings.transitionType = mode;
    }

    const auto = params.get("auto");
    if (auto && ["on", "off"].includes(auto)) {
      appState.settings.autoplay = auto;
    }

    const ui = params.get("ui");
    if (ui && ["on", "off"].includes(ui)) {
      appState.settings.interactionControls = ui;
    }

    const ease = params.get("ease");
    if (ease) {
      appState.settings.easeName = ease;
    }

    applyNumberParam(params, "dwell", "dwell", 0, 30);
    applyNumberParam(params, "sdur", "slideDuration", 0, 4);
    applyNumberParam(params, "exit", "exitSpeed", 0.1, 2);
    applyNumberParam(params, "efade", "entryFade", 0, 1);
    applyNumberParam(params, "xfade", "exitFade", 0, 1);
    applyNumberParam(params, "ovr", "overlap", -1.2, 1.2);
    applyNumberParam(params, "gap", "handoffGap", 0, 1.2);
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
    const motionPreset = getMotionPreset();
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
      motionPreset
    };

    dom.jsonExport.value = JSON.stringify(payload, null, 2);
    dom.cssExport.value = [
      ":root {",
      `  --banner-dwell: ${formatNumber(appState.settings.dwell)}s;`,
      `  --banner-entry-speed: ${formatNumber(appState.settings.slideDuration)}s;`,
      `  --banner-exit-speed: ${formatNumber(appState.settings.exitSpeed)}s;`,
      `  --banner-entry-fade: ${formatNumber(appState.settings.entryFade)};`,
      `  --banner-exit-fade: ${formatNumber(appState.settings.exitFade)};`,
      `  --banner-overlap: ${formatNumber(appState.settings.overlap)}s;`,
      `  --banner-gap: ${formatNumber(appState.settings.handoffGap)}s;`,
      `  --banner-slide-ease: ${appState.settings.easeName};`,
      "}",
      "",
      `/* Motion style: ${appState.settings.motionStyle} */`,
      `/* Transition mode: ${motionPreset.transitionType} */`,
      `/* Autoplay: ${appState.settings.autoplay} */`,
      `/* Interaction controls: ${appState.settings.interactionControls} */`,
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
      transitionType: appState.settings.transitionType,
      autoplay: appState.settings.autoplay,
      interactionControls: appState.settings.interactionControls,
      dwell: Number(Number(appState.settings.dwell).toFixed(2)),
      entrySpeed: Number(Number(appState.settings.slideDuration).toFixed(2)),
      exitSpeed: Number(Number(appState.settings.exitSpeed).toFixed(2)),
      entryFade: Number(Number(appState.settings.entryFade).toFixed(2)),
      exitFade: Number(Number(appState.settings.exitFade).toFixed(2)),
      overlap: Number(Number(appState.settings.overlap).toFixed(2)),
      handoffGap: Number(Number(appState.settings.handoffGap).toFixed(2)),
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
    params.set("mode", motion.transitionType);
    params.set("auto", motion.autoplay);
    params.set("ui", motion.interactionControls);
    params.set("dwell", String(motion.dwell));
    params.set("sdur", String(motion.entrySpeed));
    params.set("exit", String(motion.exitSpeed));
    params.set("efade", String(motion.entryFade));
    params.set("xfade", String(motion.exitFade));
    params.set("ovr", String(motion.overlap));
    params.set("gap", String(motion.handoffGap));
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

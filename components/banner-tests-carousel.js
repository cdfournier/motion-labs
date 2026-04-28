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

export const BANNER_TESTS_CAROUSEL_SPEC = {
  name: ".banner/tests-carousel",
  figmaNodeId: "378:15912",
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
    transitionType: "staged-fade",
    autoplay: "on",
    interactionControls: "on",
    dwell: 10,
    bgInSpeed: 0.84,
    bgOutSpeed: 0.32,
    bgEntryOpacity: 0.32,
    bgExitOpacity: 0.08,
    copyDelay: 0.18,
    copyInSpeed: 0.24,
    copyOutSpeed: 0.18,
    copyEntryOpacity: 0.04,
    copyExitOpacity: 0.14,
    easeName: "power4.out"
  }
};

const BANNER_TESTS_CAROUSEL_MOTION_STYLES = {
  subtle: {
    transitionType: "staged-fade",
    dwell: 8,
    bgInSpeed: 0.72,
    bgOutSpeed: 0.26,
    bgEntryOpacity: 0.48,
    bgExitOpacity: 0.16,
    copyDelay: 0.14,
    copyInSpeed: 0.2,
    copyOutSpeed: 0.16,
    copyEntryOpacity: 0.08,
    copyExitOpacity: 0.1,
    easeName: "power2.out"
  },
  balanced: {
    transitionType: "staged-fade",
    dwell: 10,
    bgInSpeed: 0.84,
    bgOutSpeed: 0.32,
    bgEntryOpacity: 0.32,
    bgExitOpacity: 0.08,
    copyDelay: 0.18,
    copyInSpeed: 0.24,
    copyOutSpeed: 0.18,
    copyEntryOpacity: 0.04,
    copyExitOpacity: 0.14,
    easeName: "power4.out"
  },
  dramatic: {
    transitionType: "staged-fade",
    dwell: 12,
    bgInSpeed: 1.08,
    bgOutSpeed: 0.38,
    bgEntryOpacity: 0.22,
    bgExitOpacity: 0.04,
    copyDelay: 0.24,
    copyInSpeed: 0.28,
    copyOutSpeed: 0.22,
    copyEntryOpacity: 0.02,
    copyExitOpacity: 0.18,
    easeName: "power4.out"
  }
};

export function mountBannerTestsCarouselLab() {
  const gsap = globalThis.gsap;
  if (!gsap) {
    throw new Error("GSAP is required. Ensure gsap CDN script is loaded before app.js.");
  }

  const dom = {
    root: document.querySelector('[data-component="banner-tests-carousel"]'),
    shell: document.querySelector("#testsCarouselShell"),
    indicators: document.querySelector("#testsCarouselIndicators"),
    activeState: document.querySelector("#activeState"),
    motionStyle: document.querySelector("#motionStyle"),
    transitionType: document.querySelector("#transitionType"),
    autoplay: document.querySelector("#autoplay"),
    interactionControls: document.querySelector("#interactionControls"),
    easeName: document.querySelector("#easeName"),
    dwell: document.querySelector("#dwell"),
    bgInSpeed: document.querySelector("#bgInSpeed"),
    bgOutSpeed: document.querySelector("#bgOutSpeed"),
    bgEntryOpacity: document.querySelector("#bgEntryOpacity"),
    bgExitOpacity: document.querySelector("#bgExitOpacity"),
    copyDelay: document.querySelector("#copyDelay"),
    copyInSpeed: document.querySelector("#copyInSpeed"),
    copyOutSpeed: document.querySelector("#copyOutSpeed"),
    copyEntryOpacity: document.querySelector("#copyEntryOpacity"),
    copyExitOpacity: document.querySelector("#copyExitOpacity"),
    dwellOut: document.querySelector("#dwellOut"),
    bgInSpeedOut: document.querySelector("#bgInSpeedOut"),
    bgOutSpeedOut: document.querySelector("#bgOutSpeedOut"),
    bgEntryOpacityOut: document.querySelector("#bgEntryOpacityOut"),
    bgExitOpacityOut: document.querySelector("#bgExitOpacityOut"),
    copyDelayOut: document.querySelector("#copyDelayOut"),
    copyInSpeedOut: document.querySelector("#copyInSpeedOut"),
    copyOutSpeedOut: document.querySelector("#copyOutSpeedOut"),
    copyEntryOpacityOut: document.querySelector("#copyEntryOpacityOut"),
    copyExitOpacityOut: document.querySelector("#copyExitOpacityOut"),
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
    settings: { ...BANNER_TESTS_CAROUSEL_SPEC.defaults },
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

    BANNER_TESTS_CAROUSEL_SPEC.states.forEach((state, index) => {
      const article = document.createElement("article");
      article.className = "banner-tests-carousel__plane";
      article.dataset.index = String(index);
      article.setAttribute("aria-hidden", "true");

      article.innerHTML = `
        <img class="banner-tests-carousel__bg" src="${state.image}" alt="" loading="eager" decoding="async" />
        <section class="banner-tests-carousel__section" aria-label="Banner content">
          <div class="banner-tests-carousel__content">
            <h2 class="banner-tests-carousel__title">${escapeHtml(state.title).replaceAll("\n", "<br>")}</h2>
            <p class="banner-tests-carousel__subtitle" style="max-width:${state.subtitleWidth || "31.25rem"}">${escapeHtml(state.subtitle)}</p>
            <div class="banner-tests-carousel__cta-wrap">
              <button type="button" class="banner-tests-carousel__cta">Learn More</button>
            </div>
          </div>
        </section>
      `;

      dom.shell.append(article);
    });

    appState.planes = Array.from(dom.shell.querySelectorAll(".banner-tests-carousel__plane"));
  }

  function renderIndicators() {
    dom.indicators.innerHTML = "";

    BANNER_TESTS_CAROUSEL_SPEC.states.forEach((state, index) => {
      const li = document.createElement("li");
      li.className = "banner-tests-carousel__indicator-item";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "banner-tests-carousel__indicator";
      button.dataset.index = String(index);
      button.setAttribute("aria-label", `Show ${state.label}`);
      button.setAttribute("aria-current", "false");
      button.style.setProperty("--progress", "0%");

      li.append(button);
      dom.indicators.append(li);
    });

    appState.indicatorButtons = Array.from(dom.indicators.querySelectorAll(".banner-tests-carousel__indicator"));
  }

  function preloadAssets() {
    BANNER_TESTS_CAROUSEL_SPEC.states.forEach((state) => {
      const img = new Image();
      img.decoding = "async";
      img.src = state.image;
      img.decode?.().catch(() => {});
    });
  }

  function populateStateSelect() {
    dom.activeState.innerHTML = BANNER_TESTS_CAROUSEL_SPEC.states
      .map((state, index) => `<option value="${index}">${state.label}</option>`)
      .join("");
  }

  function bindControls() {
    dom.activeState.addEventListener("change", () => {
      const nextIndex = clampInt(Number(dom.activeState.value), 0, BANNER_TESTS_CAROUSEL_SPEC.states.length - 1);
      appState.settings.state = nextIndex;
      setActiveState(nextIndex);
    });

    appState.indicatorButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (!isInteractionEnabled()) return;
        const nextIndex = clampInt(Number(button.dataset.index), 0, BANNER_TESTS_CAROUSEL_SPEC.states.length - 1);
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

    bindRange(dom.dwell, "dwell", dom.dwellOut, "s", 1, 30);
    bindRange(dom.bgInSpeed, "bgInSpeed", dom.bgInSpeedOut, "s", 0.1, 2);
    bindRange(dom.bgOutSpeed, "bgOutSpeed", dom.bgOutSpeedOut, "s", 0.1, 2);
    bindRange(dom.bgEntryOpacity, "bgEntryOpacity", dom.bgEntryOpacityOut, "", 0, 1);
    bindRange(dom.bgExitOpacity, "bgExitOpacity", dom.bgExitOpacityOut, "", 0, 1);
    bindRange(dom.copyDelay, "copyDelay", dom.copyDelayOut, "s", 0, 1.2);
    bindRange(dom.copyInSpeed, "copyInSpeed", dom.copyInSpeedOut, "s", 0.1, 2);
    bindRange(dom.copyOutSpeed, "copyOutSpeed", dom.copyOutSpeedOut, "s", 0.1, 2);
    bindRange(dom.copyEntryOpacity, "copyEntryOpacity", dom.copyEntryOpacityOut, "", 0, 1);
    bindRange(dom.copyExitOpacity, "copyExitOpacity", dom.copyExitOpacityOut, "s", 0, 1.2);

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
    appState.settings = { ...BANNER_TESTS_CAROUSEL_SPEC.defaults };
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
    dom.bgInSpeed.value = String(appState.settings.bgInSpeed);
    dom.bgOutSpeed.value = String(appState.settings.bgOutSpeed);
    dom.bgEntryOpacity.value = String(appState.settings.bgEntryOpacity);
    dom.bgExitOpacity.value = String(appState.settings.bgExitOpacity);
    dom.copyDelay.value = String(appState.settings.copyDelay);
    dom.copyInSpeed.value = String(appState.settings.copyInSpeed);
    dom.copyOutSpeed.value = String(appState.settings.copyOutSpeed);
    dom.copyEntryOpacity.value = String(appState.settings.copyEntryOpacity);
    dom.copyExitOpacity.value = String(appState.settings.copyExitOpacity);
    dom.dwellOut.value = `${formatNumber(appState.settings.dwell)}s`;
    dom.bgInSpeedOut.value = `${formatNumber(appState.settings.bgInSpeed)}s`;
    dom.bgOutSpeedOut.value = `${formatNumber(appState.settings.bgOutSpeed)}s`;
    dom.bgEntryOpacityOut.value = formatNumber(appState.settings.bgEntryOpacity);
    dom.bgExitOpacityOut.value = formatNumber(appState.settings.bgExitOpacity);
    dom.copyDelayOut.value = `${formatNumber(appState.settings.copyDelay)}s`;
    dom.copyInSpeedOut.value = `${formatNumber(appState.settings.copyInSpeed)}s`;
    dom.copyOutSpeedOut.value = `${formatNumber(appState.settings.copyOutSpeed)}s`;
    dom.copyEntryOpacityOut.value = formatNumber(appState.settings.copyEntryOpacity);
    dom.copyExitOpacityOut.value = `${formatNumber(appState.settings.copyExitOpacity)}s`;
    applyInteractionMode();
  }

  function markMotionStyleCustom() {
    appState.settings.motionStyle = "custom";
    dom.motionStyle.value = "custom";
  }

  function applyMotionStyle(styleName) {
    const preset = BANNER_TESTS_CAROUSEL_MOTION_STYLES[styleName];
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
      const bg = plane.querySelector(".banner-tests-carousel__bg");
      const content = plane.querySelector(".banner-tests-carousel__content");
      plane.classList.toggle("is-active", active);
      plane.style.opacity = active ? "1" : "0";
      plane.style.visibility = active ? "visible" : "hidden";
      plane.style.zIndex = active ? "1" : "";
      plane.setAttribute("aria-hidden", active ? "false" : "true");
      plane.style.transform = "translate3d(0, 0, 0)";
      if (bg) bg.style.opacity = "1";
      if (content) {
        content.style.opacity = "1";
        content.style.transform = "translate3d(0, 0, 0)";
      }
    });

    syncIndicatorActive(activeIndex);
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

    const outgoingContent = outgoing.querySelector(".banner-tests-carousel__content");
    const incomingContent = incoming.querySelector(".banner-tests-carousel__content");
    const ease = appState.settings.easeName;
    const moveOffset = type === "crossfade" ? 0 : getTravelOffset(previousIndex, nextIndex);
    const exitLead = Math.max(appState.settings.bgOutSpeed, appState.settings.copyOutSpeed);
    const entryAt = exitLead + appState.settings.copyDelay;
    const textAt = entryAt + appState.settings.copyExitOpacity;

    appState.planes.forEach((plane, index) => {
      if (index !== previousIndex && index !== nextIndex) {
        plane.classList.remove("is-active");
        plane.style.opacity = "0";
        plane.style.visibility = "hidden";
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
      onComplete: () => {
        setImmediateState(nextIndex);
        restartAutoplayCycle();
      }
    });

    appState.transitionTl = tl;

    gsap.set(outgoing, { xPercent: 0, opacity: 1 });
    gsap.set(incoming, { xPercent: moveOffset * -1, opacity: appState.settings.bgEntryOpacity });

    if (outgoingContent) {
      gsap.set(outgoingContent, { opacity: 1, x: 0 });
    }

    tl.to(
      outgoing,
      {
        xPercent: moveOffset,
        duration: appState.settings.bgOutSpeed,
        ease: "power2.in"
      },
      0
    );
    tl.to(
      outgoing,
      {
        opacity: appState.settings.bgExitOpacity,
        duration: appState.settings.copyOutSpeed,
        ease: "power2.in"
      },
      0
    );
    if (outgoingContent) {
      tl.to(
        outgoingContent,
        {
          opacity: appState.settings.bgExitOpacity,
          duration: appState.settings.copyOutSpeed,
          ease: "power2.in"
        },
        0
      );
    }

    tl.to(
      incoming,
      {
        xPercent: 0,
        opacity: 1,
        duration: appState.settings.bgInSpeed,
        ease
      },
      entryAt
    );

    if (incomingContent) {
      gsap.set(incomingContent, { opacity: appState.settings.copyEntryOpacity, x: 0 });
      tl.to(
        incomingContent,
        {
          opacity: 1,
          duration: appState.settings.copyInSpeed,
          ease: "none"
        },
        textAt
      );
    }

    animateIndicatorHandoff(previousIndex, nextIndex, entryAt + appState.settings.bgInSpeed, ease);
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

    const handoffDuration = Math.max(0.2, duration * 0.8);
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
    const count = BANNER_TESTS_CAROUSEL_SPEC.states.length;
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
      const nextIndex = (appState.activeIndex + 1) % BANNER_TESTS_CAROUSEL_SPEC.states.length;
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
    gsap.killTweensOf(appState.planes.map((plane) => plane.querySelector(".banner-tests-carousel__content")).filter(Boolean));
    gsap.killTweensOf(appState.indicatorButtons);
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const stateRaw = params.get("state");
    if (stateRaw !== null) {
      appState.settings.state = clampInt(Number(stateRaw), 1, BANNER_TESTS_CAROUSEL_SPEC.states.length) - 1;
      appState.activeIndex = appState.settings.state;
    }

    const style = params.get("sty");
    if (style && BANNER_TESTS_CAROUSEL_MOTION_STYLES[style]) {
      appState.settings.motionStyle = style;
      Object.assign(appState.settings, BANNER_TESTS_CAROUSEL_MOTION_STYLES[style]);
    }

    const mode = params.get("mode");
    if (mode && ["staged-fade", "crossfade", "swap"].includes(mode)) {
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
    if (ease) appState.settings.easeName = ease;

    applyNumberParam(params, "dwell", "dwell", 1, 30);
    applyNumberParam(params, "entry", "bgInSpeed", 0.1, 2);
    applyNumberParam(params, "efrom", "bgEntryOpacity", 0, 1);
    applyNumberParam(params, "textin", "copyInSpeed", 0.1, 2);
    applyNumberParam(params, "exit", "bgOutSpeed", 0.1, 2);
    applyNumberParam(params, "xfade", "copyOutSpeed", 0.1, 2);
    applyNumberParam(params, "xto", "bgExitOpacity", 0, 1);
    applyNumberParam(params, "pause", "copyDelay", 0, 1.2);
    applyNumberParam(params, "tdelay", "copyExitOpacity", 0, 1.2);
    applyNumberParam(params, "tfrom", "copyEntryOpacity", 0, 1);
  }

  function applyNumberParam(params, key, settingKey, min, max) {
    const raw = params.get(key);
    if (raw === null) return;
    const value = Number(raw);
    if (!Number.isFinite(value)) return;
    appState.settings[settingKey] = clampNumber(value, min, max);
  }

  function updateExports() {
    const active = BANNER_TESTS_CAROUSEL_SPEC.states[appState.activeIndex];
    const motionPreset = getMotionPreset();
    const payload = {
      component: {
        name: BANNER_TESTS_CAROUSEL_SPEC.name,
        figmaNodeId: BANNER_TESTS_CAROUSEL_SPEC.figmaNodeId
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
      `  --carousel-dwell: ${formatNumber(appState.settings.dwell)}s;`,
      `  --carousel-entry-speed: ${formatNumber(appState.settings.bgInSpeed)}s;`,
      `  --carousel-entry-fade-from: ${formatNumber(appState.settings.bgEntryOpacity)};`,
      `  --carousel-exit-speed: ${formatNumber(appState.settings.bgOutSpeed)}s;`,
      `  --carousel-exit-fade-speed: ${formatNumber(appState.settings.copyOutSpeed)}s;`,
      `  --carousel-exit-fade-to: ${formatNumber(appState.settings.bgExitOpacity)};`,
      `  --carousel-handoff-pause: ${formatNumber(appState.settings.copyDelay)}s;`,
      `  --carousel-text-delay: ${formatNumber(appState.settings.copyExitOpacity)}s;`,
      `  --carousel-text-fade-in-speed: ${formatNumber(appState.settings.copyInSpeed)}s;`,
      `  --carousel-text-fade-from: ${formatNumber(appState.settings.copyEntryOpacity)};`,
      `  --carousel-ease: ${appState.settings.easeName};`,
      "}"
    ].join("\n");

    dom.captureExport.value = buildCaptureCard({
      componentName: BANNER_TESTS_CAROUSEL_SPEC.name,
      componentNodeId: BANNER_TESTS_CAROUSEL_SPEC.figmaNodeId,
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
      entrySpeed: Number(Number(appState.settings.bgInSpeed).toFixed(2)),
      entryFadeFrom: Number(Number(appState.settings.bgEntryOpacity).toFixed(2)),
      exitSpeed: Number(Number(appState.settings.bgOutSpeed).toFixed(2)),
      exitFadeSpeed: Number(Number(appState.settings.copyOutSpeed).toFixed(2)),
      exitFadeTo: Number(Number(appState.settings.bgExitOpacity).toFixed(2)),
      handoffPause: Number(Number(appState.settings.copyDelay).toFixed(2)),
      textDelay: Number(Number(appState.settings.copyExitOpacity).toFixed(2)),
      textFadeInSpeed: Number(Number(appState.settings.copyInSpeed).toFixed(2)),
      textFadeFrom: Number(Number(appState.settings.copyEntryOpacity).toFixed(2)),
      easeName: appState.settings.easeName
    };
  }

  function updateUrl() {
    writeParams(createUrlParams());
  }

  function createUrlParams() {
    const motion = getMotionPreset();
    const params = new URLSearchParams();
    params.set("state", String(motion.state));
    params.set("sty", motion.style);
    params.set("mode", motion.transitionType);
    params.set("auto", motion.autoplay);
    params.set("ui", motion.interactionControls);
    params.set("dwell", String(motion.dwell));
    params.set("entry", String(motion.entrySpeed));
    params.set("efrom", String(motion.entryFadeFrom));
    params.set("textin", String(motion.textFadeInSpeed));
    params.set("exit", String(motion.exitSpeed));
    params.set("xfade", String(motion.exitFadeSpeed));
    params.set("xto", String(motion.exitFadeTo));
    params.set("pause", String(motion.handoffPause));
    params.set("tdelay", String(motion.textDelay));
    params.set("tfrom", String(motion.textFadeFrom));
    params.set("ease", motion.easeName);
    return params;
  }
}

function getTravelOffset(previousIndex, nextIndex) {
  return nextIndex >= previousIndex ? -4 : 4;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

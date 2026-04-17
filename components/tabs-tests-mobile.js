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

export const TABS_TESTS_MOBILE_SPEC = {
  name: ".tabs/tests/mobile",
  figmaNodeId: "3248:25382",
  panelWidth: 320,
  panelGap: 16,
  tabItems: [
    "BioMetabolic Breakthrough Panel",
    "Advanced Genetic Intelligence Panel",
    "Advanced Health Panel",
    "Male Hormone Panel",
    "Female Hormone Panel",
    "Toxic Metals Screening Test",
    "Glyphosate Exposure Panel",
    "Mold & Mycotoxin Exposure Test"
  ],
  states: [
    {
      key: "1",
      label: "panel=1",
      figmaNodeId: "3248:25333",
      heroImage: "assets/three-column-tabs/panel-8.jpg",
      title: "BioMetabolic Breakthrough Panel",
      body: "This urine test evaluates 100+ markers to uncover undetected inefficiencies impacting your metabolism, influencing how your body creates energy, manages detox, and responds to stress, so you take steps to optimize your health.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "2",
      label: "panel=2",
      figmaNodeId: "3248:25353",
      heroImage: "assets/three-column-tabs/panel-7.jpg",
      title: "Advanced Genetic Intelligence Panel",
      body: "This buccal swab test identifies 12 key DNA markers to reveal your body’s methylation capacity, which influences your metabolism, cellular repair, and detox function, to help guide personalized strategies for your optimum health.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "3",
      label: "panel=3",
      figmaNodeId: "3248:25373",
      heroImage: "assets/three-column-tabs/panel-6.jpg",
      title: "Advanced Health Panel",
      body: "This comprehensive blood spot test assesses essential biomarkers to give you a clear picture of how well your metabolism, heart, liver, and kidneys are performing, empowering you to take control of your health and wellness.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "4",
      label: "panel=4",
      figmaNodeId: "3248:25393",
      heroImage: "assets/three-column-tabs/panel-4.jpg",
      title: "Male Hormone Panel",
      body: "Your energy, focus and drive all depend on balanced hormones. This blood spot test measures important hormones, including testosterone, and thyroid markers that support strength, sleep, vitality, mood, and mental performance.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "5",
      label: "panel=5",
      figmaNodeId: "3248:25413",
      heroImage: "assets/three-column-tabs/panel-5.jpg",
      title: "Female Hormone Panel",
      body: "Your hormones influence every part of how you function, including your cycle, health, mood, and vitality. This blood spot test evaluates your reproductive hormones, adrenal and thyroid levels, to help you restore balance.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "6",
      label: "panel=6",
      figmaNodeId: "3248:25433",
      heroImage: "assets/three-column-tabs/panel-3.jpg",
      title: "Toxic Metals Screening Test",
      body: "Toxic metals can silently lead to fatigue, inflammation, and chronic issues. This urine test identifies harmful heavy metals in your system, helping you take targeted action to cleanse your body and safeguard your health.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "7",
      label: "panel=7",
      figmaNodeId: "3248:25453",
      heroImage: "assets/three-column-tabs/panel-1.jpg",
      title: "Glyphosate Exposure Panel",
      body: "Glyphosate is a common herbicide that has been linked to gut microbiome disruption, inflammation, and chronic health issues. This urine test measures your glyphosate levels, empowering you to take the right steps to detoxify.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "8",
      label: "panel=8",
      figmaNodeId: "3248:25473",
      heroImage: "assets/three-column-tabs/panel-2.jpg",
      title: "Mold & Mycotoxin Exposure Test",
      body: "Mycotoxins, toxic compounds produced by mold, can weaken your immune system, trigger brain fog, fatigue, and gut issues. This urine test detects 11 harmful mold toxins in your system, to help you begin your detox process.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    }
  ],
  defaults: {
    state: 0,
    motionStyle: "balanced",
    transitionType: "slide-fade",
    easeName: "power3.out",
    duration: 0.95,
    exitSpeed: 0.45,
    entryFade: 0.72,
    exitFade: 0.6,
    overlap: -0.08,
    handoffGap: 0.12,
    panelShift: 40,
    swipeThreshold: 56
  }
};

const MOBILE_MOTION_STYLES = {
  subtle: {
    transitionType: "crossfade",
    easeName: "sine.out",
    duration: 0.7,
    exitSpeed: 0.4,
    entryFade: 0.84,
    exitFade: 0.8,
    overlap: 0,
    handoffGap: 0.1,
    panelShift: 18,
    swipeThreshold: 48
  },
  balanced: {
    transitionType: "slide-fade",
    easeName: "power3.out",
    duration: 0.95,
    exitSpeed: 0.45,
    entryFade: 0.72,
    exitFade: 0.6,
    overlap: -0.08,
    handoffGap: 0.12,
    panelShift: 40,
    swipeThreshold: 56
  },
  dramatic: {
    transitionType: "slide-fade",
    easeName: "power4.out",
    duration: 1.35,
    exitSpeed: 0.6,
    entryFade: 0.56,
    exitFade: 0.42,
    overlap: -0.16,
    handoffGap: 0.22,
    panelShift: 84,
    swipeThreshold: 68
  }
};

export function mountTabsTestsMobileLab() {
  const gsap = globalThis.gsap;
  if (!gsap) {
    throw new Error("GSAP is required. Ensure gsap CDN script is loaded before app.js.");
  }

  const dom = {
    root: document.querySelector('[data-component="tabs-tests-mobile"]'),
    viewport: document.querySelector("#tabsTestsMobileViewport"),
    track: document.querySelector("#tabsTestsMobileTrack"),
    transitionStage: null,
    list: document.querySelector("#tabsTestsMobileList"),
    activeState: document.querySelector("#activeState"),
    motionStyle: document.querySelector("#motionStyle"),
    transitionType: document.querySelector("#transitionType"),
    easeName: document.querySelector("#easeName"),
    duration: document.querySelector("#duration"),
    exitSpeed: document.querySelector("#exitSpeed"),
    entryFade: document.querySelector("#entryFade"),
    exitFade: document.querySelector("#exitFade"),
    overlap: document.querySelector("#overlap"),
    handoffGap: document.querySelector("#handoffGap"),
    panelShift: document.querySelector("#panelShift"),
    swipeThreshold: document.querySelector("#swipeThreshold"),
    durationOut: document.querySelector("#durationOut"),
    exitSpeedOut: document.querySelector("#exitSpeedOut"),
    entryFadeOut: document.querySelector("#entryFadeOut"),
    exitFadeOut: document.querySelector("#exitFadeOut"),
    overlapOut: document.querySelector("#overlapOut"),
    handoffGapOut: document.querySelector("#handoffGapOut"),
    panelShiftOut: document.querySelector("#panelShiftOut"),
    swipeThresholdOut: document.querySelector("#swipeThresholdOut"),
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
    settings: { ...TABS_TESTS_MOBILE_SPEC.defaults },
    panels: [],
    panelInners: [],
    tabButtons: [],
    reducedMotion: shouldReduceMotion(),
    drag: {
      active: false,
      pointerId: null,
      pointerType: "",
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      baseX: 0,
      moved: false
    }
  };

  init();

  function init() {
    ensureTransitionStage();
    renderPanels();
    renderTabList();
    preloadStateAssets();
    populateStateSelect();
    hydrateFromUrl();
    bindControls();
    bindViewportGestures();
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function ensureTransitionStage() {
    dom.transitionStage =
      dom.viewport.querySelector(".tabs-tests-mobile__transition-stage") ??
      document.querySelector(".tabs-tests-mobile__transition-stage");

    if (!dom.transitionStage) {
      dom.transitionStage = document.createElement("div");
      dom.transitionStage.className = "tabs-tests-mobile__transition-stage";
      dom.viewport.append(dom.transitionStage);
    }
  }

  function renderPanels() {
    dom.track.innerHTML = "";
    TABS_TESTS_MOBILE_SPEC.states.forEach((state, index) => {
      const article = document.createElement("article");
      article.className = "tabs-tests-mobile__panel";
      article.dataset.index = String(index);
      article.setAttribute("aria-hidden", "true");
      article.innerHTML = `
        <div class="tabs-tests-mobile__panel-inner">
          <figure class="tabs-tests-mobile__figure">
            <img class="tabs-tests-mobile__image" alt="" src="${state.heroImage}" loading="eager" decoding="async" />
          </figure>
          <section class="tabs-tests-mobile__section">
            <h2 class="tabs-tests-mobile__title">${escapeHtml(state.title)}</h2>
            <p class="tabs-tests-mobile__copy" style="font-size:${state.copySize};line-height:${state.copyLineHeight}">${escapeHtml(state.body)}</p>
            <div class="tabs-tests-mobile__cta-wrap">
              <button type="button" class="tabs-tests-mobile__cta" style="font-size:${state.ctaSize || "0.75rem"};line-height:${state.ctaLineHeight || "0.75rem"}">Learn More</button>
            </div>
          </section>
        </div>
      `;
      dom.track.append(article);
    });

    appState.panels = Array.from(dom.track.querySelectorAll(".tabs-tests-mobile__panel"));
    appState.panelInners = Array.from(dom.track.querySelectorAll(".tabs-tests-mobile__panel-inner"));
  }

  function renderTabList() {
    dom.list.innerHTML = "";
    TABS_TESTS_MOBILE_SPEC.tabItems.forEach((label, index) => {
      const li = document.createElement("li");
      li.className = "tabs-tests-mobile__item";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "tabs-tests-mobile__tab";
      button.dataset.index = String(index);
      button.textContent = label;
      button.setAttribute("aria-pressed", "false");

      li.append(button);
      dom.list.append(li);
    });

    appState.tabButtons = Array.from(dom.list.querySelectorAll(".tabs-tests-mobile__tab"));
  }

  function preloadStateAssets() {
    TABS_TESTS_MOBILE_SPEC.states.forEach((state) => {
      const img = new Image();
      img.decoding = "async";
      img.src = state.heroImage;
      img.decode?.().catch(() => {});
    });
  }

  function populateStateSelect() {
    dom.activeState.innerHTML = TABS_TESTS_MOBILE_SPEC.states
      .map((state, index) => `<option value="${index}">${state.label}</option>`)
      .join("");
  }

  function bindControls() {
    dom.activeState.addEventListener("change", () => {
      const nextIndex = Number(dom.activeState.value);
      appState.settings.state = nextIndex;
      setActiveState(nextIndex);
    });

    appState.tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextIndex = Number(button.dataset.index);
        if (nextIndex === appState.activeIndex) return;
        dom.activeState.value = String(nextIndex);
        appState.settings.state = nextIndex;
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

    dom.easeName.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.easeName = dom.easeName.value;
      updateExports();
      updateUrl();
    });

    bindRange(dom.duration, "duration", dom.durationOut, "s");
    bindRange(dom.exitSpeed, "exitSpeed", dom.exitSpeedOut, "s");
    bindRange(dom.entryFade, "entryFade", dom.entryFadeOut, "");
    bindRange(dom.exitFade, "exitFade", dom.exitFadeOut, "");
    bindRange(dom.overlap, "overlap", dom.overlapOut, "s");
    bindRange(dom.handoffGap, "handoffGap", dom.handoffGapOut, "s");
    bindRange(dom.panelShift, "panelShift", dom.panelShiftOut, "px");
    bindRange(dom.swipeThreshold, "swipeThreshold", dom.swipeThresholdOut, "px");

    dom.copyJson.addEventListener("click", () => copyText(dom.jsonExport.value));
    dom.copyCss.addEventListener("click", () => copyText(dom.cssExport.value));
    dom.copyCapture.addEventListener("click", () => copyText(dom.captureExport.value));
    dom.copyUrl.addEventListener("click", () => copyText(buildShareUrl(createUrlParams())));
    dom.resetSettings.addEventListener("click", onReset);
  }

  function bindRange(input, key, output, unit) {
    const write = () => {
      markMotionStyleCustom();
      const value = Number(input.value);
      appState.settings[key] = value;
      output.value = `${formatNumber(value)}${unit}`;
      updateExports();
      updateUrl();
    };
    input.addEventListener("input", write);
    input.addEventListener("change", write);
  }

  function bindViewportGestures() {
    dom.viewport.addEventListener("pointerdown", onPointerDown);
    dom.viewport.addEventListener("pointermove", onPointerMove);
    dom.viewport.addEventListener("pointerup", onPointerUp);
    dom.viewport.addEventListener("pointercancel", onPointerCancel);
  }

  function onPointerDown(event) {
    if (event.button !== undefined && event.button !== 0) return;
    if (event.target.closest(".tabs-tests-mobile__cta")) return;

    killMotionTweens();

    appState.drag.active = true;
    appState.drag.pointerId = event.pointerId;
    appState.drag.pointerType = event.pointerType;
    appState.drag.startX = event.clientX;
    appState.drag.startY = event.clientY;
    appState.drag.deltaX = 0;
    appState.drag.deltaY = 0;
    appState.drag.baseX = getPanelOffset(appState.activeIndex);
    appState.drag.moved = false;

    dom.viewport.setPointerCapture?.(event.pointerId);
  }

  function onPointerMove(event) {
    if (!appState.drag.active || event.pointerId !== appState.drag.pointerId) return;

    appState.drag.deltaX = event.clientX - appState.drag.startX;
    appState.drag.deltaY = event.clientY - appState.drag.startY;
    appState.drag.moved =
      Math.abs(appState.drag.deltaX) > 4 || Math.abs(appState.drag.deltaY) > 4 || appState.drag.moved;

    if (Math.abs(appState.drag.deltaX) <= Math.abs(appState.drag.deltaY)) return;

    const maxOffset = getPanelOffset(TABS_TESTS_MOBILE_SPEC.states.length - 1);
    const nextX = clampNumber(appState.drag.baseX + appState.drag.deltaX, -maxOffset - 72, 72);
    gsap.set(dom.track, { x: nextX });
  }

  function onPointerUp(event) {
    if (!appState.drag.active || event.pointerId !== appState.drag.pointerId) return;

    const { deltaX, deltaY, moved } = appState.drag;
    cleanupDrag(event.pointerId);

    if (!moved || Math.abs(deltaX) <= Math.abs(deltaY)) {
      snapTrackToActive();
      return;
    }

    const threshold = appState.settings.swipeThreshold;
    if (deltaX <= -threshold && appState.activeIndex < TABS_TESTS_MOBILE_SPEC.states.length - 1) {
      setActiveState(appState.activeIndex + 1);
      return;
    }

    if (deltaX >= threshold && appState.activeIndex > 0) {
      setActiveState(appState.activeIndex - 1);
      return;
    }

    snapTrackToActive();
  }

  function onPointerCancel(event) {
    if (!appState.drag.active || event.pointerId !== appState.drag.pointerId) return;
    cleanupDrag(event.pointerId);
    snapTrackToActive();
  }

  function cleanupDrag(pointerId) {
    dom.viewport.releasePointerCapture?.(pointerId);
    appState.drag.active = false;
    appState.drag.pointerId = null;
  }

  function onReset() {
    appState.settings = { ...TABS_TESTS_MOBILE_SPEC.defaults };
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function syncControlsFromState() {
    dom.activeState.value = String(appState.settings.state);
    dom.motionStyle.value = appState.settings.motionStyle;
    dom.transitionType.value = appState.settings.transitionType;
    dom.easeName.value = appState.settings.easeName;
    dom.duration.value = String(appState.settings.duration);
    dom.exitSpeed.value = String(appState.settings.exitSpeed);
    dom.entryFade.value = String(appState.settings.entryFade);
    dom.exitFade.value = String(appState.settings.exitFade);
    dom.overlap.value = String(appState.settings.overlap);
    dom.handoffGap.value = String(appState.settings.handoffGap);
    dom.panelShift.value = String(appState.settings.panelShift);
    dom.swipeThreshold.value = String(appState.settings.swipeThreshold);
    dom.durationOut.value = `${formatNumber(appState.settings.duration)}s`;
    dom.exitSpeedOut.value = `${formatNumber(appState.settings.exitSpeed)}s`;
    dom.entryFadeOut.value = `${formatNumber(appState.settings.entryFade)}`;
    dom.exitFadeOut.value = `${formatNumber(appState.settings.exitFade)}`;
    dom.overlapOut.value = `${formatNumber(appState.settings.overlap)}s`;
    dom.handoffGapOut.value = `${formatNumber(appState.settings.handoffGap)}s`;
    dom.panelShiftOut.value = `${formatNumber(appState.settings.panelShift)}px`;
    dom.swipeThresholdOut.value = `${formatNumber(appState.settings.swipeThreshold)}px`;
  }

  function markMotionStyleCustom() {
    appState.settings.motionStyle = "custom";
    dom.motionStyle.value = "custom";
  }

  function applyMotionStyle(styleName) {
    const preset = MOBILE_MOTION_STYLES[styleName];
    if (!preset) return;
    appState.settings.motionStyle = styleName;
    Object.assign(appState.settings, preset);
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function setActiveState(nextIndex, options = {}) {
    const opts = { immediate: false, ...options };
    const previousIndex = appState.activeIndex;
    appState.activeIndex = nextIndex;
    appState.settings.state = nextIndex;

    if (opts.immediate || previousIndex === nextIndex || appState.reducedMotion) {
      killMotionTweens();
      setPanelsImmediate(nextIndex);
      setTabsImmediate(nextIndex);
      updateExports();
      updateUrl();
      return;
    }

    killMotionTweens();
    animatePanelTransition(previousIndex, nextIndex);
    animateTabTransition(previousIndex, nextIndex);
    updateExports();
    updateUrl();
  }

  function setPanelsImmediate(activeIndex) {
    const x = getPanelOffset(activeIndex);
    gsap.set(dom.track, { x });
    appState.panels.forEach((panel, index) => {
      const active = index === activeIndex;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");
      panel.style.opacity = active ? "1" : "0";
    });
    appState.panelInners.forEach((inner) => {
      inner.style.opacity = "1";
      inner.style.transform = "translate3d(0,0,0)";
    });
    if (dom.transitionStage) {
      dom.transitionStage.innerHTML = "";
    }
  }

  function animatePanelTransition(previousIndex, nextIndex) {
    const type = appState.settings.transitionType;
    if (type === "swap") {
      setPanelsImmediate(nextIndex);
      return;
    }

    if (Math.abs(nextIndex - previousIndex) > 1) {
      animateStagedPanelTransition(previousIndex, nextIndex, type);
      return;
    }

    const ease = appState.settings.easeName;
    const duration = Math.max(0.24, appState.settings.duration);
    const exitDuration = Math.max(0.12, appState.settings.exitSpeed);
    const shift = appState.settings.panelShift;
    const direction = nextIndex > previousIndex ? 1 : -1;
    const overlap = appState.settings.overlap;
    const gap = Math.max(0, appState.settings.handoffGap);
    const outgoingAt = overlap < 0 ? Math.abs(overlap) : 0;
    const incomingAt = (overlap > 0 ? overlap : 0) + gap;
    const previousInner = appState.panelInners[previousIndex];
    const nextInner = appState.panelInners[nextIndex];

    appState.panels.forEach((panel, index) => {
      panel.classList.toggle("is-active", index === nextIndex);
      panel.setAttribute("aria-hidden", index === nextIndex ? "false" : "true");
      panel.style.opacity = index === previousIndex || index === nextIndex ? "1" : "0";
    });

    if (previousInner) {
      gsap.set(previousInner, { opacity: 1, x: 0 });
    }
    if (nextInner) {
      gsap.set(nextInner, {
        opacity: appState.settings.entryFade,
        x: type === "crossfade" ? 0 : shift * direction
      });
    }

    const tl = gsap.timeline({
      defaults: { ease },
      onComplete: () => setPanelsImmediate(nextIndex)
    });

    tl.to(
      dom.track,
      {
        x: getPanelOffset(nextIndex),
        duration
      },
      0
    );

    if (previousInner) {
      tl.to(
        previousInner,
        {
          x: type === "crossfade" ? 0 : -shift * direction * 0.55,
          opacity: appState.settings.exitFade,
          duration: exitDuration,
          ease: "power2.in"
        },
        outgoingAt
      );
    }

    if (nextInner) {
      tl.to(
        nextInner,
        {
          x: 0,
          opacity: 1,
          duration
        },
        incomingAt
      );
    }
  }

  function animateStagedPanelTransition(previousIndex, nextIndex, type) {
    const ease = appState.settings.easeName;
    const duration = Math.max(0.24, appState.settings.duration);
    const exitDuration = Math.max(0.12, appState.settings.exitSpeed);
    const shift = appState.settings.panelShift;
    const direction = nextIndex > previousIndex ? 1 : -1;
    const gap = Math.max(0, appState.settings.handoffGap);
    const previousPanel = appState.panels[previousIndex];
    const nextPanel = appState.panels[nextIndex];
    if (!previousPanel || !nextPanel || !dom.transitionStage) {
      setPanelsImmediate(nextIndex);
      return;
    }

    const previousClone = previousPanel.cloneNode(true);
    const nextClone = nextPanel.cloneNode(true);
    previousClone.classList.add("tabs-tests-mobile__transition-clone");
    nextClone.classList.add("tabs-tests-mobile__transition-clone");
    dom.transitionStage.innerHTML = "";
    dom.transitionStage.append(previousClone, nextClone);

    gsap.set(dom.track, { x: getPanelOffset(nextIndex) });
    appState.panels.forEach((panel, index) => {
      const active = index === nextIndex;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");
      panel.style.opacity = "0";
    });

    const previousInner = previousClone.querySelector(".tabs-tests-mobile__panel-inner");
    const nextInner = nextClone.querySelector(".tabs-tests-mobile__panel-inner");
    const tl = gsap.timeline({ onComplete: () => setPanelsImmediate(nextIndex) });

    if (previousInner) {
      gsap.set(previousInner, { opacity: 1, x: 0 });
      tl.to(previousInner, {
        x: type === "crossfade" ? 0 : -shift * direction * 0.55,
        opacity: appState.settings.exitFade,
        duration: exitDuration,
        ease: "power2.in"
      }, 0);
    }

    if (nextInner) {
      gsap.set(nextInner, {
        opacity: appState.settings.entryFade,
        x: type === "crossfade" ? 0 : shift * direction
      });
      tl.to(nextInner, {
        x: 0,
        opacity: 1,
        duration,
        ease
      }, exitDuration + gap);
    }
  }

  function setTabsImmediate(activeIndex) {
    appState.tabButtons.forEach((button, index) => {
      const active = index === activeIndex;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function animateTabTransition(previousIndex, nextIndex) {
    const previousButton = appState.tabButtons[previousIndex];
    const nextButton = appState.tabButtons[nextIndex];

    if (!previousButton || !nextButton || previousButton === nextButton) {
      setTabsImmediate(nextIndex);
      return;
    }

    setTabsImmediate(nextIndex);

    gsap.fromTo(
      nextButton,
      { y: 8, opacity: 0.7 },
      {
        y: 0,
        opacity: 1,
        duration: Math.max(0.2, appState.settings.duration * 0.52),
        ease: appState.settings.easeName,
        clearProps: "transform,opacity"
      }
    );
  }

  function snapTrackToActive() {
    gsap.to(dom.track, {
      x: getPanelOffset(appState.activeIndex),
      duration: Math.max(0.2, appState.settings.duration * 0.7),
      ease: appState.settings.easeName
    });
  }

  function killMotionTweens() {
    gsap.killTweensOf(dom.track);
    gsap.killTweensOf(appState.panelInners);
    gsap.killTweensOf(appState.tabButtons);
    if (dom.transitionStage) {
      gsap.killTweensOf(Array.from(dom.transitionStage.children));
      dom.transitionStage.innerHTML = "";
    }
  }

  function getPanelOffset(index) {
    return -1 * index * (TABS_TESTS_MOBILE_SPEC.panelWidth + TABS_TESTS_MOBILE_SPEC.panelGap);
  }

  function createUrlParams() {
    const params = new URLSearchParams();
    params.set("state", String(appState.settings.state));
    params.set("motion", appState.settings.motionStyle);
    params.set("mode", appState.settings.transitionType);
    params.set("ease", appState.settings.easeName);
    params.set("duration", formatNumber(appState.settings.duration));
    params.set("exit", formatNumber(appState.settings.exitSpeed));
    params.set("efade", formatNumber(appState.settings.entryFade));
    params.set("xfade", formatNumber(appState.settings.exitFade));
    params.set("ovr", formatNumber(appState.settings.overlap));
    params.set("gap", formatNumber(appState.settings.handoffGap));
    params.set("shift", String(Math.round(appState.settings.panelShift)));
    params.set("threshold", String(Math.round(appState.settings.swipeThreshold)));
    return params;
  }

  function updateUrl() {
    writeParams(createUrlParams());
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    appState.settings.state = clampInt(
      Number(params.get("state") ?? appState.settings.state),
      0,
      TABS_TESTS_MOBILE_SPEC.states.length - 1
    );

    const styleName = params.get("motion");
    if (styleName && styleName in MOBILE_MOTION_STYLES) {
      appState.settings.motionStyle = styleName;
      Object.assign(appState.settings, MOBILE_MOTION_STYLES[styleName]);
    } else if (styleName === "custom") {
      appState.settings.motionStyle = "custom";
    }

    const easeName = params.get("ease");
    if (easeName) appState.settings.easeName = easeName;

    const mode = params.get("mode");
    if (mode && ["slide-fade", "crossfade", "swap"].includes(mode)) {
      appState.settings.transitionType = mode;
    }

    const duration = Number(params.get("duration"));
    if (Number.isFinite(duration)) {
      appState.settings.duration = clampNumber(duration, 0, 3);
      appState.settings.motionStyle = "custom";
    }

    const exit = Number(params.get("exit"));
    if (Number.isFinite(exit)) {
      appState.settings.exitSpeed = clampNumber(exit, 0.1, 2);
      appState.settings.motionStyle = "custom";
    }

    const entryFade = Number(params.get("efade"));
    if (Number.isFinite(entryFade)) {
      appState.settings.entryFade = clampNumber(entryFade, 0, 1);
      appState.settings.motionStyle = "custom";
    }

    const exitFade = Number(params.get("xfade"));
    if (Number.isFinite(exitFade)) {
      appState.settings.exitFade = clampNumber(exitFade, 0, 1);
      appState.settings.motionStyle = "custom";
    }

    const overlap = Number(params.get("ovr"));
    if (Number.isFinite(overlap)) {
      appState.settings.overlap = clampNumber(overlap, -1.2, 1.2);
      appState.settings.motionStyle = "custom";
    }

    const gap = Number(params.get("gap"));
    if (Number.isFinite(gap)) {
      appState.settings.handoffGap = clampNumber(gap, 0, 1.2);
      appState.settings.motionStyle = "custom";
    }

    const shift = Number(params.get("shift"));
    if (Number.isFinite(shift)) {
      appState.settings.panelShift = clampNumber(shift, 0, 140);
      appState.settings.motionStyle = "custom";
    }

    const threshold = Number(params.get("threshold"));
    if (Number.isFinite(threshold)) {
      appState.settings.swipeThreshold = clampNumber(threshold, 24, 120);
      appState.settings.motionStyle = "custom";
    }
  }

  function updateExports() {
    const state = TABS_TESTS_MOBILE_SPEC.states[appState.settings.state];
    const json = JSON.stringify(
      {
        component: TABS_TESTS_MOBILE_SPEC.name,
        figmaNodeId: TABS_TESTS_MOBILE_SPEC.figmaNodeId,
        state: state.label,
        stateNodeId: state.figmaNodeId,
        settings: {
          motionStyle: appState.settings.motionStyle,
          transitionType: appState.settings.transitionType,
          easeName: appState.settings.easeName,
          duration: appState.settings.duration,
          exitSpeed: appState.settings.exitSpeed,
          entryFade: appState.settings.entryFade,
          exitFade: appState.settings.exitFade,
          overlap: appState.settings.overlap,
          handoffGap: appState.settings.handoffGap,
          panelShift: appState.settings.panelShift,
          swipeThreshold: appState.settings.swipeThreshold
        }
      },
      null,
      2
    );

    const css = [
      `:root {`,
      `  --tabs-mobile-entry-speed: ${formatNumber(appState.settings.duration)}s;`,
      `  --tabs-mobile-exit-speed: ${formatNumber(appState.settings.exitSpeed)}s;`,
      `  --tabs-mobile-entry-fade: ${formatNumber(appState.settings.entryFade)};`,
      `  --tabs-mobile-exit-fade: ${formatNumber(appState.settings.exitFade)};`,
      `  --tabs-mobile-overlap: ${formatNumber(appState.settings.overlap)}s;`,
      `  --tabs-mobile-gap: ${formatNumber(appState.settings.handoffGap)}s;`,
      `  --tabs-mobile-shift: ${formatNumber(appState.settings.panelShift)}px;`,
      `  --tabs-mobile-swipe-threshold: ${formatNumber(appState.settings.swipeThreshold)}px;`,
      `  --tabs-mobile-ease: ${appState.settings.easeName};`,
      `}`
    ].join("\n");

    dom.jsonExport.value = json;
    dom.cssExport.value = css;
    dom.captureExport.value = buildCaptureCard({
      componentName: TABS_TESTS_MOBILE_SPEC.name,
      componentNodeId: TABS_TESTS_MOBILE_SPEC.figmaNodeId,
      shareUrl: buildShareUrl(createUrlParams()),
      json,
      stateLabel: state.label,
      stateNodeId: state.figmaNodeId
    });
  }
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

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

export const TABS_TESTS_SPEC = {
  name: ".tabs/tests",
  figmaNodeId: "1145:18545",
  tabItems: [
    "Glyphosate Exposure Panel",
    "Mold & Mycotoxin Exposure Test",
    "Toxic Metals Screening Test",
    "Male Hormone Panel",
    "Female Hormone Panel",
    "Advanced Health Panel",
    "Advanced Genetic Intelligence Panel",
    "Biometabolic Breakthrough Panel"
  ],
  states: [
    {
      key: "1",
      label: "panel=1",
      figmaNodeId: "1145:18546",
      activeTab: 0,
      heroImage: "assets/three-column-tabs/panel-1.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Glyphosate Exposure Panel",
      titleHtml: "Glyphosate<br>Exposure Panel",
      body: "Glyphosate has been linked to gut microbiome disruption, inflammation, and chronic health concerns. Identifying glyphosate levels in your body helps you take steps to detoxify and make informed choices that minimize future exposure."
    },
    {
      key: "2",
      label: "panel=2",
      figmaNodeId: "1145:18549",
      activeTab: 1,
      heroImage: "assets/three-column-tabs/panel-2.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Mold & Mycotoxin Exposure Test",
      body: "Mold and mycotoxin exposure occurs when breathing in or touching toxic substances produced by fungi leading to symptoms like fatigue, headaches, brain fog, respiratory issues, and joint pain. Treatment focuses on remediation of the environment and detoxifying the body."
    },
    {
      key: "3",
      label: "panel=3",
      figmaNodeId: "1145:18552",
      activeTab: 2,
      heroImage: "assets/three-column-tabs/panel-3.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Toxic Metals Screening Test",
      titleHtml: "Toxic Metals<br>Screening Test",
      body: "Toxic metal testing, including blood, urine, or hair analysis, detects harmful levels of elements like lead, mercury, cadmium, and arsenic."
    },
    {
      key: "4",
      label: "panel=4",
      figmaNodeId: "1145:18555",
      activeTab: 3,
      heroImage: "assets/three-column-tabs/panel-4.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Male Hormone Panel",
      body: "A male hormone panel is a set of blood tests that measures key hormone levels to evaluate men’s sexual function, energy, metabolism, and overall well-being."
    },
    {
      key: "5",
      label: "panel=5",
      figmaNodeId: "1145:18558",
      activeTab: 4,
      heroImage: "assets/three-column-tabs/panel-5.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Female Hormone Panel",
      body: "A female hormone panel is a blood test that measures key reproductive, thyroid, and stress hormones to evaluate fertility, menstrual irregularities, PCOS, or menopause symptoms."
    },
    {
      key: "6",
      label: "panel=6",
      figmaNodeId: "1145:18561",
      activeTab: 5,
      heroImage: "assets/three-column-tabs/panel-6.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Advanced Health Panel",
      body: "An advanced health panel is a comprehensive blood test, often involving 60-90+ biomarkers, designed for a deep, proactive, and detailed evaluation of internal health, metabolic function, organ performance, and nutritional status beyond standard annual exams."
    },
    {
      key: "7",
      label: "panel=7",
      figmaNodeId: "1145:18564",
      activeTab: 6,
      heroImage: "assets/three-column-tabs/panel-7.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Advanced Genetic Intelligence Panel",
      body: "Next-Generation Sequencing (NGS), Artificial Intelligence (AI), and comprehensive multi-gene analysis are used to identify genetic predispositions for complex health conditions, rare diseases, or cognitive traits."
    },
    {
      key: "8",
      label: "panel=8",
      figmaNodeId: "1145:18567",
      activeTab: 7,
      heroImage: "assets/three-column-tabs/panel-8.jpg",
      sideImage: "assets/three-column-tabs/detail-thumbnail.jpg",
      title: "Biometabolic Breakthrough Panel",
      body: "Unlike a basic metabolic panel (BMP) that just checks glucose and kidney function, these panels measure 50+ biomarkers, including insulin, hemoglobin A1c (HbA1c), leptin, adiponectin, and advanced lipids to evaluate metabolic function, fat loss potential, and long-term vitality."
    }
  ],
  defaults: {
    state: 0,
    motionStyle: "custom",
    transitionType: "slide-fade",
    maskingMode: "track",
    directionMode: "auto",
    easeName: "power2.out",
    duration: 0.55,
    panelShift: 26,
    tabDuration: 0.35,
    stagger: 0,
    overlap: 0
  }
};

const TABS_MOTION_STYLES = {
  subtle: {
    transitionType: "crossfade",
    easeName: "sine.out",
    duration: 0.75,
    panelShift: 18,
    tabDuration: 0.5,
    stagger: 0,
    overlap: 0
  },
  balanced: {
    transitionType: "slide-fade",
    easeName: "power3.out",
    duration: 1.1,
    panelShift: 52,
    tabDuration: 0.8,
    stagger: 0.08,
    overlap: -0.1
  },
  dramatic: {
    transitionType: "slide-fade",
    easeName: "power4.out",
    duration: 3,
    panelShift: 180,
    tabDuration: 3,
    stagger: 0.6,
    overlap: -0.2
  }
};

export function mountTabsTestsLab() {
  const gsap = globalThis.gsap;
  if (!gsap) {
    throw new Error("GSAP is required. Ensure gsap CDN script is loaded before app.js.");
  }

  const dom = {
    root: document.querySelector('[data-component="tabs-tests"]'),
    list: document.querySelector("#tabsList"),
    heroShell: document.querySelector("#tabsHeroShell"),
    sideShell: document.querySelector("#tabsSideShell"),
    activeState: document.querySelector("#activeState"),
    motionStyle: document.querySelector("#motionStyle"),
    transitionType: document.querySelector("#transitionType"),
    maskingMode: document.querySelector("#maskingMode"),
    directionMode: document.querySelector("#directionMode"),
    easeName: document.querySelector("#easeName"),
    duration: document.querySelector("#duration"),
    panelShift: document.querySelector("#panelShift"),
    tabDuration: document.querySelector("#tabDuration"),
    stagger: document.querySelector("#stagger"),
    overlap: document.querySelector("#overlap"),
    durationOut: document.querySelector("#durationOut"),
    panelShiftOut: document.querySelector("#panelShiftOut"),
    tabDurationOut: document.querySelector("#tabDurationOut"),
    staggerOut: document.querySelector("#staggerOut"),
    overlapOut: document.querySelector("#overlapOut"),
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
    settings: { ...TABS_TESTS_SPEC.defaults },
    tabButtons: [],
    heroPlanes: [],
    sidePlanes: [],
    reducedMotion: shouldReduceMotion()
  };

  init();

  function init() {
    renderTabList();
    renderPlanes();
    preloadStateAssets();
    populateStateSelect();
    hydrateFromUrl();
    bindControls();
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function renderTabList() {
    dom.list.innerHTML = "";
    TABS_TESTS_SPEC.tabItems.forEach((label, index) => {
      const li = document.createElement("li");
      li.className = "tabs-tests__item";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "tabs-tests__tab";
      button.dataset.index = String(index);
      button.textContent = label;
      button.setAttribute("aria-pressed", "false");

      li.append(button);
      dom.list.append(li);
    });
    appState.tabButtons = Array.from(dom.list.querySelectorAll(".tabs-tests__tab"));
  }

  function renderPlanes() {
    dom.heroShell.innerHTML = "";
    dom.sideShell.innerHTML = "";

    TABS_TESTS_SPEC.states.forEach((state, index) => {
      const heroPlane = document.createElement("div");
      heroPlane.className = "tabs-tests__plane";
      heroPlane.dataset.index = String(index);
      heroPlane.setAttribute("aria-hidden", "true");
      heroPlane.innerHTML = `<img class="tabs-tests__hero-image" alt="" src="${state.heroImage}" loading="eager" decoding="async" />`;
      dom.heroShell.append(heroPlane);

      const sidePlane = document.createElement("article");
      sidePlane.className = "tabs-tests__plane tabs-tests__detail";
      sidePlane.dataset.index = String(index);
      sidePlane.setAttribute("aria-hidden", "true");
      const titleMarkup = state.titleHtml ?? escapeHtml(state.title);
      sidePlane.innerHTML = `
        <div class="tabs-tests__detail-thumb-wrap">
          <img class="tabs-tests__detail-thumb" alt="" src="${state.sideImage}" loading="eager" decoding="async" />
        </div>
        <h2 class="tabs-tests__detail-title">${titleMarkup}</h2>
        <p class="tabs-tests__detail-copy">${escapeHtml(state.body)}</p>
        <button type="button" class="tabs-tests__cta">Learn More</button>
      `;
      dom.sideShell.append(sidePlane);
    });

    appState.heroPlanes = Array.from(dom.heroShell.querySelectorAll(".tabs-tests__plane"));
    appState.sidePlanes = Array.from(dom.sideShell.querySelectorAll(".tabs-tests__plane"));
  }

  function preloadStateAssets() {
    const urls = new Set();
    TABS_TESTS_SPEC.states.forEach((state) => {
      if (state.heroImage) urls.add(state.heroImage);
      if (state.sideImage) urls.add(state.sideImage);
    });

    urls.forEach((url) => {
      const img = new Image();
      img.decoding = "async";
      img.src = url;
      img.decode?.().catch(() => {});
    });
  }

  function populateStateSelect() {
    dom.activeState.innerHTML = TABS_TESTS_SPEC.states
      .map((state, index) => `<option value="${index}">${state.label}</option>`)
      .join("");
  }

  function bindControls() {
    dom.activeState.addEventListener("change", () => {
      const nextIndex = Number(dom.activeState.value);
      appState.settings.state = nextIndex;
      setActiveState(nextIndex);
    });

    const supportsHoverActivation = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    appState.tabButtons.forEach((button) => {
      const activateFromTab = () => {
        const panelIndex = Number(button.dataset.index);
        const nextIndex = TABS_TESTS_SPEC.states.findIndex((state) => state.activeTab === panelIndex);
        if (nextIndex < 0 || nextIndex === appState.activeIndex) return;
        dom.activeState.value = String(nextIndex);
        appState.settings.state = nextIndex;
        setActiveState(nextIndex);
      };

      button.addEventListener("click", activateFromTab);
      button.addEventListener("focus", activateFromTab);

      if (supportsHoverActivation) {
        button.addEventListener("pointerenter", activateFromTab);
      }
    });

    dom.transitionType.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.transitionType = dom.transitionType.value;
      updateExports();
      updateUrl();
    });

    dom.maskingMode.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.maskingMode = dom.maskingMode.value;
      applyMaskingMode();
      updateExports();
      updateUrl();
    });

    dom.directionMode.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.directionMode = dom.directionMode.value;
      updateExports();
      updateUrl();
    });

    dom.easeName.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.easeName = dom.easeName.value;
      updateExports();
      updateUrl();
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

    bindRange(dom.stagger, "stagger", dom.staggerOut, "s");
    bindRange(dom.duration, "duration", dom.durationOut, "s");
    bindRange(dom.panelShift, "panelShift", dom.panelShiftOut, "px");
    bindRange(dom.tabDuration, "tabDuration", dom.tabDurationOut, "s");
    bindRange(dom.overlap, "overlap", dom.overlapOut, "s");

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

  function onReset() {
    appState.settings = { ...TABS_TESTS_SPEC.defaults };
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function syncControlsFromState() {
    dom.activeState.value = String(appState.settings.state);
    dom.motionStyle.value = appState.settings.motionStyle;
    dom.transitionType.value = appState.settings.transitionType;
    dom.maskingMode.value = appState.settings.maskingMode;
    dom.directionMode.value = appState.settings.directionMode;
    dom.easeName.value = appState.settings.easeName;
    dom.stagger.value = String(appState.settings.stagger);
    dom.duration.value = String(appState.settings.duration);
    dom.panelShift.value = String(appState.settings.panelShift);
    dom.tabDuration.value = String(appState.settings.tabDuration);
    dom.overlap.value = String(appState.settings.overlap);
    dom.staggerOut.value = `${formatNumber(appState.settings.stagger)}s`;
    dom.durationOut.value = `${formatNumber(appState.settings.duration)}s`;
    dom.panelShiftOut.value = `${formatNumber(appState.settings.panelShift)}px`;
    dom.tabDurationOut.value = `${formatNumber(appState.settings.tabDuration)}s`;
    dom.overlapOut.value = `${formatNumber(appState.settings.overlap)}s`;
    applyMaskingMode();
  }

  function markMotionStyleCustom() {
    appState.settings.motionStyle = "custom";
    dom.motionStyle.value = "custom";
  }

  function applyMotionStyle(styleName) {
    const preset = TABS_MOTION_STYLES[styleName];
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
      setPlanesImmediate(nextIndex);
      setTabsImmediate(nextIndex);
      updateExports();
      updateUrl();
      return;
    }

    const stagger = appState.settings.stagger;
    const panelDelay = stagger < 0 ? -stagger : 0;
    const tabDelay = stagger > 0 ? stagger : 0;

    killMotionTweens();
    animatePlaneTransition(previousIndex, nextIndex, panelDelay);
    animateTabTransition(previousIndex, nextIndex, tabDelay);
    updateExports();
    updateUrl();
  }

  function applyMaskingMode() {
    dom.root.classList.toggle("is-free-fade", appState.settings.maskingMode === "free-fade");
  }

  function killMotionTweens() {
    gsap.killTweensOf([...appState.heroPlanes, ...appState.sidePlanes, ...appState.tabButtons]);
  }

  function setPlanesImmediate(activeIndex) {
    [appState.heroPlanes, appState.sidePlanes].forEach((planes) => {
      planes.forEach((plane, index) => {
        const active = index === activeIndex;
        plane.classList.toggle("is-active", active);
        plane.style.opacity = active ? "1" : "0";
        plane.style.visibility = active ? "visible" : "hidden";
        plane.style.transform = "translate3d(0,0,0)";
      });
    });
  }

  function animatePlaneTransition(previousIndex, nextIndex, delay) {
    const type = appState.settings.transitionType;
    if (type === "swap") {
      setPlanesImmediate(nextIndex);
      return;
    }

    const ease = appState.settings.easeName;
    const duration = appState.settings.duration;
    const shift = appState.settings.panelShift;
    const direction = resolveDirection(previousIndex, nextIndex);

    animatePlaneSet(appState.heroPlanes, previousIndex, nextIndex, type, ease, duration, shift, direction, delay);
    animatePlaneSet(appState.sidePlanes, previousIndex, nextIndex, type, ease, duration, shift, direction, delay);
  }

  function resolveDirection(previousIndex, nextIndex) {
    if (appState.settings.directionMode === "forward") return 1;
    if (appState.settings.directionMode === "reverse") return -1;
    return nextIndex > previousIndex ? 1 : -1;
  }

  function animatePlaneSet(planes, previousIndex, nextIndex, type, ease, duration, shift, direction, delay) {
    const incoming = planes[nextIndex];
    const outgoing = planes[previousIndex];
    if (!incoming) return;

    planes.forEach((plane, index) => {
      if (index !== previousIndex && index !== nextIndex) {
        gsap.killTweensOf(plane);
        plane.classList.remove("is-active");
        plane.style.opacity = "0";
        plane.style.visibility = "hidden";
        plane.style.transform = "translate3d(0,0,0)";
      }
    });

    incoming.classList.add("is-active");
    incoming.style.visibility = "visible";
    gsap.killTweensOf([incoming, outgoing]);
    const overlap = appState.settings.overlap;
    const outgoingAt = (overlap < 0 ? Math.abs(overlap) : 0) + delay;
    const incomingAt = (overlap > 0 ? overlap : 0) + delay;

    const tl = gsap.timeline({
      defaults: { ease, duration },
      onComplete: () => setPlanesImmediate(nextIndex)
    });

    if (type === "slide-fade") {
      gsap.set(incoming, { opacity: 0, x: shift * direction });
      gsap.set(outgoing, { opacity: 1, x: 0 });
      tl.to(outgoing, { opacity: 0, x: -shift * direction, duration: duration * 0.9 }, outgoingAt).to(
        incoming,
        { opacity: 1, x: 0 },
        incomingAt
      );
      return;
    }

    gsap.set(incoming, { opacity: 0, x: 0 });
    gsap.set(outgoing, { opacity: 1, x: 0 });
    tl.to(outgoing, { opacity: 0, duration: duration * 0.9 }, outgoingAt).to(
      incoming,
      { opacity: 1, duration },
      incomingAt
    );
  }

  function setTabsImmediate(activeStateIndex) {
    const activeTab = TABS_TESTS_SPEC.states[activeStateIndex]?.activeTab ?? 0;
    appState.tabButtons.forEach((button, index) => {
      const active = index === activeTab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function animateTabTransition(previousIndex, nextIndex, delay) {
    const prevTab = TABS_TESTS_SPEC.states[previousIndex]?.activeTab;
    const nextTab = TABS_TESTS_SPEC.states[nextIndex]?.activeTab;
    const duration = appState.settings.tabDuration;
    const ease = appState.settings.easeName;
    const overlap = appState.settings.overlap;
    const outgoingDelay = (overlap < 0 ? Math.abs(overlap) : 0) + delay;
    const incomingDelay = (overlap > 0 ? overlap : 0) + delay;

    if (prevTab === undefined || nextTab === undefined || prevTab === nextTab) {
      setTabsImmediate(nextIndex);
      return;
    }

    const outgoing = appState.tabButtons[prevTab];
    const incoming = appState.tabButtons[nextTab];
    if (!outgoing || !incoming) return;

    outgoing.classList.remove("is-active");
    outgoing.setAttribute("aria-pressed", "false");
    incoming.classList.add("is-active");
    incoming.setAttribute("aria-pressed", "true");

    gsap.killTweensOf([outgoing, incoming]);
    gsap.fromTo(
      incoming,
      { opacity: 0.72 },
      { opacity: 1, duration, ease, delay: incomingDelay }
    );
    gsap.to(outgoing, {
      opacity: 0.88,
      duration,
      ease,
      delay: outgoingDelay,
      onComplete: () => {
        outgoing.style.opacity = "";
      }
    });
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("state");
    if (stateParam !== null) {
      appState.settings.state = clampInt(Number(stateParam), 1, TABS_TESTS_SPEC.states.length) - 1;
    }

    const style = params.get("sty");
    if (style && TABS_MOTION_STYLES[style]) {
      appState.settings.motionStyle = style;
      Object.assign(appState.settings, TABS_MOTION_STYLES[style]);
    }

    const mode = params.get("mode");
    if (mode && ["crossfade", "slide-fade", "swap"].includes(mode)) {
      appState.settings.transitionType = mode;
    }

    const mask = params.get("mask");
    if (mask && ["track", "free-fade"].includes(mask)) {
      appState.settings.maskingMode = mask;
    }

    const direction = params.get("dir");
    if (direction && ["auto", "forward", "reverse"].includes(direction)) {
      appState.settings.directionMode = direction;
    }

    const ease = params.get("ease");
    if (ease) appState.settings.easeName = ease;
    applyNumberParam(params, "stg", "stagger", -0.6, 0.6);
    applyNumberParam(params, "dur", "duration", 0, 3);
    applyNumberParam(params, "shift", "panelShift", 0, 180);
    applyNumberParam(params, "tdur", "tabDuration", 0, 3);
    applyNumberParam(params, "ovr", "overlap", -0.4, 0.4);
  }

  function applyNumberParam(params, key, settingKey, min, max) {
    const raw = params.get(key);
    if (raw === null) return;
    const value = Number(raw);
    if (!Number.isFinite(value)) return;
    appState.settings[settingKey] = clampNumber(value, min, max);
  }

  function updateExports() {
    const motionPreset = getMotionPreset();
    const activeState = TABS_TESTS_SPEC.states[appState.activeIndex];
    const payload = {
      component: {
        name: TABS_TESTS_SPEC.name,
        figmaNodeId: TABS_TESTS_SPEC.figmaNodeId
      },
      componentState: {
        index: appState.activeIndex,
        key: activeState?.key,
        label: activeState?.label,
        figmaNodeId: activeState?.figmaNodeId,
        activeTabIndex: activeState?.activeTab,
        activeTabLabel: TABS_TESTS_SPEC.tabItems[activeState?.activeTab ?? 0],
        panelTitle: activeState?.title
      },
      motionPreset
    };

    dom.jsonExport.value = JSON.stringify(payload, null, 2);
    dom.cssExport.value = [
      ":root {",
      `  --motion-duration: ${motionPreset.duration}s;`,
      `  --motion-tab-duration: ${motionPreset.tabDuration}s;`,
      `  --motion-panel-shift: ${motionPreset.panelShift}px;`,
      `  --motion-stagger: ${motionPreset.stagger}s;`,
      `  --motion-overlap: ${motionPreset.overlap}s;`,
      `  --motion-ease-name: ${motionPreset.easeName};`,
      "}",
      "",
      "/* GSAP note: easing names remain GSAP-compatible strings. */",
      `/* Motion style: ${motionPreset.style} */`,
      `/* Transition mode: ${motionPreset.transitionType} */`,
      `/* Masking mode: ${motionPreset.maskingMode} */`,
      `/* Direction mode: ${motionPreset.directionMode} */`,
      `/* State: ${activeState?.label ?? "unknown"} (${activeState?.figmaNodeId ?? "n/a"}) */`
    ].join("\n");

    dom.captureExport.value = buildCaptureCard({
      componentName: TABS_TESTS_SPEC.name,
      componentNodeId: TABS_TESTS_SPEC.figmaNodeId,
      stateLabel: activeState?.label,
      stateNodeId: activeState?.figmaNodeId,
      shareUrl: buildShareUrl(createUrlParams()),
      json: dom.jsonExport.value
    });
  }

  function getMotionPreset() {
    return {
      state: appState.activeIndex + 1,
      style: appState.settings.motionStyle,
      transitionType: appState.settings.transitionType,
      maskingMode: appState.settings.maskingMode,
      directionMode: appState.settings.directionMode,
      easeName: appState.settings.easeName,
      duration: normalizeNumber(appState.settings.duration),
      panelShift: normalizeInt(appState.settings.panelShift),
      tabDuration: normalizeNumber(appState.settings.tabDuration),
      stagger: normalizeNumber(appState.settings.stagger),
      overlap: normalizeNumber(appState.settings.overlap)
    };
  }

  function normalizeNumber(value) {
    return Number(Number(value).toFixed(2));
  }

  function normalizeInt(value) {
    return Math.round(Number(value));
  }

  function updateUrl() {
    const params = createUrlParams();
    writeParams(params);
  }

  function createUrlParams() {
    const motionPreset = getMotionPreset();
    const params = new URLSearchParams();
    params.set("state", String(motionPreset.state));
    params.set("sty", motionPreset.style);
    params.set("mode", motionPreset.transitionType);
    params.set("mask", motionPreset.maskingMode);
    params.set("dir", motionPreset.directionMode);
    params.set("ease", motionPreset.easeName);
    params.set("stg", String(motionPreset.stagger));
    params.set("ovr", String(motionPreset.overlap));
    params.set("dur", String(motionPreset.duration));
    params.set("shift", String(motionPreset.panelShift));
    params.set("tdur", String(motionPreset.tabDuration));
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

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
  figmaNodeId: "378:15055",
  panelWidth: 320,
  panelGap: 16,
  tabItems: [
    "Glyphosate Exposure Panel",
    "Mold & Mycotoxin Exposure Test",
    "Toxic Metals Screening Test",
    "Male Hormone Panel",
    "Female Hormone Panel",
    "Advanced Health Panel",
    "Advanced Genetic Intelligence Panel",
    "BioMetabolic Breakthrough Panel"
  ],
  states: [
    {
      key: "1",
      label: "panel=1",
      figmaNodeId: "378:15057",
      heroImage: "assets/three-column-tabs/panel-1.jpg",
      title: "Glyphosate Exposure Panel",
      body: "Glyphosate, often sprayed on wheat, oats, fruit and vegetables, has been linked to gut microbiome disruption, inflammation, and chronic health concerns. This simple urine test measures your body’s glyphosate levels, so you can take the right steps to detoxify and make informed choices that minimize future exposure.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "2",
      label: "panel=2",
      figmaNodeId: "378:15066",
      heroImage: "assets/three-column-tabs/panel-2.jpg",
      title: "Mold & Mycotoxin Exposure Test",
      body: "Mycotoxins, toxic compounds produced by mold, can weaken your immune system and trigger symptoms like brain fog, fatigue, and gut issues. This test detects harmful mold toxins in your system, so you can address the root causes of unexplained symptoms and take charge of your health with a clear path to detoxification and healing.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "3",
      label: "panel=3",
      figmaNodeId: "378:15075",
      heroImage: "assets/three-column-tabs/panel-3.jpg",
      title: "Toxic Metals Screening Test",
      body: "Toxic metals can silently disrupt your well-being, contributing to fatigue, inflammation, and chronic conditions. Determining the presence of harmful metals in your system empowers you to take targeted action to cleanse your body and support long-term vitality.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "4",
      label: "panel=4",
      figmaNodeId: "378:15084",
      heroImage: "assets/three-column-tabs/panel-4.jpg",
      title: "Male Hormone Panel",
      body: "Your energy, focus and drive all depend on balanced hormones. The Male Hormone Panel is a blood spot test that measures important hormones and thyroid markers that support everything from sleep and vitality to your mental performance.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "5",
      label: "panel=5",
      figmaNodeId: "378:15093",
      heroImage: "assets/three-column-tabs/panel-5.jpg",
      title: "Female Hormone Panel",
      body: "Your hormones influence every part of how you function. The Female Hormone Panel is a blood spot test that evaluates your reproductive hormones, adrenal and thyroid levels to help you understand your body’s rhythm and restore balance naturally.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "6",
      label: "panel=6",
      figmaNodeId: "378:15102",
      heroImage: "assets/three-column-tabs/panel-6.jpg",
      title: "Advanced Health Panel",
      body: "Your body can reveal early signs of imbalance long before you feel them. This is a comprehensive blood spot test that evaluates your metabolism, heart, liver, kidney and nutrient health to help you optimize your overall well-being.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "7",
      label: "panel=7",
      figmaNodeId: "378:15111",
      heroImage: "assets/three-column-tabs/panel-7.jpg",
      title: "Advanced Genetic Intelligence Panel",
      body: "Your energy, cardiovascular efficiency, detox function, and cognitive health are all supported by your body’s chemical process of methylation.This panel analyzes key genetic markers that influence methylation capacity and how your body metabolizes nutrients, repairs cells, and clears toxins. These insights guide personalized strategies for optimizing your long-term health.",
      copySize: "0.625rem",
      copyLineHeight: "1rem"
    },
    {
      key: "8",
      label: "panel=8",
      figmaNodeId: "378:15120",
      heroImage: "assets/three-column-tabs/panel-8.jpg",
      title: "BioMetabolic Breakthrough Panel",
      body: "Your metabolism plays a central role in how your body creates energy, processes nutrients, manages detox, and responds to daily stress. This functional urine test evaluates how your systems work together in real time. Bridging the gap between genetic testing and blood work, the results can reveal inefficiencies undetected by other tests, helping you take steps to optimize your performance, resilience and overall health.",
      copySize: "0.75rem",
      copyLineHeight: "1.125rem",
      ctaSize: "0.875rem",
      ctaLineHeight: "0.875rem"
    }
  ],
  defaults: {
    state: 0,
    motionStyle: "balanced",
    easeName: "power3.out",
    duration: 0.95,
    panelShift: 40,
    swipeThreshold: 56
  }
};

const MOBILE_MOTION_STYLES = {
  subtle: {
    easeName: "sine.out",
    duration: 0.7,
    panelShift: 18,
    swipeThreshold: 48
  },
  balanced: {
    easeName: "power3.out",
    duration: 0.95,
    panelShift: 40,
    swipeThreshold: 56
  },
  dramatic: {
    easeName: "power4.out",
    duration: 1.35,
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
    list: document.querySelector("#tabsTestsMobileList"),
    activeState: document.querySelector("#activeState"),
    motionStyle: document.querySelector("#motionStyle"),
    easeName: document.querySelector("#easeName"),
    duration: document.querySelector("#duration"),
    panelShift: document.querySelector("#panelShift"),
    swipeThreshold: document.querySelector("#swipeThreshold"),
    durationOut: document.querySelector("#durationOut"),
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
              <a class="tabs-tests-mobile__cta" href="#" style="font-size:${state.ctaSize || "0.75rem"};line-height:${state.ctaLineHeight || "0.75rem"}">Learn More</a>
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

    dom.easeName.addEventListener("change", () => {
      markMotionStyleCustom();
      appState.settings.easeName = dom.easeName.value;
      updateExports();
      updateUrl();
    });

    bindRange(dom.duration, "duration", dom.durationOut, "s");
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
    dom.easeName.value = appState.settings.easeName;
    dom.duration.value = String(appState.settings.duration);
    dom.panelShift.value = String(appState.settings.panelShift);
    dom.swipeThreshold.value = String(appState.settings.swipeThreshold);
    dom.durationOut.value = `${formatNumber(appState.settings.duration)}s`;
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
    });
    appState.panelInners.forEach((inner) => {
      inner.style.opacity = "1";
      inner.style.transform = "translate3d(0,0,0)";
    });
  }

  function animatePanelTransition(previousIndex, nextIndex) {
    const ease = appState.settings.easeName;
    const duration = appState.settings.duration;
    const shift = appState.settings.panelShift;
    const direction = nextIndex > previousIndex ? 1 : -1;
    const previousInner = appState.panelInners[previousIndex];
    const nextInner = appState.panelInners[nextIndex];

    appState.panels.forEach((panel, index) => {
      panel.classList.toggle("is-active", index === nextIndex);
      panel.setAttribute("aria-hidden", index === nextIndex ? "false" : "true");
    });

    if (previousInner) {
      gsap.set(previousInner, { opacity: 1, x: 0 });
    }
    if (nextInner) {
      gsap.set(nextInner, { opacity: 0, x: shift * direction });
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
          x: -shift * direction * 0.55,
          opacity: 0.82,
          duration: duration * 0.7
        },
        0
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
        0.04
      );
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
  }

  function getPanelOffset(index) {
    return -1 * index * (TABS_TESTS_MOBILE_SPEC.panelWidth + TABS_TESTS_MOBILE_SPEC.panelGap);
  }

  function createUrlParams() {
    const params = new URLSearchParams();
    params.set("state", String(appState.settings.state));
    params.set("motion", appState.settings.motionStyle);
    params.set("ease", appState.settings.easeName);
    params.set("duration", formatNumber(appState.settings.duration));
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

    const duration = Number(params.get("duration"));
    if (Number.isFinite(duration)) {
      appState.settings.duration = clampNumber(duration, 0, 3);
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
          easeName: appState.settings.easeName,
          duration: appState.settings.duration,
          panelShift: appState.settings.panelShift,
          swipeThreshold: appState.settings.swipeThreshold
        }
      },
      null,
      2
    );

    const css = [
      `:root {`,
      `  --tabs-mobile-duration: ${formatNumber(appState.settings.duration)}s;`,
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

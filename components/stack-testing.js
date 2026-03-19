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

export const STACK_TESTING_SPEC = {
  name: ".stack/testing",
  figmaNodeId: "1063:7598",
  states: [
    {
      key: "1",
      label: "State 1",
      title: "Determine which test is right for you.",
      body: "Our survey can help guide you.",
      image: "assets/stack-promo-divider/step-1.jpg",
      crop: { w: 138.15, h: 143.95, left: 9.17, top: -28.25 }
    },
    {
      key: "2",
      label: "State 2",
      title: "Collect your sample at home.",
      body: "Send to our lab in the pre-paid packaging.",
      image: "assets/stack-promo-divider/step-2.jpg",
      crop: { w: 140, h: 101.54, left: -18.8, top: -14.6 }
    },
    {
      key: "3",
      label: "State 3",
      title: "Get your comprehensive lab report.",
      body: "View your data and AI-guided recommendations.",
      image: "assets/stack-promo-divider/step-3.jpg",
      crop: { w: 125, h: 100.75, left: -21.33, top: -24.38 }
    },
    {
      key: "4",
      label: "State 4",
      title: "You can opt for a telehealth consultation.",
      body: "A licensed provider can prescribe the best protocol.",
      image: "assets/stack-promo-divider/step-4.png",
      crop: { w: 82.72, h: 100, left: 8.63, top: -10.67 }
    }
  ],
  defaults: {
    state: 0,
    motionStyle: "custom",
    transitionType: "crossfade",
    maskingMode: "track",
    directionMode: "auto",
    easeName: "power2.out",
    duration: 0.55,
    imageShift: 18,
    indicatorDuration: 0.45,
    overlap: 0
  }
};

const STACK_MOTION_STYLES = {
  subtle: {
    transitionType: "crossfade",
    easeName: "sine.out",
    duration: 0.65,
    imageShift: 12,
    indicatorDuration: 0.5,
    overlap: 0
  },
  balanced: {
    transitionType: "slide-fade",
    easeName: "power3.out",
    duration: 1,
    imageShift: 42,
    indicatorDuration: 0.8,
    overlap: -0.05
  },
  dramatic: {
    transitionType: "slide-fade",
    easeName: "power4.out",
    duration: 3,
    imageShift: 120,
    indicatorDuration: 3,
    overlap: -0.12
  }
};

export function mountStackTestingLab() {
  const gsap = globalThis.gsap;
  if (!gsap) {
    throw new Error("GSAP is required. Ensure gsap CDN script is loaded before app.js.");
  }

  const dom = {
    root: document.querySelector('[data-component="stack-testing"]'),
    list: document.querySelector("#stackList"),
    imageShell: document.querySelector("#imageShell"),
    activeState: document.querySelector("#activeState"),
    motionStyle: document.querySelector("#motionStyle"),
    transitionType: document.querySelector("#transitionType"),
    maskingMode: document.querySelector("#maskingMode"),
    directionMode: document.querySelector("#directionMode"),
    easeName: document.querySelector("#easeName"),
    duration: document.querySelector("#duration"),
    imageShift: document.querySelector("#imageShift"),
    indicatorDuration: document.querySelector("#indicatorDuration"),
    overlap: document.querySelector("#overlap"),
    durationOut: document.querySelector("#durationOut"),
    imageShiftOut: document.querySelector("#imageShiftOut"),
    indicatorDurationOut: document.querySelector("#indicatorDurationOut"),
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
    settings: { ...STACK_TESTING_SPEC.defaults },
    imagePlanes: [],
    rowButtons: [],
    rowItems: [],
    rowLines: [],
    reducedMotion: shouldReduceMotion()
  };

  init();

  function init() {
    renderList();
    renderImages();
    populateStateSelect();
    hydrateFromUrl();
    bindControls();
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
    window.addEventListener("resize", () => setLineImmediate(appState.activeIndex));
  }

  function renderList() {
    dom.list.innerHTML = "";
    STACK_TESTING_SPEC.states.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "stack-row";
      li.dataset.index = String(index);

      const button = document.createElement("button");
      button.type = "button";
      button.className = "stack-row__button";
      button.dataset.index = String(index);
      button.setAttribute("aria-pressed", "false");

      const num = document.createElement("span");
      num.className = "stack-row__num";
      num.textContent = `${index + 1}.`;

      const text = document.createElement("span");
      text.className = "stack-row__text";

      const title = document.createElement("span");
      title.className = "stack-row__title";
      title.textContent = item.title;

      const copy = document.createElement("span");
      copy.className = "stack-row__copy";
      copy.textContent = item.body;

      const line = document.createElement("span");
      line.className = "stack-row__line";
      line.setAttribute("aria-hidden", "true");

      text.append(title, copy);
      button.append(num, text);
      li.append(button, line);
      dom.list.append(li);
    });

    appState.rowButtons = Array.from(dom.list.querySelectorAll(".stack-row__button"));
    appState.rowItems = Array.from(dom.list.querySelectorAll(".stack-row"));
    appState.rowLines = Array.from(dom.list.querySelectorAll(".stack-row__line"));
  }

  function renderImages() {
    dom.imageShell.innerHTML = "";
    STACK_TESTING_SPEC.states.forEach((state, index) => {
      const plane = document.createElement("div");
      plane.className = "stack-promo__image-plane";
      plane.dataset.index = String(index);
      plane.setAttribute("aria-hidden", "true");

      const stage = document.createElement("div");
      stage.className = "stack-promo__image-stage";

      const img = document.createElement("img");
      img.className = "stack-promo__image";
      img.alt = "";
      img.src = state.image;
      applyCropStyles(img, state.crop);

      stage.append(img);
      plane.append(stage);
      dom.imageShell.append(plane);
    });

    appState.imagePlanes = Array.from(
      dom.imageShell.querySelectorAll(".stack-promo__image-plane")
    );
  }

  function applyCropStyles(img, crop) {
    img.style.width = `${crop.w}%`;
    img.style.height = `${crop.h}%`;
    img.style.left = `${crop.left}%`;
    img.style.top = `${crop.top}%`;
  }

  function populateStateSelect() {
    dom.activeState.innerHTML = STACK_TESTING_SPEC.states
      .map((state, index) => `<option value="${index}">${state.label}</option>`)
      .join("");
  }

  function bindControls() {
    appState.rowButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextIndex = Number(button.dataset.index);
        if (nextIndex !== appState.activeIndex) {
          dom.activeState.value = String(nextIndex);
          appState.settings.state = nextIndex;
          setActiveState(nextIndex);
        }
      });
    });

    dom.activeState.addEventListener("change", () => {
      const nextIndex = Number(dom.activeState.value);
      appState.settings.state = nextIndex;
      setActiveState(nextIndex);
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

    bindRange(dom.duration, "duration", dom.durationOut, "s");
    bindRange(dom.imageShift, "imageShift", dom.imageShiftOut, "px");
    bindRange(dom.indicatorDuration, "indicatorDuration", dom.indicatorDurationOut, "s");
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
    appState.settings = { ...STACK_TESTING_SPEC.defaults };
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
    dom.duration.value = String(appState.settings.duration);
    dom.imageShift.value = String(appState.settings.imageShift);
    dom.indicatorDuration.value = String(appState.settings.indicatorDuration);
    dom.overlap.value = String(appState.settings.overlap);
    dom.durationOut.value = `${formatNumber(appState.settings.duration)}s`;
    dom.imageShiftOut.value = `${formatNumber(appState.settings.imageShift)}px`;
    dom.indicatorDurationOut.value = `${formatNumber(appState.settings.indicatorDuration)}s`;
    dom.overlapOut.value = `${formatNumber(appState.settings.overlap)}s`;
    applyMaskingMode();
  }

  function markMotionStyleCustom() {
    appState.settings.motionStyle = "custom";
    dom.motionStyle.value = "custom";
  }

  function applyMotionStyle(styleName) {
    const preset = STACK_MOTION_STYLES[styleName];
    if (!preset) return;
    appState.settings.motionStyle = styleName;
    Object.assign(appState.settings, preset);
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function applyMaskingMode() {
    dom.root.classList.toggle("is-free-fade", appState.settings.maskingMode === "free-fade");
  }

  function setActiveState(nextIndex, options = {}) {
    const opts = { immediate: false, ...options };
    const previousIndex = appState.activeIndex;
    appState.activeIndex = nextIndex;
    appState.settings.state = nextIndex;
    syncRowState();

    if (opts.immediate || previousIndex === nextIndex || appState.reducedMotion) {
      setImageImmediate(nextIndex);
      setLineImmediate(nextIndex);
      updateExports();
      updateUrl();
      return;
    }

    gsap.killTweensOf([...appState.imagePlanes, ...appState.rowLines]);
    animateImageTransition(previousIndex, nextIndex);
    animateLineTransition(previousIndex, nextIndex);
    updateExports();
    updateUrl();
  }

  function syncRowState() {
    appState.rowButtons.forEach((button, index) => {
      button.setAttribute("aria-pressed", index === appState.activeIndex ? "true" : "false");
    });
  }

  function setImageImmediate(activeIndex) {
    appState.imagePlanes.forEach((plane, index) => {
      const active = index === activeIndex;
      plane.classList.toggle("is-active", active);
      plane.style.opacity = active ? "1" : "0";
      plane.style.visibility = active ? "visible" : "hidden";
      plane.style.transform = "translate3d(0,0,0)";
    });
  }

  function animateImageTransition(previousIndex, nextIndex) {
    const type = appState.settings.transitionType;
    const ease = appState.settings.easeName;
    const duration = appState.settings.duration;
    const shift = appState.settings.imageShift;
    const incoming = appState.imagePlanes[nextIndex];
    const outgoing = appState.imagePlanes[previousIndex];
    if (!incoming) return;

    if (outgoing === incoming || type === "swap") {
      setImageImmediate(nextIndex);
      return;
    }

    appState.imagePlanes.forEach((plane, index) => {
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

    const direction = resolveDirection(previousIndex, nextIndex);
    const overlap = appState.settings.overlap;
    const outgoingAt = overlap < 0 ? Math.abs(overlap) : 0;
    const incomingAt = overlap > 0 ? overlap : 0;
    const tl = gsap.timeline({
      defaults: { ease, duration },
      onComplete: () => setImageImmediate(nextIndex)
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

  function resolveDirection(previousIndex, nextIndex) {
    if (appState.settings.directionMode === "forward") return 1;
    if (appState.settings.directionMode === "reverse") return -1;
    return nextIndex > previousIndex ? 1 : -1;
  }

  function setLineImmediate(activeIndex) {
    appState.rowLines.forEach((line, index) => {
      gsap.killTweensOf(line);
      gsap.set(line, { x: index === activeIndex ? 0 : -getLineOffscreenX() });
    });
  }

  function animateLineTransition(previousIndex, nextIndex) {
    const xOff = -getLineOffscreenX();
    const outgoing = appState.rowLines[previousIndex];
    const incoming = appState.rowLines[nextIndex];
    const overlap = appState.settings.overlap;
    const outgoingDelay = overlap < 0 ? Math.abs(overlap) : 0;
    const incomingDelay = overlap > 0 ? overlap : 0;

    appState.rowLines.forEach((line, index) => {
      if (index !== previousIndex && index !== nextIndex) {
        gsap.killTweensOf(line);
        gsap.set(line, { x: xOff });
      }
    });

    if (outgoing) {
      gsap.killTweensOf(outgoing);
      gsap.to(outgoing, {
        x: xOff,
        duration: appState.settings.indicatorDuration,
        ease: appState.settings.easeName,
        delay: outgoingDelay
      });
    }

    if (incoming) {
      gsap.killTweensOf(incoming);
      gsap.set(incoming, { x: xOff });
      gsap.to(incoming, {
        x: 0,
        duration: appState.settings.indicatorDuration,
        ease: appState.settings.easeName,
        delay: incomingDelay
      });
    }
  }

  function updateExports() {
    const active = STACK_TESTING_SPEC.states[appState.activeIndex];

    dom.jsonExport.value = JSON.stringify(
      {
        component: {
          name: STACK_TESTING_SPEC.name,
          figmaNodeId: STACK_TESTING_SPEC.figmaNodeId
        },
        componentState: {
          index: appState.activeIndex,
          key: active?.key,
          label: active?.label,
          title: active?.title
        },
        motionPreset: {
          state: appState.activeIndex + 1,
          style: appState.settings.motionStyle,
          transitionType: appState.settings.transitionType,
          maskingMode: appState.settings.maskingMode,
          directionMode: appState.settings.directionMode,
          easeName: appState.settings.easeName,
          duration: Number(appState.settings.duration.toFixed(2)),
          imageShift: Math.round(appState.settings.imageShift),
          indicatorDuration: Number(appState.settings.indicatorDuration.toFixed(2)),
          overlap: Number(appState.settings.overlap.toFixed(2))
        }
      },
      null,
      2
    );

    dom.cssExport.value = [
      ":root {",
      `  --motion-duration: ${appState.settings.duration}s;`,
      `  --motion-indicator-duration: ${appState.settings.indicatorDuration}s;`,
      `  --motion-image-shift: ${appState.settings.imageShift}px;`,
      `  --motion-overlap: ${appState.settings.overlap}s;`,
      `  --motion-ease-name: ${appState.settings.easeName};`,
      "}",
      "",
      "/* GSAP note: easing names remain GSAP-compatible strings. */",
      `/* Motion style: ${appState.settings.motionStyle} */`,
      `/* Transition mode: ${appState.settings.transitionType} */`,
      `/* Masking mode: ${appState.settings.maskingMode} */`,
      `/* Direction mode: ${appState.settings.directionMode} */`,
      `/* State: ${active?.label ?? "unknown"} */`
    ].join("\n");

    dom.captureExport.value = buildCaptureCard({
      componentName: STACK_TESTING_SPEC.name,
      componentNodeId: STACK_TESTING_SPEC.figmaNodeId,
      stateLabel: active?.label,
      shareUrl: buildShareUrl(createUrlParams()),
      json: dom.jsonExport.value
    });
  }

  function hydrateFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("state");
    if (stateParam !== null) {
      appState.settings.state =
        clampInt(Number(stateParam), 1, STACK_TESTING_SPEC.states.length) - 1;
    }

    const style = params.get("sty");
    if (style && STACK_MOTION_STYLES[style]) {
      appState.settings.motionStyle = style;
      Object.assign(appState.settings, STACK_MOTION_STYLES[style]);
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
    applyNumberParam(params, "dur", "duration", 0, 3);
    applyNumberParam(params, "shift", "imageShift", 0, 120);
    applyNumberParam(params, "idur", "indicatorDuration", 0, 3);
    applyNumberParam(params, "ovr", "overlap", -0.4, 0.4);
  }

  function applyNumberParam(params, key, settingKey, min, max) {
    const raw = params.get(key);
    if (raw === null) return;
    const value = Number(raw);
    if (!Number.isFinite(value)) return;
    appState.settings[settingKey] = clampNumber(value, min, max);
  }

  function updateUrl() {
    const params = createUrlParams();
    writeParams(params);
  }

  function createUrlParams() {
    const params = new URLSearchParams();
    params.set("state", String(appState.activeIndex + 1));
    params.set("sty", appState.settings.motionStyle);
    params.set("mode", appState.settings.transitionType);
    params.set("mask", appState.settings.maskingMode);
    params.set("dir", appState.settings.directionMode);
    params.set("ease", appState.settings.easeName);
    params.set("dur", String(Number(appState.settings.duration.toFixed(2))));
    params.set("shift", String(Math.round(appState.settings.imageShift)));
    params.set("idur", String(Number(appState.settings.indicatorDuration.toFixed(2))));
    params.set("ovr", String(Number(appState.settings.overlap.toFixed(2))));
    return params;
  }

  function getLineOffscreenX() {
    const rootStyles = getComputedStyle(document.documentElement);
    const raw = rootStyles.getPropertyValue("--row-line-offscreen").trim();
    if (!raw) return 600;

    if (raw.endsWith("rem")) {
      const rem = Number.parseFloat(raw);
      const rootFontSize = Number.parseFloat(rootStyles.fontSize) || 16;
      return Number.isFinite(rem) ? rem * rootFontSize : 600;
    }

    if (raw.endsWith("px")) {
      const px = Number.parseFloat(raw);
      return Number.isFinite(px) ? px : 600;
    }

    const value = Number.parseFloat(raw);
    return Number.isFinite(value) ? value : 600;
  }
}

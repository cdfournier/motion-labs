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

export const GALLERY_PRODUCT_SPEC = {
  name: ".gallery/product",
  figmaNodeId: "1055:18883",
  states: [
    {
      key: "1",
      label: "state=1",
      figmaNodeId: "1055:18882",
      activeThumb: 0,
      imageFit: "cover",
      image: "assets/gallery-product/state-1-main.jpg",
      thumb: "assets/gallery-product/state-1-main.jpg"
    },
    {
      key: "2",
      label: "state=2",
      figmaNodeId: "1055:18881",
      activeThumb: 1,
      imageFit: "cover",
      image: "assets/gallery-product/state-2-main.jpg",
      thumb: "assets/gallery-product/state-2-main.jpg"
    },
    {
      key: "3",
      label: "state=3",
      figmaNodeId: "1055:18884",
      activeThumb: 2,
      imageFit: "cover",
      image: "assets/gallery-product/state-3-main.jpg",
      thumb: "assets/gallery-product/state-3-main.jpg"
    },
    {
      key: "4",
      label: "state=4",
      figmaNodeId: "1055:18915",
      activeThumb: 3,
      imageFit: "contain",
      image: "assets/gallery-product/state-4-main.jpg",
      thumb: "assets/gallery-product/state-4-main.jpg"
    },
    {
      key: "5",
      label: "state=5",
      figmaNodeId: "1055:18946",
      activeThumb: 4,
      imageFit: "contain",
      image: "assets/gallery-product/state-5-main.png",
      thumb: "assets/gallery-product/state-5-main.png"
    }
  ],
  details: {
    title: "ADVANCED HEALTH PANEL",
    subtitle: "Assess essential biomarkers that influence how your body functions.",
    body: "Your body can reveal early signs of imbalance long before you feel them. This is a comprehensive blood spot test evaluates your metabolism, heart, liver, kidney and nutrient health to help you optimize your overall well-being.",
    price: "259",
    cta: "Add To Cart",
    disclaimer:
      "Pay in 4 interest-free installments of $64.75 with SHOPPAY. Sign up for Rewards and earn 355 points for this purchase!"
  },
  defaults: {
    state: 0,
    motionStyle: "custom",
    transitionType: "slide-fade",
    maskingMode: "track",
    directionMode: "auto",
    easeName: "power2.out",
    duration: 0.55,
    imageShift: 36,
    thumbDuration: 0.35,
    overlap: 0
  }
};

const GALLERY_MOTION_STYLES = {
  subtle: {
    transitionType: "crossfade",
    easeName: "sine.out",
    duration: 0.7,
    imageShift: 20,
    thumbDuration: 0.45,
    overlap: 0
  },
  balanced: {
    transitionType: "slide-fade",
    easeName: "power3.out",
    duration: 1.05,
    imageShift: 64,
    thumbDuration: 0.75,
    overlap: -0.02
  },
  dramatic: {
    transitionType: "slide-fade",
    easeName: "power4.out",
    duration: 3,
    imageShift: 220,
    thumbDuration: 3,
    overlap: -0.04
  }
};

export function mountGalleryProductLab() {
  const gsap = globalThis.gsap;
  if (!gsap) {
    throw new Error("GSAP is required. Ensure gsap CDN script is loaded before app.js.");
  }

  const dom = {
    root: document.querySelector('[data-component="gallery-product"]'),
    list: document.querySelector("#galleryThumbs"),
    shell: document.querySelector("#galleryImageShell"),
    productTitle: document.querySelector("#productTitle"),
    productSubtitle: document.querySelector("#productSubtitle"),
    productBody: document.querySelector("#productBody"),
    productPrice: document.querySelector("#productPrice"),
    productCta: document.querySelector("#productCta"),
    productNote: document.querySelector("#productNote"),
    activeState: document.querySelector("#activeState"),
    motionStyle: document.querySelector("#motionStyle"),
    transitionType: document.querySelector("#transitionType"),
    maskingMode: document.querySelector("#maskingMode"),
    directionMode: document.querySelector("#directionMode"),
    easeName: document.querySelector("#easeName"),
    duration: document.querySelector("#duration"),
    imageShift: document.querySelector("#imageShift"),
    thumbDuration: document.querySelector("#thumbDuration"),
    overlap: document.querySelector("#overlap"),
    durationOut: document.querySelector("#durationOut"),
    imageShiftOut: document.querySelector("#imageShiftOut"),
    thumbDurationOut: document.querySelector("#thumbDurationOut"),
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
    settings: { ...GALLERY_PRODUCT_SPEC.defaults },
    imagePlanes: [],
    thumbButtons: [],
    reducedMotion: shouldReduceMotion()
  };

  init();

  function init() {
    hydrateStaticDetails();
    renderImages();
    renderThumbs();
    populateStateSelect();
    hydrateFromUrl();
    bindControls();
    syncControlsFromState();
    setActiveState(appState.settings.state, { immediate: true });
    updateExports();
    updateUrl();
  }

  function renderImages() {
    dom.shell.innerHTML = "";

    GALLERY_PRODUCT_SPEC.states.forEach((state, index) => {
      const plane = document.createElement("div");
      plane.className = "gallery-product__image-plane";
      plane.dataset.index = String(index);
      plane.setAttribute("aria-hidden", "true");
      const imageFitClass = state.imageFit === "contain" ? " gallery-product__image--contain" : "";
      plane.innerHTML = `
        <div class="gallery-product__image-stage">
          <img class="gallery-product__image${imageFitClass}" alt="" src="${state.image}" />
        </div>
      `;
      dom.shell.append(plane);
    });

    appState.imagePlanes = Array.from(
      dom.shell.querySelectorAll(".gallery-product__image-plane")
    );
  }

  function hydrateStaticDetails() {
    dom.productTitle.textContent = GALLERY_PRODUCT_SPEC.details.title;
    dom.productSubtitle.textContent = GALLERY_PRODUCT_SPEC.details.subtitle;
    dom.productBody.textContent = GALLERY_PRODUCT_SPEC.details.body;
    dom.productPrice.textContent = GALLERY_PRODUCT_SPEC.details.price;
    dom.productCta.textContent = GALLERY_PRODUCT_SPEC.details.cta;
    dom.productNote.textContent = GALLERY_PRODUCT_SPEC.details.disclaimer;
  }

  function renderThumbs() {
    dom.list.innerHTML = "";

    GALLERY_PRODUCT_SPEC.states.forEach((state, index) => {
      const li = document.createElement("li");
      li.className = "gallery-product__thumb-item";

      const button = document.createElement("button");
      button.type = "button";
      button.className = "gallery-product__thumb";
      button.dataset.index = String(index);
      button.setAttribute("aria-pressed", "false");
      const thumbSrc = state.thumb || state.image;
      button.innerHTML = `<img class="gallery-product__thumb-image" alt="" src="${thumbSrc}" />`;

      li.append(button);
      dom.list.append(li);
    });

    appState.thumbButtons = Array.from(dom.list.querySelectorAll(".gallery-product__thumb"));
  }

  function populateStateSelect() {
    dom.activeState.innerHTML = GALLERY_PRODUCT_SPEC.states
      .map((state, index) => `<option value="${index}">${state.label}</option>`)
      .join("");
  }

  function bindControls() {
    dom.activeState.addEventListener("change", () => {
      const nextIndex = Number(dom.activeState.value);
      appState.settings.state = nextIndex;
      setActiveState(nextIndex);
    });

    appState.thumbButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextIndex = Number(button.dataset.index);
        if (nextIndex < 0 || nextIndex === appState.activeIndex) return;
        dom.activeState.value = String(nextIndex);
        appState.settings.state = nextIndex;
        setActiveState(nextIndex);
      });
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
    bindRange(dom.thumbDuration, "thumbDuration", dom.thumbDurationOut, "s");
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
    appState.settings = { ...GALLERY_PRODUCT_SPEC.defaults };
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
    dom.thumbDuration.value = String(appState.settings.thumbDuration);
    dom.overlap.value = String(appState.settings.overlap);
    dom.durationOut.value = `${formatNumber(appState.settings.duration)}s`;
    dom.imageShiftOut.value = `${formatNumber(appState.settings.imageShift)}px`;
    dom.thumbDurationOut.value = `${formatNumber(appState.settings.thumbDuration)}s`;
    dom.overlapOut.value = `${formatNumber(appState.settings.overlap)}s`;
    applyMaskingMode();
  }

  function markMotionStyleCustom() {
    appState.settings.motionStyle = "custom";
    dom.motionStyle.value = "custom";
  }

  function applyMotionStyle(styleName) {
    const preset = GALLERY_MOTION_STYLES[styleName];
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

    if (opts.immediate || previousIndex === nextIndex || appState.reducedMotion) {
      setImagesImmediate(nextIndex);
      setThumbsImmediate(nextIndex);
      updateExports();
      updateUrl();
      return;
    }

    gsap.killTweensOf([...appState.imagePlanes, ...appState.thumbButtons]);
    animateImageTransition(previousIndex, nextIndex);
    animateThumbTransition(previousIndex, nextIndex);
    updateExports();
    updateUrl();
  }

  function setImagesImmediate(activeIndex) {
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
    if (type === "swap") {
      setImagesImmediate(nextIndex);
      return;
    }

    const incoming = appState.imagePlanes[nextIndex];
    const outgoing = appState.imagePlanes[previousIndex];
    if (!incoming) return;

    const ease = appState.settings.easeName;
    const duration = appState.settings.duration;
    const shift = appState.settings.imageShift;
    const direction = resolveDirection(previousIndex, nextIndex);
    const overlap = appState.settings.overlap;
    const outgoingAt = overlap < 0 ? Math.abs(overlap) : 0;
    const incomingAt = overlap > 0 ? overlap : 0;

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

    const tl = gsap.timeline({
      defaults: { ease, duration },
      onComplete: () => setImagesImmediate(nextIndex)
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

  function setThumbsImmediate(activeStateIndex) {
    const activeThumb = GALLERY_PRODUCT_SPEC.states[activeStateIndex]?.activeThumb ?? 0;
    appState.thumbButtons.forEach((button, index) => {
      const active = index === activeThumb;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function animateThumbTransition(previousIndex, nextIndex) {
    const prevThumb = GALLERY_PRODUCT_SPEC.states[previousIndex]?.activeThumb;
    const nextThumb = GALLERY_PRODUCT_SPEC.states[nextIndex]?.activeThumb;
    const duration = appState.settings.thumbDuration;
    const ease = appState.settings.easeName;
    const overlap = appState.settings.overlap;
    const outgoingDelay = overlap < 0 ? Math.abs(overlap) : 0;
    const incomingDelay = overlap > 0 ? overlap : 0;

    if (prevThumb === undefined || nextThumb === undefined || prevThumb === nextThumb) {
      setThumbsImmediate(nextIndex);
      return;
    }

    const outgoing = appState.thumbButtons[prevThumb];
    const incoming = appState.thumbButtons[nextThumb];
    if (!outgoing || !incoming) return;

    outgoing.classList.remove("is-active");
    outgoing.setAttribute("aria-pressed", "false");
    incoming.classList.add("is-active");
    incoming.setAttribute("aria-pressed", "true");

    gsap.killTweensOf([outgoing, incoming]);
    gsap.fromTo(incoming, { opacity: 0.72 }, { opacity: 1, duration, ease, delay: incomingDelay });
    gsap.to(outgoing, {
      opacity: 0.86,
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
      appState.settings.state = clampInt(Number(stateParam), 1, GALLERY_PRODUCT_SPEC.states.length) - 1;
    }

    const style = params.get("sty");
    if (style && GALLERY_MOTION_STYLES[style]) {
      appState.settings.motionStyle = style;
      Object.assign(appState.settings, GALLERY_MOTION_STYLES[style]);
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
    applyNumberParam(params, "shift", "imageShift", 0, 220);
    applyNumberParam(params, "tdur", "thumbDuration", 0, 3);
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
    const active = GALLERY_PRODUCT_SPEC.states[appState.activeIndex];

    dom.jsonExport.value = JSON.stringify(
      {
        component: {
          name: GALLERY_PRODUCT_SPEC.name,
          figmaNodeId: GALLERY_PRODUCT_SPEC.figmaNodeId
        },
        componentState: {
          index: appState.activeIndex,
          key: active?.key,
          label: active?.label,
          figmaNodeId: active?.figmaNodeId,
          activeThumbIndex: active?.activeThumb
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
          thumbDuration: Number(appState.settings.thumbDuration.toFixed(2)),
          overlap: Number(appState.settings.overlap.toFixed(2))
        }
      },
      null,
      2
    );

    dom.cssExport.value = [
      ":root {",
      `  --motion-duration: ${appState.settings.duration}s;`,
      `  --motion-thumb-duration: ${appState.settings.thumbDuration}s;`,
      `  --motion-image-shift: ${appState.settings.imageShift}px;`,
      `  --motion-overlap: ${appState.settings.overlap}s;`,
      `  --motion-ease-name: ${appState.settings.easeName};`,
      "}",
      "",
      `/* Motion style: ${appState.settings.motionStyle} */`,
      `/* Transition mode: ${appState.settings.transitionType} */`,
      `/* Masking mode: ${appState.settings.maskingMode} */`,
      `/* Direction mode: ${appState.settings.directionMode} */`,
      `/* State: ${active?.label ?? "unknown"} (${active?.figmaNodeId ?? "n/a"}) */`
    ].join("\n");

    dom.captureExport.value = buildCaptureCard({
      componentName: GALLERY_PRODUCT_SPEC.name,
      componentNodeId: GALLERY_PRODUCT_SPEC.figmaNodeId,
      stateLabel: active?.label,
      stateNodeId: active?.figmaNodeId,
      shareUrl: buildShareUrl(createUrlParams()),
      json: dom.jsonExport.value
    });
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
    params.set("tdur", String(Number(appState.settings.thumbDuration.toFixed(2))));
    params.set("ovr", String(Number(appState.settings.overlap.toFixed(2))));
    return params;
  }
}

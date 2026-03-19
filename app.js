import { mountStackTestingLab } from "./components/stack-testing.js";
import { mountTabsTestsLab } from "./components/tabs-tests.js";
import { mountGalleryProductLab } from "./components/gallery-product.js";
import { mountBannerPrescriptionPlanLab } from "./components/banner-prescription-plan.js";
import { mountBannerHealthRotatorLab } from "./components/banner-health-rotator.js";
import { mountFluidPreview } from "./scripts/lab-core.js";

const component = document.querySelector("[data-component]")?.getAttribute("data-component");

if (component === "stack-testing") {
  mountStackTestingLab();
}

if (component === "tabs-tests") {
  mountTabsTestsLab();
}

if (component === "gallery-product") {
  mountGalleryProductLab();
}

if (component === "banner-prescription-plan") {
  mountBannerPrescriptionPlanLab();
}

if (component === "banner-health-rotator") {
  mountBannerHealthRotatorLab();
}

mountFluidPreview();

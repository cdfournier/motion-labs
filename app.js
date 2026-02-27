import { mountStackTestingLab } from "./components/stack-testing.js";
import { mountTabsTestsLab } from "./components/tabs-tests.js";

const component = document.querySelector("[data-component]")?.getAttribute("data-component");

if (component === "stack-testing") {
  mountStackTestingLab();
}

if (component === "tabs-tests") {
  mountTabsTestsLab();
}

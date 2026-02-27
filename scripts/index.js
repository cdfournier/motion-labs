import { SPECIMENS } from "./specimens.js";

const list = document.querySelector("#specimenList");

if (list) {
  list.innerHTML = SPECIMENS.map(
    (specimen) => `
      <a class="index-card" href="${specimen.href}">
        <span class="index-card__name">${specimen.name}</span>
        <span class="index-card__meta">Figma node ${specimen.figmaNodeId}</span>
      </a>
    `
  ).join("");
}

const menu = document.querySelector("[data-menu]");
const nav = document.querySelector("[data-nav]");
if (menu && nav) {
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") === "true";
    menu.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("open", !open);
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menu.setAttribute("aria-expanded", "false"); nav.classList.remove("open");
  }));
}
const form = document.querySelector("[data-calculator]");
const area = document.querySelector("#area");
const areaOutput = document.querySelector("#area-output");
const powerNode = document.querySelector("[data-power]");
const productionNode = document.querySelector("[data-production]");
function format(value) { return new Intl.NumberFormat("tr-TR", {maximumFractionDigits: 1}).format(value); }
function calculate() {
  const roofArea = Number(area.value);
  const sunHours = Number(form.elements.sunHours.value);
  const orientation = Number(form.elements.orientation.value);
  const power = roofArea / 10;
  const annual = power * sunHours * 365 * orientation;
  areaOutput.textContent = `${roofArea} m²`;
  powerNode.textContent = `${format(power)} kWp`;
  productionNode.textContent = `${Math.round(annual * .9).toLocaleString("tr-TR")}–${Math.round(annual * 1.1).toLocaleString("tr-TR")} kWh`;
}
if (form) { form.addEventListener("input", calculate); calculate(); }

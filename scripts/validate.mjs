import {readFile,access} from "node:fs/promises";
for(const file of ["index.html","impressum.html","datenschutz.html","assets/css/style.css","assets/js/script.js","assets/images/favicon.svg"]) await access(file);
const html=await readFile("index.html","utf8");
const js=await readFile("assets/js/script.js","utf8");
for(const marker of ['<html lang="tr">','data-calculator','impressum.html','datenschutz.html','https://ak-hosting.github.io/ak-solar/']) if(!html.includes(marker)) throw new Error(`Eksik: ${marker}`);
if(/bootstrap|font-awesome|cdnjs|jsdelivr|lightbox/i.test(html)) throw new Error("Harici runtime bağımlılığı bulundu");
if(/email|telefon|textarea|localStorage|fetch\(/i.test(html+js)) throw new Error("Demo gereksiz veri topluyor veya iletiyor");
console.log("Validation passed: local runtime, transparent calculator and legal links are present.");

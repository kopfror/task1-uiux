/* ===================== Header text (only the header is translated, as in the video) ===================== */
const TEXT = {
  en: { title: "Training 2026", lang: "العربية", add: "Add content", clear: "Clear content" },
  ar: { title: "تدريب 2026", lang: "English", add: "إضافة محتوى", clear: "مسح المحتوى" }
};

const MENU = [
  ["Dashboard", "layout-grid", "#2f6fde"], ["HTML Editor", "code", "#2a9d8f"], ["CSS Styles", "pencil", "#e07a1f"],
  ["JS Console", "square-terminal", "#8e44ad"], ["Components", "blocks", "#2f6fde"], ["Templates", "layout-template", "#16a085"],
  ["Snippets", "clipboard", "#d4a017"], ["Projects", "folder", "#c0392b"], ["Live Preview", "eye", "#2f6fde"],
  ["Responsive Design", "monitor-smartphone", "#27ae60"], ["Color Palette", "palette", "#e07a1f"], ["Typography", "type", "#c0392b"],
  ["Animations", "sparkles", "#3b5bdb"], ["Debugger", "bug", "#27ae60"], ["Settings", "settings", "#e0a21f"]
];

const TECH = [
  ["HTML", "HTML", "#e34c26", "", "HTML (HyperText Markup Language) provides the structure of a page: headings, paragraphs, links, images, and forms. It gives the browser a document to render and gives assistive tools something meaningful to read."],
  ["CSS", "CSS", "#264de4", "", "CSS (Cascading Style Sheets) controls presentation: layout, color, spacing, typography, and responsiveness. It lets the same HTML adapt to different screen sizes and themes without changing the markup."],
  ["JavaScript", "JS", "#f0db4f", "js", "JavaScript adds behavior. It runs in the browser to respond to user interaction, update the page without a reload, fetch data from a server, and tie HTML and CSS together into an interactive experience."]
];

/* ===================== Build sidebar and article once ===================== */
document.getElementById("menu").innerHTML = MENU.map(([name, icon, color]) =>
  `<a href="#"><i data-lucide="${icon}" style="--c:${color}"></i>${name}</a>`).join("");

document.getElementById("content").innerHTML =
  `<h2>HTML, CSS &amp; JavaScript</h2>
   <p class="lead">The web platform is built on three complementary technologies. Each has a distinct job, and together they form every page you browse.</p>` +
  TECH.map(([title, label, color, cls, text]) =>
    `<h3>${title}</h3><div class="row"><span class="badge ${cls}" style="--c:${color}">${label}</span><p>${text}</p></div>`).join("") +
  `<h3>How they work together</h3>
   <p>A browser parses HTML into the DOM, applies CSS rules to determine how each element looks, and runs JavaScript to modify both the DOM and the styles over time. Changing text, hiding an element, or reacting to a click all rely on this pipeline.</p>`;

lucide.createIcons();

/* ===================== Language: flips direction, translates header ===================== */
let lang = "en";
function setLang() {
  const t = TEXT[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-t]").forEach(el => (el.textContent = t[el.dataset.t]));
}
document.getElementById("lang").onclick = () => { lang = lang === "en" ? "ar" : "en"; setLang(); };
setLang();

/* ===================== Dynamic header content ===================== */
const list = document.getElementById("updates");
let count = 0;
document.getElementById("add").onclick = () => {
  const li = document.createElement("li");
  li.innerHTML = `Update ${++count} <button aria-label="Remove">×</button>`;
  list.append(li);
};
list.onclick = e => {
  if (!e.target.matches("button")) return;
  e.target.parentElement.remove();
  if (!list.children.length) count = 0;
};
document.getElementById("clear").onclick = () => { list.innerHTML = ""; count = 0; };
document.getElementById("menu").onclick = e => e.target.closest("a") && e.preventDefault();

/* ===================== Sidebar resize ===================== */
const resizer = document.getElementById("resizer");
resizer.addEventListener("pointerdown", e => {
  resizer.setPointerCapture(e.pointerId);
  document.body.classList.add("resizing");
});
resizer.addEventListener("pointermove", e => {
  if (!resizer.hasPointerCapture(e.pointerId)) return;
  const x = document.documentElement.dir === "rtl" ? innerWidth - e.clientX : e.clientX;
  const w = Math.min(Math.max(x, 56), innerWidth * 0.5, 420);
  document.documentElement.style.setProperty("--side", w + "px");
});
resizer.addEventListener("pointerup", () => document.body.classList.remove("resizing"));

/* ===================== 3D heart: drag to rotate, wheel/pinch to zoom ===================== */
/* Model: "Human Heart" by Rudy (sketchfab.com/Rudy27), CC-BY-4.0 */
(function heart() {
  const box = document.getElementById("heart");
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.01, 100);
  camera.position.set(0, 0, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  box.append(renderer.domElement);

  scene.add(new THREE.HemisphereLight(0xffffff, 0x777777, 1));
  const key = new THREE.DirectionalLight(0xffffff, 0.8);
  key.position.set(2, 3, 4);
  scene.add(key);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  Object.assign(controls, {
    enableDamping: true, enablePan: false, autoRotate: true, autoRotateSpeed: 1.5,
    minDistance: 1.2, maxDistance: 8
  });

  const draco = new THREE.DRACOLoader();
  draco.setDecoderPath("https://cdn.jsdelivr.net/npm/three@0.147.0/examples/js/libs/draco/gltf/");
  const loader = new THREE.GLTFLoader();
  loader.setDRACOLoader(draco);
  loader.load("assets/heart.glb", gltf => {
    const model = gltf.scene;
    const b = new THREE.Box3().setFromObject(model);
    model.position.sub(b.getCenter(new THREE.Vector3()));
    model.scale.setScalar(1.25 / b.getSize(new THREE.Vector3()).y);
    model.position.multiplyScalar(model.scale.x);
    scene.add(model);
  });

  new ResizeObserver(() => {
    const { clientWidth: w, clientHeight: h } = box;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }).observe(box);

  renderer.setAnimationLoop(() => {
    controls.update();
    renderer.render(scene, camera);
  });
})();

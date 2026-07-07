import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const hero = canvas.closest('.hero');
  const W = () => hero.offsetWidth;
  const H = () => hero.offsetHeight;

  // ── Renderer ─────────────────────────────────────────────────────────────
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(W(), H());
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // ── Scene & Camera ────────────────────────────────────────────────────────
  const scene  = new THREE.Scene();
  // Focal Length 75 mm, Sensor Size 36 mm, Position (0, 0, 8.8289)
  const camera = new THREE.PerspectiveCamera(42, W() / H(), 0.01, 200);
  camera.filmGauge = 36;
  camera.setFocalLength(75);
  camera.position.set(0, 18, 0);
  camera.up.set(-1, 0, 0); // 90° clockwise around view axis (top-down camera)
  camera.lookAt(0, 0, 0);

  // ── Lights ────────────────────────────────────────────────────────────────
  // Soft ambient so the GLB's dark-green BG material stays rich
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));

  // Mint key light matching the brand colour
  const keyLight = new THREE.DirectionalLight(0x4ef0c3, 3.0);
  keyLight.position.set(3, 5, 4);
  scene.add(keyLight);

  // Blue fill from the opposite side
  const fillLight = new THREE.DirectionalLight(0x6ddcff, 1.6);
  fillLight.position.set(-4, 2, -3);
  scene.add(fillLight);

  // Subtle back rim
  const rimLight = new THREE.DirectionalLight(0xffffff, 0.4);
  rimLight.position.set(0, -3, -5);
  scene.add(rimLight);

  // ── State ─────────────────────────────────────────────────────────────────
  let mixer = null;

  // ── Load GLB ─────────────────────────────────────────────────────────────
  new GLTFLoader().load(
    'assets/3d/t-nua.glb',
    (gltf) => {
      const model = gltf.scene;
      scene.add(model);

      // Play every animation clip that came with the file
      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.setLoop(THREE.LoopRepeat, Infinity);
          action.play();
        });
      }

      // Centre the model at origin
      const box    = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);
    },
    undefined,
    // Fallback: hide canvas on load error so the CSS gradient shows
    () => { canvas.style.display = 'none'; }
  );

  // ── Resize ────────────────────────────────────────────────────────────────
  new ResizeObserver(() => {
    camera.aspect = W() / H();
    camera.setFocalLength(75); // recalculate vFOV for new aspect
    renderer.setSize(W(), H());
  }).observe(hero);

  // ── Render loop ───────────────────────────────────────────────────────────
  const clock = new THREE.Clock();

  (function tick() {
    requestAnimationFrame(tick);
    if (document.hidden) return;
    const dt = clock.getDelta();
    if (mixer) mixer.update(dt);
    renderer.render(scene, camera);
  })();
})();

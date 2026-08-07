import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/addons/libs/meshopt_decoder.module.js';
import * as CANNON from 'cannon-es';

const container = document.getElementById('scene3d');
if (!container) { console.error('#scene3d not found'); }

function scheduleInit() {
  const run = () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(init, { timeout: 2000 });
    } else {
      setTimeout(init, 1000);
    }
  };
  if (document.readyState === 'complete') run();
  else window.addEventListener('load', run, { once: true });
}

function init() {
  const W = window.innerWidth;
  const H = window.innerHeight;
  if (W < 1 || H < 1) { requestAnimationFrame(init); return; }

  const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, W / H, 0.1, 30);
  camera.position.set(0, 0.3, 5.5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: W >= 900 && !isCoarse });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isCoarse ? 1 : 1.25));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0x404066, 0.7));
  const key = new THREE.DirectionalLight(0xccddff, 2.0);
  key.position.set(4, 6, 3);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x7c3aed, 0.5);
  fill.position.set(-3, 2, -2);
  scene.add(fill);

  const world = new CANNON.World({ gravity: new CANNON.Vec3(0, 0, 0), allowSleep: false });

  const items = [];
  const modelGroup = new THREE.Group();
  scene.add(modelGroup);

  function makeBody(mass, sx, sy, sz, x, y, z) {
    const b = new CANNON.Body({
      mass,
      linearDamping: 0,
      angularDamping: 0,
    });
    b.addShape(new CANNON.Box(new CANNON.Vec3(sx / 2, sy / 2, sz / 2)));
    b.position.set(x, y, z);
    return b;
  }

  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const files = [
    '3D/cyberpunk_laptop.glb',
    '3D/laptop_holoscreen.glb',
    '3D/laptop.glb',
    '3D/lowpoly_laptop_closed.glb',
  ];

  function loadFile(path, idx) {
    loader.load(
      path,
      (gltf) => {
        const mesh = gltf.scene;
        mesh.scale.set(0.9, 0.9, 0.9);

        const box = new THREE.Box3().setFromObject(mesh);
        const size = box.getSize(new THREE.Vector3());
        const targetWidth = 1.1;
        const scaleFix = targetWidth / Math.max(size.x, size.y, size.z, 0.01);
        mesh.scale.multiplyScalar(scaleFix);

        const box2 = new THREE.Box3().setFromObject(mesh);
        const finalSize = box2.getSize(new THREE.Vector3());

        const rx = (Math.random() - 0.5) * 3;
        const ry = (Math.random() - 0.5) * 2;
        const rz = (Math.random() - 0.5) * 3;
        mesh.position.set(rx, ry, rz);
        mesh.rotation.set(
          (Math.random() - 0.5) * 0.5,
          Math.random() * Math.PI * 2,
          (Math.random() - 0.5) * 0.5,
        );
        modelGroup.add(mesh);

        const body = makeBody(0.8, finalSize.x, finalSize.y, finalSize.z, rx, ry, rz);
        {
          const dirs = [
            [0.5, 0.15, 0.1],
            [-0.4, 0.2, -0.1],
            [0.1, -0.5, 0.15],
            [-0.2, -0.3, -0.15],
          ];
          const d = dirs[idx % dirs.length];
          body.velocity.set(d[0], d[1], d[2]);
        }
        world.addBody(body);
        items.push({ mesh, body, size });
      },
      undefined,
      () => {},
    );
  }

  files.forEach((path, idx) => {
    if (idx === 0) {
      const queueDeferred = () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => loadFile(path, idx), { timeout: 4000 });
        } else {
          setTimeout(() => loadFile(path, idx), 4000);
        }
      };
      if (document.readyState === 'complete') queueDeferred();
      else window.addEventListener('load', queueDeferred, { once: true });
    } else {
      loadFile(path, idx);
    }
  });

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let dragBody = null;
  const dragPlane = new THREE.Plane();
  const pOut = new THREE.Vector3();

  function meshes() {
    const all = [];
    items.forEach(({ mesh }) => mesh.traverse((c) => { if (c.isMesh) all.push(c); }));
    return all;
  }

  window.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(meshes(), false);
    if (!hits.length) return;

    const entry = items.find(({ mesh }) => {
      let found = false;
      mesh.traverse((c) => { if (c === hits[0].object) found = true; });
      return found;
    });
    if (!entry) return;

    e.preventDefault();
    dragBody = entry.body;
    dragBody.type = CANNON.Body.KINEMATIC;
    const p = dragBody.position;
    dragPlane.setFromNormalAndCoplanarPoint(
      camera.getWorldDirection(new THREE.Vector3()).negate(),
      new THREE.Vector3(p.x, p.y, p.z),
    );
  });

  window.addEventListener('pointermove', (e) => {
    if (!dragBody) return;
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    if (raycaster.ray.intersectPlane(dragPlane, pOut)) {
      dragBody.position.set(pOut.x, pOut.y, pOut.z);
      dragBody.velocity.set(0, 0, 0);
      dragBody.angularVelocity.set(0, 0, 0);
    }
  });

  window.addEventListener('pointerup', () => {
    if (!dragBody) return;
    dragBody.type = CANNON.Body.DYNAMIC;
    dragBody = null;
  });

  let frameId;
  let paused = false;

  function stopLoop() {
    if (frameId) cancelAnimationFrame(frameId);
    frameId = undefined;
  }

  function startLoop() {
    if (frameId || paused) return;
    loop();
  }

  let lastTime = performance.now();
  let acc = 0;
  const STEP = 1 / 60;

  function loop() {
    if (paused) return;
    const s = window.__mascotScale !== undefined ? window.__mascotScale : 1;
    modelGroup.scale.set(s, s, s);

    items.forEach(({ body }) => {
      if (body === dragBody) return;

      const bx = 3, by = 1.3, bz = 2.5;
      const p = body.position;
      const v = body.velocity;

      if (p.x > bx) { p.x = bx; v.x = -v.x; }
      if (p.x < -bx) { p.x = -bx; v.x = -v.x; }
      if (p.y > by) { p.y = by; v.y = -v.y; }
      if (p.y < -by) { p.y = -by; v.y = -v.y; }
      if (p.z > bz) { p.z = bz; v.z = -v.z; }
      if (p.z < -bz) { p.z = -bz; v.z = -v.z; }

      body.angularVelocity.set(0, 0, 0);
    });

    const now = performance.now();
    let dt = (now - lastTime) / 1000;
    lastTime = now;
    if (dt > 0.1) dt = 0.1;
    acc += dt;
    while (acc >= STEP) {
      world.step(STEP);
      acc -= STEP;
    }

    items.forEach(({ mesh, body }) => {
      if (mesh && body) {
        mesh.position.copy(body.position);
        mesh.quaternion.copy(body.quaternion);
      }
    });
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(loop);
  }

  startLoop();

  function cleanup() {
    cancelAnimationFrame(frameId);
    items.forEach(({ mesh }) => {
      mesh.traverse((c) => {
        if (c.isMesh) {
          c.geometry?.dispose();
          if (Array.isArray(c.material)) c.material.forEach(m => m.dispose());
          else c.material?.dispose();
        }
      });
    });
    renderer.dispose();
    container.removeChild(renderer.domElement);
  }

  window.addEventListener('beforeunload', cleanup);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { paused = true; stopLoop(); }
    else { paused = false; startLoop(); }
  });

  window.addEventListener('resize', () => {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

scheduleInit();

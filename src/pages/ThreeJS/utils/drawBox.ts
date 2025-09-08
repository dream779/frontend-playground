import * as THREE from "three";

export const drawBox = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // 长、宽、高
  const geometry = new THREE.BoxGeometry(2, 1, 1);
  // 方块颜色
  const material = new THREE.MeshBasicMaterial({ color: 0x00ffef });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;
  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube.rotation.z += 0.01;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
};

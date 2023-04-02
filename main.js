import './style.css';
import * as THREE from 'three';

// get canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();

// Size
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
	35,
	sizes.width / sizes.height,
	0.1,
	100
);

camera.position.z = 6;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
	alpha: true,
});

// Material
const material = new THREE.MeshPhysicalMaterial({
	color: '#3c94d7',
	metalness: 0.86,
	roughness: 0.37,
	flatShading: true,
});

// Mesh
const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.OctahedronGeometry(), material);
const mesh3 = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
	material
);
const mesh4 = new THREE.Mesh(new THREE.IcosahedronGeometry(), material);

// position
mesh1.position.set(2, 0, 0);
mesh2.position.set(-1, 0, 0);
mesh3.position.set(2, 0, -6);
mesh4.position.set(5, 0, 0);
scene.add(mesh1, mesh2, mesh3, mesh4);

// light
const directionalLight = new THREE.DirectionalLight('#ffffff', 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.render(scene, camera);

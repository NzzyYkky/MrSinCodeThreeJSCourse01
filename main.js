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

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.render(scene, camera);

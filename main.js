import './style.css';
import * as THREE from 'three';
import * as dat from 'lil-gui';

//ui debug
const gui = new dat.GUI();

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

// Material
const material = new THREE.MeshPhysicalMaterial({
	color: '#8d0707',
	metalness: 0.86,
	roughness: 0.37,
	flatShading: true,
});

// particle
// Geometry
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;

const positionArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount + 3; i++) {
	positionArray[i] = (Math.random() - 0.5) * 10;
}

particlesGeometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positionArray, 3)
);

// material
const particlesMaterial = new THREE.PointsMaterial({
	size: 0.025,
	color: '#fff',
});

// Mesh
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

gui.addColor(material, 'color');
gui.add(material, 'metalness').min(0).max(1).step(0.01);
gui.add(material, 'roughness').min(0).max(1).step(0.01);

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

const meshes = [mesh1, mesh2, mesh3, mesh4];

// light
const directionalLight = new THREE.DirectionalLight('#ffffff', 4);
directionalLight.position.set(0.5, 1, 0);
scene.add(directionalLight);

// resize
window.addEventListener('resize', () => {
	// update size
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// update camera
	camera.aspect = sizes.width / sizes.height;
	// need this method.
	camera.updateProjectionMatrix();

	// update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(window.devicePixelRatio);
});

// mouse wheel feature
let speed = 0;
let rotation = 0;
window.addEventListener('wheel', (e) => {
	speed += e.deltaY * 0.0002;
});

function rot() {
	rotation += speed;
	speed *= 0.93;
	// mesh1.position.x = rotation;

	// whole geometry add animate rotation
	mesh1.position.x = 2 + 3.8 * Math.cos(rotation);
	mesh1.position.z = -3 + 3.8 * Math.sin(rotation);
	mesh2.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI / 2);
	mesh2.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI / 2);
	mesh3.position.x = 2 + 3.8 * Math.cos(rotation + Math.PI);
	mesh3.position.z = -3 + 3.8 * Math.sin(rotation + Math.PI);
	mesh4.position.x = 2 + 3.8 * Math.cos(rotation + 3 * (Math.PI / 2));
	mesh4.position.z = -3 + 3.8 * Math.sin(rotation + 3 * (Math.PI / 2));
	window.requestAnimationFrame(rot);
}

rot();

// get cursor position
const cursor = {};
cursor.x = 0;
cursor.y = 0;

window.addEventListener('mousemove', (e) => {
	cursor.x = e.clientX / sizes.width - 0.5;
	cursor.y = e.clientY / sizes.height - 0.5;
});

// animation

const clock = new THREE.Clock();

const animate = () => {
	renderer.render(scene, camera);
	let getDeltaTime = clock.getDelta();

	// mesh rotation animation
	for (const mesh of meshes) {
		mesh.rotation.x += 0.1 * getDeltaTime;
		mesh.rotation.y += 0.12 * getDeltaTime;
	}

	// control camera
	camera.position.x += cursor.x * getDeltaTime * 2;
	camera.position.y += -cursor.y * getDeltaTime * 2;

	window.requestAnimationFrame(animate);
};

animate();

var renderer;
var scene;
var camera;
var controls;
var texture;
var clock;

function init() {
  clock = new THREE.Clock();
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth * 0.9, window.innerHeight * 0.9);

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

	camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 5;

  controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = false;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [65, 83, 68];

	// Earth
  var geometry = new THREE.SphereGeometry(2, 30, 30);
  var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
  var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

	document.getElementById("output").appendChild(renderer.domElement);

  renderer.clear();
  render();
}

function render() {
  var delta = clock.getDelta();
  controls.update(delta);

  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

window.onload = init;

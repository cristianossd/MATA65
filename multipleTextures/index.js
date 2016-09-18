var renderer;
var scene;
var camera;
var texture;

function init() {
	scene = new THREE.Scene();
	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
  renderer.setSize(600, 600);

	camera = new THREE.OrthographicCamera(-4.0, 4.0, 4.0, -4.0, -4.0, 4.0)
	scene.add( camera );

	// Earth
  var geometry = new THREE.SphereGeometry(2, 30, 30);
  var material = new THREE.MeshBasicMaterial({color: 0xFFFF00, wireframe: true});
  var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

	document.getElementById("output").appendChild(renderer.domElement);

  renderer.clear();
  renderScene();
}

function renderScene() {
  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}

window.onload = init;

var scene = null;
var renderer = null;
var camera = null;
var orbitControls	= null;
var day = 0.0;
var year = 0.0;
var month	= 0.0;
var clock;
var mesh;
var started = false;

function init() {
	clock = new THREE.Clock();

	scene = new THREE.Scene();

	loadMesh('assets/Luigi.obj');

	renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(600, 600);

	document.getElementById('output').appendChild(renderer.domElement);

	camera = new THREE.PerspectiveCamera(100.0, 1.0, 0.1, 1000.0);

	// Controle de Camera Orbital
	orbitControls = new THREE.OrbitControls(camera);
	orbitControls.autoRotate = false;

	renderer.clear();
}

function loadMesh(objPath) {

	// Load Mesh
	var loader = new THREE.OBJLoader();
	loader.load(objPath, buildScene);
}

function render() {
	var delta = clock.getDelta();
  orbitControls.update(delta);

	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function buildScene(loadedMesh) {
  var uniforms = {
    'tDiffuse': {type: 't', value: null},
    'bitSize': {type: 'i', value: 4}
  };

	var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
	  vertexShader: document.getElementById( 'shader-vs' ).textContent,
	  fragmentShader: document.getElementById( 'shader-fs' ).textContent
	});

	loadedMesh.children.forEach(function(child) {
		child.material = material;
	});

	scene.add(loadedMesh);

  if (started == false) {
    // Bounding Box
    var BBox = new THREE.BoundingBoxHelper(loadedMesh, 0xffffff);
    BBox.update();

    // Adjust Camera Position and LookAt
    var maxCoord = Math.max(BBox.box.max.x,BBox.box.max.y,BBox.box.max.z);

    camera.position.z = maxCoord*3;
    camera.far = new THREE.Vector3(maxCoord*2.5, maxCoord*2.5, maxCoord*2.5).length();

    camera.lookAt(loadedMesh);
    camera.updateProjectionMatrix();

    started = true;

    loadMesh('assets/cat.obj');
    loadMesh('assets/tiger.obj');
  }

  scene.children[scene.children.length - 1].visible = false;
	render();
}

document.getElementById('luigiInput').addEventListener('change', () => {
  scene.children[0].visible = true;
  scene.children[1].visible = false;
  scene.children[2].visible = false;
});

document.getElementById('catInput').addEventListener('change', () => {
  scene.children[0].visible = false;
  scene.children[1].visible = true;
  scene.children[2].visible = false;
});

document.getElementById('tigerInput').addEventListener('change', () => {
  scene.children[0].visible = false;
  scene.children[1].visible = false;
  scene.children[2].visible = true;
});

window.onload = init;

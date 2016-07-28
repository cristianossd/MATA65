function init() {
	var scene = new THREE.Scene();

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
	renderer.setSize(600, 600);

	var camera = new THREE.OrthographicCamera( -10.0, 10.0, 10.0, -10.0, 10.0, -10.0 );

  camera.rotateX(Math.PI/3);
  camera.rotateY(0.5);
  camera.rotateZ(Math.PI/3);

	scene.add( camera );

	var lGeometry = new THREE.Geometry();

  // block 1
	lGeometry.vertices.push(new THREE.Vector3( 0.5, -9.0,  0.5));
	lGeometry.vertices.push(new THREE.Vector3(-0.5, -8.0,  0.5));
	lGeometry.vertices.push(new THREE.Vector3( 0.5, -8.0,  0.5));
	lGeometry.vertices.push(new THREE.Vector3(-0.5, -9.0,  0.5));
	lGeometry.vertices.push(new THREE.Vector3( 0.5, -9.0, -0.5));
	lGeometry.vertices.push(new THREE.Vector3(-0.5, -8.0, -0.5));
	lGeometry.vertices.push(new THREE.Vector3( 0.5, -8.0, -0.5));
	lGeometry.vertices.push(new THREE.Vector3(-0.5, -9.0, -0.5));
  // extension 1
	lGeometry.vertices.push(new THREE.Vector3( 0.5, -7.0, 0.5));
	lGeometry.vertices.push(new THREE.Vector3(-0.5, -7.0, 0.5));
	lGeometry.vertices.push(new THREE.Vector3( 0.5, -7.0, -0.5));
	lGeometry.vertices.push(new THREE.Vector3(-0.5, -7.0, -0.5));

	// Block Front
	lGeometry.faces.push(new THREE.Face3(1, 2, 0));
	lGeometry.faces.push(new THREE.Face3(1, 0, 3));
	lGeometry.faces[0].materialIndex = 0;
	lGeometry.faces[1].materialIndex = 0;

	// Block Back
	lGeometry.faces.push(new THREE.Face3(5, 4, 6));
	lGeometry.faces.push(new THREE.Face3(5, 7, 4));
	lGeometry.faces[2].materialIndex = 1;
	lGeometry.faces[3].materialIndex = 1;

	// Block Top
	lGeometry.faces.push(new THREE.Face3(3, 0, 4));
	lGeometry.faces.push(new THREE.Face3(3, 4, 7));
	lGeometry.faces[4].materialIndex = 2;
	lGeometry.faces[5].materialIndex = 2;

	// Block Bottom
	lGeometry.faces.push(new THREE.Face3(1, 6, 2));
	lGeometry.faces.push(new THREE.Face3(1, 5, 6));
	lGeometry.faces[6].materialIndex = 3;
	lGeometry.faces[7].materialIndex = 3;

	// Block Right
	lGeometry.faces.push(new THREE.Face3(2, 6, 4));
	lGeometry.faces.push(new THREE.Face3(2, 4, 0));
	lGeometry.faces[8].materialIndex = 4;
	lGeometry.faces[9].materialIndex = 4;

	// Block Left
	lGeometry.faces.push(new THREE.Face3(5, 1, 3));
	lGeometry.faces.push(new THREE.Face3(5, 3, 7));
	lGeometry.faces[10].materialIndex = 5;
	lGeometry.faces[11].materialIndex = 5;

  // Extension
	lGeometry.faces.push(new THREE.Face3(8, 9, 10));
	lGeometry.faces.push(new THREE.Face3(11, 10, 9));
  lGeometry.faces[12].materialIndex = 0;
  lGeometry.faces[13].materialIndex = 0;

	lGeometry.faces.push(new THREE.Face3(8, 1, 2));
	lGeometry.faces.push(new THREE.Face3(8, 9, 1));
  lGeometry.faces[14].materialIndex = 1;
  lGeometry.faces[15].materialIndex = 1;

	lGeometry.faces.push(new THREE.Face3(11, 5, 10));
	lGeometry.faces.push(new THREE.Face3(6, 10, 5));
  lGeometry.faces[16].materialIndex = 2;
  lGeometry.faces[17].materialIndex = 2;

	lGeometry.faces.push(new THREE.Face3(1, 11, 9));
	lGeometry.faces.push(new THREE.Face3(1, 5, 11));
  lGeometry.faces[18].materialIndex = 3;
  lGeometry.faces[19].materialIndex = 3;

	lGeometry.faces.push(new THREE.Face3(2, 10, 8));
	lGeometry.faces.push(new THREE.Face3(2, 6, 10));
  lGeometry.faces[20].materialIndex = 4;
  lGeometry.faces[21].materialIndex = 4;

	//var lMaterial = new THREE.MeshBasicMaterial({color: 0xF6F900, wireframe: true});

	var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000}),
		new THREE.MeshBasicMaterial({color:0x00FF00}),
		new THREE.MeshBasicMaterial({color:0x0000FF}),
		new THREE.MeshBasicMaterial({color:0xFFFF00}),
		new THREE.MeshBasicMaterial({color:0x00FFFF}),
		new THREE.MeshBasicMaterial({color:0xFFFFFF})
	];

	var lMaterial = new THREE.MeshFaceMaterial(boxMaterials);
	var lMesh = new THREE.Mesh(lGeometry, lMaterial);

	scene.add(lMesh);

	document.getElementById('output').appendChild(renderer.domElement);
	renderer.clear();
	renderer.render(scene, camera);
};

window.onload = init;

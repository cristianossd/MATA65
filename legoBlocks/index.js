'use strict';

var scene;
var renderer;
var camera;

function renderScene() {
  camera.rotation.x += 0.03;
  camera.rotation.y += 0.02;
  camera.rotation.z += 0.02;

  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
  renderer.setSize(600, 600);

  camera = new THREE.OrthographicCamera( -4.0, 4.0, 4.0, -4.0, 4.0, -4.0 );

  camera.rotateX(Math.PI/3);
  camera.rotateY(0.5);
  camera.rotateZ(Math.PI/3);

  scene.add( camera );

  var lGeometry = new THREE.Geometry();

  // block 1
  lGeometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  lGeometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  lGeometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  lGeometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  lGeometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  lGeometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  lGeometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  lGeometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));
  // extension 1
  lGeometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  lGeometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  lGeometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  lGeometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));
  // extension 2
  lGeometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  lGeometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  lGeometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  lGeometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

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

  // Extension 1
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

  // Extension 2
  lGeometry.faces.push(new THREE.Face3(13, 12, 14));
  lGeometry.faces.push(new THREE.Face3(13, 14, 15));
  lGeometry.faces[22].materialIndex = 0;
  lGeometry.faces[23].materialIndex = 0;

  lGeometry.faces.push(new THREE.Face3(13, 8, 2));
  lGeometry.faces.push(new THREE.Face3(13, 2, 12));
  lGeometry.faces[24].materialIndex = 1;
  lGeometry.faces[25].materialIndex = 1;

  lGeometry.faces.push(new THREE.Face3(10, 14, 15));
  lGeometry.faces.push(new THREE.Face3(14, 10, 6));
  lGeometry.faces[26].materialIndex = 2;
  lGeometry.faces[27].materialIndex = 2;

  lGeometry.faces.push(new THREE.Face3(14, 2, 6));
  lGeometry.faces.push(new THREE.Face3(14, 12, 2));
  lGeometry.faces[28].materialIndex = 3;
  lGeometry.faces[29].materialIndex = 3;

  lGeometry.faces.push(new THREE.Face3(13, 8, 15));
  lGeometry.faces.push(new THREE.Face3(15, 8, 10));
  lGeometry.faces[30].materialIndex = 4;
  lGeometry.faces[31].materialIndex = 4;

  //var lMaterial = new THREE.MeshBasicMaterial({color: 0xF6F900, wireframe: true});

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var lMaterial = new THREE.MeshFaceMaterial(boxMaterials);
  var lMesh = new THREE.Mesh(lGeometry, lMaterial);

  scene.add(lMesh);

  document.getElementById('output').appendChild(renderer.domElement);
  renderer.clear();
  renderScene();
};

window.onload = init;

'use strict';

var scene;
var renderer;
var camera;

function renderScene() {
  /*
  camera.rotation.x += 0.03;
  camera.rotation.y += 0.02;
  camera.rotation.z += 0.02;
  */

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

  var vGeometry = new THREE.Geometry();

  // block 1
  vGeometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  vGeometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  vGeometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  vGeometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  vGeometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  vGeometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  vGeometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  vGeometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));
  // extension 1
  vGeometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  vGeometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  vGeometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  vGeometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));
  // extension 2
  vGeometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  vGeometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  vGeometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  vGeometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  // Block Front
  vGeometry.faces.push(new THREE.Face3(1, 2, 0));
  vGeometry.faces.push(new THREE.Face3(1, 0, 3));
  vGeometry.faces[0].materialIndex = 2;
  vGeometry.faces[1].materialIndex = 2;

  // Block Back
  vGeometry.faces.push(new THREE.Face3(5, 4, 6));
  vGeometry.faces.push(new THREE.Face3(5, 7, 4));
  vGeometry.faces[2].materialIndex = 3;
  vGeometry.faces[3].materialIndex = 3;

  // Block Top
  vGeometry.faces.push(new THREE.Face3(3, 0, 4));
  vGeometry.faces.push(new THREE.Face3(3, 4, 7));
  vGeometry.faces[4].materialIndex = 0;
  vGeometry.faces[5].materialIndex = 0;

  // Block Right
  vGeometry.faces.push(new THREE.Face3(2, 6, 4));
  vGeometry.faces.push(new THREE.Face3(2, 4, 0));
  vGeometry.faces[6].materialIndex = 4;
  vGeometry.faces[7].materialIndex = 4;

  // Block Left
  vGeometry.faces.push(new THREE.Face3(5, 1, 3));
  vGeometry.faces.push(new THREE.Face3(5, 3, 7));
  vGeometry.faces[8].materialIndex = 5;
  vGeometry.faces[9].materialIndex = 5;

  // Extension 1
  vGeometry.faces.push(new THREE.Face3(8, 9, 10));
  vGeometry.faces.push(new THREE.Face3(11, 10, 9));
  vGeometry.faces[10].materialIndex = 1;
  vGeometry.faces[11].materialIndex = 1;

  vGeometry.faces.push(new THREE.Face3(8, 1, 2));
  vGeometry.faces.push(new THREE.Face3(8, 9, 1));
  vGeometry.faces[12].materialIndex = 2;
  vGeometry.faces[13].materialIndex = 2;

  vGeometry.faces.push(new THREE.Face3(11, 5, 10));
  vGeometry.faces.push(new THREE.Face3(6, 10, 5));
  vGeometry.faces[14].materialIndex = 3;
  vGeometry.faces[15].materialIndex = 3;

  vGeometry.faces.push(new THREE.Face3(1, 11, 9));
  vGeometry.faces.push(new THREE.Face3(1, 5, 11));
  vGeometry.faces[16].materialIndex = 5;
  vGeometry.faces[17].materialIndex = 5;

  // Extension 2
  vGeometry.faces.push(new THREE.Face3(13, 12, 14));
  vGeometry.faces.push(new THREE.Face3(13, 14, 15));
  vGeometry.faces[18].materialIndex = 4;
  vGeometry.faces[19].materialIndex = 4;

  vGeometry.faces.push(new THREE.Face3(13, 8, 2));
  vGeometry.faces.push(new THREE.Face3(13, 2, 12));
  vGeometry.faces[20].materialIndex = 2;
  vGeometry.faces[21].materialIndex = 2;

  vGeometry.faces.push(new THREE.Face3(10, 14, 15));
  vGeometry.faces.push(new THREE.Face3(14, 10, 6));
  vGeometry.faces[22].materialIndex = 3;
  vGeometry.faces[23].materialIndex = 3;

  vGeometry.faces.push(new THREE.Face3(14, 2, 6));
  vGeometry.faces.push(new THREE.Face3(14, 12, 2));
  vGeometry.faces[24].materialIndex = 0;
  vGeometry.faces[25].materialIndex = 0;

  vGeometry.faces.push(new THREE.Face3(13, 8, 15));
  vGeometry.faces.push(new THREE.Face3(15, 8, 10));
  vGeometry.faces[26].materialIndex = 1;
  vGeometry.faces[27].materialIndex = 1;

  vGeometry.name = 'obj0';
  vGeometry.center();

  //var lMaterial = new THREE.MeshBasicMaterial({color: 0xF6F900, wireframe: true});

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var vMaterial = new THREE.MeshFaceMaterial(boxMaterials);
  var vMesh = new THREE.Mesh(vGeometry, vMaterial);

  scene.add(vMesh);

  document.getElementById('output').appendChild(renderer.domElement);
  renderer.clear();
  renderScene();
};

window.onload = init;

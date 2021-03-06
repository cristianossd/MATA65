'use strict';

var scene;
var renderer;
var camera;

// geometries
var current;
var currentGroups = [];
var group;
var blocks = [];
var blockGroups = [];
var selected = 0;
var newBlock = false;

// moving variables
var rotationX = 0.0;
var rotationY = 0.0;
var rotationZ = 0.0;
var rotation = {
  x: 0.0,
  y: 0.0,
  z: 0.0
};

var VGeometry = function() {
  this.geometry = null;
};

VGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  // Block Front
  this.geometry.faces.push(new THREE.Face3(1, 2, 0));
  this.geometry.faces.push(new THREE.Face3(1, 0, 3));
  this.geometry.faces[0].materialIndex = 2;
  this.geometry.faces[1].materialIndex = 2;

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[2].materialIndex = 3;
  this.geometry.faces[3].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[4].materialIndex = 0;
  this.geometry.faces[5].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[6].materialIndex = 4;
  this.geometry.faces[7].materialIndex = 4;

  // Block Left
  this.geometry.faces.push(new THREE.Face3(5, 1, 3));
  this.geometry.faces.push(new THREE.Face3(5, 3, 7));
  this.geometry.faces[8].materialIndex = 5;
  this.geometry.faces[9].materialIndex = 5;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[10].materialIndex = 1;
  this.geometry.faces[11].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(8, 1, 2));
  this.geometry.faces.push(new THREE.Face3(8, 9, 1));
  this.geometry.faces[12].materialIndex = 2;
  this.geometry.faces[13].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[14].materialIndex = 3;
  this.geometry.faces[15].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(1, 11, 9));
  this.geometry.faces.push(new THREE.Face3(1, 5, 11));
  this.geometry.faces[16].materialIndex = 5;
  this.geometry.faces[17].materialIndex = 5;

  // Extension 2
  this.geometry.faces.push(new THREE.Face3(13, 12, 14));
  this.geometry.faces.push(new THREE.Face3(13, 14, 15));
  this.geometry.faces[18].materialIndex = 4;
  this.geometry.faces[19].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(13, 8, 2));
  this.geometry.faces.push(new THREE.Face3(13, 2, 12));
  this.geometry.faces[20].materialIndex = 2;
  this.geometry.faces[21].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[22].materialIndex = 3;
  this.geometry.faces[23].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[24].materialIndex = 0;
  this.geometry.faces[25].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[26].materialIndex = 1;
  this.geometry.faces[27].materialIndex = 1;

  this.geometry.name = 'obj0';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

var LGeometry = function() {
  this.geometry = null;
};

LGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(2.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(2.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(2.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(2.5, 1.0, -0.5));

  // Block Front
  this.geometry.faces.push(new THREE.Face3(1, 2, 0));
  this.geometry.faces.push(new THREE.Face3(1, 0, 3));
  this.geometry.faces[0].materialIndex = 2;
  this.geometry.faces[1].materialIndex = 2;

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[2].materialIndex = 3;
  this.geometry.faces[3].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[4].materialIndex = 0;
  this.geometry.faces[5].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[6].materialIndex = 4;
  this.geometry.faces[7].materialIndex = 4;

  // Block Left
  this.geometry.faces.push(new THREE.Face3(5, 1, 3));
  this.geometry.faces.push(new THREE.Face3(5, 3, 7));
  this.geometry.faces[8].materialIndex = 5;
  this.geometry.faces[9].materialIndex = 5;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[10].materialIndex = 1;
  this.geometry.faces[11].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(8, 1, 2));
  this.geometry.faces.push(new THREE.Face3(8, 9, 1));
  this.geometry.faces[12].materialIndex = 2;
  this.geometry.faces[13].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[14].materialIndex = 3;
  this.geometry.faces[15].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(1, 11, 9));
  this.geometry.faces.push(new THREE.Face3(1, 5, 11));
  this.geometry.faces[16].materialIndex = 5;
  this.geometry.faces[17].materialIndex = 5;

  // Extension 2

  this.geometry.faces.push(new THREE.Face3(13, 8, 2));
  this.geometry.faces.push(new THREE.Face3(13, 2, 12));
  this.geometry.faces[18].materialIndex = 2;
  this.geometry.faces[19].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[20].materialIndex = 3;
  this.geometry.faces[21].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[22].materialIndex = 0;
  this.geometry.faces[23].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[24].materialIndex = 1;
  this.geometry.faces[25].materialIndex = 1;

  // L extension
  this.geometry.faces.push(new THREE.Face3(16, 17, 19));
  this.geometry.faces.push(new THREE.Face3(16, 18, 19));
  this.geometry.faces[26].materialIndex = 4;
  this.geometry.faces[27].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(12, 16, 17));
  this.geometry.faces.push(new THREE.Face3(12, 17, 13));
  this.geometry.faces[28].materialIndex = 2;
  this.geometry.faces[29].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(14, 18, 19));
  this.geometry.faces.push(new THREE.Face3(14, 19, 15));
  this.geometry.faces[30].materialIndex = 3;
  this.geometry.faces[31].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(12, 14, 18));
  this.geometry.faces.push(new THREE.Face3(12, 18, 16));
  this.geometry.faces[32].materialIndex = 0;
  this.geometry.faces[33].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 15, 19));
  this.geometry.faces.push(new THREE.Face3(13, 19, 17));
  this.geometry.faces[34].materialIndex = 1;
  this.geometry.faces[35].materialIndex = 1;

  this.geometry.name = 'obj1';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

var SGeometry = function() {
  this.geometry = null;
};

SGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(-1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, -1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, -1.0, -0.5));

  // Block Front
  this.geometry.faces.push(new THREE.Face3(1, 2, 0));
  this.geometry.faces.push(new THREE.Face3(1, 0, 3));
  this.geometry.faces[0].materialIndex = 2;
  this.geometry.faces[1].materialIndex = 2;

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[2].materialIndex = 3;
  this.geometry.faces[3].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[4].materialIndex = 0;
  this.geometry.faces[5].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[6].materialIndex = 4;
  this.geometry.faces[7].materialIndex = 4;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[8].materialIndex = 1;
  this.geometry.faces[9].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(8, 1, 2));
  this.geometry.faces.push(new THREE.Face3(8, 9, 1));
  this.geometry.faces[10].materialIndex = 2;
  this.geometry.faces[11].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[12].materialIndex = 3;
  this.geometry.faces[13].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(1, 11, 9));
  this.geometry.faces.push(new THREE.Face3(1, 5, 11));
  this.geometry.faces[14].materialIndex = 5;
  this.geometry.faces[15].materialIndex = 5;

  // Extension 2
  this.geometry.faces.push(new THREE.Face3(13, 12, 14));
  this.geometry.faces.push(new THREE.Face3(13, 14, 15));
  this.geometry.faces[16].materialIndex = 4;
  this.geometry.faces[17].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(13, 8, 2));
  this.geometry.faces.push(new THREE.Face3(13, 2, 12));
  this.geometry.faces[18].materialIndex = 2;
  this.geometry.faces[19].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[20].materialIndex = 3;
  this.geometry.faces[21].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[22].materialIndex = 0;
  this.geometry.faces[23].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[24].materialIndex = 1;
  this.geometry.faces[25].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(16, 17, 3));
  this.geometry.faces.push(new THREE.Face3(16, 1, 3));
  this.geometry.faces[26].materialIndex = 2;
  this.geometry.faces[27].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(18, 19, 7));
  this.geometry.faces.push(new THREE.Face3(18, 7, 5));
  this.geometry.faces[28].materialIndex = 3;
  this.geometry.faces[29].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(17, 16, 18));
  this.geometry.faces.push(new THREE.Face3(17, 18, 19));
  this.geometry.faces[30].materialIndex = 5;
  this.geometry.faces[31].materialIndex = 5;

  this.geometry.faces.push(new THREE.Face3(17, 3, 7));
  this.geometry.faces.push(new THREE.Face3(17, 7, 19));
  this.geometry.faces[32].materialIndex = 0;
  this.geometry.faces[33].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(16, 1, 5));
  this.geometry.faces.push(new THREE.Face3(16, 5, 18));
  this.geometry.faces[34].materialIndex = 1;
  this.geometry.faces[35].materialIndex = 1;

  this.geometry.name = 'obj2';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

var ArrowsGeometry = function() {
  this.geometry = null;
};

ArrowsGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(-1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, 1.0, -0.5));

  // Block Front
  this.geometry.faces.push(new THREE.Face3(1, 2, 0));
  this.geometry.faces.push(new THREE.Face3(1, 0, 3));
  this.geometry.faces[0].materialIndex = 2;
  this.geometry.faces[1].materialIndex = 2;

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[2].materialIndex = 3;
  this.geometry.faces[3].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[4].materialIndex = 0;
  this.geometry.faces[5].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[6].materialIndex = 4;
  this.geometry.faces[7].materialIndex = 4;

  // Block Left
  this.geometry.faces.push(new THREE.Face3(5, 1, 3));
  this.geometry.faces.push(new THREE.Face3(5, 3, 7));
  this.geometry.faces[8].materialIndex = 5;
  this.geometry.faces[9].materialIndex = 5;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[10].materialIndex = 1;
  this.geometry.faces[11].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(8, 1, 2));
  this.geometry.faces.push(new THREE.Face3(8, 9, 1));
  this.geometry.faces[12].materialIndex = 2;
  this.geometry.faces[13].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[14].materialIndex = 3;
  this.geometry.faces[15].materialIndex = 3;

  // Extension 2
  this.geometry.faces.push(new THREE.Face3(13, 12, 14));
  this.geometry.faces.push(new THREE.Face3(13, 14, 15));
  this.geometry.faces[16].materialIndex = 4;
  this.geometry.faces[17].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(13, 8, 2));
  this.geometry.faces.push(new THREE.Face3(13, 2, 12));
  this.geometry.faces[18].materialIndex = 2;
  this.geometry.faces[19].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[20].materialIndex = 3;
  this.geometry.faces[21].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[22].materialIndex = 0;
  this.geometry.faces[23].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[24].materialIndex = 1;
  this.geometry.faces[25].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(16, 17, 19));
  this.geometry.faces.push(new THREE.Face3(16, 19, 18));
  this.geometry.faces[26].materialIndex = 5;
  this.geometry.faces[27].materialIndex = 5;

  this.geometry.faces.push(new THREE.Face3(16, 17, 9));
  this.geometry.faces.push(new THREE.Face3(16, 9, 1));
  this.geometry.faces[28].materialIndex = 2;
  this.geometry.faces[29].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(18, 11, 5));
  this.geometry.faces.push(new THREE.Face3(18, 19, 11));
  this.geometry.faces[30].materialIndex = 3;
  this.geometry.faces[31].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(18, 16, 1));
  this.geometry.faces.push(new THREE.Face3(18, 1, 5));
  this.geometry.faces[32].materialIndex = 0;
  this.geometry.faces[33].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(19, 17, 9));
  this.geometry.faces.push(new THREE.Face3(19, 9, 11));
  this.geometry.faces[34].materialIndex = 1;
  this.geometry.faces[35].materialIndex = 1;

  this.geometry.name = 'obj3';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

var VCenterExtGeometry = function() {
  this.geometry = null;
};

VCenterExtGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(0.5, 0.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(0.5, 1.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 1.5));

  // Block Front
  this.geometry.faces.push(new THREE.Face3(1, 2, 0));
  this.geometry.faces.push(new THREE.Face3(1, 0, 3));
  this.geometry.faces[0].materialIndex = 2;
  this.geometry.faces[1].materialIndex = 2;

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[2].materialIndex = 3;
  this.geometry.faces[3].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[4].materialIndex = 0;
  this.geometry.faces[5].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[6].materialIndex = 4;
  this.geometry.faces[7].materialIndex = 4;

  // Block Left
  this.geometry.faces.push(new THREE.Face3(5, 1, 3));
  this.geometry.faces.push(new THREE.Face3(5, 3, 7));
  this.geometry.faces[8].materialIndex = 5;
  this.geometry.faces[9].materialIndex = 5;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[10].materialIndex = 1;
  this.geometry.faces[11].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[12].materialIndex = 3;
  this.geometry.faces[13].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(1, 11, 9));
  this.geometry.faces.push(new THREE.Face3(1, 5, 11));
  this.geometry.faces[14].materialIndex = 5;
  this.geometry.faces[15].materialIndex = 5;

  // Extension 2
  this.geometry.faces.push(new THREE.Face3(13, 12, 14));
  this.geometry.faces.push(new THREE.Face3(13, 14, 15));
  this.geometry.faces[16].materialIndex = 4;
  this.geometry.faces[17].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(13, 8, 2));
  this.geometry.faces.push(new THREE.Face3(13, 2, 12));
  this.geometry.faces[18].materialIndex = 2;
  this.geometry.faces[19].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[20].materialIndex = 3;
  this.geometry.faces[21].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[22].materialIndex = 0;
  this.geometry.faces[23].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[24].materialIndex = 1;
  this.geometry.faces[25].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(18, 17, 16));
  this.geometry.faces.push(new THREE.Face3(18, 19, 17));
  this.geometry.faces[26].materialIndex = 2;
  this.geometry.faces[27].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(18, 1, 9));
  this.geometry.faces.push(new THREE.Face3(18, 9, 19));
  this.geometry.faces[28].materialIndex = 5;
  this.geometry.faces[29].materialIndex = 5;

  this.geometry.faces.push(new THREE.Face3(16, 2, 8));
  this.geometry.faces.push(new THREE.Face3(16, 8, 17));
  this.geometry.faces[30].materialIndex = 4;
  this.geometry.faces[31].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(18, 1, 2));
  this.geometry.faces.push(new THREE.Face3(18, 2, 16));
  this.geometry.faces[32].materialIndex = 0;
  this.geometry.faces[33].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(19, 9, 8));
  this.geometry.faces.push(new THREE.Face3(19, 8, 17));
  this.geometry.faces[34].materialIndex = 1;
  this.geometry.faces[35].materialIndex = 1;

  this.geometry.name = 'obj4';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

var VLeftExtGeometry = function() {
  this.geometry = null;
};

VLeftExtGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(0.5, -1.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(0.5, 0.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, 1.5));

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[0].materialIndex = 3;
  this.geometry.faces[1].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[2].materialIndex = 0;
  this.geometry.faces[3].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[4].materialIndex = 4;
  this.geometry.faces[5].materialIndex = 4;

  // Block Left
  this.geometry.faces.push(new THREE.Face3(5, 1, 3));
  this.geometry.faces.push(new THREE.Face3(5, 3, 7));
  this.geometry.faces[6].materialIndex = 5;
  this.geometry.faces[7].materialIndex = 5;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[8].materialIndex = 1;
  this.geometry.faces[9].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(8, 1, 2));
  this.geometry.faces.push(new THREE.Face3(8, 9, 1));
  this.geometry.faces[10].materialIndex = 2;
  this.geometry.faces[11].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[12].materialIndex = 3;
  this.geometry.faces[13].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(1, 11, 9));
  this.geometry.faces.push(new THREE.Face3(1, 5, 11));
  this.geometry.faces[14].materialIndex = 5;
  this.geometry.faces[15].materialIndex = 5;

  // Extension 2
  this.geometry.faces.push(new THREE.Face3(13, 12, 14));
  this.geometry.faces.push(new THREE.Face3(13, 14, 15));
  this.geometry.faces[16].materialIndex = 4;
  this.geometry.faces[17].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(13, 8, 2));
  this.geometry.faces.push(new THREE.Face3(13, 2, 12));
  this.geometry.faces[18].materialIndex = 2;
  this.geometry.faces[19].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[20].materialIndex = 3;
  this.geometry.faces[21].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[22].materialIndex = 0;
  this.geometry.faces[23].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[24].materialIndex = 1;
  this.geometry.faces[25].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(16, 17, 19));
  this.geometry.faces.push(new THREE.Face3(16, 19, 18));
  this.geometry.faces[26].materialIndex = 2;
  this.geometry.faces[27].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(16, 0, 3));
  this.geometry.faces.push(new THREE.Face3(16, 3, 18));
  this.geometry.faces[28].materialIndex = 0;
  this.geometry.faces[29].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(17, 2, 1));
  this.geometry.faces.push(new THREE.Face3(17, 1, 19));
  this.geometry.faces[30].materialIndex = 1;
  this.geometry.faces[31].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(18, 3, 1));
  this.geometry.faces.push(new THREE.Face3(18, 1, 19));
  this.geometry.faces[32].materialIndex = 5;
  this.geometry.faces[33].materialIndex = 5;

  this.geometry.faces.push(new THREE.Face3(16, 0, 2));
  this.geometry.faces.push(new THREE.Face3(16, 2, 17));
  this.geometry.faces[34].materialIndex = 4;
  this.geometry.faces[35].materialIndex = 4;

  this.geometry.name = 'obj5';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

var VRightExtGeometry = function() {
  this.geometry = null;
};

VRightExtGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(0.5, 0.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(0.5, 1.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 1.5));

  // Block Front
  this.geometry.faces.push(new THREE.Face3(1, 2, 0));
  this.geometry.faces.push(new THREE.Face3(1, 0, 3));
  this.geometry.faces[0].materialIndex = 2;
  this.geometry.faces[1].materialIndex = 2;

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[2].materialIndex = 3;
  this.geometry.faces[3].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[4].materialIndex = 0;
  this.geometry.faces[5].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[6].materialIndex = 4;
  this.geometry.faces[7].materialIndex = 4;

  // Block Left
  this.geometry.faces.push(new THREE.Face3(5, 1, 3));
  this.geometry.faces.push(new THREE.Face3(5, 3, 7));
  this.geometry.faces[8].materialIndex = 5;
  this.geometry.faces[9].materialIndex = 5;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[10].materialIndex = 1;
  this.geometry.faces[11].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(8, 1, 2));
  this.geometry.faces.push(new THREE.Face3(8, 9, 1));
  this.geometry.faces[12].materialIndex = 2;
  this.geometry.faces[13].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[14].materialIndex = 3;
  this.geometry.faces[15].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(1, 11, 9));
  this.geometry.faces.push(new THREE.Face3(1, 5, 11));
  this.geometry.faces[16].materialIndex = 5;
  this.geometry.faces[17].materialIndex = 5;

  // Extension 2
  this.geometry.faces.push(new THREE.Face3(13, 12, 14));
  this.geometry.faces.push(new THREE.Face3(13, 14, 15));
  this.geometry.faces[18].materialIndex = 4;
  this.geometry.faces[19].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[20].materialIndex = 3;
  this.geometry.faces[21].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[22].materialIndex = 0;
  this.geometry.faces[23].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[24].materialIndex = 1;
  this.geometry.faces[25].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(16, 17, 19));
  this.geometry.faces.push(new THREE.Face3(16, 19, 18));
  this.geometry.faces[26].materialIndex = 2;
  this.geometry.faces[27].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(16, 2, 12));
  this.geometry.faces.push(new THREE.Face3(16, 12, 17));
  this.geometry.faces[28].materialIndex = 0;
  this.geometry.faces[29].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(18, 8, 13));
  this.geometry.faces.push(new THREE.Face3(18, 13, 19));
  this.geometry.faces[30].materialIndex = 1;
  this.geometry.faces[31].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(16, 2, 8));
  this.geometry.faces.push(new THREE.Face3(16, 8, 18));
  this.geometry.faces[32].materialIndex = 5;
  this.geometry.faces[33].materialIndex = 5;

  this.geometry.faces.push(new THREE.Face3(17, 12, 13));
  this.geometry.faces.push(new THREE.Face3(17, 13, 19));
  this.geometry.faces[34].materialIndex = 4;
  this.geometry.faces[35].materialIndex = 4;

  this.geometry.name = 'obj6';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

var ArrowsExtGeometry = function() {
  this.geometry = null;
};

ArrowsExtGeometry.prototype.build = function() {
  this.geometry = new THREE.Geometry();

  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0,  0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, -1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, -1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3( 0.5, 1.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(-1.5, 0.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, 1.0, 0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, 0.0, -0.5));
  this.geometry.vertices.push(new THREE.Vector3(-1.5, 1.0, -0.5));

  this.geometry.vertices.push(new THREE.Vector3(0.5, 0.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(0.5, 1.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 0.0, 1.5));
  this.geometry.vertices.push(new THREE.Vector3(-0.5, 1.0, 1.5));

  // Block Front
  this.geometry.faces.push(new THREE.Face3(1, 2, 0));
  this.geometry.faces.push(new THREE.Face3(1, 0, 3));
  this.geometry.faces[0].materialIndex = 2;
  this.geometry.faces[1].materialIndex = 2;

  // Block Back
  this.geometry.faces.push(new THREE.Face3(5, 4, 6));
  this.geometry.faces.push(new THREE.Face3(5, 7, 4));
  this.geometry.faces[2].materialIndex = 3;
  this.geometry.faces[3].materialIndex = 3;

  // Block Top
  this.geometry.faces.push(new THREE.Face3(3, 0, 4));
  this.geometry.faces.push(new THREE.Face3(3, 4, 7));
  this.geometry.faces[4].materialIndex = 0;
  this.geometry.faces[5].materialIndex = 0;

  // Block Right
  this.geometry.faces.push(new THREE.Face3(2, 6, 4));
  this.geometry.faces.push(new THREE.Face3(2, 4, 0));
  this.geometry.faces[6].materialIndex = 4;
  this.geometry.faces[7].materialIndex = 4;

  // Block Left
  this.geometry.faces.push(new THREE.Face3(5, 1, 3));
  this.geometry.faces.push(new THREE.Face3(5, 3, 7));
  this.geometry.faces[8].materialIndex = 5;
  this.geometry.faces[9].materialIndex = 5;

  // Extension 1
  this.geometry.faces.push(new THREE.Face3(8, 9, 10));
  this.geometry.faces.push(new THREE.Face3(11, 10, 9));
  this.geometry.faces[10].materialIndex = 1;
  this.geometry.faces[11].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(11, 5, 10));
  this.geometry.faces.push(new THREE.Face3(6, 10, 5));
  this.geometry.faces[12].materialIndex = 3;
  this.geometry.faces[13].materialIndex = 3;

  // Extension 2
  this.geometry.faces.push(new THREE.Face3(13, 12, 14));
  this.geometry.faces.push(new THREE.Face3(13, 14, 15));
  this.geometry.faces[14].materialIndex = 4;
  this.geometry.faces[15].materialIndex = 4;

  this.geometry.faces.push(new THREE.Face3(13, 8, 2));
  this.geometry.faces.push(new THREE.Face3(13, 2, 12));
  this.geometry.faces[16].materialIndex = 2;
  this.geometry.faces[17].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(10, 14, 15));
  this.geometry.faces.push(new THREE.Face3(14, 10, 6));
  this.geometry.faces[18].materialIndex = 3;
  this.geometry.faces[19].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(14, 2, 6));
  this.geometry.faces.push(new THREE.Face3(14, 12, 2));
  this.geometry.faces[20].materialIndex = 0;
  this.geometry.faces[21].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(13, 8, 15));
  this.geometry.faces.push(new THREE.Face3(15, 8, 10));
  this.geometry.faces[22].materialIndex = 1;
  this.geometry.faces[23].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(16, 17, 19));
  this.geometry.faces.push(new THREE.Face3(16, 19, 18));
  this.geometry.faces[24].materialIndex = 5;
  this.geometry.faces[25].materialIndex = 5;

  this.geometry.faces.push(new THREE.Face3(16, 17, 9));
  this.geometry.faces.push(new THREE.Face3(16, 9, 1));
  this.geometry.faces[26].materialIndex = 2;
  this.geometry.faces[27].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(18, 11, 5));
  this.geometry.faces.push(new THREE.Face3(18, 19, 11));
  this.geometry.faces[28].materialIndex = 3;
  this.geometry.faces[29].materialIndex = 3;

  this.geometry.faces.push(new THREE.Face3(18, 16, 1));
  this.geometry.faces.push(new THREE.Face3(18, 1, 5));
  this.geometry.faces[30].materialIndex = 0;
  this.geometry.faces[31].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(19, 17, 9));
  this.geometry.faces.push(new THREE.Face3(19, 9, 11));
  this.geometry.faces[32].materialIndex = 1;
  this.geometry.faces[33].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(20, 21, 23));
  this.geometry.faces.push(new THREE.Face3(20, 23, 22));
  this.geometry.faces[34].materialIndex = 2;
  this.geometry.faces[35].materialIndex = 2;

  this.geometry.faces.push(new THREE.Face3(20, 2, 1));
  this.geometry.faces.push(new THREE.Face3(20, 1, 22));
  this.geometry.faces[36].materialIndex = 0;
  this.geometry.faces[37].materialIndex = 0;

  this.geometry.faces.push(new THREE.Face3(21, 8, 9));
  this.geometry.faces.push(new THREE.Face3(21, 9, 23));
  this.geometry.faces[38].materialIndex = 1;
  this.geometry.faces[39].materialIndex = 1;

  this.geometry.faces.push(new THREE.Face3(22, 1, 9));
  this.geometry.faces.push(new THREE.Face3(22, 9, 23));
  this.geometry.faces[40].materialIndex = 5;
  this.geometry.faces[41].materialIndex = 5;

  this.geometry.faces.push(new THREE.Face3(20, 2, 8));
  this.geometry.faces.push(new THREE.Face3(20, 8, 21));
  this.geometry.faces[42].materialIndex = 4;
  this.geometry.faces[43].materialIndex = 4;

  this.geometry.name = 'obj7';
  this.geometry.center();

  var boxMaterials = 	[
    new THREE.MeshBasicMaterial({color:0xFF0000, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x0000FF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFF00, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0x00FFFF, side:THREE.DoubleSide}),
  	new THREE.MeshBasicMaterial({color:0xFFFFFF, side:THREE.DoubleSide})
  ];

  var material = new THREE.MeshFaceMaterial(boxMaterials);
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

function clearScene() {
  scene.children = [];
  scene.add(camera);
}

function renderScene() {
  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}

function setScale() {
  var m = new THREE.Matrix4();

  m.identity();
  current.matrix.copy(m);
  m.makeScale(1, 1, 1);
  current.applyMatrix(m);
  current.updateMatrix();
}

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
  renderer.setSize(600, 600);

  camera = new THREE.OrthographicCamera( -8.0, 8.0, 8.0, -8.0, 8.0, -8.0 );
  scene.add(camera);

  group = new THREE.Object3D;

  var geometryAxis = new THREE.AxisHelper(3.0);
  var geometry = new VGeometry();
  geometry.build();
  current = geometry.mesh;
  current.add(geometryAxis);

  group.add(current);
  currentGroups.push(group);
  setScale();
  scene.add(group);

  buildBlock(new LGeometry());
  buildBlock(new SGeometry());
  buildBlock(new ArrowsGeometry());
  buildBlock(new VCenterExtGeometry());
  buildBlock(new VLeftExtGeometry());
  buildBlock(new VRightExtGeometry());
  buildBlock(new ArrowsExtGeometry());

  document.getElementById('output').appendChild(renderer.domElement);
  renderer.clear();
  renderScene();
};

function buildBlock(block) {
  var blockGroup = new THREE.Object3D;
  block.build();
  block.mesh.add(new THREE.AxisHelper(3.0));
  blocks.push(block.mesh);
  blockGroup.add(block.mesh);
  blockGroups.push(blockGroup);
}

function makeTranslation(x, y, z, axis) {
  var m = new THREE.Matrix4();

  if (axis != null)
    rotation[axis] += 0.08;

  m.identity();
  group.matrix.copy(m);
  m.makeTranslation(x, y, z);
  group.applyMatrix(m);
  group.updateMatrix();

  m.identity();
  current.matrix.copy(m);
  m.makeRotationX(rotation.x);
  current.applyMatrix(m);
  current.updateMatrix();

  m.identity();
  m.makeRotationY(rotation.y);
  current.applyMatrix(m);

  m.identity();
  m.makeRotationZ(rotation.z);
  current.applyMatrix(m);
}

function resetRotation() {
  rotationX = 0.0;
  rotationY = 0.0;
  rotationZ = 0.0;
  rotation.x = 0.0;
  rotation.y = 0.0;
  rotation.z = 0.0;
}

function haveBlockCollision(xR, xL, yR, yL) {
  var b = null;
  var bx = null;
  var by = null;
  var betweenX = null;
  var betweenY = null;

  for (var i=0; i < currentGroups.length; i++) {
    b = currentGroups[i];
    if (!newBlock && b == group) continue;

    bx = b.position.x;
    by = b.position.y;

    betweenX = (xR <= (bx+1.5) && xR >= (bx-1.5)) || (xL <= (bx+1.5) && xL >= (bx-1.5));
    betweenY = (yR <= (by+1.5) && yR >= (by-1.5)) || (yL <= (by+1.5) && yL >= (by-1.5));

    if (betweenX && betweenY) {
      return true;
    }
  }

  return false;
}

function haveSideCollision(xR, xL, yR, yL, side) {
  var factor = 7.8;
  var collision = {};

  collision.top = (yR >= factor) || (yL >= factor);
  collision.bottom = (yR <= -factor) || (yL <= -factor);
  collision.left = (xR <= -factor) || (xL <= -factor);
  collision.right = (xR >= factor) || (xL >= factor);

  return collision[side];
}

function checkCollision(addX, addY, side) {
  var factor = 1.0;
  var xR = group.position.x + addX + factor;
  var xL = group.position.x + addX - factor;
  var yR = group.position.y + addY + factor;
  var yL = group.position.y + addY - factor;

  return haveBlockCollision(xR, xL, yR, yL) ||
         haveSideCollision(xR, xL, yR, yL, side);
}

function checkInitialCollision() {
  return haveBlockCollision(1.0, -1.0, 1.0, -1.0);
}

function toggleBlockVisibility() {
  group.visible = false;
  setTimeout(() => group.visible = true, 100);
}

function show(id) {
  document.getElementById(id).style.display = 'block';
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}

document.addEventListener('keydown', evt => {
  var code = evt.keyCode;
  var x = group.position.x;
  var y = group.position.y;
  var z = group.position.z;
  var axis = '';

  switch (code) {
    case 37:
      if (!checkCollision(-0.4, 0.0, 'left'))
        x -= 0.4;
      break;
    case 38:
      if (!checkCollision(0.0, 0.4, 'top'))
        y += 0.4;
      break;
    case 39:
      if (!checkCollision(0.4, 0.0, 'right'))
        x += 0.4;
      break;
    case 40:
      if (!checkCollision(0.0, -0.4, 'bottom'))
        y -= 0.4;
      break;
    case 88:
      axis = 'x';
      break;
    case 89:
      axis = 'y';
      break;
    case 90:
      axis = 'z';
      break;
    default:
      return;
      break;
  }

  makeTranslation(x, y, z, axis);
});

document.getElementById('nextBlock').addEventListener('click', evt => {
  evt.preventDefault();

  newBlock = true;
  if (checkInitialCollision()) {
    show('alert');
    newBlock = false;
    return;
  }
  hide('alert');
  newBlock = false;

  var i = Math.floor(Math.random() * blockGroups.length);
  group = blockGroups[i];
  current = blocks[i];

  blockGroups.splice(i, 1);
  blocks.splice(i, 1);

  resetRotation();
  setScale();
  scene.add(group);
  currentGroups.push(group);

  if (blockGroups.length === 0) {
    evt.target.style.display = 'none';
  }
});

window.onload = init;

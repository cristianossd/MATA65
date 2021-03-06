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

  var material = new THREE.MeshBasicMaterial({wireframe: true});
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

  var material = new THREE.MeshBasicMaterial({wireframe: true});
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

  var material = new THREE.MeshBasicMaterial({wireframe: true});
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

  var material = new THREE.MeshBasicMaterial({wireframe: true});
  var mesh = new THREE.Mesh(this.geometry, material);

  this.mesh = mesh;
};

function init() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE);
  renderer.setSize(window.innerWidth, window.innerHeight);

  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  /*
  var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
  var planeMaterial = new THREE.MeshBasicMaterial({color: 0xCCCCCC});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);
  */

  var cubeGeometry = new THREE.Geometry();

  cubeGeometry.vertices.push(new THREE.Vector3(-4, 0, 0));
  cubeGeometry.vertices.push(new THREE.Vector3(-4, -4, 0));
  cubeGeometry.vertices.push(new THREE.Vector3(-8, 0, 0));
  cubeGeometry.vertices.push(new THREE.Vector3(-8, -4, 0));
  cubeGeometry.vertices.push(new THREE.Vector3(-4, 0, 4));
  cubeGeometry.vertices.push(new THREE.Vector3(-4, -4, 4));
  cubeGeometry.vertices.push(new THREE.Vector3(-8, 0, 4));
  cubeGeometry.vertices.push(new THREE.Vector3(-8, -4, 4));

  cubeGeometry.faces.push(new THREE.Face3(1, 2, 0));
  cubeGeometry.faces.push(new THREE.Face3(1, 0, 3));
  cubeGeometry.faces[0].materialIndex =
  cubeGeometry.faces[1].materialIndex = 0;

  cubeGeometry.faces.push(new THREE.Face3(5, 4, 6));
  cubeGeometry.faces.push(new THREE.Face3(5, 7, 4));
  cubeGeometry.faces[2].materialIndex =
  cubeGeometry.faces[3].materialIndex = 1;

  cubeGeometry.faces.push(new THREE.Face3(3, 0, 4));
  cubeGeometry.faces.push(new THREE.Face3(3, 4, 7));
  cubeGeometry.faces[4].materialIndex =
  cubeGeometry.faces[5].materialIndex = 2;

  cubeGeometry.faces.push(new THREE.Face3(1, 6, 2));
  cubeGeometry.faces.push(new THREE.Face3(1, 5, 6));
  cubeGeometry.faces[6].materialIndex =
  cubeGeometry.faces[7].materialIndex = 3;

  cubeGeometry.faces.push(new THREE.Face3(2, 6, 4));
  cubeGeometry.faces.push(new THREE.Face3(2, 4, 0));
  cubeGeometry.faces[8].materialIndex =
  cubeGeometry.faces[9].materialIndex = 4;

  cubeGeometry.faces.push(new THREE.Face3(5, 1, 3));
  cubeGeometry.faces.push(new THREE.Face3(5, 3, 7));
  cubeGeometry.faces[10].materialIndex =
  cubeGeometry.faces[11].materialIndex = 5;

  var boxMaterials =  [
    new THREE.MeshBasicMaterial({color:0xFF0000}),
    new THREE.MeshBasicMaterial({color:0x00FF00}),
    new THREE.MeshBasicMaterial({color:0x0000FF}),
    new THREE.MeshBasicMaterial({color:0xFFFF00}),
    new THREE.MeshBasicMaterial({color:0x00FFFF}),
    new THREE.MeshBasicMaterial({color:0xFFFFFF})
  ];

  var cubeMaterial = new THREE.MeshFaceMaterial(boxMaterials);

  var cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

  scene.add(cubeMesh);

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  document.getElementById('output').appendChild(renderer.domElement);
  renderer.render(scene, camera);
}

window.onload = init;

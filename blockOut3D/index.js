'use strict';

var scene;
var renderer;
var camera;
var colors = [0x1ABC9C, 0x2ECC71, 0x9B59B6, 0xF1C40F, 0xE67E22, 0xE74C3C, 0xECF0F1];

// geometries
var well;
var blockOptions = [VGeometry, LGeometry, SGeometry, ArrowsGeometry];
var current;
var currentGroup;
var group;
var blocks = [];
var blockGroups = [];
var selected = 0;

// moving variables
var rotationX = 0.0;
var rotationY = 0.0;
var rotationZ = 0.0;
var rotation = {x: 0.0, y: 0.0};

function clearScene() {
  scene.children = [];
  scene.add(camera);
}

function downBlock() {
  var x = group.position.x;
  var y = group.position.y;
  var z = group.position.z;

  makeTranslation(x, y, z - 0.5, '');
}

function haveBottomCollision() {
  var wellBottom = well.position.z - 300.0;

  return (group.position.z - 8) == wellBottom;
}

function newBlock() {
  blocks.push(current);
  blockGroups.push(group);

  var _color = colors[(blocks.length + 1) % colors.length];
  current.material.wireframe = false;
  current.material.color = new THREE.Color(_color);

  group = new THREE.Object3D;
  var geometryAxis = new THREE.AxisHelper(5.0); // temporary

  var i = Math.floor(Math.random() * blockOptions.length);
  var geometry = new blockOptions[i]();
  geometry.build();
  current = geometry.mesh;
  current.add(geometryAxis);

  group.add(current);
  setScale();
  scene.add(group);

  updateBlocksNum();
  resetRotation();
}

function renderScene() {
  if (current != null) {
    if (haveBottomCollision()) {
      newBlock();
    }

    downBlock();
  }

  requestAnimationFrame(renderScene);
  renderer.render(scene, camera);
}

function setScale() {
  var m = new THREE.Matrix4();

  m.identity();
  current.matrix.copy(m);
  m.makeScale(16, 16, 16);
  current.applyMatrix(m);
  current.updateMatrix();
}

function init() {
  scene = new THREE.Scene();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));
  renderer.setSize(600, 600);

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 100;

  var box = new THREE.BoxGeometry(60.0, 60.0, 600, 6, 6, 10);
  var material = new THREE.MeshBasicMaterial({color: 0x006600, wireframe: true});
  var depthBox = new THREE.Mesh(box, material);
  well = depthBox;
  scene.add(depthBox);

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
    rotation[axis] += Math.PI / 2;

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
  m.makeScale(16, 16, 16);
  current.applyMatrix(m);
}

function resetRotation() {
  rotationX = 0.0;
  rotationY = 0.0;

  rotation.x = 0.0;
  rotation.y = 0.0;
}

function updateBlocksNum() {
  document.getElementById('blocksNum').innerHTML = blocks.length;
}

function show(id) {
  document.getElementById(id).style.display = 'block';
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}

document.addEventListener('keydown', evt => {
  if (current == null) return;

  var code = evt.keyCode;
  var x = group.position.x;
  var y = group.position.y;
  var z = group.position.z;
  var axis = '';
  var factor = 1.0;

  switch (code) {
    case 37:
      if ((x - factor - 8.0) > well.position.x - 30.0)
        x -= factor;
      break;
    case 38:
      if ((y + factor + 8.0) < well.position.y + 30.0)
        y += factor;
      break;
    case 39:
      if ((x + factor + 8.0) < well.position.x + 30.0)
        x += factor;
      break;
    case 40:
      if ((y - factor - 8.0) > well.position.y - 30.0)
        y -= factor;
      break;
    case 88:
      axis = 'x';
      break;
    case 89:
      axis = 'y';
      break;
    default:
      return;
      break;
  }

  makeTranslation(x, y, z, axis);
});

document.getElementById('startBt').addEventListener('click', evt => {
  evt.preventDefault();

  hide('startBt');

  group = new THREE.Object3D;
  var geometryAxis = new THREE.AxisHelper(10.0); // temporary

  var i = Math.floor(Math.random() * blockOptions.length);
  var geometry = new blockOptions[i]();
  geometry.build();
  current = geometry.mesh;
  current.add(geometryAxis);

  group.add(current);
  setScale();
  scene.add(group);

  updateBlocksNum();
});

window.onload = init;

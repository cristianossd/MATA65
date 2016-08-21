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

  camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
  camera.position.z = 100;
  scene.add(camera);

  var box = new THREE.BoxGeometry(60.0, 60.0, 300, 4, 4, 4);
  var material = new THREE.MeshBasicMaterial({color: 0x006600, wireframe: true});
  var depthBox = new THREE.Mesh(box, material);
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

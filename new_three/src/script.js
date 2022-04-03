import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import Desk from './threeJsComponents/desk.js'
import WindowPanel from './threeJsComponents/windowPanel'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const canvas = document.querySelector('canvas.webgl')

let date;
let hours;
let minutes;
let seconds;

let percent_of_day;
let sun_angle_z ;

function calculate_time() {
    date = new Date()
    hours = date.getHours()
    minutes = date.getMinutes()
    seconds = date.getSeconds()
    
    percent_of_day = ((hours - 1) + (minutes/60) + (seconds/640)) / 24
    sun_angle_z = (2 * Math.PI * percent_of_day) + (3* Math.PI/2)
}
calculate_time() 

let pivotPoint = new THREE.Object3D();

let mouse = new THREE.Vector2()
let clock = new THREE.Clock()
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera( 65, window.innerWidth / window.innerHeight, 0.01, 10000 );
camera.position.z = 0.01;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true;
renderer.setSize( window.innerWidth, window.innerHeight );
let composer = new EffectComposer(renderer)
scene.background = new THREE.Color( 0xff0000 );

let renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

let outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera);

outlinePass.visibleEdgeColor.set('#ffffff');
outlinePass.hiddenEdgeColor.set('#ffffff');
outlinePass.edgeStrength = 1000
outlinePass.edgeThickness = 1
outlinePass.edgeGlow = 0

composer.addPass( outlinePass );
renderer.getDrawingBufferSize();

// canvas.appendChild( renderer.domElement );
let controls = new OrbitControls(camera, renderer.domElement)
controls.rotateSpeed = - 0.25;
controls.enableZoom  = true;

controls.update();
// this.world = new CANNON.World()
// this.world.gravity.set(0, -98.1, 0)

let raycaster = new THREE.Raycaster();
// window.addEventListener('resize', this.resize_canvas);
// window.addEventListener( 'mousedown', this.onMouseDown, false );
// window.addEventListener( 'mouseup', this.onMouseUp, false );
// window.addEventListener( 'mousemove', this.onMouseMove, false );

const planeGeo = new THREE.PlaneGeometry( 100, 100 );
const oceanGeo = new THREE.PlaneGeometry( 1000, 1000 );

var boardGeometry = new THREE.BoxGeometry( 100, 100, 1 );
const planeTop = new THREE.Mesh( boardGeometry, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
planeTop.position.y = 50;
planeTop.rotateX( Math.PI / 2 );
planeTop.castShadow = true
// planeTop.rotateZ( Math.PI );
scene.add( planeTop );

const ocean = new THREE.Mesh( oceanGeo, new THREE.MeshPhongMaterial( { color: 0xddccbb } ) );
ocean.position.y = -100;
ocean.rotateX( -Math.PI / 2 );
// ocean.castShadow = true
// planeTop.rotateZ( Math.PI );
// scene.add( ocean );

const planeFront = new THREE.Mesh( boardGeometry, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
planeFront.position.z = 50;
planeFront.position.y = 0;
planeFront.receiveShadow = true;
planeFront.castShadow = true;
planeFront.rotateY( Math.PI );
scene.add( planeFront );

const planeBack = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
planeBack.position.z = -50;
planeBack.position.y = 0;
planeBack.receiveShadow = true;
// planeBack.rotateY( Math.PI );
// scene.add( planeBack );

const planeRight = new THREE.Mesh( boardGeometry, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
planeRight.position.x = 50;
planeRight.position.y = 0;
planeRight.receiveShadow = true;
planeFront.castShadow = true;
planeRight.rotateY( - Math.PI / 2 );
scene.add( planeRight );

const planeLeft = new THREE.Mesh( planeGeo, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
planeLeft.position.x = - 50;
planeLeft.receiveShadow = true;
planeLeft.position.y = 0;
planeLeft.rotateY( Math.PI / 2 );
// scene.add( planeLeft );

const mainLight = new THREE.PointLight( 0xffffff, 0.5, 350, 1);
mainLight.position.y = 35;
mainLight.position.z = 5;
mainLight.castShadow = true;
mainLight.shadow.mapSize.set( 1024, 1024 )
scene.add( mainLight );


let sun_brightness
let ambient_brightness
// if (hours > 21 || hours < 6) {
//     sun_brightness = 0.8
//     ambient_brightness = 0.3
// } else {
//     sun_brightness = 0.8
//     ambient_brightness = 0.3
// }

const sun = new THREE.PointLight( new THREE.Color("rgb(255,255,255)"), sun_brightness, 2000, 1);
sun.castShadow = true;
sun.shadow.mapSize.set( 2048, 2048 )

var sun_mesh = new THREE.Mesh(
    new THREE.SphereGeometry(20, 32, 32),
    new THREE.MeshBasicMaterial({color:0xffffff}) 
);
sun_mesh.receiveShadow = false
sun_mesh.castShadow = false

function calculate_sun_position() {
    sun.position.x = -50;
    sun.position.y = 400*Math.sin(sun_angle_z);
    sun.position.z = 400*Math.cos(sun_angle_z);
    sun_mesh.position.x = -50;
    sun_mesh.position.y = 400*Math.sin(sun_angle_z);;
    sun_mesh.position.z = 400*Math.cos(sun_angle_z);;
}
function recalculate_time() {
    percent_of_day = percent_of_day + 0.001
    if (percent_of_day > 1) {
        percent_of_day = percent_of_day -1
    }
    sun_angle_z = (2 * Math.PI * percent_of_day) + (3* Math.PI/2)
}
let sun_r;
let sun_g;
let sun_b;
function calculate_sun_brightness_and_color() {
    if (percent_of_day > 0.25 && percent_of_day < 0.75) {
        sun_brightness = 0.8
        ambient_brightness = 0.5
    } else if (percent_of_day < 0.15 || percent_of_day > 0.90) {
        sun_brightness = 0.0
        ambient_brightness = 0.05
    } else if (percent_of_day >= 0.15 && percent_of_day <= 0.25){
        sun_brightness = 0.8 * (percent_of_day - 0.15) / 0.1
        ambient_brightness = (0.45 * (percent_of_day - 0.15) / 0.1) + 0.05
    } else if (percent_of_day >= 0.80 && percent_of_day <= 0.90) {
        sun_brightness = 0.8 * (0.90 - percent_of_day) / 0.1
        ambient_brightness = (0.45 * (0.90 - percent_of_day) / 0.1) + 0.05
    }
    if (percent_of_day >= 0.6 && percent_of_day <= 0.85 ) {
        sun_r = 1
        sun_g = 1 - 0.5 * ((percent_of_day - 0.6) / 0.25)
        sun_b = 1 - ((percent_of_day - 0.6) / 0.25)
    } else if (percent_of_day < 0.6) {
        sun_r = 1
        sun_g = 1
        sun_b = 1
    }
    sun.color.r = sun_r
    sun.color.g = sun_g
    sun.color.b = sun_b
    sun.intensity = sun_brightness
    ambient_light.intensity = ambient_brightness
}

calculate_sun_position();
sun.add(pivotPoint);
sun_mesh.add(pivotPoint);


scene.add( sun );
scene.add(sun_mesh); // add the mesh to the scene

var dome = new THREE.Mesh(
    new THREE.SphereGeometry(700, 64, 64),
    new THREE.MeshPhongMaterial({color:0xbfe2ff}) 
);
dome.material.side = THREE.BackSide

scene.add(dome); // add the mesh to the scene
// const near = 1;
// const far = 700;
// const color = 0xccccee;
// scene.fog = new THREE.Fog(color, near, far);
const ambient_light = new THREE.AmbientLight( 0xccccdd, ambient_brightness ); // soft white light
scene.add( ambient_light );

let desk = new Desk(80, 30, 30, 1, 1)
let desk2 = new Desk(30, 30, 40, 1, 1)
desk.position.z = -35
desk.position.y = -50
desk.position.x = 10
desk2.position.z = 0
desk2.position.y = -50
desk2.position.x = 35
scene.add( desk );
scene.add( desk2 );


for (let x=-40; x < 50; x += 20) {
    for (let y=-40; y < 50; y += 20) {
        let panel = new WindowPanel()
        panel.position.x = x
        panel.position.y = y
        panel.position.z = -51
        scene.add(panel)
    }
}
for (let z=-40; z < 50; z += 20) {
    for (let y=-40; y < 50; y += 20) {
        let panel = new WindowPanel()
        panel.position.z = z
        panel.position.y = y
        panel.position.x = -51
        panel.rotateY(- Math.PI / 2)
        scene.add(panel)
    }
}

// let panel = new WindowPanel()
// panel.position.z = -10
// scene.add(panel)




const loader = new THREE.TextureLoader();
const texMap = loader.load(require("/static/laminate.jpg").default); 
texMap.wrapS = THREE.RepeatWrapping;
texMap.wrapT = THREE.RepeatWrapping;
texMap.repeat.set( 3, 3 );

// var boardGeometry = new THREE.BoxGeometry( 100, 100, 1 );
// const planeTop = new THREE.Mesh( boardGeometry, new THREE.MeshPhongMaterial( { color: 0xffffff } ) );
// planeTop.position.y = 50;
// planeTop.rotateX( Math.PI / 2 );
// planeTop.castShadow = true
// // planeTop.rotateZ( Math.PI );
// scene.add( planeTop );

let planeBottom = new THREE.Mesh( boardGeometry, new THREE.MeshPhongMaterial( {map: texMap } ) );
planeBottom.position.y = -50;
planeBottom.rotateX( - Math.PI / 2 );
planeBottom.receiveShadow = true;
planeBottom.castShadow = true;
scene.add( planeBottom );

function animate () {
    controls.update();
    renderer.render( scene, camera );
    composer.render();
    requestAnimationFrame(animate );
    // var time = Date.now() * 0.0005;

    recalculate_time()
    calculate_sun_position()
    calculate_sun_brightness_and_color()
    
}

animate()


function resize_canvas() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    
}

window.addEventListener('resize', resize_canvas)
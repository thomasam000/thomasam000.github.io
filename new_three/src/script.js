import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {DeviceOrientationControls} from 'three/examples/jsm/controls/DeviceOrientationControls.js'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import Desk from './threeJsComponents/desk.js'
import Door from './threeJsComponents/door.js'
import WindowPanel from './threeJsComponents/windowPanel'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const canvas = document.querySelector('canvas.webgl')
console.log(canvas.width)
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
    
    percent_of_day = ((hours-1) + (minutes/60) + (seconds/3600)) / 24
    sun_angle_z = (2 * Math.PI * percent_of_day) + (3* Math.PI/2)
}
calculate_time() 

// let pivotPoint = new THREE.Object3D();

let mouse = new THREE.Vector2()
let clock = new THREE.Clock()
let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera( 75, (window.innerWidth - 300) / window.innerHeight, 0.01, 10000 );
camera.position.z = 0.01;

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true;
renderer.setSize( (window.innerWidth - 300), window.innerHeight );
let composer = new EffectComposer(renderer)
scene.background = new THREE.Color( 0xaaaaaa );

let renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

let outlinePass = new OutlinePass( new THREE.Vector2( (window.innerWidth - 300), window.innerHeight ), scene, camera);

outlinePass.visibleEdgeColor.set('#ffffff');
outlinePass.hiddenEdgeColor.set('#ffffff');
outlinePass.edgeStrength = 1000
outlinePass.edgeThickness = 1
outlinePass.edgeGlow = 0

composer.addPass( outlinePass );
renderer.getDrawingBufferSize();

// canvas.appendChild( renderer.domElement );
// let controls = new DeviceOrientationControls(camera, true);

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
planeTop.receiveShadow = true
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

const mainLight = new THREE.PointLight( 0xffffff, 0.4, 350, 1);
mainLight.position.y = 35;
mainLight.position.z = 5;
mainLight.castShadow = true;
mainLight.shadow.mapSize.set( 1024, 1024 )
scene.add( mainLight );


let sun_brightness = 1.0;
let ambient_brightness = 0.6;

const sun = new THREE.PointLight( new THREE.Color("rgb(255,255,255)"), sun_brightness, 2000, 1);
sun.castShadow = true;
sun.shadow.mapSize.set( 4096, 4096 )

var sun_mesh = new THREE.Mesh(
    new THREE.SphereGeometry(20, 32, 32),
    new THREE.MeshBasicMaterial({color:0xffffff}) 
);
sun_mesh.receiveShadow = false
sun_mesh.castShadow = false

function calculate_sun_position() {
    let x_pos;
    let y_pos;
    let z_pos;
    
    y_pos = 400*Math.sin(sun_angle_z);
    z_pos = 400*Math.cos(sun_angle_z)
    let x_angle = 2* Math.PI /6
    let little_triangle_hypotenuse = y_pos * Math.cos(x_angle)
    let little_triangle_angle = Math.PI/2 - ((Math.PI - x_angle)/2)

    x_pos = -little_triangle_hypotenuse * Math.cos(little_triangle_angle)
    y_pos = y_pos - (little_triangle_hypotenuse * Math.sin(little_triangle_angle))

    sun.position.x = x_pos;
    sun.position.y = y_pos;
    sun.position.z = z_pos;
    sun_mesh.position.x = x_pos;
    sun_mesh.position.y = y_pos;
    sun_mesh.position.z = z_pos;
}

function recalculate_time() {
    percent_of_day = percent_of_day + 0.01
    if (percent_of_day > 1) {
        percent_of_day = percent_of_day -1
    }
    sun_angle_z = (2 * Math.PI * percent_of_day) + (3* Math.PI/2)
}
let sun_r = 1.0;
let sun_g = 1.0;
let sun_b = 1.0;

function calculate_sun_brightness_and_color() {
    if (percent_of_day > 0.25 && percent_of_day < 0.75) {
        sun_brightness = 1.0
        ambient_brightness = 0.5
    } else if (percent_of_day < 0.15 || percent_of_day > 0.90) {
        sun_brightness = 0.0
        ambient_brightness = 0.05
    } else if (percent_of_day >= 0.15 && percent_of_day <= 0.25){
        sun_brightness = 1.0 * (percent_of_day - 0.15) / 0.1
        ambient_brightness = (0.45 * (percent_of_day - 0.15) / 0.1) + 0.05
    } else if (percent_of_day >= 0.80 && percent_of_day <= 0.90) {
        sun_brightness = 1.0 * (0.90 - percent_of_day) / 0.1
        ambient_brightness = (0.45 * (0.90 - percent_of_day) / 0.1) + 0.05
    }
    if (percent_of_day >= 0.6 && percent_of_day <= 0.85 ) {
        sun_r = 1
        sun_g = 0.94 * (1 - 0.5 * ((percent_of_day - 0.6) / 0.25))
        sun_b = 0.88 * (1 - ((percent_of_day - 0.6) / 0.25))
    } else if (percent_of_day < 0.6) {
        sun_r = 1
        sun_g = 0.94
        sun_b = 0.88
    }
    sun.color.r = sun_r
    sun.color.g = sun_g
    sun.color.b = sun_b
    sun.intensity = sun_brightness
    ambient_light.intensity = ambient_brightness
}

// sun.add(pivotPoint);
// sun_mesh.add(pivotPoint);


scene.add( sun );
scene.add(sun_mesh); // add the mesh to the scene

var dome = new THREE.Mesh(
    // new THREE.SphereGeometry(700, 64, 64),
    new THREE.SphereGeometry(700,64,64, Math.PI/2,  Math.PI*2, 0, Math.PI/1.8),
    new THREE.MeshPhongMaterial({color:0x99bbff}) 
);
dome.material.side = THREE.BackSide

scene.add(dome); // add the mesh to the scene
var underdome = new THREE.Mesh(
    // new THREE.SphereGeometry(700, 64, 64),
    new THREE.SphereGeometry(350,64,64, Math.PI/2,  Math.PI*2, 0, Math.PI/2.1),
    new THREE.MeshPhongMaterial({color:0xcccccc}) 
);
underdome.material.side = THREE.BackSide
underdome.rotateZ(Math.PI)
underdome.castShadow = true
// underdome.receiveShadow = true
scene.add(underdome); // add the mesh to the scene
// const near = 1;
// const far = 700;
// const color = 0xccccee;
// scene.fog = new THREE.Fog(color, near, far);
const ambient_light = new THREE.AmbientLight( 0xccccdd, ambient_brightness ); // soft white light
scene.add( ambient_light );

let desk = new Desk(30, 30, 80, 1, 1)
let desk2 = new Desk(30, 30, 40, 1, 1)
desk.position.z = -35
desk.position.y = -50
desk.position.x = 10
desk.rotateY(Math.PI / 2)
desk2.position.z = 0
desk2.position.y = -50
desk2.position.x = 35
scene.add( desk );
scene.add( desk2 );

let door = new Door(40,80)
door.position.x = -10
door.position.y = -10
door.position.z = 49
scene.add(door)

let panel1 = new WindowPanel(20, 20)
panel1.position.z = -40
panel1.position.y = 40
panel1.position.x = -51
panel1.rotateY(- Math.PI / 2)
scene.add(panel1)
let panel2 = new WindowPanel(40, 20)
panel2.position.z = -10
panel2.position.y = 40
panel2.position.x = -51
panel2.rotateY(- Math.PI / 2)
scene.add(panel2)
let panel3 = new WindowPanel(40, 20)
panel3.position.z = 30
panel3.position.y = 40
panel3.position.x = -51
panel3.rotateY(- Math.PI / 2)
scene.add(panel3)
let panel4 = new WindowPanel(20, 40)
panel4.position.z = -40
panel4.position.y = 10
panel4.position.x = -51
panel4.rotateY(- Math.PI / 2)
scene.add(panel4)
let panel5 = new WindowPanel(20, 40)
panel5.position.z = -40
panel5.position.y = -30
panel5.position.x = -51
panel5.rotateY(- Math.PI / 2)
scene.add(panel5)
let panel6 = new WindowPanel(40, 40)
panel6.position.z = -10
panel6.position.y = 10
panel6.position.x = -51
panel6.rotateY(- Math.PI / 2)
scene.add(panel6)
let panel7 = new WindowPanel(40, 40)
panel7.position.z = -10
panel7.position.y = -30
panel7.position.x = -51
panel7.rotateY(- Math.PI / 2)
scene.add(panel7)
let panel8 = new WindowPanel(40, 40)
panel8.position.z = 30
panel8.position.y = 10
panel8.position.x = -51
panel8.rotateY(- Math.PI / 2)
scene.add(panel8)
let panel9 = new WindowPanel(40, 40)
panel9.position.z = 30
panel9.position.y = -30
panel9.position.x = -51
panel9.rotateY(- Math.PI / 2)
scene.add(panel9)


let panel10 = new WindowPanel(20, 20)
panel10.position.x = -40
panel10.position.y = 40
panel10.position.z = -51
scene.add(panel10)
let panel11 = new WindowPanel(40, 20)
panel11.position.x = -10
panel11.position.y = 40
panel11.position.z = -51
scene.add(panel11)
let panel12 = new WindowPanel(40, 20)
panel12.position.x = 30
panel12.position.y = 40
panel12.position.z = -51
scene.add(panel12)
let panel13 = new WindowPanel(20, 40)
panel13.position.x = -40
panel13.position.y = 10
panel13.position.z = -51
scene.add(panel13)
let panel14 = new WindowPanel(20, 40)
panel14.position.x = -40
panel14.position.y = -30
panel14.position.z = -51
scene.add(panel14)
let panel15 = new WindowPanel(40, 40)
panel15.position.x = -10
panel15.position.y = 10
panel15.position.z = -51
scene.add(panel15)
let panel16 = new WindowPanel(40, 40)
panel16.position.x = -10
panel16.position.y = -30
panel16.position.z = -51
scene.add(panel16)
let panel17 = new WindowPanel(40, 40)
panel17.position.x = 30
panel17.position.y = 10
panel17.position.z = -51
scene.add(panel17)
let panel18 = new WindowPanel(40, 40)
panel18.position.x = 30
panel18.position.y = -30
panel18.position.z = -51
scene.add(panel18)

// for (let x=-40; x < 50; x += 20) {
//     for (let y=-40; y < 50; y += 20) {
//         let panel = new WindowPanel()
//         panel.position.x = x
//         panel.position.y = y
//         panel.position.z = -51
//         scene.add(panel)
//     }
// }
// for (let z=-40; z < 50; z += 20) {
//     for (let y=-40; y < 50; y += 20) {
//         let panel = new WindowPanel()
//         panel.position.z = z
//         panel.position.y = y
//         panel.position.x = -51
//         panel.rotateY(- Math.PI / 2)
//         scene.add(panel)
//     }
// }

// let panel = new WindowPanel()
// panel.position.z = -10
// scene.add(panel)
function calculations() {
    calculate_time()
    calculate_sun_position()
    calculate_sun_brightness_and_color()
}
calculations()
let time_interval = window.setInterval(() => {
    calculations()
}, 500) 



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

    // recalculate_time()
    // calculate_sun_position()
    // calculate_sun_brightness_and_color()
    
}

// axios.get('http://api.weatherapi.com/v1/current.json?key=5c59ee25b4be4ac69a7142821220304&q=New%20York').then((response) => {
//     console.log(response.data.current.condition.code)
// })
animate()


function resize_canvas() {
    camera.aspect = (window.innerWidth - 300) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize((window.innerWidth - 300), window.innerHeight);
    composer.setSize((window.innerWidth - 300), window.innerHeight);
    
}

window.addEventListener('resize', resize_canvas)


const gltfloader = new GLTFLoader()
// require('./models/plant.gltf')
gltfloader.load( 'data/plant.gltf', function ( gltf ) {
    gltf.scene.children[0].scale.multiplyScalar(30);
    gltf.scene.children[0].frustumCulled = false
    gltf.scene.children[0].position.x = 35
    gltf.scene.children[0].position.y = -20
    gltf.scene.children[0].position.z = -40
    gltf.scene.children[0].castShadow = true
    gltf.scene.children[0].receiveShadow = true
    scene.add( gltf.scene.children[0] );
})

const keysTexture = loader.load(require("/static/KeyB.jpg").default); 
const screenTexture = loader.load(require("/static/macScreen.jpg").default); 
const TopLineTexture = loader.load(require("/static/TopLine.jpg").default); 

const fbxLoader = new FBXLoader()
fbxLoader.load('data/MacBookPro.fbx', function(fbx) {
    console.log(fbx)
    fbx.scale.multiplyScalar(0.04)
    const Plane = fbx.getObjectByName('Plane');
    const Camera001 = fbx.getObjectByName('Camera001');
    const macBook_TopPart = fbx.getObjectByName('macBook_TopPart');
    macBook_TopPart.castShadow = true
    macBook_TopPart.receiveShadow = true
    const macBook_BottomPart = fbx.getObjectByName('macBook_BottomPart');
    // const screenLight = new THREE.SpotLight( 0xff0000, 0.5, Math.PI);
    // const screenLight = new THREE.SpotLight( 0xffffff );
    const screenLight = new THREE.PointLight( 0xffffff, 0.05 , 45, 1);
    screenLight.castShadow = true
    // screenLight.target.x = 0
    // screenLight.target.y = 0
    // screenLight.target.z = 0
    macBook_BottomPart.castShadow = true
    macBook_BottomPart.receiveShadow = true
    const macBookScreen = macBook_TopPart.material[1]
    const macBookKeys = macBook_BottomPart.material[3]
    const macBookKeysBottom = macBook_BottomPart.material[4]
    const macBookTopLine = macBook_BottomPart.material[5]
    macBookScreen.map = screenTexture
    macBookScreen.emissive = new THREE.Color(0xffffff)
    macBookScreen.emissiveMap = screenTexture
    macBookScreen.emissiveIntensity = 0.3
    macBookKeysBottom.emissive = new THREE.Color(0xffffff)
    macBookKeysBottom.emissiveIntensity = 0.3
    macBookKeys.map = keysTexture
    macBookTopLine.map = TopLineTexture
    fbx.remove( Plane );
    fbx.remove( Camera001 );
    fbx.rotateY(Math.PI)
    fbx.position.x = 0
    fbx.position.y = -22
    fbx.position.z = -37
    screenLight.position.x = 2
    screenLight.position.y = -12
    screenLight.position.z = -35.5
    // fbx.add(screenLight)
    scene.add(fbx)
    scene.add(screenLight)
})
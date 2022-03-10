<template>
<!-- <img src="../assets/315.jpg" alt=""> -->
   <div ref="canvas">
        <!-- <p><a href="https://github.com/yomotsu/camera-controls">GitHub repo</a></p>
        <label><input type="checkbox" :onchange="controls.verticalDragToForward = this.checked">vertical drag to move forward</label>
        <br>
        <label><input type="checkbox" :onchange="controls.dollyToCursor = this.checked">dolly to cursor</label>
        <br>
        <label><input type="checkbox" :onchange="controls.infinityDolly = this.checked">infinity dolly</label>
        <br>
        <button :onclick="controls.rotate(  45 * THREE.MathUtils.DEG2RAD, 0, true )">rotate theta 45deg</button>
        <button :onclick="controls.rotate( -90 * THREE.MathUtils.DEG2RAD, 0, true )">rotate theta -90deg</button>
        <button :onclick="controls.rotate( 360 * THREE.MathUtils.DEG2RAD, 0, true )">rotate theta 360deg</button>
        <button :onclick="controls.rotate( 0, 20 * THREE.MathUtils.DEG2RAD, true )">rotate phi 20deg</button>
        <br> -->
   </div>
</template>
<script>
import * as THREE from 'three-full'
import CameraControls from 'camera-controls'
import {Scene, Clock, OrbitControls, PerspectiveCamera, WebGLRenderer, Mesh, PlaneGeometry, MeshPhongMaterial, PointLight, AmbientLight, TextureLoader} from "three-full";
// import {getCurrentInstance } from 'vue'
import Desk from '@/threeJsComponents/desk'
import BulletinBoard from '@/threeJsComponents/bulletinBoard'
import {} from 'three-story-controls'
CameraControls.install( { THREE: THREE } );

export default {
    data () { 
        return {
        }
    },
    components: {

    },
    computed: {

    },
    methods: {
        resize_canvas() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        },
        init() {
            this.clock = new Clock()
            this.scene = new Scene()
            this.container = this.$refs.canvas
            // 60, width / height, 0.01, 100
            this.camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1000 );
            this.camera.position.z = 0.01;
            // camera.position.y = 50;
            // this.camera.position.y=50
            // this.camera.position.z=0
            this.renderer = new WebGLRenderer();
            this.renderer.shadowMap.enabled = true;
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.container.appendChild( this.renderer.domElement );
            // this.cameraRig = new CameraRig(this.camera, this.scene)
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            this.controls.rotateSpeed = - 0.25;
            this.controls.update();
            console.log(this.controls)
            // this.controls.rotate(  45 * THREE.MathUtils.DEG2RAD, 0, true )
            // this.controls.update();
            // this.controls.enable()
            // this.cameraRig.camera.position.set( 0, 50, 48);
            window.addEventListener('resize', this.resize_canvas);  
        },
        build_scene () {
            const planeGeo = new PlaneGeometry( 100, 100 );
            const planeTop = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeTop.position.y = 50;
            planeTop.rotateX( Math.PI / 2 );
            this.scene.add( planeTop );

            // const floor_texture = new TextureLoader().load("../src/assets/315.jpg");
            const loader = new TextureLoader();
            const texMap = loader.load(require("../assets/315.jpg")); 

            const planeBottom = new Mesh( planeGeo, new MeshPhongMaterial( {map: texMap } ) );
            planeBottom.position.y = -50;
            planeBottom.rotateX( - Math.PI / 2 );
            planeBottom.receiveShadow = true;
            this.scene.add( planeBottom );

            const planeFront = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeFront.position.z = 50;
            planeFront.position.y = 0;
            planeFront.receiveShadow = true;
            planeFront.rotateY( Math.PI );
            this.scene.add( planeFront );

            const planeBack = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeBack.position.z = -50;
            planeBack.position.y = 0;
            planeBack.receiveShadow = true;
            // planeBack.rotateY( Math.PI );
            this.scene.add( planeBack );

            const planeRight = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeRight.position.x = 50;
            planeRight.position.y = 0;
            planeRight.receiveShadow = true;

            planeRight.rotateY( - Math.PI / 2 );
            this.scene.add( planeRight );

            const planeLeft = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeLeft.position.x = - 50;
            planeLeft.receiveShadow = true;
            planeLeft.position.y = 0;
            planeLeft.rotateY( Math.PI / 2 );
            this.scene.add( planeLeft );

            const mainLight = new PointLight( 0xffffee, .50, 250 );
            mainLight.position.y = 35;
            mainLight.castShadow = true;
            mainLight.shadow.mapSize.width = 512; // default
            mainLight.shadow.mapSize.height = 512; // default
            mainLight.shadow.camera.near = 0.5; // default
            mainLight.shadow.camera.far = 500 
            mainLight.shadow.radius  = 75
            // mainLight.shadow.blurSamples = 1000

            this.scene.add( mainLight );
            const mainLight2 = new PointLight( 0xffffee, .50, 250 );
            mainLight2.position.y = 35;
            mainLight2.castShadow = false;
            // mainLight.shadow.blurSamples = 1000
            this.scene.add( mainLight2 );

            const light = new AmbientLight( 0xcccccc, 0.5 ); // soft white light
            this.scene.add( light );


            var desk = new Desk()
            desk.position.z = -30
            desk.position.y = -50
            this.scene.add( desk );

            var bulletinBoard = new BulletinBoard()
            bulletinBoard.position.x = -10
            bulletinBoard.position.y = 0
            bulletinBoard.position.z = -50
            this.scene.add(bulletinBoard)

        },  
        animate() {
            // this.controls.update(t)
            this.renderer.render(this.scene, this.camera)
            // this.cameraHelper.update(t)
            window.requestAnimationFrame(this.animate)
            
            // requestAnimationFrame( this.animate );

            // required if controls.enableDamping or controls.autoRotate are set to true
            // this.controls.update();
        },
        anim () {
            // const delta = this.clock.getDelta();
            this.controls.update();
            // if ( updated ) {
            this.renderer.render( this.scene, this.camera );
                // console.log(this.controls)
            // }
            requestAnimationFrame( this.anim );
        }            
        // this.renderer.render( this.scene, this.camera );			}
    },
    async mounted () {
        this.init()
        this.build_scene()  
        this.anim()
    }
}
</script>

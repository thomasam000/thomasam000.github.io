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
// import CameraControls from 'camera-controls'
import {Raycaster, Color, GLTFLoader, RepeatWrapping, EffectComposer, RenderPass, OutlinePass, LinearFilter, BoxGeometry, Vector2, Scene, Clock, OrbitControls, PerspectiveCamera, WebGLRenderer, Mesh, PlaneGeometry, MeshPhongMaterial, PointLight, AmbientLight, TextureLoader} from "three-full";
// import {getCurrentInsGLTFLoadertance } from 'vue'
import Desk from '@/threeJsComponents/desk'
import BulletinBoard from '@/threeJsComponents/bulletinBoard'
import {} from 'three-story-controls'
import * as CANNON from 'cannon'
// CameraControls.install( { THREE: THREE } );

export default {
    data () { 
        return {
            clickables: []
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
            this.composer.setSize(window.innerWidth, window.innerHeight);
        },
        init() {
            this.mouse = new Vector2()
            this.clock = new Clock()
            this.scene = new Scene()
            
            this.container = this.$refs.canvas
            // 60, width / height, 0.01, 100
            this.camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.01, 1000 );
            this.camera.position.z = 0.01;
            // camera.position.y = 50;
            // this.camera.position.y=50
            // this.camera.position.z=0
            this.renderer = new WebGLRenderer();
            this.renderer.shadowMap.enabled = true;
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.composer = new EffectComposer(this.renderer)
            this.scene.background = new Color( 0xff0000 );

            const renderPass = new RenderPass( this.scene, this.camera );
            this.composer.addPass( renderPass );

            this.outlinePass = new OutlinePass( new Vector2( window.innerWidth, window.innerHeight ), this.scene, this.camera);
            // this.outlinePass.edgeThickness = 10
            this.outlinePass.visibleEdgeColor.set('#ffffff');
            this.outlinePass.hiddenEdgeColor.set('#ffffff');
            this.outlinePass.edgeStrength = 1000
            this.outlinePass.edgeThickness = 1
            this.outlinePass.edgeGlow = 0
            // this.outlinePass.hiddenEdgeColor.set( '#000000' );
            this.composer.addPass( this.outlinePass );
            this.renderer.getDrawingBufferSize();

            this.container.appendChild( this.renderer.domElement );
            this.controls = new OrbitControls(this.camera, this.renderer.domElement)
            this.controls.rotateSpeed = - 0.25;
            this.controls.enableZoom  = false;
            // this.controls.target.z = 10.00
            this.controls.update();
            this.world = new CANNON.World()
            this.world.gravity.set(0, -98.1, 0)
            this.selectedObjects = []
            // this.controls.rotate(  45 * THREE.MathUtils.DEG2RAD, 0, true )
            // this.controls.update();
            // this.controls.enable()
            // this.cameraRig.camera.position.set( 0, 50, 48);
            this.raycaster = new Raycaster();
            window.addEventListener('resize', this.resize_canvas);
            window.addEventListener( 'mousedown', this.onMouseDown, false );
            window.addEventListener( 'mouseup', this.onMouseUp, false );
            window.addEventListener( 'mousemove', this.onMouseMove, false );
        },
        onMouseDown() {
            this.raycaster.setFromCamera( this.mouse, this.camera );
            var results = this.raycaster.intersectObjects( this.clickables );
            if (results.length > 0) {
                this.currently_clicked = results[0].faceIndex
            }
        },
        onMouseUp() {
            this.raycaster.setFromCamera( this.mouse, this.camera );
            var results = this.raycaster.intersectObjects( this.clickables );
            if (results.length > 0) {
                if (this.currently_clicked == results[0].faceIndex) {
                    this.fitCameraToObject(results[0])
                }
                this.currently_clicked = null
            }
            // this.controls.target.x = results[0].point.x
            // this.controls.target.y = results[0].point.y
            // this.controls.target.z = results[0].point.z
            // this.camera.position.x = results[0].point.x
            // this.camera.position.y = results[0].point.y
            // this.camera.position.z = results[0].point.z + 10
            // if (isIntersected) {
            //     console.log('Mesh clicked!')
            // }
        },
        onMouseMove(event) {
            this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
            this.checkIntersection()
        },
        build_scene () {
            const planeGeo = new PlaneGeometry( 100, 100 );
            const planeTop = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeTop.position.y = 50;
            planeTop.rotateX( Math.PI / 2 );
            // this.scene.add( planeTop );

            // const floor_texture = new TextureLoader().load("../src/assets/315.jpg");
            const loader = new TextureLoader();
            const texMap = loader.load(require("../assets/laminate.jpg")); 
            texMap.wrapS = RepeatWrapping;
            texMap.wrapT = RepeatWrapping;
            texMap.repeat.set( 3, 3 );

            this.planeBottom = new Mesh( planeGeo, new MeshPhongMaterial( {map: texMap } ) );
            this.planeBottom.position.y = -50;
            this.planeBottom.rotateX( - Math.PI / 2 );
            this.planeBottom.receiveShadow = true;
            this.scene.add( this.planeBottom );


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

            const mainLight = new PointLight( 0xffffff, 0.4, 350, 1);
            mainLight.position.y = 35;
            mainLight.position.z = 5;
            mainLight.castShadow = true;
            // mainLight.shadow.mapSize.width = 512; // default
            // mainLight.shadow.mapSize.height = 512; // default
            // mainLight.shadow.camera.near = 0.5; // default
            // mainLight.shadow.camera.far = 500 
            // mainLight.shadow.radius  = 75
            // mainLight.shadow.blurSamples = 1000

            this.scene.add( mainLight );
            // const mainLight2 = new PointLight( 0xffffff, .50, 250 );
            // mainLight2.position.y = 35;
            // mainLight2.position.z = -10;
            // mainLight2.castShadow = true;
            // // mainLight.shadow.blurSamples = 1000
            // this.scene.add( mainLight2 );

            const light = new AmbientLight( 0xccccdd, 0.6 ); // soft white light
            this.scene.add( light );
            // light
            this.loader = new GLTFLoader()
            this.loader.load( require('../assets/models/plant.json'), function ( object ) {
                console.log(object)
                object.traverse( function ( child ) {
                    if ( child.isMesh ) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                } );
                this.scene.add( object );
            } );

// const table_width = 80;
// const table_height = 30;
// const table_depth = 40;
// const table_thickness = 2;
// const leg_thickness = 2

            this.desk = new Desk(80, 28, 30, 1, 1)
            this.desk2 = new Desk(30, 28, 40, 1, 1)
            this.desk.position.z = -35
            this.desk.position.y = -50
            this.desk.position.x = 10
            this.desk2.position.z = 0
            this.desk2.position.y = -50
            this.desk2.position.x = 35
            this.scene.add( this.desk );
            this.scene.add( this.desk2 );
            
            // const CannonDesk = new CANNON.Box(new CANNON.Vec3(0, 0, 0))
            // this.CannonDeskBody = new CANNON.Body({ mass: 10 })
            // this.CannonDeskBody.addShape(CannonDesk)
            // this.CannonDeskBody.position.x = this.desk.position.x
            // this.CannonDeskBody.position.y = this.desk.position.y
            // this.CannonDeskBody.position.z = this.desk.position.z
            // this.world.addBody(this.CannonDeskBody)
            // const CannonDesk2 = new CANNON.Box(new CANNON.Vec3(0, 0, 0))
            // this.CannonDeskBody2 = new CANNON.Body({ mass: 10 })
            // this.CannonDeskBody2.addShape(CannonDesk2)
            // this.CannonDeskBody2.position.x = this.desk2.position.x
            // this.CannonDeskBody2.position.y = this.desk2.position.y
            // this.CannonDeskBody2.position.z = this.desk2.position.z
            // this.world.addBody(this.CannonDeskBody2)

            const planeShape = new CANNON.Plane()
            this.planeBody = new CANNON.Body({ mass: 0 })
            this.planeBody.addShape(planeShape)
            this.planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
            this.planeBody.position.y = -50
            this.world.addBody(this.planeBody)

            
            // const cieling = new CANNON.Plane()
            // this.cieling = new CANNON.Body({ mass: 0 })
            // this.cieling.addShape(cieling)
            // this.cieling.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
            // this.cieling.position.y = 50
            // this.world.addBody(this.cieling)

            var bulletinBoard = new BulletinBoard()
            bulletinBoard.position.x = -10
            bulletinBoard.position.y = -5
            bulletinBoard.position.z = -50

            const resumeGeometry = new BoxGeometry( 8, 32/3, .1);
            const resumeMap = loader.load(require("../assets/SamuelBThomasResume-page-001.jpg")); 
            resumeMap.generateMipmaps = false;
            resumeMap.minFilter =LinearFilter;
            resumeMap.needsUpdate = true;
            const resume = new Mesh( resumeGeometry,new MeshPhongMaterial( {map: resumeMap } ) );
            resume.position.x = -5
            resume.position.y = -7.5
            resume.position.z = -49.5
            this.clickables.push(resume)
            resume.my_width = 12
            resume.my_height = 16
            this.scene.add(resume)
            // bulletinBoard.add(resume)

            this.scene.add(bulletinBoard)

        },  
        addSelectedObject( object ) {

            this.selectedObjects = [];
            this.selectedObjects.push( object );

        },
        checkIntersection() {
            this.raycaster.setFromCamera( this.mouse, this.camera );
            const intersects = this.raycaster.intersectObjects( this.clickables );
            // const intersects = this.raycaster.intersectObject(this.scene, true );
            if ( intersects.length > 0 ) {
                const selectedObject = intersects[ 0 ].object;
                this.addSelectedObject( selectedObject );
                this.outlinePass.selectedObjects = this.selectedObjects;
            } else {
                this.outlinePass.selectedObjects = [];
            }
        },
        anim () {
            const delta = this.clock.getDelta();
            this.controls.update();
            // if ( updated ) {
            this.renderer.render( this.scene, this.camera );
            // }
            // delta = Math.min(clock.getDelta(), 0.1)
            this.world.step(delta)

            // Copy coordinates from Cannon to Three.js
            // this.desk.position.set(
            //     this.CannonDeskBody.position.x,
            //     this.CannonDeskBody.position.y,
            //     this.CannonDeskBody.position.z
            // )
            // this.desk.quaternion.set(
            //     this.CannonDeskBody.quaternion.x,
            //     this.CannonDeskBody.quaternion.y,
            //     this.CannonDeskBody.quaternion.z,
            //     this.CannonDeskBody.quaternion.w
            // )
            // this.desk2.position.set(
            //     this.CannonDeskBody2.position.x,
            //     this.CannonDeskBody2.position.y,
            //     this.CannonDeskBody2.position.z
            // )
            // this.desk2.quaternion.set(
            //     this.CannonDeskBody2.quaternion.x,
            //     this.CannonDeskBody2.quaternion.y,
            //     this.CannonDeskBody2.quaternion.z,
            //     this.CannonDeskBody2.quaternion.w
            // )
            // console.log(this.CannonDeskBody.position.y)
            this.composer.render();
            requestAnimationFrame( this.anim );
        }, 

        fitCameraToObject(mesh) {
            var width = mesh.object.geometry.parameters.width
            // window_width = window.innerWidth
            var height = mesh.object.geometry.parameters.height
            var distance = ((width/2) / (this.camera.aspect * Math.tan(( this.camera.fov / 2) * (Math.PI /180))))
            console.log(distance)

            this.controls.target.x = mesh.object.position.x 
            this.controls.target.y = mesh.object.position.y + height/2 - width/this.camera.aspect/2
            this.controls.target.z = mesh.object.position.z 

            var start = this.camera.position.z
            var goal = mesh.object.position.z + distance 
            var total_distance = goal - start

            this.camera.position.x = mesh.object.position.x
            this.camera.position.y = mesh.object.position.y + height/2 - width/this.camera.aspect/2
            
            var update_camera =  () => {
                var increment = (1 - (2*Math.abs(this.camera.position.z / total_distance - .5))) + 0.1

                if (this.camera.position.z > goal) {
                    this.camera.position.z = this.camera.position.z - increment
                } else {
                    return
                }
                setTimeout (() => {
                    update_camera()
                }, 10) 
            }
            update_camera()
        },
    },
    async mounted () {
        this.init()
        this.build_scene()  
        this.anim()
    }
}
</script>

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
import {Raycaster, EffectComposer, RenderPass, OutlinePass, LinearFilter, BoxGeometry, Vector2, Scene, Clock, OrbitControls, PerspectiveCamera, WebGLRenderer, Mesh, PlaneGeometry, MeshPhongMaterial, PointLight, AmbientLight, TextureLoader} from "three-full";
// import {getCurrentInstance } from 'vue'
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
            this.camera = new PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.01, 1000 );
            this.camera.position.z = 0.01;
            // camera.position.y = 50;
            // this.camera.position.y=50
            // this.camera.position.z=0
            this.renderer = new WebGLRenderer();
            this.renderer.shadowMap.enabled = true;
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.composer = new EffectComposer(this.renderer)
            
            const renderPass = new RenderPass( this.scene, this.camera );
            this.composer.addPass( renderPass );

            this.outlinePass = new OutlinePass( new Vector2( window.innerWidth, window.innerHeight ), this.scene, this.camera);
            // this.outlinePass.edgeThickness = 10
            this.outlinePass.visibleEdgeColor.set('#0000ff');
            this.outlinePass.hiddenEdgeColor.set('#0000ff');
            this.outlinePass.edgeStrength = 1000
            this.outlinePass.edgeThickness = 1
            this.outlinePass.edgeGlow = 0
            // this.outlinePass.hiddenEdgeColor.set( '#000000' );
            this.composer.addPass( this.outlinePass );
            this.renderer.getDrawingBufferSize();

				// effectFXAA = new ShaderPass( FXAAShader );
				// effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
				// composer.addPass( effectFXAA );
            this.container.appendChild( this.renderer.domElement );
            // this.cameraRig = new CameraRig(this.camera, this.scene)
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
            window.addEventListener( 'click', this.onMouseClick, false );
            window.addEventListener( 'mousemove', this.onMouseMove, false );
        },
        onMouseClick() {
            this.raycaster.setFromCamera( this.mouse, this.camera );
            var results = this.raycaster.intersectObjects( this.clickables );
            if (results.length > 0) {
                this.fitCameraToObject(results[0])
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
            this.scene.add( planeTop );

            // const floor_texture = new TextureLoader().load("../src/assets/315.jpg");
            const loader = new TextureLoader();
            const texMap = loader.load(require("../assets/wood.jpg")); 

            this.planeBottom = new Mesh( planeGeo, new MeshPhongMaterial( {map: texMap } ) );
            this.planeBottom.position.y = -50;
            this.planeBottom.rotateX( - Math.PI / 2 );
            this.planeBottom.receiveShadow = true;
            this.scene.add( this.planeBottom );


            const planeFront = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xeeeeff } ) );
            planeFront.position.z = 50;
            planeFront.position.y = 0;
            planeFront.receiveShadow = true;
            planeFront.rotateY( Math.PI );
            this.scene.add( planeFront );

            const planeBack = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xeeeeff } ) );
            planeBack.position.z = -50;
            planeBack.position.y = 0;
            planeBack.receiveShadow = true;
            // planeBack.rotateY( Math.PI );
            this.scene.add( planeBack );

            const planeRight = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xeeeeff } ) );
            planeRight.position.x = 50;
            planeRight.position.y = 0;
            planeRight.receiveShadow = true;

            planeRight.rotateY( - Math.PI / 2 );
            this.scene.add( planeRight );

            const planeLeft = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xeeeeff } ) );
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


            this.desk = new Desk()
            this.desk.position.z = -30
            this.desk.position.y = -49
            this.scene.add( this.desk );
            const CannonDesk = new CANNON.Box(new CANNON.Vec3(0, 0, 0))
            this.CannonDeskBody = new CANNON.Body({ mass: 10 })
            this.CannonDeskBody.addShape(CannonDesk)
            this.CannonDeskBody.position.x = this.desk.position.x
            this.CannonDeskBody.position.y = this.desk.position.y
            this.CannonDeskBody.position.z = this.desk.position.z
            this.world.addBody(this.CannonDeskBody)

            const planeShape = new CANNON.Plane()
            this.planeBody = new CANNON.Body({ mass: 0 })
            this.planeBody.addShape(planeShape)
            this.planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
            this.planeBody.position.y = -50
            this.world.addBody(this.planeBody)

            var bulletinBoard = new BulletinBoard()
            bulletinBoard.position.x = -10
            bulletinBoard.position.y = 0
            bulletinBoard.position.z = -50

            const resumeGeometry = new BoxGeometry( 12, 16, .1);
            const resumeMap = loader.load(require("../assets/SamuelBThomasResume-page-001.jpg")); 
            resumeMap.generateMipmaps = false;
            resumeMap.minFilter =LinearFilter;
            resumeMap.needsUpdate = true;
            const resume = new Mesh( resumeGeometry,new MeshPhongMaterial( {map: resumeMap } ) );
            resume.position.x = 0
            resume.position.y = -5
            resume.position.z = -49
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
            this.desk.position.set(
                this.CannonDeskBody.position.x,
                this.CannonDeskBody.position.y,
                this.CannonDeskBody.position.z
            )
            this.desk.quaternion.set(
                this.CannonDeskBody.quaternion.x,
                this.CannonDeskBody.quaternion.y,
                this.CannonDeskBody.quaternion.z,
                this.CannonDeskBody.quaternion.w
            )
            // console.log(this.CannonDeskBody.position.y)
            this.composer.render();
            requestAnimationFrame( this.anim );
        }, 
        fitCameraToObject(mesh) {
            this.controls.enableZoom  = true;
            this.controls.target.x = mesh.point.x
            this.controls.target.y = mesh.point.y
            this.controls.target.z = mesh.point.z
            // var height = mesh.my_height
            // var width = mesh.my_width
            const camera_x = mesh.point.x
            const camera_y = mesh.point.y
            const camera_z = mesh.point.z + (15)
            this.camera.position.x = camera_x
            this.camera.position.y = camera_y
            this.camera.position.z = camera_z
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

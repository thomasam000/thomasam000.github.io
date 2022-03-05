<template>
<!-- <img src="../assets/315.jpg" alt=""> -->
   <div ref="canvas"></div>
</template>
<script>
import {Scene, PerspectiveCamera, WebGLRenderer, Mesh, PlaneGeometry, MeshPhongMaterial, PointLight, AmbientLight, OrbitControls, TextureLoader} from "three-full";
// import {getCurrentInstance } from 'vue'
import Desk from '@/threeJsComponents/desk'
import BulletinBoard from '@/threeJsComponents/bulletinBoard'

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
            this.scene = new Scene()
            this.container = this.$refs.canvas
            this.camera = new PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
            this.renderer = new WebGLRenderer();
            this.renderer.shadowMap.enabled = true;
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.container.appendChild( this.renderer.domElement );
            this.controls = new OrbitControls( this.camera, this.renderer.domElement );
            this.camera.position.set( 0, 100, 0 );
            this.controls.update();
            window.addEventListener('resize', this.resize_canvas);  
        },
        build_scene () {
            const planeGeo = new PlaneGeometry( 100, 100 );
            const planeTop = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeTop.position.y = 100;
            planeTop.rotateX( Math.PI / 2 );
            this.scene.add( planeTop );

            // const floor_texture = new TextureLoader().load("../src/assets/315.jpg");
            const loader = new TextureLoader();
            const texMap = loader.load(require("../assets/315.jpg")); 

            const planeBottom = new Mesh( planeGeo, new MeshPhongMaterial( {map: texMap } ) );
            planeBottom.rotateX( - Math.PI / 2 );
            planeBottom.receiveShadow = true;
            this.scene.add( planeBottom );

            const planeFront = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeFront.position.z = 50;
            planeFront.position.y = 50;
            planeFront.receiveShadow = true;
            planeFront.rotateY( Math.PI );
            this.scene.add( planeFront );

            const planeBack = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeBack.position.z = -50;
            planeBack.position.y = 50;
            planeBack.receiveShadow = true;
            // planeBack.rotateY( Math.PI );
            this.scene.add( planeBack );

            const planeRight = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeRight.position.x = 50;
            planeRight.position.y = 50;
            planeRight.receiveShadow = true;

            planeRight.rotateY( - Math.PI / 2 );
            this.scene.add( planeRight );

            const planeLeft = new Mesh( planeGeo, new MeshPhongMaterial( { color: 0xffffff } ) );
            planeLeft.position.x = - 50;
            planeLeft.receiveShadow = true;
            planeLeft.position.y = 50;
            planeLeft.rotateY( Math.PI / 2 );
            this.scene.add( planeLeft );

            const mainLight = new PointLight( 0xffffee, .50, 250 );
            mainLight.position.y = 85;
            mainLight.castShadow = true;
            mainLight.shadow.mapSize.width = 512; // default
            mainLight.shadow.mapSize.height = 512; // default
            mainLight.shadow.camera.near = 0.5; // default
            mainLight.shadow.camera.far = 500 
            mainLight.shadow.radius  = 75
            // mainLight.shadow.blurSamples = 1000

            this.scene.add( mainLight );
            const mainLight2 = new PointLight( 0xffffee, .50, 250 );
            mainLight2.position.y = 85;
            mainLight2.castShadow = false;
            // mainLight.shadow.blurSamples = 1000
            this.scene.add( mainLight2 );

            const light = new AmbientLight( 0xcccccc, 0.5 ); // soft white light
            this.scene.add( light );


            var desk = new Desk()
            desk.position.z = 30
            this.scene.add( desk );

            var bulletinBoard = new BulletinBoard()
            bulletinBoard.position.x = 10
            bulletinBoard.position.y = 50
            bulletinBoard.position.z = 50
            this.scene.add(bulletinBoard)

        },  
        animate() {
            requestAnimationFrame( this.animate );

            // required if controls.enableDamping or controls.autoRotate are set to true
            this.controls.update();

            this.renderer.render( this.scene, this.camera );			}
    },
    async mounted () {
        this.init()
        this.build_scene()  
        this.animate()
    }
}
</script>

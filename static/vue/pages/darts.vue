<template>
    <div style="cursor:crosshair;">
	<!-- <div style="z-index: 10000;" v-loading.fullscreen.lock="loading"></div> -->

        <div style="position:relative; height:100vh;" >
            <div ref="container" id="three_container" ></div>

            <!-- <el-button style="position:absolute; top:50px; right:50px;" @click="zoom_to(bulletin_board)" v-if="zoom_object != bulletin_board && zoom_object != table">Zoom Out</el-button> -->
            <!-- <div style="" class="bottom_nav" @click="move_to_table" v-if="zoom_object == bulletin_board">
                <div>Projects</div>
                <div><i class="arrow down"></i></div>
            </div>
            <div style="" class="top_nav" @click="move_to_bulletin" v-if="zoom_object == table">
                <div><i class="arrow up"></i></div>
                <div>Home</div>
            </div> -->
            <div style="width:100px; height: 25px; position:absolute; top:10px; left:10px;">
                <div :style="{'width': power + 'px'}" style="background-color:red; height: 25px;"></div>
            </div>
        </div>
        <!-- <div ref="dartboard" class="dartboard"> -->
        <!-- </div> -->
	</div>
</template>

<script>
const resumeObject = require('../../three_js_components/resume');

module.exports = {
    components: {

    },
    props: ['layers', 'job_index', 'type'],
  	data() {
    	return {
			container: null,
			camera: null,
			scene: null,
			renderer: null,
			renderer2: null,
			controls: null,
			line: null,
			zoom_object: null,
            darts: 3,
			physics_world: null,
			rigidBodies: [],
			transformAux1: null,
			power: 1,
            dartboard: null,
			mouse_lifted: false,
			mouseCoords: new THREE.Vector2(),
			raycaster: new THREE.Raycaster(),
			ballMaterial: new THREE.MeshPhongMaterial( { color: 0x202020 } ),
			pos: new THREE.Vector3(),
			quat: new THREE.Quaternion(),
			thumbtacks: [
				{x: 400, y: 220 },
				{x: 800, y: 300 },
				{x: 1060, y: 250 },
				{x: 1525, y: 160 },
				{x: 650, y: -220 },
				{x: 1075, y: -225 },
				{x: -1525, y: 300 },
				{x: -465, y: 295},
			]
   		}
  	},
  	methods: {
		init: function() {

			// initialize clock
			this.clock = new THREE.Clock();

			//initialize scene
			this.scene = new THREE.Scene();

			//intialize camera
			this.camera = new THREE.PerspectiveCamera( 50, this.container.clientWidth / this.container.clientHeight, 0.1, 100000 );
			this.camera.position.z=75

			//initialize webgl renderer
			this.renderer = new THREE.WebGLRenderer({ alpha: true });
			this.renderer.setClearColor( 0x000000, 0 ); // the default
			this.renderer.antialias = true
			this.renderer.setClearColor( 0xffffff ); // the defaultoffsetWidth
			this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
			this.renderer.domElement.style.position = 'absolute'
			this.renderer.domElement.style.top = 0
			this.container.appendChild( this.renderer.domElement );

			//intitialize css renderer
			this.renderer2 = new THREE.CSS3DRenderer();
			this.renderer2.antialias = true
			this.renderer2.setSize( this.container.offsetWidth, this.container.offsetHeight );
			this.renderer2.domElement.style.position = 'absolute'
			this.renderer2.domElement.style.top = 0
			this.container.appendChild( this.renderer2.domElement );

			// intialize controls
			this.controls = new CameraControls( this.camera, this.renderer2.domElement );
			this.controls.enabled = false
			this.controls.update();

			// intialize lighting
			var ambientlight = new THREE.AmbientLight( 0xffffff, 0.6 );
			var directionlight = new THREE.DirectionalLight( 0xffffff, 0.4 );
			var directionlight2 = new THREE.DirectionalLight( 0xffffff, 0.4 );
			directionlight.position.set(-500, 0, 1000)
			directionlight2.position.set(0, 10000, 2000)
			this.scene.add( ambientlight );
			this.scene.add( directionlight );
			this.scene.add( directionlight2 );

			var textureLoader = new THREE.TextureLoader();
            var geometry = new THREE.CircleGeometry( 10, 40 );
            var texture = textureLoader.load("/assets/dartboard.png"); 
            texture.magFilter = 1006
            texture.minFilter = 1008
            // texture.magFilter = THREE.LinearFilter
            // texture.minFilter = THREE.LinearMipmapLinearFilter
			var material = new THREE.MeshPhongMaterial( {map: texture} );
            this.dartboard = new THREE.Mesh( geometry, material );
            this.scene.add( this.dartboard );

            // this.zoom_object = this.dartboard
			// this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0 })


			that = this
			var temp_transform = new Ammo.btTransform()
			var collision_config = new Ammo.btDefaultCollisionConfiguration()
			var dispatcher = new Ammo.btCollisionDispatcher(collision_config)
			var overlapping_pair_cache = new Ammo.btDbvtBroadphase()
			var solver = new Ammo.btSequentialImpulseConstraintSolver()
			this.physics_world = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlapping_pair_cache, solver, collision_config)
			this.physics_world.setGravity(new Ammo.btVector3( 0, - 9.8, 0 ))
			this.transformAux1 = new Ammo.btTransform();
			window.addEventListener( 'pointerdown', this.charge_dart)
			window.addEventListener( 'pointerup', this.throw_dart);
		},
        onWindowResize(){
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer2.setSize( window.innerWidth, window.innerHeight );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
			if (this.zoom_object != this.table) {
				this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 })
			}
        },
		zoom_to(target) {
			this.hover = 'none'
			this.zoom_object = target
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 })
		},
		charge_dart() {
			that = this
			increase_power = function() {
				that.power = that.power * 1.03
				if (that.mouse_lifted) {
					that.mouse_lifted = false
					return
				} else {
					if (that.power > 100) {
						return 
					} else {
						setTimeout(increase_power, 10)
					}
				}
			}
			increase_power()
		},
		throw_dart(event) {
            this.mouse_lifted = true
            this.mouseCoords.set(
                ( event.clientX / window.innerWidth ) * 2 - 1,
                - ( event.clientY / window.innerHeight ) * 2 + 1
            );

            this.raycaster.setFromCamera( this.mouseCoords, this.camera );

                // Creates a ball and throws it
            const ballMass = 100;
            const ballRadius = 0.4;
            const margin = 0.05;
            const ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 14, 10 ), this.ballMaterial );
            ball.castShadow = true;
            ball.receiveShadow = true;
            const ballShape = new Ammo.btSphereShape( ballRadius );
            ballShape.setMargin( margin );
            this.pos.copy( this.raycaster.ray.direction );
            this.pos.add( this.raycaster.ray.origin );
            this.quat.set( 0, 0, 0, 1 );
            const ballBody = this.createRigidBody( ball, ballShape, ballMass, this.pos, this.quat );

            this.pos.copy( this.raycaster.ray.direction );
            console.log(this.power)
            this.pos.multiplyScalar( this.power );
            var too_much_power = 0
            if (this.power > 80) {
                too_much_power =  ((this.power - 80) * (this.power - 80)) / 50
            }
            accuracy_x = (2*Math.random() - 1) * too_much_power
            accuracy_y = (2*Math.random() - 1) * too_much_power
            ballBody.setLinearVelocity( new Ammo.btVector3( this.pos.x + accuracy_x, this.pos.y + accuracy_y, this.pos.z ) );
            if (this.power > 100) {
                this.mouse_lifted = false
            }
            this.power = 1
		},
		animate: function() {
			const delta = this.clock.getDelta();
			this.controls.update( delta );
            this.renderer2.render( this.scene, this.camera );
            this.renderer.render( this.scene, this.camera );
			this.updatePhysics( delta );
			requestAnimationFrame( this.animate );
		},
		detectCollision(){

			let dispatcher = this.physics_world.getDispatcher();
			let numManifolds = dispatcher.getNumManifolds();

			for ( let i = 0; i < numManifolds; i ++ ) {

				let contactManifold = dispatcher.getManifoldByIndexInternal( i );
				let numContacts = contactManifold.getNumContacts();

				for ( let j = 0; j < numContacts; j++ ) {

					let contactPoint = contactManifold.getContactPoint( j );
					let distance = contactPoint.getDistance();
					console.log({manifoldIndex: i, contactIndex: j, distance: distance});
				}
			}
		},
		updatePhysics(deltaTime) {
			this.physics_world.stepSimulation( deltaTime, 10 );

			// Update rigid bodies
			for ( let i = 0, il = this.rigidBodies.length; i < il; i ++ ) {

				const objThree = this.rigidBodies[ i ];
				const objPhys = objThree.userData.physicsBody;
				const ms = objPhys.getMotionState();

				if ( ms ) {

					ms.getWorldTransform( this.transformAux1 );
					const p = this.transformAux1.getOrigin();
					const q = this.transformAux1.getRotation();
					objThree.position.set( p.x(), p.y(), p.z() );
					objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

					objThree.userData.collided = false;

				}

			}
			this.detectCollision()
		},
		createRigidBody( object, physicsShape, mass, pos, quat, vel, angVel ) {

			if ( pos ) {

				object.position.copy( pos );

			} else {

				pos = object.position;

			}

			if ( quat ) {

				object.quaternion.copy( quat );

			} else {

				quat = object.quaternion;

			}

			const transform = new Ammo.btTransform();
			transform.setIdentity();
			transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
			transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
			const motionState = new Ammo.btDefaultMotionState( transform );

			const localInertia = new Ammo.btVector3( 0, 0, 0 );
			physicsShape.calculateLocalInertia( mass, localInertia );

			const rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
			const body = new Ammo.btRigidBody( rbInfo );

			body.setFriction( 0.5 );

			if ( vel ) {

				body.setLinearVelocity( new Ammo.btVector3( vel.x, vel.y, vel.z ) );

			}

			if ( angVel ) {

				body.setAngularVelocity( new Ammo.btVector3( angVel.x, angVel.y, angVel.z ) );

			}

			object.userData.physicsBody = body;
			object.userData.collided = false;

			this.scene.add( object );

			if ( mass > 0 ) {

				this.rigidBodies.push( object );

				// Disable deactivation
				body.setActivationState( 4 );

			}

			this.physics_world.addRigidBody( body );

			return body;

		}

	},
	computed: {

	},
	created(){ 
		CameraControls.install( { THREE: THREE } );
	},
 	async mounted() {
        window.addEventListener( 'resize', this.onWindowResize, false );

		this.container = this.$refs.container
		this.init();
		this.animate();
		setTimeout(() => {this.loading = false}, 5000)
  	},
}

</script>

<style scoped>
#three_container {
	position:absolute;
	top:0;
    height:100vh;
    width:100%;
}
.dartboard {
    background-image: url('/assets/dartboard.png');
    border-radius: 50%;
    height:451px;
    width:451px;
    border: solid black 1px;
     background-size: cover;
    /* background-color:black; */
}
</style>
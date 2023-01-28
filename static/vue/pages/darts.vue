<template>
    <div :style="this.game_status == 'running' ? {'cursor':'crosshair'}:{}">

		<el-button style="position:absolute; top:50px; right:50px; z-index:1000;" @click="$router.push('/')" >Return Home</el-button>
	<div class="starting_menu" v-if="this.game_status == 'not started'"> 
		<h1>Darts.io</h1>
		<p>Instructions:</p>
		<ol>
			<!-- <div>Icon made from <a href="http://www.onlinewebfonts.com/icon">Icon Fonts</a> is licensed by CC BY 3.0</div> -->

			<li>Click and hold to charge dart.</li>
			<li>Release to throw the dart.</li>
			<li>If you hold too long you will lose accuracy.</li>
		</ol>
		<button @click="start_game" class="start_btn">Start New Game</button>
	</div>

	<!-- <div class="" v-if="this.game_status == 'results'">  -->
		<button v-if="this.game_status == 'results'" @click="start_game" class="restart_btn">New Game</button>
	<!-- </div> -->

	<div style="position:absolute; top:0; left:25px; z-index:1000; text-shadow: white 1px 1px;">
		<h1>Score: {{total_points}}</h1>
	</div>

	<div style="position:absolute; bottom:0; left:25px; z-index:1000;">
		<h1>
			<img v-for="dart in dart_array" :key="dart" src="/assets/dart.png" alt="" style="height:30px;">
		</h1>
	</div>


	<div class="overlay" v-if="this.game_status != 'running'"></div>
        <div style="position:relative; height:100vh;" >
            <div ref="container" id="three_container" ></div>
            <div ref="powering_up" style="width:100px; height: 25px; position:absolute; ">
                <div :style="{'width': (power -1) + 'px'}" style="background-color:red; height: 25px;"></div>
            </div>
        </div>
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
			game_status:'not started',
			container: null,
			camera: null,
			scene: null,
			renderer: null,
			renderer2: null,
			controls: null,
			line: null,
			zoom_object: null,
            darts: 0,
			physics_world: null,
			rigidBodies: [],
			transformAux1: null,
			power: 1,
            dartboard: null,
			dart_meshes: [],
			dart: null,
			dart_body: null,
			ground: null,
			mouse_lifted: false,
			mouseCoords: new THREE.Vector2(),
			raycaster: new THREE.Raycaster(),
			ballMaterial: new THREE.MeshPhongMaterial( { color: 0xFFFF00 } ),
			pos: new THREE.Vector3(),
			quat: new THREE.Quaternion(),
			total_points: 0,
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
			this.camera.position.z=25

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
			// textureLoader.load( 'textures/grid.png', function ( texture ) {

			// 	texture.wrapS = THREE.RepeatWrapping;
			// 	texture.wrapT = THREE.RepeatWrapping;
			// 	texture.repeat.set( 40, 40 );
			// 	ground.material.map = texture;
			// 	ground.material.needsUpdate = true;

			// } );
            // this.zoom_object = this.dartboard
			this.controls.fitToBox(this.dartboard, true, { paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0 })


			that = this
			var collision_config = new Ammo.btDefaultCollisionConfiguration()
			var dispatcher = new Ammo.btCollisionDispatcher(collision_config)
			var overlapping_pair_cache = new Ammo.btDbvtBroadphase()
			var solver = new Ammo.btSequentialImpulseConstraintSolver()
			this.physics_world = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlapping_pair_cache, solver, collision_config)
			this.physics_world.setGravity(new Ammo.btVector3( 0, - 50, 0 ))
			this.transformAux1 = new Ammo.btTransform();

						// Ground

			this.pos.set( 0, 0, -5.1 );
			this.quat.set( 0, 0, 0, 1 );
			this.ground = this.createParalellepipedWithPhysics( 500, 500, 10, 0, this.pos, this.quat, new THREE.MeshPhongMaterial( { color: 0xFFFFFF } ) );
			// this.ground.receiveShadow = true;
		},
		start_game() {
			console.log('start game')
			window.addEventListener( 'pointerdown', this.charge_dart)
			// window.addEventListener( 'pointerup', this.throw_dart);
			window.addEventListener( 'mousemove', this.move_powering_up);
			this.total_points = 0
			this.darts = 3
			this.game_status = 'running'
			this.controls.setPosition(0,0,50, true)
			this.clear_darts()
			this.dart_meshes = []
		},
		finish_game() {
			window.removeEventListener( 'pointerdown', this.charge_dart)
			window.removeEventListener( 'pointerup', this.throw_dart);
			window.removeEventListener( 'mousemove', this.move_powering_up);
			this.game_status = 'results'
			this.zoom_to(this.dartboard)
		},
		move_powering_up(event) {
			this.$refs.powering_up.style.left = event.pageX + 'px'
			this.$refs.powering_up.style.top = (event.pageY - 25) + 'px'
		},
		clear_darts() {
			this.dart_meshes.forEach(child => {
				if (child.userData.is_dart = true) {
					this.scene.remove(child)
				}
			})
		},
		createParalellepipedWithPhysics( sx, sy, sz, mass, pos, quat, material ) {
            const margin = 0.05;
			const object = new THREE.Mesh( new THREE.BoxGeometry( sx, sy, sz, 1, 1, 1 ), material );
			const shape = new Ammo.btBoxShape( new Ammo.btVector3( sx * 0.5, sy * 0.5, sz * 0.5 ) );
			shape.setMargin( margin );

			return this.createRigidBody( object, shape, mass, pos, quat );
			// return object;
		},
        onWindowResize(){
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer2.setSize( window.innerWidth, window.innerHeight );
            this.renderer.setSize( window.innerWidth, window.innerHeight );
			// if (this.zoom_object != this.table) {
			// 	this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0 })
			// }
        },
		zoom_to(target) {
			this.hover = 'none'
			this.zoom_object = target
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 0, paddingRight: 0, paddingBottom: 0, paddingTop: 0 })
		},
		charge_dart() {
			
			if (this.game_status != 'running') {
				return
			}
			if (this.darts == 0) {
				return
			}
			window.addEventListener( 'pointerup', this.throw_dart);
			that = this
			increase_power = function() {
				that.power = that.power * 1.06
				if (that.mouse_lifted) {
					that.mouse_lifted = false
					return
				} else {
					if (that.power > 150) {
						return 
					} else {
						setTimeout(increase_power, 10)
					}
				}
			}
			increase_power()
		},
		build_dart_model() {
			const x = 0, y = 0;
			var dart = new THREE.Object3D()

			const geometry1 = new THREE.CylinderGeometry( 0.01, 0.01, 0.1, 32 );
			const material1 = new THREE.MeshBasicMaterial( {color: 0x000000} );
			const cylinder1 = new THREE.Mesh( geometry1, material1 );
			cylinder1.rotateX(-Math.PI/2)
			cylinder1.position.z = -0.45

			const geometry2 = new THREE.CylinderGeometry( 0.02, .2, 0.1, 32 );
			const material2 = new THREE.MeshBasicMaterial( {color: 0x888888} );
			const cylinder2 = new THREE.Mesh( geometry2, material2 );
			cylinder2.rotateX(-Math.PI/2)
			cylinder2.position.z = -0.375

			const geometry3 = new THREE.CylinderGeometry( .2, .2, 0.4, 32 );
			const material3 = new THREE.MeshBasicMaterial( {color: 0x888888} );
			const cylinder3 = new THREE.Mesh( geometry3, material3 );
			cylinder3.rotateX(-Math.PI/2)
			cylinder3.position.z = -0.25

			const geometry4 = new THREE.CylinderGeometry( 0.15, 0.05, 1.3, 32 );
			const material4 = new THREE.MeshBasicMaterial( {color: 0xff0000} );
			const cylinder4 = new THREE.Mesh( geometry4, material4 );
			cylinder4.rotateX(-Math.PI/2)
			cylinder4.position.z = 0.175

			dart.add(cylinder1)
			dart.add(cylinder2)
			dart.add(cylinder3)
			dart.add(cylinder4)

			// const heartShape = new THREE.Shape();
			// heartShape.moveTo( x + .1, y + .1 );
			// heartShape.bezierCurveTo( x + .1, y + .1, x + .08, y, x, y );
			// heartShape.bezierCurveTo( x - .12, y, x - .12, y + .14,x - .12, y + .14 );
			// heartShape.bezierCurveTo( x - .12, y + 0.22, x - .06, y + .308, x + .1, y + .38 );
			// heartShape.bezierCurveTo( x + .24, y + .308, x + .32, y + .22, x + .32, y + .14 );
			// heartShape.bezierCurveTo( x + 0.32, y + .14, x + 0.32, y, x + 0.2, y );
			// heartShape.bezierCurveTo( x + .14, y, x + .1, y + .1, x + .1, y + .1 );

			// const heartShape2 = new THREE.Shape();
			// heartShape2.moveTo( x + .1, y + .1 );
			// heartShape2.bezierCurveTo( x + .1, y + .1, x + .08, y, x, y );
			// heartShape2.bezierCurveTo( x - .12, y, x - .12, y + .14,x - .12, y + .14 );
			// heartShape2.bezierCurveTo( x - .12, y + 0.22, x - .06, y + .308, x + .1, y + .38 );
			// heartShape2.bezierCurveTo( x + .24, y + .308, x + .32, y + .22, x + .32, y + .14 );
			// heartShape2.bezierCurveTo( x + 0.32, y + .14, x + 0.32, y, x + 0.2, y );
			// heartShape2.bezierCurveTo( x + .14, y, x + .1, y + .1, x + .1, y + .1 );

			// var extrudeSettings = {
			// 	steps: 1,
			// 	depth: -.05,
			// 	bevelEnabled: false,
			// };
			
			// var geom = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
			// var geom2 = new THREE.ExtrudeGeometry(heartShape2, extrudeSettings);
			// // const geometry = new THREE.ShapeGeometry( heartShape );
			// // const geometry2 = new THREE.ShapeGeometry( heartShape );
			// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
			// const heart = new THREE.Mesh( geom, material ) ;
			// const heart2 = new THREE.Mesh( geom2, material ) ;

			// heart.rotateX(Math.PI/2)
			// heart.position.z = 0.5
			// heart2.rotateX(Math.PI/2)
			// heart2.rotateZ(Math.PI)
			// heart2.position.z = 0.5

			// mesh2.rotateZ(Math.PI/2)
			// dart.add( heart );
			// dart.add( heart2 );
			return dart
		},
		throw_dart(event) {
			window.removeEventListener( 'pointerdown', this.charge_dart)
			window.removeEventListener( 'pointerup', this.throw_dart);

			if (this.game_status != 'running') {
				return
			}
			if (this.darts == 0) {
				return
			}
			this.darts = this.darts - 1

            this.mouse_lifted = true
            this.mouseCoords.set(
                ( event.clientX / window.innerWidth ) * 2 - 1,
                - ( event.clientY / window.innerHeight ) * 2 + 1
            );

            this.raycaster.setFromCamera( this.mouseCoords, this.camera );

                // Creates a ball and throws it
            const ballMass = 100;
            const ballRadius = 1.0;
            const margin = 0.05;
            // const ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 14, 10 ), this.ballMaterial );
            const ball = this.build_dart_model()
			ball.castShadow = true;
            ball.receiveShadow = true;
            const ballShape = new Ammo.btSphereShape( ballRadius );
            ballShape.setMargin( margin );
            this.pos.copy( this.raycaster.ray.direction );
            this.pos.add( this.raycaster.ray.origin );
            this.quat.set( 0, 0, 0, 1 );
			this.dart = ball
			this.dart.userData.is_dart = true
			this.scene.add( this.dart );
			this.dart_meshes.push(this.dart)
            this.dart_body = this.createRigidBody( ball, ballShape, ballMass, this.pos, this.quat );
			// this.dart_body = ballBody
            this.pos.copy( this.raycaster.ray.direction );
			
            this.pos.multiplyScalar( this.power );
            var too_much_power = 0
            if (this.power > 100) {
                too_much_power =  ((this.power - 120) * (this.power - 120)) / 50
            }

            accuracy_x = (2*Math.random() - 1) * too_much_power
            accuracy_y = (2*Math.random() - 1) * too_much_power
            this.dart_body.setLinearVelocity( new Ammo.btVector3( this.pos.x + accuracy_x, this.pos.y + accuracy_y, this.pos.z ) );
            if (this.power > 150) {
                this.mouse_lifted = false
            }
            this.power = 1
			setTimeout( () => {
				if (this.darts == 0) {
					this.finish_game()
				}
				window.addEventListener( 'pointerdown', this.charge_dart)
				// window.addEventListener( 'pointerup', this.throw_dart);
			}, 1000)
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
					this.delete_rigid_body(this.dart_body.ptr)
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

			// this.scene.add( object );

			if ( mass > 0 ) {

				this.rigidBodies.push( object );

				// Disable deactivation
				body.setActivationState( 4 );

			}

			this.physics_world.addRigidBody( body );

			return body;

		},
		delete_rigid_body(ptr) {
			if (Math.sqrt((this.dart.position.x * this.dart.position.x) + (this.dart.position.y * this.dart.position.y)) < 8.28125) {
				if (this.dart_body) {
					this.physics_world.removeRigidBody(this.dart_body)
					this.evaluate_score(this.dart.position.x, this.dart.position.y)
				}
			}
		},
		evaluate_score(x, y) {
			console.log('evaluate_score')
			// solve for degrees

			var angle_degrees;
			if (x >= 0) {
				if (y >= 0) {
					// quadrant 1
					angle_degrees = Math.atan(Math.abs(y)/Math.abs(x)) * (180/Math.PI)
				} else {
					// quadrant 4
					angle_degrees = 360 - Math.atan(Math.abs(y)/Math.abs(x)) * (180/Math.PI)
				}
			} else {
				if (y >= 0) {
					// quadrant 2
					angle_degrees = 180 - Math.atan(Math.abs(y)/Math.abs(x)) * (180/Math.PI)
				} else {
					// quadrant 3
					angle_degrees = 180 + Math.atan(Math.abs(y)/Math.abs(x)) * (180/Math.PI)
				}
			}

			// solve for section
			sections = {
				1:6,
				2:13,
				3:4,
				4:18,
				5:1,
				6:20,
				7:5,
				8:12,
				9:9,
				10:14,
				11:11,
				12:8,
				13:16,
				14:7,
				15:19,
				16:3,
				17:17,
				18:2,
				19:15,
				20:10,
				21:6
			}
			section = Math.floor((angle_degrees + 9)/18 + 1)
			score = sections[section]

			var hypotenuse = Math.sqrt((x * x) + (y * y))
			var additional_points;
			if (hypotenuse > 8.28125) {
				additional_points = 0
				console.log('Fail')
			} else if (hypotenuse > 7.734375) {
				// double ring
				additional_points = score * 2
				console.log('double ring')
			} else if (hypotenuse > 5.1171875) {
				//single ring outer
				additional_points = score
				console.log('single ring outer')
			} else if (hypotenuse > 4.5703125) {
				//triple ring
				additional_points = score * 3
				console.log('triple ring')
			} else if (hypotenuse > 0.9765625) {
				//single ring inner
				additional_points = score
				console.log('single ring inner')
			} else if (hypotenuse > 0.390625) {
				//bulleye outer
				additional_points = 25
				console.log('bulleye outer')
			} else {
				//bulleye inner
				additional_points = 50
				console.log('bulleye inner')
			}

			this.total_points = this.total_points + additional_points


		}
	},
	computed: {
		dart_array() {
			array = []
			for (let i = 0; i < this.darts; i++) {
				array.push(i)
			}
			return array
		}
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
.overlay {
	position:absolute;
	width:100vw;
	height:100vh;
	background-color:rgba(0, 0, 0, 0.0);
	z-index: 100;
}
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
.starting_menu {
	position:absolute; 
	top:50%; 
	left: 50%; 
	transform: translate(-50%, -50%);
	z-index:1000; 
	width:400px; 
	height:300px; 
	background-color:white;
	border-radius: 10px;
	padding:0 25px;
	border:outset;
}
.start_btn {
	width:90%;
	height:50px;
	position:absolute;
	bottom:25px;
	left: 25px;
	right:25px;
	background-color:white;
	border-radius: 5px;
}
.start_btn:hover {
	background-color:rgb(245, 245, 245);
}
.start_btn:active {
	background-color:rgb(235, 235, 235);
}
.restart_btn {
	width:200px;
	height:50px;
	position:absolute;
	bottom:25px;
	right: 25px;
	background-color:white;
	border-radius: 5px;
	z-index: 1000;
}
.restart_btn:hover {
	background-color:rgb(245, 245, 245);
}
.restart_btn:active {
	background-color:rgb(235, 235, 235);
}
</style>
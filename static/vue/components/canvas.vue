<template>
<div style="cursor:crosshair;">
	<!-- <div style="z-index: 10000;" v-loading.fullscreen.lock="loading"></div> -->

	<div style="position:relative; height:100vh;" >
		<div ref="container" id="three_container" ></div>

		<el-button style="position:absolute; top:50px; right:50px;" @click="zoom_to(bulletin_board)" v-if="zoom_object != bulletin_board && zoom_object != table">Zoom Out</el-button>
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

	<div v-show="false">

		<!-- nametag -->
		<div ref="myname">
			<div class="myname">Sam Thomas</div>
		</div>

		<!-- photos -->
		<div ref="image_1" @mouseenter="hover = 'photos'" @mouseleave="hover = 'none'" @click="zoom_to(photo_box)">
			<div style="width:500px; height;400px; background-color:white; box-shadow: -1px 0px 30px -10px black;" >
				<img src="/assets/wedding_website.jpg" width="480px;" style="margin-top:10px; margin-left:10px;" alt="">
				<div style="font-size:25px; padding:25px;">Angela and I were married in Wingdale NY on 09/05/2020.</div>
			</div>
		</div>

		<div ref="image_2" @mouseenter="hover = 'photos'" @mouseleave="hover = 'none'" @click="zoom_to(photo_box)">
			<div style="width:500px; height;400px; background-color:white; box-shadow: -1px 0px 30px -10px black;">
				<img src="/assets/manson_website.jpg" width="480px;" style="margin-top:10px; margin-left:10px;" alt="">
				<div style="font-size:25px; padding:25px;">My home town of Manson Washington. population: 1,535. stoplights: 0.</div>
			</div>
		</div>

		<div ref="image_3" @mouseenter="hover = 'photos'" @mouseleave="hover = 'none'" @click="zoom_to(photo_box)">
			<div style="width:500px; height;400px; background-color:white; box-shadow: -1px 0px 30px -10px black;">
				<img src="/assets/phoenix_website.jpg" width="480px;" style="margin-top:10px; margin-left:10px;" alt="">
				<div style="font-size:25px; padding:25px;">The BotFactory R&D team ready to ship our most advanced PCB printer yet.</div>
			</div>
		</div>
		

		<!-- sticky notes -->
		<div ref="sticky_note1" class="sticky_note"  style="background-color: #ece735; " @mouseenter="hover = 'blog'" @mouseleave="hover = 'none'" @click="open_link_in_new_tab('http://calm-cove-00851.herokuapp.com')">
			<img src="/assets/blog.png" alt="" class="sticky_note_drawing">
		</div>

		<div ref="sticky_note2" class="sticky_note"  style="background-color: #e45499; " >

		</div>

		<div ref="sticky_note3" class="sticky_note" style="background-color: #ec9b54; " >

		</div>

		<div ref="sticky_note4" class="sticky_note" style="background-color: #ec9b54; " @mouseenter="hover = 'synth'" @mouseleave="hover = 'none'" @click="open_link('/synth')">
			<img src="/assets/synth.png" alt="" class="sticky_note_drawing">
		</div>

		<div ref="sticky_note5" class="sticky_note" style="background-color: #58caee;" @mouseenter="hover = 'tictactoe'" @mouseleave="hover = 'none'" @click="open_link('/tictactoe')">
			<img src="/assets/tictactoe.png" alt="" class="sticky_note_drawing">
		</div>

		<div ref="sticky_note6" class="sticky_note" style="background-color: #58caee;" @mouseenter="hover = 'darts'" @mouseleave="hover = 'none'" @click="$router.push('/darts')">
			<img src="/assets/darts.png" alt="" class="sticky_note_drawing">
		</div>

		<!-- fieldsets for when i hover over something -->
		<div ref="resume_fieldset">
			<fieldset style="width:1100px; height:1450px; " v-if="hover == 'resume' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Resume</legend>
			</fieldset>
		</div>

		<div ref="photo_fieldset">
			<fieldset style="width:1200px; height:1000px; pointer-events:none;" v-if="hover == 'photos' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Photos</legend>
			</fieldset>
		</div>

		<div ref="tictactoe_fieldset">
			<fieldset style="width:450px; height:500px; " v-if="hover == 'tictactoe' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Tic Tac Toe</legend>
			</fieldset>
		</div>

		<div ref="blog_fieldset">
			<fieldset style="width:550px; height:600px; pointer-events:none;" v-if="hover == 'blog' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Music Blog</legend>
			</fieldset>
		</div>

		<div ref="synth_fieldset">
			<fieldset style="width:450px; height:500px; " v-if="hover == 'synth' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Mini Synth</legend>
			</fieldset>
		</div>

		<div ref="darts_fieldset">
			<fieldset style="width:450px; height:500px; " v-if="hover == 'darts' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Darts Game</legend>
			</fieldset>
		</div>

		<!-- resume -->
		<div ref="resume"  class="resume_container" style=" font-size: 1.2em; width:1000px; height:1250px; box-shadow: -1px 0px 30px -10px black;" @click="zoom_to(resume)" @mouseenter="hover = 'resume'" @mouseleave="hover = 'none'">
			<div class="row">
			<div style="text-align:left;">
				<div style="font-size: 2em;"><b>Sam Thomas:</b> Software Developer</div>
			</div>
			<div style="text-align:left; position:absolute; top:30px; right:50px">
			<br><b>Info</b><br>
				<span>Queens, New York</span><br>
				<span>(509) 670-8432</span><br>
				<span>thomasam000@gmail.com</span>
				
			</div>
			<br>
			<div style="text-align:left;">
				<b>SUMMARY</b>
				<p>Software Developer and passionate creator with experience in creating full stack applications using Java, the Spring Framework, MySQL databases, MVC architecture, JavaScript. Python and. Seeking a position as an entry level Back-End Developer and ready to start my future career as a Software Developer.</p>
			</div>
			<div style="text-align:left; left:50px; width:60%; top: 16%;"  >

				<h4>Experience</h4>
				<hr>
				<p>SOFTWARE DEVELOPER - BotFactory <br>Feb 2020 - Present</p>
				<ul>
				<li>Created a new implementation of the User interface using the Vue Framework and ThreeJS.   </li>
				<li>Conducted one-on-one interviews and customer onboarding to research and improve the UI/UX.</li>
				<li>Participated in regular SCRUM meetings with the R&D (research and development) team.</li>
				<li>Contributed in redesigning a python software architecture and migrating the codebase from python 2 to 3.</li>
				<li>Fixed bugs, added features and wrote tests for the software of PCB printers.</li>
				<li>Worked with the team to redesign the python software architecture and migrate the existing codebase from python 2 to 3.</li>
				</ul>
				<p>ODOO DEVELOPER/INTERN - BotFactory <br>Feb 2020 - Aug 2020</p>
				<ul>
				<li>Created a blog and web page versioning tool, to keep track and restore previous iterations of web pages and blog posts.</li>
				<li>Improved customer support and sales experience by implementing email automation, and email tracking with webhooks.</li>
				<li>Took a major role in Managing the ERP, CMS, and CRM of the company.</li>
				<li>Created reusable components using the qweb framework to be used in the Botfactory website using responsive design.</li>
				</ul>
				<p>SOFTWARE TUTOR - Self-Employed <br>October 2019 - July 2020</p>
				<ul>
				<li>Taught Beginner-intermediate Piano Lessons and managed the curriculum, finances and the lesson schedule for up to 15 students at a time, ranging from young children to adults, in both English and Spanish. </li>
				<li>Soft skills used: Teaching skills, self-motivation, advertising, organization, finances, and time management.</li>
				</ul>
				<p>PIANO INSTRUCTOR - Self-Employed <br>May 2018 - July 2020</p>
				<ul>
				<li>Taught Beginner-intermediate Piano Lessons and managed the curriculum, finances and the lesson schedule for up to 15 students at a time, ranging from young children to adults, in both English and Spanish. </li>
				<li>Soft skills used: Teaching skills, self-motivation, advertising, organization, finances, and time management.</li>
				</ul>
			</div>
			<div style="position:absolute; right:50px; width:30%; top: 16%;">
				<br>
				<div style="text-align:left;"><h4>Skills</h4></div>
				<hr>
				<div class="container">
				<div class="row">
					<div class="col-6 col-md-4 skill">Front End Web Dev (Vue)<br>● ● ● ● ●<br></div>
					<div class="col-6 col-md-4 skill">Fullstack Web App Dev with Spring Web MVC<br>● ● ● ● ●<br></div>
					<div class="col-6 col-md-4 skill">HTML, CSS, JavaScript, with Responsive Design<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-4 skill">Test-driven Development<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-4 skill">Version Control System (GitHub)<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-4 skill">Data Structures<br>● ● ● ⚬ ⚬ <br></div>
				</div>
				</div>

				<br>
				<div style="text-align:left;"><h4>Languages</h4></div>
				<hr>
				<div class="container">
				<div class="row">
					<div class="col-6 col-md-3 skill">JavaScript<br>● ● ● ● ●</div>
					<div class="col-6 col-md-3 skill">HTML/CSS<br>● ● ● ● ●<br></div>
					<div class="col-6 col-md-3 skill">Python<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-3 skill">MySQL/MongoDB<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-3 skill">Java<br>● ● ● ⚬ ⚬<br></div>
				</div>
				</div>
				<br>
				<h4>Education</h4>
				<hr>
				<div>Vue School - Vue.js certification<br>March 2022 - July 2022</div>
				<br>
				<div>THE SOFTWARE GUILD - Full Stack Java Boot Camp<br>March 2019 – November 2019</div>
				<br>
				<div>College Credits: 46<br>BRIGHAM YOUNG UNIVERSITY– GPA 3.94<br>January 2018 – May 2018</div>
			</div>

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
			// fbxloader: new THREE.fbxloader(),
			loading: true,
			container: null,
			contours: null,
			camera: null,
			scene: null,
			renderer: null,
			renderer2: null,
			controls: null,
			bulletin_board: null,
			line: null,
			box: null,
			resume: null,
			table: null,
			photo_box: null,
			zoom_object: null,
			hover: 'none',
			physics_world: null,
			rigidBodies: [],
			transformAux1: null,
			power: 1,
			mouse_lifted: false,
			mouseCoords: new THREE.Vector2(),
			raycaster: new THREE.Raycaster(),
			ballMaterial: new THREE.MeshPhongMaterial( { color: 0x202020 } ),
			pos: new THREE.Vector3(),
			quat: new THREE.Quaternion(),
			light_switch:null,
			wall:null,
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
			this.camera.position.z=2000

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
			// var spotLight = new THREE.SpotLight( 0xffffff, 1.0);
			// spotLight.position.set( 0, 0, 0 );

			// spotLight.castShadow = true;

			// spotLight.shadow.mapSize.width = 1024;
			// spotLight.shadow.mapSize.height = 1024;

			// spotLight.shadow.camera.near = 500;
			// spotLight.shadow.camera.far = 4000;
			// spotLight.shadow.camera.fov = 30;			
			
			directionlight.position.set(-500, 0, 1000)
			directionlight2.position.set(0, 10000, 2000)
			

			this.scene.add( ambientlight );
			this.scene.add( directionlight );
			this.scene.add( directionlight2 );
			// this.scene.add( spotLight );

			// initialize bulletin board
			var geometry = new THREE.PlaneGeometry( 3600, 2400 );
			var textureLoader = new THREE.TextureLoader();
			const texMap = textureLoader.load("/assets/board_new.png"); 
			var material = new THREE.MeshPhongMaterial( {map: texMap} );
			material.transparent = true
			this.bulletin_board = new THREE.Mesh( geometry, material );
			this.scene.add( this.bulletin_board );


			var geometry = new THREE.PlaneGeometry( 10000, 10000 );
			var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
			this.wall = new THREE.Mesh( geometry, material );
			this.scene.add( this.wall );

			//initialize resume
			var geometry = new THREE.PlaneGeometry( 1000, 1250 );
			var material = new THREE.MeshPhongMaterial( {transparent: true, opacity:0} );
			resume_box = new THREE.Mesh( geometry, material );
			resume_box.position.x = -1000
			resume_box.position.y = -350
			this.resume = resume_box
			this.scene.add(resume_box)

			var resume_fieldset_div = this.$refs.resume_fieldset
			const resumeFieldSet = new THREE.CSS3DObject( resume_fieldset_div );
			resumeFieldSet.position.x = -1000
			resumeFieldSet.position.y = -330
			resumeFieldSet.position.z = 1
			resumeFieldSet.rotation.z = -0.01
			this.scene.add(resumeFieldSet)

			var resume_div = this.$refs.resume
			const resumeObject = new THREE.CSS3DObject( resume_div );
			resumeObject.position.x = -1000
			resumeObject.position.y = -350
			resumeObject.position.z = 1
			resumeObject.rotation.z = -0.01
			this.scene.add(resumeObject)


			//initialize my name tag
			var myname = this.$refs.myname
			const myname_obj = new THREE.CSS3DObject( myname );
			myname_obj.position.x = -100
			myname_obj.position.y = 800
			myname_obj.position.z = 2
			myname_obj.rotation.z = 0
			this.scene.add(myname_obj)

			//initialize photos
			var photos_fieldset_div = this.$refs.photo_fieldset
			const photoFieldSet = new THREE.CSS3DObject( photos_fieldset_div );
			photoFieldSet.position.x = 950
			photoFieldSet.position.y = -150
			photoFieldSet.position.z = 1
			this.scene.add(photoFieldSet)

			var photo_1 = this.$refs.image_1
			const photo_1_obj = new THREE.CSS3DObject( photo_1 );
			photo_1_obj.position.x = 1250
			photo_1_obj.position.y = 0
			photo_1_obj.position.z = 1
			photo_1_obj.rotation.z = -0.2
			this.scene.add(photo_1_obj)

			var photo_2 = this.$refs.image_2
			const photo_2_obj = new THREE.CSS3DObject( photo_2 );
			photo_2_obj.position.x = 650
			photo_2_obj.position.y = 50
			photo_2_obj.position.z = 2
			photo_2_obj.rotation.z = 0.2
			this.scene.add(photo_2_obj)

			var photo_3 = this.$refs.image_3
			const photo_3_obj = new THREE.CSS3DObject( photo_3 );
			photo_3_obj.position.x = 850
			photo_3_obj.position.y = -425
			photo_3_obj.position.z = 2
			photo_3_obj.rotation.z = -0.03
			this.scene.add(photo_3_obj)

			var geometry = new THREE.PlaneGeometry( 1100, 900 );
			var material = new THREE.MeshPhongMaterial( {transparent: true, opacity:0} );
			photos_box = new THREE.Mesh( geometry, material );
			photos_box.position.x = 950
			photos_box.position.y = -150
			photos_box.position.z = -10
			this.photo_box = photos_box
			this.scene.add(photos_box)

			// initialize sticky notes
			var tictactoe_fieldset_div = this.$refs.tictactoe_fieldset
			const TicTacToeFieldSet = new THREE.CSS3DObject( tictactoe_fieldset_div );
			TicTacToeFieldSet.position.x = 1400
			TicTacToeFieldSet.position.y = -950
			TicTacToeFieldSet.position.z = 1
			TicTacToeFieldSet.rotation.z = 0.1
			this.scene.add(TicTacToeFieldSet)

			var blog_fieldset_div = this.$refs.blog_fieldset
			const blogFieldSet = new THREE.CSS3DObject( blog_fieldset_div );
			blogFieldSet.position.x = -10
			blogFieldSet.position.y = -550
			blogFieldSet.position.z = 1
			this.scene.add(blogFieldSet)

			var synth_fieldset_div = this.$refs.synth_fieldset
			const synthFieldSet = new THREE.CSS3DObject( synth_fieldset_div );
			synthFieldSet.position.x = 1200
			synthFieldSet.position.y = 600
			synthFieldSet.position.z = 1
			synthFieldSet.rotation.z = -0.1
			this.scene.add(synthFieldSet)

			var darts_fieldset_div = this.$refs.darts_fieldset
			const darts_fieldset = new THREE.CSS3DObject( darts_fieldset_div );
			darts_fieldset.position.x = 0
			darts_fieldset.position.y = 0
			darts_fieldset.position.z = 2
			darts_fieldset.rotation.z = 0.05
			this.scene.add(darts_fieldset)

			

			var sticky_note = this.$refs.sticky_note1
			var sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 0
			sticky_note_obj.position.y = -600
			sticky_note_obj.position.z = 10
			this.scene.add(sticky_note_obj)

			sticky_note = this.$refs.sticky_note2
			sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 50
			sticky_note_obj.position.y = -555
			sticky_note_obj.position.z = 2
			sticky_note_obj.rotation.z = 0.12
			this.scene.add(sticky_note_obj)

			sticky_note = this.$refs.sticky_note3
			sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = -75
			sticky_note_obj.position.y = -575
			sticky_note_obj.position.z = 2
			sticky_note_obj.rotation.z = -0.1
			this.scene.add(sticky_note_obj)

			sticky_note = this.$refs.sticky_note4
			sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 1200
			sticky_note_obj.position.y = 600
			sticky_note_obj.position.z = 2
			sticky_note_obj.rotation.z = -0.1
			this.scene.add(sticky_note_obj)

			sticky_note = this.$refs.sticky_note5
			sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 1400
			sticky_note_obj.position.y = -950
			sticky_note_obj.position.z = 2
			sticky_note_obj.rotation.z = 0.1
			this.scene.add(sticky_note_obj)

			sticky_note = this.$refs.sticky_note6
			sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 0
			sticky_note_obj.position.y = 0
			sticky_note_obj.position.z = 2
			sticky_note_obj.rotation.z = 0.05
			this.scene.add(sticky_note_obj)

			// initialize push pins
			this.thumbtacks.forEach(obj => {
				var element = document.createElement('div');
				element.style.width = '30px';
				element.style.height = '30px';
				element.classList.add('shiny')
				element.style['border-radius'] = '50%';
				var object = new THREE.CSS3DObject(element);
				object.position.x = obj.x
				object.position.y = obj.y
				object.position.z = 5
				this.scene.add(object)
			})

			// initialize table
			var table_geometry = new THREE.BoxGeometry(5000, 100, 2000, 10, 10, 10)
			const texMaptable = textureLoader.load("/assets/desk.png"); 
			var table_material = new THREE.MeshPhongMaterial( {map: texMaptable} );
			this.table = new THREE.Mesh( table_geometry, table_material );
			this.table.position.y = -1500
			this.table.position.z = 1000
			this.scene.add(this.table)

			// const light_switch_geometry = this.createBoxWithRoundedEdges(400, 600, 40, 20, 20)
			// var light_switch_material = new THREE.MeshPhongMaterial( {color: 0xeeeedf} );
			// this.light_switch = new THREE.Mesh( light_switch_geometry, light_switch_material );
			// this.light_switch.position.x = -2250
			// this.light_switch.position.y = -750
			// this.scene.add(this.light_switch)



			// zoom to fit on load
			this.zoom_object = this.bulletin_board
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 })
			

			// old code for pushpins that i liked better
			// this.thumbtacks.forEach(obj => {
			// 	var tackObject = new THREE.Object3D()
			// 	var tackmaterial = new THREE.MeshPhongMaterial( {color: obj.color} );

			// 	var geometrybody = new THREE.CylinderGeometry( 7, 7, 30, 32 );
			// 	var body = new THREE.Mesh( geometrybody, tackmaterial );
			// 	body.position.y = 15

			// 	var geometrytop = new THREE.CylinderGeometry( 10, 7, 5, 32 );
			// 	var top = new THREE.Mesh( geometrytop, tackmaterial );	
			// 	top.position.y = 27.5

			// 	var geometry = new THREE.SphereGeometry( 15, 32, 16, 0, Math.PI,);
			// 	var semisphere = new THREE.Mesh( geometry, tackmaterial );
			// 	semisphere.rotation.x = -Math.PI/2
			// 	semisphere.position.y = -10

			// 	tackObject.add(body)
			// 	tackObject.add(top)
			// 	tackObject.add(semisphere)

			// 	tackObject.rotation.x = Math.PI/2

			// 	tackObject.position.x = obj.x
			// 	tackObject.position.y = obj.y
			// 	tackObject.position.z = 10
			// 	tackObject.castShadow = true
	
			// 	this.scene.add(tackObject)
			// 	// const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
			// 	// const material = new THREE.MeshBasicMaterial( {color: obj.color} );
			// 	// const body = new THREE.Mesh( geometry, material );		

			// })
			// console.log(Ammo)
			// that = this
			// var temp_transform = new Ammo.btTransform()
			// var collision_config = new Ammo.btDefaultCollisionConfiguration()
			// var dispatcher = new Ammo.btCollisionDispatcher(collision_config)
			// var overlapping_pair_cache = new Ammo.btDbvtBroadphase()
			// var solver = new Ammo.btSequentialImpulseConstraintSolver()
			// this.physics_world = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlapping_pair_cache, solver, collision_config)
			// this.physics_world.setGravity(new Ammo.btVector3( 0, - 9.8, 0 ))
			// this.transformAux1 = new Ammo.btTransform();
			// window.addEventListener( 'pointerdown', this.charge_dart)

			// window.addEventListener( 'pointerup', function ( event ) {
			// 	that.mouse_lifted = true
			// 	that.mouseCoords.set(
			// 		( event.clientX / window.innerWidth ) * 2 - 1,
			// 		- ( event.clientY / window.innerHeight ) * 2 + 1
			// 	);

			// 	that.raycaster.setFromCamera( that.mouseCoords, that.camera );

			// 		// Creates a ball and throws it
			// 	const ballMass = 100;
			// 	const ballRadius = 0.4;
			// 	const margin = 0.05;
			// 	const ball = new THREE.Mesh( new THREE.SphereGeometry( ballRadius, 14, 10 ), that.ballMaterial );
			// 	ball.castShadow = true;
			// 	ball.receiveShadow = true;
			// 	const ballShape = new Ammo.btSphereShape( ballRadius );
			// 	ballShape.setMargin( margin );
			// 	that.pos.copy( that.raycaster.ray.direction );
			// 	that.pos.add( that.raycaster.ray.origin );
			// 	that.quat.set( 0, 0, 0, 1 );
			// 	const ballBody = that.createRigidBody( ball, ballShape, ballMass, that.pos, that.quat );

			// 	that.pos.copy( that.raycaster.ray.direction );
			// 	console.log(that.power)
			// 	that.pos.multiplyScalar( that.power );
			// 	var too_much_power = 0
			// 	if (that.power > 80) {
			// 		too_much_power =  ((that.power - 80) * (that.power - 80)) / 100
			// 	}
			// 	accuracy_x = (2*Math.random() - 1) * too_much_power
			// 	accuracy_y = (2*Math.random() - 1) * too_much_power
			// 	ballBody.setLinearVelocity( new Ammo.btVector3( that.pos.x + accuracy_x, that.pos.y + accuracy_y, that.pos.z ) );
			// 	if (that.power > 100) {
			// 		that.mouse_lifted = false
			// 	}
			// 	that.power = 1
			// 	// that.mouse_lifted = false

			// } );
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
		onMouseMove() {

		},
		zoom_to(target) {
			this.hover = 'none'
			this.zoom_object = target
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 })
		},
		open_link_in_new_tab(url){
			window.open(url, '_blank');
		},
		open_link(url) {
			window.location = url;
		},
		move_to_table() {
			this.zoom_object = this.table
			this.controls.setLookAt(0, 1000,  1000,  0, 0, 1000, true)
		},
		move_to_bulletin() {
			this.zoom_object = this.bulletin_board
			this.controls.setLookAt(this.camera.position.x, 0, 1000,  0, 0, 0, true)
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 50, paddingRight: 50, paddingBottom: 50, paddingTop: 50 })
		},
		createBoxWithRoundedEdges( width, height, depth, radius0, smoothness ) {
			let shape = new THREE.Shape();
			let eps = 0.00001;
			let radius = radius0 - eps;
			shape.absarc( eps, eps, eps, -Math.PI / 2, -Math.PI, true );
			shape.absarc( eps, height -  radius * 2, eps, Math.PI, Math.PI / 2, true );
			shape.absarc( width - radius * 2, height -  radius * 2, eps, Math.PI / 2, 0, true );
			shape.absarc( width - radius * 2, eps, eps, 0, -Math.PI / 2, true );
			let geometry = new THREE.ExtrudeBufferGeometry( shape, {
				amount: depth - radius0 * 2,
				bevelEnabled: true,
				bevelSegments: smoothness * 2,
				steps: 1,
				bevelSize: radius,
				bevelThickness: radius0,
				curveSegments: smoothness
			});
  
		geometry.center();
		
		return geometry;
		},
		// charge_dart() {
		// 	that = this
		// 	increase_power = function() {
		// 		that.power = that.power * 1.05
		// 		if (that.mouse_lifted) {
		// 			that.mouse_lifted = false
		// 			return
		// 		} else {
		// 			if (that.power > 100) {
		// 				return 
		// 			} else {
		// 				setTimeout(increase_power, 10)
		// 			}
		// 		}
		// 	}
		// 	increase_power()
		// },
		// throw_dart() {

		// },
		animate: function() {
			const delta = this.clock.getDelta();
			this.controls.update( delta );
            this.renderer.render( this.scene, this.camera );
            this.renderer2.render( this.scene, this.camera );
			// this.updatePhysics( delta );
			requestAnimationFrame( this.animate );
		},
		// detectCollision(){

		// 	let dispatcher = this.physics_world.getDispatcher();
		// 	let numManifolds = dispatcher.getNumManifolds();

		// 	for ( let i = 0; i < numManifolds; i ++ ) {

		// 		let contactManifold = dispatcher.getManifoldByIndexInternal( i );
		// 		let numContacts = contactManifold.getNumContacts();

		// 		for ( let j = 0; j < numContacts; j++ ) {

		// 			let contactPoint = contactManifold.getContactPoint( j );
		// 			let distance = contactPoint.getDistance();
		// 			console.log({manifoldIndex: i, contactIndex: j, distance: distance});
		// 		}
		// 	}
		// },
		// updatePhysics(deltaTime) {
		// 	this.physics_world.stepSimulation( deltaTime, 10 );

		// 	// Update rigid bodies
		// 	for ( let i = 0, il = this.rigidBodies.length; i < il; i ++ ) {

		// 		const objThree = this.rigidBodies[ i ];
		// 		const objPhys = objThree.userData.physicsBody;
		// 		const ms = objPhys.getMotionState();

		// 		if ( ms ) {

		// 			ms.getWorldTransform( this.transformAux1 );
		// 			const p = this.transformAux1.getOrigin();
		// 			const q = this.transformAux1.getRotation();
		// 			objThree.position.set( p.x(), p.y(), p.z() );
		// 			objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );

		// 			objThree.userData.collided = false;

		// 		}

		// 	}
		// 	this.detectCollision()
		// },
	// 	createRigidBody( object, physicsShape, mass, pos, quat, vel, angVel ) {

	// 		if ( pos ) {

	// 			object.position.copy( pos );

	// 		} else {

	// 			pos = object.position;

	// 		}

	// 		if ( quat ) {

	// 			object.quaternion.copy( quat );

	// 		} else {

	// 			quat = object.quaternion;

	// 		}

	// 		const transform = new Ammo.btTransform();
	// 		transform.setIdentity();
	// 		transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
	// 		transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
	// 		const motionState = new Ammo.btDefaultMotionState( transform );

	// 		const localInertia = new Ammo.btVector3( 0, 0, 0 );
	// 		physicsShape.calculateLocalInertia( mass, localInertia );

	// 		const rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, physicsShape, localInertia );
	// 		const body = new Ammo.btRigidBody( rbInfo );

	// 		body.setFriction( 0.5 );

	// 		if ( vel ) {

	// 			body.setLinearVelocity( new Ammo.btVector3( vel.x, vel.y, vel.z ) );

	// 		}

	// 		if ( angVel ) {

	// 			body.setAngularVelocity( new Ammo.btVector3( angVel.x, angVel.y, angVel.z ) );

	// 		}

	// 		object.userData.physicsBody = body;
	// 		object.userData.collided = false;

	// 		this.scene.add( object );

	// 		if ( mass > 0 ) {

	// 			this.rigidBodies.push( object );

	// 			// Disable deactivation
	// 			body.setActivationState( 4 );

	// 		}

	// 		this.physics_world.addRigidBody( body );

	// 		return body;

	// 	}

	},
	computed: {

	},
	created(){ 
		CameraControls.install( { THREE: THREE } );
	},
 	async mounted() {
        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'mousemove', this.onMouseMove, false );

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
	cursor:crosshair;
}
.resume_container {
	position:relative;
	background-color:white;
	padding:50px;
}
.sticky_note {
	width: 400px;
	height:400px;
	box-shadow: -1px 0px 30px -10px black;
}
.sticky_note_drawing {
	width:250px;
	height:250px;
	margin: 75px;
}
textarea {
	width: 400px;
	height:400px;
	/* background-color:#ece735; */
	border:none;
}
fieldset {
	border: solid white 10px;
	font-size: 75px;
	color:white;
}
legend {
  /* margin-left: 36%; */
  padding: 0 10px;
  position: relative;
  text-align: center;
  width: auto;
  font-weight: bold;
  }
.myname {
background: url('/assets/paper.png') ;
background-size:750px;
color: transparent;
-webkit-background-clip: text;
background-clip: text;
font-weight: bold;
font-size: 450px;
width:3000px;
/* box-shadow: -1px 0px 30px  black;; */
}
.shiny {
	background: radial-gradient( #aaaaaa , #888888, black );
	border:black solid 0.5px;
}
.bottom_nav {
	position:absolute; 
	bottom:0; 
	left:50%; 
	text-align:center;
	width:150px;
	height:50px;
	background-color: rgba(245, 245, 255, 0.7);
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	border: solid black 1px;
	transform: translate(-50%, 0);
}
.bottom_nav:hover {
	background-color: rgba(245, 245, 255, 0.9);
}
.top_nav {
	position:absolute; 
	top:0; 
	left:50%; 
	text-align:center;
	width:150px;
	height:50px;
	background-color: rgba(245, 245, 255, 0.7);
	border-bottom-left-radius: 10px;
	border-bottom-right-radius: 10px;
	border: solid black 1px;
	transform: translate(-50%, 0);
}

.arrow {
	border: solid black;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
}

.right {
	transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg);
}

.left {
	transform: rotate(135deg);
	-webkit-transform: rotate(135deg);
}

.up {
	transform: rotate(-135deg);
	-webkit-transform: rotate(-135deg);
}

.down {
	transform: rotate(45deg);
	-webkit-transform: rotate(45deg);
} 

</style>
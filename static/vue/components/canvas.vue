<template>
<div>
	<div style="position:relative; height:100vh;">
		<div ref="container" id="three_container">

		</div>
		<!-- <i class="fa fa-times" style="position:absolute; top:50px; right:50px; color:black;" @click="zoom_out" v-if="zoom_object != bulletin_board"></i> -->
		
		<button style="position:absolute; top:50px; right:50px;" @click="zoom_out" v-if="zoom_object != bulletin_board && zoom_object != table">Close X</button>
		<div style="" class="bottom_nav" @click="move_to_table" v-if="zoom_object == bulletin_board">
			<div>Projects</div>
			<div><i class="arrow down"></i></div>
		</div>
		<div style="" class="top_nav" @click="move_to_bulletin" v-if="zoom_object == table">
			<div><i class="arrow up"></i></div>
			<div>Home</div>
		</div>
		

		<!-- <button style="position:absolute; left:10px; bottom:10px; background-color:#195EAA; color:white; height: 30px; width: 100px; border-radius: 5px; border:none;" @click="reset_view"> <i class="fa fa-refresh" aria-hidden="true"></i> reset view </button> -->
	</div>

	<div v-show="false">

		<div ref="myname">
			<div class="myname">Sam Thomas</div>
		</div>

		<div ref="image_1" @mouseenter="hover = 'photos'" @mouseleave="hover = 'none'" @click="zoom_into_photos">
			<div style="width:500px; height;400px; background-color:white; box-shadow: -1px 0px 30px -10px black;" >
				<img src="/assets/wedding_website.jpg" width="480px;" style="margin-top:10px; margin-left:10px;" alt="">
				<div style="font-size:25px; padding:25px;">Angela and I were married in Pawling NY on 09/05/2022.</div>
			</div>
		</div>

		<div ref="image_2" @mouseenter="hover = 'photos'" @mouseleave="hover = 'none'" @click="zoom_into_photos">
			<div style="width:500px; height;400px; background-color:white; box-shadow: -1px 0px 30px -10px black;">
				<img src="/assets/manson_website.jpg" width="480px;" style="margin-top:10px; margin-left:10px;" alt="">
				<div style="font-size:25px; padding:25px;">My home town of Manson WA. population: 1,535. </div>
			</div>
		</div>

		<div ref="image_3" @mouseenter="hover = 'photos'" @mouseleave="hover = 'none'" @click="zoom_into_photos">
			<div style="width:500px; height;400px; background-color:white; box-shadow: -1px 0px 30px -10px black;">
				<img src="/assets/phoenix_website.jpg" width="480px;" style="margin-top:10px; margin-left:10px;" alt="">
				<div style="font-size:25px; padding:25px;">The BotFactory team ready to ship our most advanced PCB printer yet.</div>
			</div>
		</div>
		
		<div ref="sticky_note1" class="sticky_note" >
			<textarea name="" id="" cols="30" rows="10" disabled style="background-color: #ece735; box-shadow: -1px 0px 30px -10px black;"></textarea>
		</div>

		<div ref="sticky_note2" class="sticky_note" >
			<textarea name="" id="" cols="30" rows="10" disabled style="background-color: #e45499; box-shadow: -1px 0px 30px -10px black;"></textarea>
		</div>

		<div ref="sticky_note3" class="sticky_note"  >
			<textarea name="" id="" cols="30" rows="10" disabled style="background-color: #ec9b54; box-shadow: -1px 0px 30px -10px black;"></textarea>
		</div>

		<div ref="resume_fieldset">
			<fieldset style="width:900px; height:1200px; " v-if="hover == 'resume' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Resume</legend>
			</fieldset>
		</div>

		<div ref="photo_fieldset">
			<fieldset style="width:1200px; height:1000px; pointer-events:none;" v-if="hover == 'photos' && zoom_object == bulletin_board">
				<legend style="padding 50px 0;">Photos</legend>
			</fieldset>
		</div>

		<div ref="resume"  class="resume_container" style="width:875px; height:1100px; box-shadow: -1px 0px 30px -10px black;" @click="zoom_into_resume" @mouseenter="hover = 'resume'" @mouseleave="hover = 'none'">
			<div class="row">
				<!-- <div class="col-12">
					<a href="images/resume.jpg" download id="download">Download My Resume</a>
				</div> -->
			<div class="col-12 " style="text-align:left;">
				<div style="font-size: 2em;"><b>Sam Thomas:</b> Software Developer</div>
			</div>
			<div class="col-12 " style="text-align:left; position:absolute; top:10px; right:20px">
			<br><b>Info</b><br>
				<span>Queens, New York</span><br>
				<span>(509) 670-8432</span><br>
				<span>thomasam000@gmail.com</span>
				
			</div>
			<br>
			<div class="col-12" style="text-align:left;">
				<b>SUMMARY</b>
				<p>Software Developer and passionate creator with experience in creating full stack applications using Java, the Spring Framework, MySQL databases, MVC architecture, JavaScript. Python and. Seeking a position as an entry level Back-End Developer and ready to start my future career as a Software Developer.</p>
			</div>
			<div class="col-12" style="text-align:left; left:20px; width:60%;top: 14%;"  >

				<h4>Experience</h4>
				<hr>
				<p>SOFTWARE DEVELOPER - BotFactory <br>Feb 2020 - Present</p>
				<ul>
				<li>Created a new implementation of the User interface using the Vue Framework and ThreeJS.   </li>
				<li>Conducted one-on-one interviews and customer onboarding to research and improve the UI/UX.</li>
				<li>Participated in regular SCRUM meetings with the R&D (research and development) team.</li>
				<li>Contributed in redesigning a python software architecture and migrating the codebase from python 2 to 3.</li>
				<li>Fixed bugs, added features and wrote tests for the software of PCB printers.</li>
				</ul>
				<p>ODOO DEVELOPER/INTERN - BotFactory <br>Feb 2020 - Aug 2020</p>
				<ul>
				<li>Created a blog and web page versioning tool, to keep track and restore previous iterations of web pages and blog posts.</li>
				<li>Improved customer support and sales experience by implementing email automation, and email tracking with webhooks.</li>
				<li>Took a major role in Managing the ERP, CMS, and CRM of the company.</li>
				<li>Created web pages such as a customer support form to create support tickets and validate serial numbers with the server.</li>
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
				<!-- <p>HOST - Wapato Point Cellars <br>June 2015 - December 2018</p>
				<ul>
				<li>Worked as a host in often high stress situations, coordinating work between the bussers, srevers and kitchen staff in order for the restaurant to run smoothly each night and keep the customers satisfied.</li>
				<li>Soft skills used: verbal-communication, working in high-stress environments, attention to detail and time management.</li>
				</ul> -->

				<!-- <br><br>
				<h4>Projects</h4>
				<hr> -->
				<!-- <p>TOP DOG REMODELING - <a href="http://serene-lake-79956.herokuapp.com">in progress</a></p>
				<ul>
				<li>Created a multipage dynamic website using Spring Boot MVC. The site allowed admin to sign in and upload photos using the dropbox API and content using a MYSQL database.</li>
				<li>Technologies Used: Java, Thyme Leaf, MySQL, JavaScript, Drop Box API, HTML, CSS, Bootstrap, Spring MVC, Heroku, Tomcat and Spring Dependency Injection.</li>
				</ul> -->
				<!-- <p>MUSIC REVIEW WEBSITE - <a href="http://calm-cove-00851.herokuapp.com">calm-cove-00851.herokuapp.com</a></p>
				<ul>
				<li>Created a multipage dynamic website using Spring Boot MVC. The site allowed users to sign in as either a contributor that could write reviews, an admin who could manage all users and content or a user who can display content and create comments.</li>
				<li>Technologies Used: Java, Thyme Leaf, MySQL, JavaScript, LastFM API, TinyMCE, HTML, CSS, Bootstrap, Spring MVC, Heroku, Tomcat and Spring Dependency Injection.</li>
				</ul>
				<p>VENDING MACHINE REST API
				<ul>
				<li>Built a vending machine API using Java Spring Boot with an interactive front end using JQuery and Ajax.</li>
				<li>Technologies Used: Java, JavaScript, REST API, jQuery, Ajax, HTML, CSS, Spring Boot, and Spring Dependency Injection.</li>
				</ul> -->
			</div>
			<div class="col-12" style="position:absolute; right:20px; width:30%; top: 14%;">
				<br>
				<div style="text-align:left;"><h4>Skills</h4></div>
				<hr>
				<div class="container">
				<div class="row">
					<div class="col-6 col-md-4 skill">Front End Web Dev (Vue)<br>● ● ● ● ●<br></div>
					<div class="col-6 col-md-4 skill">Web App Development with Spring Web MVC, Spring JDBC<br>● ● ● ● ●<br></div>
					<div class="col-6 col-md-4 skill">HTML, CSS, JavaScript, jQuery and Bootstrap with Responsive Design<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-4 skill">Test-driven Development<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-4 skill">Version Control System (GitHub)<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-4 skill">Data Structures<br>● ● ● ⚬ ⚬ <br></div>
				</div>
				</div>

				<br>
				<div style="text-align:left;"><h4>Skills</h4></div>
				<hr>
				<div class="container">
				<div class="row">
					<div class="col-6 col-md-3 skill">JavaScript<br>● ● ● ● ●</div>
					<div class="col-6 col-md-3 skill">HTML/CSS<br>● ● ● ● ●<br></div>
					<div class="col-6 col-md-3 skill">Python<br>● ● ● ● ⚬<br></div>
					<div class="col-6 col-md-3 skill">Java<br>● ● ● ⚬ ⚬<br></div>
				</div>
				</div>
				<br>
				<h4>Education</h4>
				<hr>
				<div>Vue School - Vue.js certification<br>Feb 2022</div>
				<br>
				<div>THE SOFTWARE GUILD - Full Stack Java Boot Camp<br>March 2019 – November 2019</div>
				<br>
				<div>College Credits: 46<br>BRIGHAM YOUNG UNIVERSITY– GPA 3.94<br>January 2018 – May 2018</div>
			</div>

		</div>
	</div>
	</div>
</template>

<script type="importmap">
	// {
	// 	"imports": {
	// 		"three": "../build/three.module.js"
	// 	}
	// }
</script>

<script>
const resumeObject = require('../../three_js_components/resume');

module.exports = {
    components: {

    },
    props: ['layers', 'job_index', 'type'],
  	data() {
    	return {
			container: null,
			contours: null,
			camera: null,
			scene: null,
			renderer: null,
			renderer2: null,
			controls: null,
			image_width: 0,
			image_height: 0,
			thickness: 15,
			bulletin_board: null,
			line: null,
			box: null,
			saved_job_index: null,
			saved_type: null,
			finished_loading_counter: 0,
			resume: null,
			table: null,
			photo_box: null,
			zoom_object: null,
			hover: 'none',
			thumbtacks: [
				{x: 400, y: 220 },
				{x: 800, y: 300 },
				{x: 1060, y: 250 },
				{x: 1525, y: 160 },
				{x: 650, y: -220 },
				{x: 1075, y: -225 },
				{x: -1550, y: 160 },
				{x: -665, y: 155},
				// {x: 0, y: 0, color:0x0000ff},
				// {x: 100, y: 0, color:0xffffff},
			]
   		}
  	},
  	methods: {
		init: function() {
			this.clock = new THREE.Clock();
			this.scene = new THREE.Scene();
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera( 50, this.container.clientWidth / this.container.clientHeight, 0.1, 10000 );
			// this.camera = new THREE.OrthographicCamera( -this.container.clientWidth/2, this.container.clientWidth/2, this.container.clientHeight/2, -this.container.clientHeight/2, 0.1, 3000 );
			this.camera.position.z=250
			this.renderer = new THREE.WebGLRenderer({ alpha: true });
			this.renderer.setClearColor( 0x000000, 0 ); // the default
			this.renderer.antialias = true
			this.renderer.setClearColor( 0xffffff ); // the defaultoffsetWidth
			this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
			this.renderer.domElement.style.position = 'absolute'
			this.renderer.domElement.style.top = 0

			this.renderer2 = new THREE.CSS3DRenderer();
			this.renderer2.antialias = true
			// this.renderer.setClearColor( 0xffffff ); // the defaultoffsetWidth
			this.renderer2.setSize( this.container.offsetWidth, this.container.offsetHeight );
			this.renderer2.domElement.style.position = 'absolute'
			this.renderer2.domElement.style.top = 0
			// this.controls = new CameraControls( this.camera, this.renderer.domElement );
			this.controls = new CameraControls( this.camera, this.renderer2.domElement );
			this.controls.enabled = false
			// this.controls.enableZoom = false
			// this.controls.enabled = true
			// this.controls.enablePan = false
			this.container.appendChild( this.renderer.domElement );
			this.container.appendChild( this.renderer2.domElement );
			this.controls.update();
			var ambientlight = new THREE.AmbientLight( 0xffffff, 0.6 );

			var directionlight = new THREE.DirectionalLight( 0xffffff, 0.4 );
			var directionlight2 = new THREE.DirectionalLight( 0xffffff, 0.4 );
			directionlight.position.set(-500, 0, 1000)
			directionlight2.position.set(0, 10000, 2000)


			this.scene.add( ambientlight );
			this.scene.add( directionlight );
			this.scene.add( directionlight2 );

            var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
            var material = new THREE.MeshPhongMaterial({color: 0xffff00, wireframe: false});
            var cube = new THREE.Mesh(geometry, material);
            // this.scene.add(cube);
			var geometry = new THREE.PlaneGeometry( 3600, 2400 );
			// var geometry = new THREE.PlaneGeometry( 3112, 2129 );
			var textureLoader = new THREE.TextureLoader();
			const texMap = textureLoader.load("/assets/board_new.png"); 
			// const texMap = textureLoader.load("/assets/board.png"); 
			
			// // texMap.wrapS = RepeatWrapping;
			// // texMap.wrapT = RepeatWrapping;
			// // texMap.repeat.set( 1.5, 1.5 );

			var material = new THREE.MeshPhongMaterial( {map: texMap} );
			material.transparent = true
			// // const border_material = new MeshPhongMaterial( {color: 0xaaaaaa} );

			// // const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
			this.bulletin_board = new THREE.Mesh( geometry, material );
			this.scene.add( this.bulletin_board );
			var resume_div = this.$refs.resume

			// this.createText()

			// var tackObject = new Object3D()
			// BulletinBoardObject.add(left)
			// BulletinBoardObject.add(right)
			// BulletinBoardObject.add(top)
			// BulletinBoardObject.add(bottom)
			// BulletinBoardObject.add(boardMesh)


			// var geometry = new THREE.PlaneGeometry( 2400, 800 );
			// var textureLoader = new THREE.TextureLoader();
			// const nametexMap = textureLoader.load("/assets/name.png"); 
			// var material = new THREE.MeshPhongMaterial( {map: nametexMap} );
			// material.transparent = true
			// myname = new THREE.Mesh( geometry, material );
			// myname.position.x = -300
			// myname.position.y = -300
			// myname.position.z = 2
			// this.scene.add( myname );

			const resumeObject = new THREE.CSS3DObject( resume_div );
			resumeObject.position.x = -1100
			resumeObject.position.y = -400
			resumeObject.position.z = 1
			// resumeObject.rotation.z = 0.02
			
			var myname = this.$refs.myname
			const myname_obj = new THREE.CSS3DObject( myname );
			myname_obj.position.x = -100
			myname_obj.position.y = 800
			myname_obj.position.z = 2
			myname_obj.rotation.z = 0

			this.scene.add(myname_obj)


			var photos_fieldset_div = this.$refs.photo_fieldset
			const photoFieldSet = new THREE.CSS3DObject( photos_fieldset_div );
			photoFieldSet.position.x = 950
			photoFieldSet.position.y = -150
			photoFieldSet.position.z = 1
			// resumeFieldSet.rotation.z = 0.02
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


			var sticky_note = this.$refs.sticky_note1
			var sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 0
			sticky_note_obj.position.y = -600
			sticky_note_obj.position.z = 4
			sticky_note_obj.rotation.z = 0.0

			this.scene.add(sticky_note_obj)

			var sticky_note = this.$refs.sticky_note2
			var sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 50
			sticky_note_obj.position.y = -555
			sticky_note_obj.position.z = 3
			sticky_note_obj.rotation.z = 0.12

			this.scene.add(sticky_note_obj)

			var sticky_note = this.$refs.sticky_note3
			var sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = -75
			sticky_note_obj.position.y = -575
			sticky_note_obj.position.z = 2
			sticky_note_obj.rotation.z = -0.1

			this.scene.add(sticky_note_obj)

			var geometry = new THREE.PlaneGeometry( 850, 1100 );
			var material = new THREE.MeshPhongMaterial( {transparent: true, opacity:0} );
			resume_box = new THREE.Mesh( geometry, material );
			resume_box.position.x = -1100
			resume_box.position.y = -400
			// resume_box.rotation.z = 0.02
			this.resume = resume_box
			this.scene.add(resume_box)

			var geometry = new THREE.PlaneGeometry( 1100, 900 );
			var material = new THREE.MeshPhongMaterial( {transparent: true, opacity:0} );
			photos_box = new THREE.Mesh( geometry, material );
			photos_box.position.x = 950
			photos_box.position.y = -150
			photos_box.position.z = -10
			this.photo_box = photos_box
			this.scene.add(photos_box)

			var resume_fieldset_div = this.$refs.resume_fieldset
			const resumeFieldSet = new THREE.CSS3DObject( resume_fieldset_div );
			resumeFieldSet.position.x = -1100
			resumeFieldSet.position.y = -380
			resumeFieldSet.position.z = 1
			// resumeFieldSet.rotation.z = 0.02
			this.scene.add(resumeFieldSet)

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
				// const geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
				// const material = new THREE.MeshBasicMaterial( {color: obj.color} );
				// const body = new THREE.Mesh( geometry, material );		

			})

			var table_geometry = new THREE.BoxGeometry(5000, 100, 2000, 10, 10, 10)
			const texMaptable = textureLoader.load("/assets/desk.png"); 
			// const texMap = textureLoader.load("/assets/board.png"); 
			
			// // texMap.wrapS = RepeatWrapping;
			// // texMap.wrapT = RepeatWrapping;
			// // texMap.repeat.set( 1.5, 1.5 );

			var table_material = new THREE.MeshPhongMaterial( {map: texMaptable} );

			// var table_material = new THREE.MeshPhongMaterial( {color: 0x000033} );
			this.table = new THREE.Mesh( table_geometry, table_material );
			//             var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
            // var material = new THREE.MeshPhongMaterial({color: 0xffff00, wireframe: false});
            // var cube = new THREE.Mesh(geometry, material);

			this.table.position.y = -1500
			this.table.position.z = 1000
			this.scene.add(this.table)
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




			this.scene.add(resumeObject)
			const smooth = true;
			this.zoom_object = this.bulletin_board
			this.controls.fitToBox(this.zoom_object, smooth, { paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 })
			
		
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
		// reset_view: function(){
		// 	const smooth = true;
		// 	this.controls.reset(smooth)
		// 	this.controls.fitToBox(this.line, smooth)
		// },
		zoom_into_resume() {
			this.hover = 'none'
			this.zoom_object = this.resume
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 50, paddingRight: 50, paddingBottom: 50, paddingTop: 50 })
		},
		async zoom_into_photos() {
			// console.log(this.camera.position.x)
			// console.log(this.camera.position.y)
			// console.log(this.camera.position.z)
			this.hover = 'none'
			this.zoom_object = this.photo_box
			await this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 50, paddingRight: 50, paddingBottom: 50, paddingTop: 50 })
		},
		async zoom_out() {
			// console.log(this.camera.position.x)
			// console.log(this.camera.position.y)
			// console.log(this.camera.position.z)
			this.hover = 'none'
			this.zoom_object = this.bulletin_board
			await this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 50, paddingRight: 50, paddingBottom: 50, paddingTop: 50 })
			// this.camera.position.y = 0
			// this.camera.position.x = 0
		},
		move_to_table() {
			this.zoom_object = this.table
			// console.log(this.camera.position.x)
			// console.log(this.camera.position.y)
			// console.log(this.camera.position.z)
			// this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 50, paddingRight: 50, paddingBottom: 50, paddingTop: 50 })
			this.controls.setLookAt(0, 1000,  1000,  0, 0, 1000, true)
		},
		move_to_bulletin() {
			this.zoom_object = this.bulletin_board
			this.controls.setLookAt(this.camera.position.x, 0, 1000,  0, 0, 0, true)
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 50, paddingRight: 50, paddingBottom: 50, paddingTop: 50 })
		},

		animate: function() {
			const delta = this.clock.getDelta();
			const hasControlsUpdated = this.controls.update( delta );
			// if( hasControlsUpdated ){
            this.renderer.render( this.scene, this.camera );
            this.renderer2.render( this.scene, this.camera );
			// }
			requestAnimationFrame( this.animate );
		},
	},
 	async mounted() {
		CameraControls.install( { THREE: THREE } );
        window.addEventListener( 'resize', this.onWindowResize, false );

		this.container = this.$refs.container
		this.init();
		this.animate();
		// this.$emit('done_loading')
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
.resume_container {
	position:relative;
	background-color:white;
	padding:20px;
}
.sticky_note {
	width: 400px;
	height:400px;
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
  margin-left: 36%;
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
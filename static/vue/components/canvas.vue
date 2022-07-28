<template>
<div>
	<div style="position:relative;">
		<div ref="container" id="three_container">

		</div>
		<!-- <button style="position:absolute; left:10px; bottom:10px; background-color:#195EAA; color:white; height: 30px; width: 100px; border-radius: 5px; border:none;" @click="reset_view"> <i class="fa fa-refresh" aria-hidden="true"></i> reset view </button> -->
	</div>

	<div v-show="false">

		<div ref="image_1">
			<img src="/assets/board.png" width="500px;" alt="">
		</div>
		<div ref="image_2">
			<img src="/assets/board.png" width="500px;" alt="">
		</div>
		<div ref="image_3">
			<img src="/assets/board.png" width="500px;" alt="">
		</div>
		
		<div ref="sticky_note" class="sticky_note">
			<textarea name="" id="" cols="30" rows="10" disabled></textarea>
		</div>

		<div ref="resume_fieldset">
			<fieldset style="width:950px; height:1200px;" v-if="hover == 'resume'">
				<legend style="padding 50px 0;">Resume</legend>
			</fieldset>
		</div>

		<div ref="resume"  class="resume_container" style="width:875px; height:1100px;" @click="zoom_into_resume" @mouseenter="hover = 'resume'" @mouseleave="hover = 'none'">
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
			hover: 'none',
   		}
  	},
  	methods: {
		init: function() {
			this.clock = new THREE.Clock();
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera( 50, this.container.clientWidth / this.container.clientHeight, 0.1, 10000 );
			// this.camera = new THREE.OrthographicCamera( -this.container.clientWidth/2, this.container.clientWidth/2, this.container.clientHeight/2, -this.container.clientHeight/2, 0.1, 3000 );
			this.camera.position.z=250
			this.renderer = new THREE.WebGLRenderer();
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
			// this.controls.enabled = false
			// this.controls.enablePan = false
			this.container.appendChild( this.renderer.domElement );
			this.container.appendChild( this.renderer2.domElement );
			this.controls.update();
			var ambientlight = new THREE.AmbientLight( 0xffffff, 0.8 );

			var directionlight = new THREE.DirectionalLight( 0xffffff, 0.6 );
			var directionlight2 = new THREE.DirectionalLight( 0xffffff, 1.2 );
			directionlight.position.set(5, 5, 3)
			directionlight2.position.set(5, 5, -3)


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
			console.log(resume_div)

			const resumeObject = new THREE.CSS3DObject( resume_div );
			resumeObject.position.x = -1100
			resumeObject.position.y = -400
			resumeObject.position.z = 1
			resumeObject.rotation.z = 0.02
			
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
			photo_2_obj.position.z = 1
			photo_2_obj.rotation.z = 0.2

			this.scene.add(photo_2_obj)

			var photo_3 = this.$refs.image_3
			const photo_3_obj = new THREE.CSS3DObject( photo_3 );
			photo_3_obj.position.x = 850
			photo_3_obj.position.y = -400
			photo_3_obj.position.z = 1
			photo_3_obj.rotation.z = -0.03

			this.scene.add(photo_3_obj)


			var sticky_note = this.$refs.sticky_note
			const sticky_note_obj = new THREE.CSS3DObject( sticky_note );
			sticky_note_obj.position.x = 0
			sticky_note_obj.position.y = -400
			sticky_note_obj.position.z = 1
			sticky_note_obj.rotation.z = -0.03

			this.scene.add(sticky_note_obj)
			
			var geometry = new THREE.PlaneGeometry( 850, 1100 );
			var material = new THREE.MeshPhongMaterial( {transparent: true, opacity:0} );
			resume_box = new THREE.Mesh( geometry, material );
			resume_box.position.x = -1100
			resume_box.position.y = -400
			resume_box.position.z = -1
			resume_box.rotation.z = 0.02
			this.resume = resume_box
			this.scene.add(resume_box)

			var resume_fieldset_div = this.$refs.resume_fieldset
			const resumeFieldSet = new THREE.CSS3DObject( resume_fieldset_div );
			resumeFieldSet.position.x = -1100
			resumeFieldSet.position.y = -400
			resumeFieldSet.position.z = 1
			resumeFieldSet.rotation.z = 0.02
			this.scene.add(resumeFieldSet)


			this.scene.add(resumeObject)
			const smooth = true;
			this.zoom_object = this.bulletin_board
			this.controls.fitToBox(this.zoom_object, smooth, { paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 })
		},
        onWindowResize(){

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.renderer2.setSize( window.innerWidth, window.innerHeight );
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 100, paddingRight: 100, paddingBottom: 100, paddingTop: 100 })

        },
		// reset_view: function(){
		// 	const smooth = true;
		// 	this.controls.reset(smooth)
		// 	this.controls.fitToBox(this.line, smooth)
		// },
		zoom_into_resume() {
			this.zoom_object = this.resume
			this.controls.fitToBox(this.zoom_object, true, { paddingLeft: 25, paddingRight: 25, paddingBottom: 25, paddingTop: 25 })
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
	background-color:#ece735;
	border:none;
}
fieldset {
	border: solid white 10px;
	font-size: 50px;
	color:white;
}
legend {
  margin-left: 40%;
  padding: 0 10px;
  position: relative;
  text-align: center;
  width: auto;
  font-weight: bold;
  }
</style>
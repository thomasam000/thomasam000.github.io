<template>
	<div style="position:relative;">
		<div ref="container" id="three_container">

		</div>
		<!-- <button style="position:absolute; left:10px; bottom:10px; background-color:#195EAA; color:white; height: 30px; width: 100px; border-radius: 5px; border:none;" @click="reset_view"> <i class="fa fa-refresh" aria-hidden="true"></i> reset view </button> -->
	</div>
</template>

<script>
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
			controls: null,
			image_width: 0,
			image_height: 0,
			thickness: 15,
			img: null,
			line: null,
			box: null,
			saved_job_index: null,
			saved_type: null,
			finished_loading_counter: 0,
   		}
  	},
  	methods: {
		init: function() {
			this.clock = new THREE.Clock();
			this.scene = new THREE.Scene();
			this.camera = new THREE.PerspectiveCamera( 50, this.container.clientWidth / this.container.clientHeight, 0.1, 3000 );
			// this.camera = new THREE.OrthographicCamera( -this.container.clientWidth/2, this.container.clientWidth/2, this.container.clientHeight/2, -this.container.clientHeight/2, 0.1, 3000 );
			this.camera.position.z=-500
			this.renderer = new THREE.WebGLRenderer();
			this.renderer.antialias = true
			this.renderer.setClearColor( 0xffffff ); // the defaultoffsetWidth
			this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight );
			this.controls = new CameraControls( this.camera, this.renderer.domElement );
			this.controls.minDistance = 50
			this.controls.maxDistance = 2500
			this.container.appendChild( this.renderer.domElement );
			this.controls.update();
			var ambientlight = new THREE.AmbientLight( 0xffffff, 0.8 );

			var directionlight = new THREE.DirectionalLight( 0xffffff, 0.6 );
			var directionlight2 = new THREE.DirectionalLight( 0xffffff, 1.2 );
			directionlight.position.set(5, 5, 3)
			directionlight2.position.set(5, 5, -3)


			// this.scene.add( ambientlight );
			this.scene.add( directionlight );
			this.scene.add( directionlight2 );

            var geometry = new THREE.BoxGeometry(700, 700, 700, 10, 10, 10);
            var material = new THREE.MeshPhongMaterial({color: 0xffff00, wireframe: false});
            var cube = new THREE.Mesh(geometry, material);
            this.scene.add(cube);
		},
        onWindowResize(){

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            this.renderer.setSize( window.innerWidth, window.innerHeight );

        },
		// reset_view: function(){
		// 	const smooth = true;
		// 	this.controls.reset(smooth)
		// 	this.controls.fitToBox(this.line, smooth)
		// },
	
		animate: function() {
			const delta = this.clock.getDelta();
			const hasControlsUpdated = this.controls.update( delta );
			// if( hasControlsUpdated ){
            this.renderer.render( this.scene, this.camera );
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
    height:100vh;
    width:100%;
}
</style>
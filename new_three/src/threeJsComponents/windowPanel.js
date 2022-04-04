// import {Mesh, THREE.MeshPhongMaterial, THREE.BoxGeometry, THREE.Object3D, THREE.TextureLoader, THREE.RepeatWrapping} from "three-full";
import * as THREE from 'three'

import { createDitherTexture, DitheredTransparencyShaderMixin} from './ScreenDoorShader.js'


function create_window(width, height) {

const board_width = width;
const board_height = height;
const board_depth = 1;
const border_width = .5;
const border_depth = 2;

// const loader = new THREE.TextureLoader();
// const texMap = loader.load(require("../assets/sand.jpg")); 
// texMap.wrapS = THREE.RepeatWrapping;
// texMap.wrapT = THREE.RepeatWrapping;
// texMap.repeat.set( 1.5, 1.5 );
const ditherTex = createDitherTexture();
const opacity = 0.1
const color = new THREE.Color( 0x000000 );
const ditherShader = DitheredTransparencyShaderMixin(THREE.ShaderLib.phong);
const ditherMat = new THREE.ShaderMaterial(ditherShader);
ditherMat.uniforms.ditherTex.value = ditherTex;
ditherMat.uniforms.opacity.value = opacity;
ditherMat.uniforms.diffuse.value.copy(color);
ditherMat.lights = true;

const depthShader = DitheredTransparencyShaderMixin(THREE.ShaderLib.depth);
depthShader.fragmentShader = `uniform float opacity;\n${ depthShader.fragmentShader }`;

const depthMat = new THREE.ShaderMaterial(depthShader);
depthMat.defines.DEPTH_PACKING = THREE.RGBADepthPacking;
depthMat.uniforms.ditherTex.value = ditherTex;
depthMat.uniforms.opacity.value = opacity;

const shadowColorShader = DitheredTransparencyShaderMixin(THREE.ShaderLib.basic);
const shadowColorMat = new THREE.ShaderMaterial(shadowColorShader);
shadowColorMat.uniforms.ditherTex.value = ditherTex;
shadowColorMat.uniforms.opacity.value = 1;
shadowColorMat.uniforms.diffuse.value.copy( color );

const transparentMat = new THREE.MeshPhongMaterial();
transparentMat.color.copy(color)
transparentMat.transparent = true;
transparentMat.opacity = opacity;
transparentMat.premultipliedAlpha = true;

// const THREE.Mesh = new THREE.Mesh(sphereGeom, transparentMat);

// const material = new THREE.MeshPhongMaterial( {map: texMap} );

const border_material = new THREE.MeshPhongMaterial( {color: 0x2a2a2a} );

var boardGeometry = new THREE.BoxGeometry( board_width - (2 * border_width), board_height- (2 * border_width), board_depth );
const boardMesh = new THREE.Mesh( boardGeometry,transparentMat );
// boardMesh.castShadow = true
boardMesh.castShadow = false
boardMesh.receiveShadow = true;

boardMesh.customDepthMaterial = depthMat;
boardMesh._depthMat = depthMat;
boardMesh._shadowColorMat = shadowColorMat;
boardMesh._originalMat = ditherMat;

boardMesh._ditherMat = ditherMat;
boardMesh._transparentMat = transparentMat;

boardMesh.updateMatrix()

const sideBorderGeometry = new THREE.BoxGeometry( border_width, board_height, border_depth);
const topBorderGeometry = new THREE.BoxGeometry( board_width, border_width, border_depth);

const left = new THREE.Mesh( sideBorderGeometry, border_material );
left.position.x = board_width/2 - border_width/2
left.castShadow = true
left.updateMatrix()

const right = new THREE.Mesh( sideBorderGeometry, border_material );
right.position.x = -board_width/2 + border_width/2
right.castShadow = true
right.updateMatrix()

const top = new THREE.Mesh( topBorderGeometry, border_material );
top.position.y = board_height/2 - border_width/2
top.castShadow = true
top.updateMatrix()

const bottom = new THREE.Mesh( topBorderGeometry, border_material );
bottom.position.y = -board_height/2 + border_width/2
bottom.castShadow = true
bottom.updateMatrix()


const BulletinBoardObject = new THREE.Object3D()
BulletinBoardObject.add(left)
BulletinBoardObject.add(right)
BulletinBoardObject.add(top)
BulletinBoardObject.add(bottom)
BulletinBoardObject.add(boardMesh)

return BulletinBoardObject
// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();
// var targetMesh
// function onMouseClick( event ) {
//     raycaster.setFromCamera( mouse, camera );
//     var isIntersected = raycaster.intersectObject( targetMesh );
//     if (isIntersected) {
//         console.log('Mesh clicked!')
//     }
// }
// function onMouseMove( event ) {
//     mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
// }
// window.addEventListener( 'mouseclick', onMouseClick, false );
// window.addEventListener( 'mousemove', onMouseMove, false );

// bulletinBoardGeometry.merge(boardMesh.geometry, boardMesh.matrix);
// bulletinBoardGeometry.merge(left.geometry, left.matrix);
// bulletinBoardGeometry.merge(right.geometry, right.matrix);
// bulletinBoardGeometry.merge(top.geometry, top.matrix);
// bulletinBoardGeometry.merge(bottom.geometry, bottom.matrix);
// const BulletinBoardObj = new THREE.Mesh( bulletinBoardGeometry );

// BulletinBoardObj.castShadow = true
// BulletinBoardObj.receiveShadow = true
}
// function WindowPanel() {
//     return BulletinBoardObject
// }



function WindowPanel(width, height) {
    return create_window(width, height)
}
export default WindowPanel
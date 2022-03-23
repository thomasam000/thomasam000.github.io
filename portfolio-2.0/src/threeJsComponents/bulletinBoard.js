import {Mesh, MeshPhongMaterial, BoxGeometry, Object3D, TextureLoader, RepeatWrapping} from "three-full";

const board_width = 48;
const board_height = 36;
const board_depth = 1;
const border_width = 2;
const border_depth = 1.5

const loader = new TextureLoader();
const texMap = loader.load(require("../assets/cork-board.jpg")); 
texMap.wrapS = RepeatWrapping;
texMap.wrapT = RepeatWrapping;
texMap.repeat.set( 2, 2 );

const material = new MeshPhongMaterial( {map: texMap} );

const border_material = new MeshPhongMaterial( {color: 0xaaaaaa} );

var boardGeometry = new BoxGeometry( board_width - (2 * border_width), board_height- (2 * border_width), board_depth );
const boardMesh = new Mesh( boardGeometry, material );
boardMesh.updateMatrix()

const sideBorderGeometry = new BoxGeometry( border_width, board_height, border_depth);
const topBorderGeometry = new BoxGeometry( board_width, border_width, border_depth);

const left = new Mesh( sideBorderGeometry, border_material );
left.position.x = board_width/2 - border_width/2
left.updateMatrix()

const right = new Mesh( sideBorderGeometry, border_material );
right.position.x = -board_width/2 + border_width/2
right.updateMatrix()

const top = new Mesh( topBorderGeometry, border_material );
top.position.y = board_height/2 - border_width/2
top.updateMatrix()

const bottom = new Mesh( topBorderGeometry, border_material );
bottom.position.y = -board_height/2 + border_width/2
bottom.updateMatrix()


const BulletinBoardObject = new Object3D()
BulletinBoardObject.add(left)
BulletinBoardObject.add(right)
BulletinBoardObject.add(top)
BulletinBoardObject.add(bottom)
BulletinBoardObject.add(boardMesh)

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
// const BulletinBoardObj = new Mesh( bulletinBoardGeometry );

// BulletinBoardObj.castShadow = true
// BulletinBoardObj.receiveShadow = true

function BulletinBoard() {
    return BulletinBoardObject
}

export default BulletinBoard
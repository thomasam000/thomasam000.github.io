import * as THREE from 'three'



function create_door(width, height) {

    const board_width = width;
    const board_height = height;
    const board_depth = 1;
    const border_width = 2;
    const border_depth = 2;

    const loader = new THREE.TextureLoader();
    const texMap = loader.load(require("../../static/smooth_wood.jpg").default);

    const texMapskinny = loader.load(require("../../static/smooth_wood.jpg").default);
    texMapskinny.wrapS = THREE.RepeatWrapping;
    texMapskinny.wrapT = THREE.RepeatWrapping;
    texMapskinny.repeat.set( 0.2, 1.0 );

    const material = new THREE.MeshPhongMaterial( {map: texMap } );

    const border_material = new THREE.MeshPhongMaterial( {map: texMapskinny } );

    var boardGeometry = new THREE.BoxGeometry( board_width - border_width/2, board_height, board_depth );
    const boardMesh = new THREE.Mesh( boardGeometry,material );
    // boardMesh.castShadow = true
    boardMesh.castShadow = false
    boardMesh.receiveShadow = true;

    const sideBorderGeometry = new THREE.BoxGeometry( border_width, board_height, border_depth);
    const topBorderGeometry = new THREE.BoxGeometry( board_width, border_width, border_depth);

    const left = new THREE.Mesh( sideBorderGeometry, border_material );
    left.position.x = board_width/2 - border_width/2
    left.position.y = border_width/2 - border_width/2
    left.castShadow = true
    left.receiveShadow = true

    const right = new THREE.Mesh( sideBorderGeometry, border_material );
    right.position.x = -board_width/2 + border_width/2
    right.position.y = border_width/2 - border_width/2
    right.castShadow = true
    right.receiveShadow = true

    const top = new THREE.Mesh( topBorderGeometry, border_material );
    top.position.y = board_height/2 - border_width/2
    top.castShadow = true
    top.receiveShadow = true

    const DoorObject = new THREE.Object3D()
    DoorObject.add(left)
    DoorObject.add(right)
    DoorObject.add(top)
    DoorObject.add(boardMesh)

    return DoorObject
}

function Door(width, height) {
    return create_door(width, height)
}
export default Door
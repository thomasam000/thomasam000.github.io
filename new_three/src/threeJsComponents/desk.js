import * as THREE from 'three'


function create_desk(table_width, table_height, table_depth, table_thickness, leg_thickness) {
    const loader = new THREE.TextureLoader();
    const texMap = loader.load(require("../../static/smooth_wood.jpg").default);
    // console.log(require('../../static/smooth_wood.jpg')) 
    // const texMap = loader.load('assets/images/b7cddb3638871842e2b472e40d39aa04.jpg'); 
    texMap.wrapS = THREE.RepeatWrapping;
    texMap.wrapT = THREE.RepeatWrapping;
    texMap.repeat.set( 1.5, 1.5 );

    const material = new THREE.MeshPhongMaterial( {map: texMap } );

    // const material = new MeshPhongMaterial( {color: 0xffffff} );
    const leg_material = new THREE.MeshPhongMaterial( {
        color: 0xdddddd,
        // metalness: 1,   // between 0 and 1
        // roughness: 1, // between 0 and 1
        // envMap: envMap,
    } );

    const legGeo = new THREE.CylinderGeometry( leg_thickness/2, leg_thickness/2 - 0.05, table_height - 0.1, 16 );

    const Leg1 = new THREE.Mesh( legGeo, leg_material );
    Leg1.position.x = table_width/2 - leg_thickness/2 - 2
    Leg1.position.y = table_height/2
    Leg1.position.z = table_depth/2 - leg_thickness/2 - 2
    Leg1.updateMatrix()
    Leg1.castShadow = true

    const Leg2 = new THREE.Mesh( legGeo, leg_material );
    Leg2.position.x = -table_width/2 + leg_thickness/2 + 2
    Leg2.position.y = table_height/2
    Leg2.position.z = table_depth/2 - leg_thickness/2 - 2
    Leg2.updateMatrix()
    Leg2.castShadow = true

    const Leg3 = new THREE.Mesh( legGeo, leg_material );
    Leg3.position.x = table_width/2 - leg_thickness/2 - 2
    Leg3.position.y = table_height/2
    Leg3.position.z = -table_depth/2 + leg_thickness/2 + 2
    Leg3.updateMatrix()
    Leg3.castShadow = true

    const Leg4 = new THREE.Mesh( legGeo, leg_material );
    Leg4.position.x = -table_width/2 + leg_thickness/2 + 2
    Leg4.position.y = table_height/2
    Leg4.position.z = -table_depth/2 + leg_thickness/2 + 2
    Leg4.updateMatrix()
    Leg4.castShadow = true

    const tableTopGeometry = new THREE.BoxGeometry( table_width, table_thickness, table_depth );
    const tableTop = new THREE.Mesh( tableTopGeometry, material );
    tableTop.position.y = table_height - (table_thickness/2)
    tableTop.updateMatrix()
    tableTop.castShadow = true
    tableTop.receiveShadow = true


    const DeskObj = new THREE.Object3D()
    DeskObj.add(tableTop)
    DeskObj.add(Leg1)
    DeskObj.add(Leg2)
    DeskObj.add(Leg3)
    DeskObj.add(Leg4)
    
    DeskObj.castShadow = true
    DeskObj.receiveShadow = true
    return DeskObj
}

function Desk(table_width, table_height, table_depth, table_thickness, leg_thickness) {
    return create_desk(table_width, table_height, table_depth, table_thickness, leg_thickness)
}
export default Desk
import {Geometry, Mesh, MeshPhongMaterial, BoxGeometry} from "three-full";
// import { TextureLoader, RepeatWrapping } from "three-full";



// const loader = new TextureLoader();
// const params = {
//     color: 0xffffff,
//     transmission: 1,
//     opacity: 0.3,
//     metalness: 0,
//     roughness: 0,
//     ior: 1.52,
//     thickness: 0.1,
//     specularIntensity: 1,
//     specularColor: 0xffffff,
//     lightIntensity: 1,
//     exposure: 1
//   };
// const texMap = loader.load(require("../assets/table-texture.jpg")); 
// texMap.wrapS = RepeatWrapping;
// texMap.wrapT = RepeatWrapping;
// texMap.repeat.set( 2, 2 );

// const material = new MeshPhongMaterial( {map: texMap} );
function create_desk(table_width, table_height, table_depth, table_thickness, leg_thickness) {
    const material = new MeshPhongMaterial( {color: 0xffffff} );
    // const material = new MeshPhysicalMaterial({
    //     metalness: .9,
    //     roughness: .05,
    //     envMapIntensity: 0.9,
    //     clearcoat: 1,
    //     transparent: true,
    //     // transmission: .95,
    //     opacity: .1,
    //     reflectivity: 0.3,
    //     refractionRatio: 0.9,
    //     ior: 0.9,
    //     side: BackSide,
    //     })
//     const material = new ShadowMaterial( {
//         color: params.color,
//         metalness: params.metalness,
//         roughness: params.roughness,
//         ior: params.ior,
//         transmission: params.transmission,
//         specularIntensity: params.specularIntensity,
//         specularColor: params.specularColor,
//         opacity: params.opacity,
//         side: DoubleSide,
//         transparent: true,
// } );    
// material.opacity = 0.3
      var deskGeometry = new Geometry();

    const legGeo = new BoxGeometry( leg_thickness, table_height, leg_thickness );

    const Leg1 = new Mesh( legGeo, material );
    Leg1.position.x = table_width/2 - leg_thickness/2 - 2
    Leg1.position.y = table_height/2
    Leg1.position.z = table_depth/2 - leg_thickness/2 - 2
    Leg1.updateMatrix()

    const Leg2 = new Mesh( legGeo, material );
    Leg2.position.x = -table_width/2 + leg_thickness/2 + 2
    Leg2.position.y = table_height/2
    Leg2.position.z = table_depth/2 - leg_thickness/2 - 2
    Leg2.updateMatrix()

    const Leg3 = new Mesh( legGeo, material );
    Leg3.position.x = table_width/2 - leg_thickness/2 - 2
    Leg3.position.y = table_height/2
    Leg3.position.z = -table_depth/2 + leg_thickness/2 + 2
    Leg3.updateMatrix()

    const Leg4 = new Mesh( legGeo, material );
    Leg4.position.x = -table_width/2 + leg_thickness/2 + 2
    Leg4.position.y = table_height/2
    Leg4.position.z = -table_depth/2 + leg_thickness/2 + 2
    Leg4.updateMatrix()

    const tableTopGeometry = new BoxGeometry( table_width, table_thickness, table_depth );
    const tableTop = new Mesh( tableTopGeometry, material );
    tableTop.position.y = table_height - (table_thickness/2)
    tableTop.updateMatrix()

    deskGeometry.merge(tableTop.geometry, tableTop.matrix);
    deskGeometry.merge(Leg1.geometry, Leg1.matrix);
    deskGeometry.merge(Leg2.geometry, Leg2.matrix);
    deskGeometry.merge(Leg3.geometry, Leg3.matrix);
    deskGeometry.merge(Leg4.geometry, Leg4.matrix);
    const DeskObj = new Mesh( deskGeometry, material );

    DeskObj.castShadow = true
    DeskObj.receiveShadow = true
    return DeskObj
}
// const table_width = 80;
// const table_height = 30;
// const table_depth = 40;
// const table_thickness = 2;
// const leg_thickness = 2

function Desk(table_width, table_height, table_depth, table_thickness, leg_thickness) {
    return create_desk(table_width, table_height, table_depth, table_thickness, leg_thickness)
}
export default Desk
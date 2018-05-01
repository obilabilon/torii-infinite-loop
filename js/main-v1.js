var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
scene.background = new THREE.Color( 0x011d4b );
scene.fog = new THREE.FogExp2( 0x011d4b, 0.1 );

var renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialiasing: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

 Torii = function() {
    this.mesh = new THREE.Object3D();

    var geometry = new THREE.BoxGeometry(0.5, 5, 0.5);
    var geometry2 = new THREE.BoxGeometry(5, 0.5, 0.5);
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var pillier = new THREE.Mesh(geometry, material);
    var pillier2 = new THREE.Mesh(geometry, material);
    var pillier3 = new THREE.Mesh(geometry2, material);
    pillier.position.x=2;
    pillier2.position.x=-2;
    pillier3.position.x=0;
    pillier3.position.y=1.8;
    this.mesh.add(pillier);
    this.mesh.add(pillier2);
    this.mesh.add(pillier3);
}

//var geometry = new THREE.BoxGeometry(0.5, 5, 0.5);
//var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
//var cube = new THREE.Mesh(geometry, material);
//scene.add( cube);

//var axesHelper = new THREE.AxesHelper(5);
//scene.add(axesHelper);

// GROUND
var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
var groundMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x050505 } );
groundMat.color.setHSL(0.095, 1, 0.75);
var ground = new THREE.Mesh(groundGeo, groundMat);
//ground.rotation.x = -Math.PI/2;
//ground.rotation.x = -1.55;
ground.rotation.x -= Math.PI/2;
ground.position.y = -2;
ground.position.z = -5;
scene.add(ground);

var meshPositionZ = 2;
var nameTorii = 0;

function createTorii() {
    var t = new Torii();
    t.mesh.position.z = -4;
    t.mesh.position.y = 0;
    t.mesh.position.z = meshPositionZ;
    //t.mesh.rotation.y = 3;
    t.mesh.name = "torii" + nameTorii;
    scene.add(t.mesh);
    meshPositionZ -= 2;
    nameTorii += 1;
    /*
    if (nameTorii >= 10) {
        var deleteTorii = nameTorii - 10;
        var f = "torii" + deleteTorii;
        scene.remove(scene.getObjectByName(f));
    }
    */
}

var light = new THREE.PointLight(0xFFFFFF);
light.position.set(10, 0, 25);
scene.add(light);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;

for (var i = 0; i < 21; i++) {
    createTorii();
}

var rCameraPositionRound = 0;
var oldRCameraPositionRound = 0;

//setInterval(createTorii, 1000);

function animate() {
    requestAnimationFrame( animate );
   // cube.rotation.y += 0.01;
   //t.mesh.rotation.y += 0.01;
   camera.position.z -=0.02;
   rCameraPositionRound =  Math.round(camera.position.z);
   if (rCameraPositionRound+1 < oldRCameraPositionRound) {
       scene.remove(scene.children[2]);
       createTorii();
       oldRCameraPositionRound = rCameraPositionRound;       
   }
    renderer.render(scene, camera);
}

animate();
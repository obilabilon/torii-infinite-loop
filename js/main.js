window.addEventListener('load', init, false);

var rCameraPositionRound = 0;
var oldRCameraPositionRound = 0;
var meshPositionZ = 2;
var nameTorii = 0;
var scene, camera, renderer;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);
    scene.background = new THREE.Color(0x011d4b);
    scene.fog = new THREE.FogExp2(0x011d4b, 0.1);
    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialiasing: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 0;

    createLights();
    
    Torii = function() {
        this.mesh = new THREE.Object3D();
    
        var geometry = new THREE.BoxGeometry(0.5, 5, 0.5);
        var geometry2 = new THREE.BoxGeometry(5, 0.5, 0.5);
        var material = new THREE.MeshLambertMaterial({color: 0xff0000});
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

    for (var i = 0; i < 21; i++) {
        createTorii();
    }

	animate();
}

function createLights() {
    var light = new THREE.PointLight(0xFFFFFF);
    light.position.set(10, 0, 25);
    scene.add(light);
}

function createTorii() {
    var t = new Torii();
    t.mesh.position.z = -4;
    t.mesh.position.y = 0;
    t.mesh.position.z = meshPositionZ;

    //t.mesh.name = "torii" + nameTorii;
    scene.add(t.mesh);
    meshPositionZ -= 2;
    nameTorii += 1;
}

function animate() {
    requestAnimationFrame( animate );
    camera.position.z -=0.02;
    rCameraPositionRound =  Math.round(camera.position.z);
    if (rCameraPositionRound+1 < oldRCameraPositionRound) {
        scene.remove(scene.children[2]);
        createTorii();
        oldRCameraPositionRound = rCameraPositionRound;       
    }
    renderer.render(scene, camera);
}
import * as THREE from '/amogus/js/three.module.js';
import { GLTFLoader } from '/amogus/loaders/GLTFLoader.js';
import { OrbitControls } from '/amogus/loaders/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    1,
    1000
);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


controls.update();

let crewmate, stars, starGeo;

lighting();
crewmateModel();
particles();
spaceship();

// Spaceship
function spaceship() {
    //Body
    const bodyGeo = new THREE.CylinderGeometry(5, 5, 14.5, 19);
    const bodyMat = new THREE.MeshLambertMaterial({color:0xffffff});
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.set(-50,6.5,-3);
    body.rotation.set(10,5,0);
    scene.add(body);

    // Top 
    const sphereGeometry = new THREE.SphereGeometry( 5, 64, 7,
      4.04637133782365, 6.283185307179586, 1.65247773578823, 1.72787595947439 );
    const sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xe60000 } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.set(-50.1,12.1,0.7);
    sphere.rotation.set(10,5,0);
    scene.add( sphere );

    // Bottom Wing 1
    const wing1Geometry = new THREE.BoxGeometry( 1, 8, 6 );
    const wing1Material = new THREE.MeshLambertMaterial( {color: 0xe60000} );
    const wing1 = new THREE.Mesh( wing1Geometry, wing1Material );
    wing1.position.set(-50,4.5,-9);
    wing1.rotation.set(10,3,0);
    scene.add( wing1 );

    // Bottom Wing 2
    const wing2Geometry = new THREE.BoxGeometry( 1, 8, 6 );
    const wing2Material = new THREE.MeshLambertMaterial( {color: 0xe60000} );
    const wing2 = new THREE.Mesh( wing2Geometry, wing2Material );
    wing2.position.set(-50,0,-3);
    wing2.rotation.set(10,3,0);
    scene.add( wing2 );

    // Bottom
    const bottomGeometry = new THREE.CylinderGeometry( 5, 5, 0.5 );
    const bottomMaterial = new THREE.MeshLambertMaterial( {color: 0x404040} );
    const bottom = new THREE.Mesh( bottomGeometry, bottomMaterial );
    bottom.position.set(-50,0,-7);
    bottom.rotation.set(10.01,10,0);
    scene.add( bottom );

    // Bottom 1
    const bottom1Geometry = new THREE.CylinderGeometry( 5, 5, 0.5 );
    const bottom1Material = new THREE.MeshLambertMaterial( {color: 0x404040} );
    const bottom1 = new THREE.Mesh( bottom1Geometry, bottom1Material );
    bottom1.position.set(-50,0,-7.5);
    bottom1.rotation.set(10.01,10,0);
    scene.add( bottom1 );

    //Window Frame 
    const frameGeometry = new THREE.TorusGeometry( 2, 0.3, 16, 100 );
    const frameMaterial = new THREE.MeshStandardMaterial( { color: 0x333333 } );
    const frame = new THREE.Mesh( frameGeometry, frameMaterial );
    frame.position.set(-45,10,-3);
    frame.rotation.set(9.8,4.5,0);
    scene.add( frame );

    // Window glass
    const glassGeometry = new THREE.SphereGeometry( 2, 32 );
    const glassMaterial = new THREE.MeshPhongMaterial( { color: 0x99ccff } );
    const glass = new THREE.Mesh( glassGeometry, glassMaterial );
    glass.position.set(-45,10,-3);
    glass.rotation.set(10,4.5,0);
    scene.add( glass );
    }

// The stars
function particles() {
    const points = [];
  
    for (let i = 0; i < 6000; i++) {
      let star = new THREE.Vector3(
        Math.random() * 600 - 300,
        Math.random() * 600 - 300,
        Math.random() * 600 - 300
      );
      star.velocity = 20;
      star.acceleration = 20
      points.push(star);
    }
  
    starGeo = new THREE.BufferGeometry().setFromPoints(points);
  
    let sprite = new THREE.TextureLoader().load("assets/images/star.png");
    let starMaterial = new THREE.PointsMaterial({
      color: 0xffb6c1,
      size: 0.7,
      map: sprite,
    })
    let starMaterial2 = new THREE.PointsMaterial({
      color: Math.random() * 0xffffff,
      size: 0.7,
      map: sprite,
    });
  
    stars = new THREE.Points(starGeo, starMaterial);
    scene.add(stars);
}

// To animate the stars
function animateParticles() {
        starGeo.verticesNeedUpdate = true;
        stars.position.x -= 0.005;
  }


// Lighting
function lighting() {
    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.5);
    scene.add(light);

    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(15, 15, 15);
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 1024;
    spotLight.shadow.mapSize.height = 1024;
    spotLight.shadow.camera.near = 500;
    spotLight.shadow.camera.far = 4000;
    spotLight.shadow.camera.fov = 30;
    scene.add(spotLight);
}
// Crewmate
function crewmateModel() {
    const gltfloader = new GLTFLoader();
    gltfloader.load('/amogus/assets/models/crewmate.glb', function (gltf) {
        crewmate = gltf.scene;
        scene.add(gltf.scene);
    });
}
// Rotate Crewmate Function
function rotateCrewmate() {

    crewmate.rotation.x += 0.008;
    crewmate.rotation.y += 0.008;
    crewmate.position.x += 0.01

    
}


camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 20);
controls.update();

function animate() {
    requestAnimationFrame(animate);

    animateParticles();
    rotateCrewmate();

    controls.update();
    renderer.render(scene, camera);
}

animate();

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MeshStandardMaterial } from 'three/src/materials/MeshStandardMaterial';
import { AmbientLight } from 'three/src/lights/AmbientLight';


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
// Ajustement de la position de la caméra
camera.position.set(230, 100, -50); // Décalage vers la droite, vers le haut et vers l'arrière
camera.lookAt(0, 0, 0); // Focalisation sur le point central de la scène

// Ajustement du zoom de la caméra
camera.zoom = 0.5; // Valeur de zoom plus petite que 1 pour un effet de dézoom
camera.updateProjectionMatrix(); // Mise à jour de la matrice de projection de la caméra

const params = {
    speed: 0.001, // Vitesse initiale
  };

// Boutons
const homeButton = document.getElementById('home-button');
const toggleButton = document.getElementById('toggle-button');
// const freezeButton = document.getElementById('freezeButton');
const ambientLightBtn = document.getElementById('toggleAmbientLightBtn');


var ambientLightEnabled = true;
var ambientLight = null; // Référence à la lumière ambiante

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = true;
controls.enablePan = false;
controls.maxDistance = 1000;
controls.target.set(0, 0, 0);

const solarSystem = new THREE.Group(); // Groupe pour le système solaire
scene.add(solarSystem);

const sunGeometry = new THREE.SphereGeometry(18, 32, 32);
const sunTexture = new THREE.TextureLoader().load('./img/2k_sun.jpg');
const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    metalness: 0.3,
    roughness: 0.1,
    emissive: new THREE.Color(0xffff00), // Couleur d'émission du soleil (jaune)
});

const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);

let time = 0; // Temps initial
const speed = 0.01; // Vitesse de déplacement des points


solarSystem.add(sunMesh); // Ajouter le Soleil au système solaire

const moonOrbitRadius = 3;

const earthGeometry = new THREE.SphereGeometry(1.8, 32, 32);
const earthTexture = new THREE.TextureLoader().load('./img/2k_earth_daymap.jpg');
const earthMaterial = new MeshStandardMaterial({ map: earthTexture, roughness: 0.1, metalness: 0.3 });
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
earthMesh.position.set(60, 0, 0); // Position de la Terre par rapport au Soleil

// Créer une sphère pour Mercure
const mercuryGeometry = new THREE.SphereGeometry(1, 32, 32)
const mercuryTexture = new THREE.TextureLoader().load('./img/2k_mercury.jpg')
const mercuryMaterial = new THREE.MeshStandardMaterial({map : mercuryTexture, roughness: 0.1, metalness: 0.3})
const mercuryMesh = new THREE.Mesh(mercuryGeometry, mercuryMaterial)
solarSystem.add(mercuryMesh)

// Créer une sphère pour Venus
const venusGeometry = new THREE.SphereGeometry(1.4, 32, 32)
const venusTexture = new THREE.TextureLoader().load('./img/2k_venus_atmosphere.jpg')
const venusMaterial = new THREE.MeshStandardMaterial({map : venusTexture, roughness: 0.1, metalness: 0.3})
const venusMesh = new THREE.Mesh(venusGeometry, venusMaterial)
solarSystem.add(venusMesh)

// Créer une sphère pour la Lune
const moonGeometry = new THREE.SphereGeometry(0.45, 32, 32)
const moonTexture = new THREE.TextureLoader().load('./img/2k_moon.jpg')
const moonMaterial = new THREE.MeshStandardMaterial({map : moonTexture, roughness: 0.1, metalness: 0.3})
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial)
solarSystem.add(moonMesh)

// Créer une sphère pour Mars
const marsGeometry = new THREE.SphereGeometry(1.2, 32, 32)
const marsTexture = new THREE.TextureLoader().load('./img/2k_mars.jpg')
const marsMaterial = new THREE.MeshStandardMaterial({map : marsTexture, roughness: 0.1, metalness: 0.3})
const marsMesh = new THREE.Mesh(marsGeometry, marsMaterial)
solarSystem.add(marsMesh)

// Créer une sphère pour Jupiter
const jupiterGeometry = new THREE.SphereGeometry(8, 32, 32)
const jupiterTexture = new THREE.TextureLoader().load('./img/2k_jupiter.jpg')
const jupiterMaterial = new THREE.MeshStandardMaterial({map : jupiterTexture, roughness: 0.1, metalness: 0.3})
const jupiterMesh = new THREE.Mesh(jupiterGeometry, jupiterMaterial)
solarSystem.add(jupiterMesh)

// Créer une sphère pour Saturne
const saturnGeometry = new THREE.SphereGeometry(6.5, 32, 32)
const saturnTexture = new THREE.TextureLoader().load('./img/2k_saturn.jpg')
const saturnMaterial = new THREE.MeshStandardMaterial({map : saturnTexture, roughness: 0.1, metalness: 0.3})
const saturnMesh = new THREE.Mesh(saturnGeometry, saturnMaterial)
solarSystem.add(saturnMesh)

// Créer une sphère pour Uranus
const uranusGeometry = new THREE.SphereGeometry(5, 32, 32)
const uranusTexture = new THREE.TextureLoader().load('./img/2k_uranus.jpg')
const uranusMaterial = new THREE.MeshStandardMaterial({map : uranusTexture, roughness: 0.1, metalness: 0.3})
const uranusMesh = new THREE.Mesh(uranusGeometry, uranusMaterial)
solarSystem.add(uranusMesh)

// Créer une sphère pour Neptune
const neptuneGeometry = new THREE.SphereGeometry(5, 32, 32)
const neptuneTexture = new THREE.TextureLoader().load('./img/2k_neptune.jpg')
const neptuneMaterial = new THREE.MeshStandardMaterial({map : neptuneTexture, roughness: 0.1, metalness: 0.3})
const neptuneMesh = new THREE.Mesh(neptuneGeometry, neptuneMaterial)
solarSystem.add(neptuneMesh)


// Créer une géométrie pour l'élément
const elementGeometry = new THREE.RingGeometry(10, 13, 64);

// Créer un matériau pour l'élément
const elementMaterial = new THREE.MeshBasicMaterial({
  color: 0xFFFFFF, // Couleur de base de l'élément (blanc)
  side: THREE.DoubleSide, // Afficher les deux côtés de l'élément
  transparent: true, // Permettre la transparence
  opacity: 0.5 // Opacité de l'élément (réglable selon vos préférences)
});

// Créer un objet Mesh pour l'élément
const elementMesh = new THREE.Mesh(elementGeometry, elementMaterial);

// Appliquer un dégradé de couleurs sur l'élément
const colors = [];

for (let i = 0; i < elementGeometry.attributes.position.count; i++) {
  const ratio = (elementGeometry.attributes.position.getY(i) - elementGeometry.parameters.innerRadius) /
                (elementGeometry.parameters.outerRadius - elementGeometry.parameters.innerRadius);
  //const color = new THREE.Color().setHSL(0.66, 1, ratio); // Couleur bleue (teinte 0.66)
  const brown = new THREE.Color(0.4, 0.2, 0.1);
  const color = new THREE.Color().setHSL(brown, 1, ratio);
  colors.push(color.r, color.g, color.b);
}

elementGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
elementMaterial.vertexColors = true;

elementGeometry.colorsNeedUpdate = true; // Mettre à jour les couleurs de la géométrie

// Positionner et orienter l'élément selon vos besoins
elementMesh.position.set(0, 0, 0); // Les coordonnées peuvent varier selon votre scène
elementMesh.rotation.x = Math.PI / 2; // Rotation de 90 degrés autour de l'axe X

// Ajouter l'élément à votre scène
saturnMesh.add(elementMesh);



solarSystem.add(earthMesh); // Ajouter la Terre au système solaire
solarSystem.add(mercuryMesh);
solarSystem.add(venusMesh);
solarSystem.add(marsMaterial); 
solarSystem.add(jupiterMesh	); 
solarSystem.add(saturnMesh); 
solarSystem.add(uranusMesh); 
solarSystem.add(neptuneMesh);  



const directionalLight = new THREE.DirectionalLight(0xffffff, 0.45);
directionalLight.position.set(0, 0, 0); // Position de la source de lumière
scene.add(directionalLight);


const sunLight = new THREE.PointLight(0xffffff, 1);
sunLight.position.set(0, 0, 0); // Position du Soleil
scene.add(sunLight);


// Créer une géométrie pour les étoiles
const starsGeometry = new THREE.BufferGeometry();
const starCount = 7000; // Nombre d'étoiles

// Créer un tableau de positions pour les étoiles
const positions = [];
for (let i = 0; i < starCount; i++) {
  const x = Math.random() * 2000 - 1000; // Coordonnée x aléatoire dans la plage -1000 à 1000
  const y = Math.random() * 2000 - 1000; // Coordonnée y aléatoire dans la plage -1000 à 1000
  const z = Math.random() * 2000 - 1000; // Coordonnée z aléatoire dans la plage -1000 à 1000
  positions.push(x, y, z);
}

// Ajouter les positions au BufferGeometry
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

// Créer un matériau pour les étoiles
const starsMaterial = new THREE.ShaderMaterial({
  vertexShader: `
    uniform float time;

    void main() {
      vec3 newPosition = position;

      // Ajouter un déplacement aléatoire aux étoiles
      newPosition.x += sin(time + position.x) * 5.0;
      newPosition.y += cos(time + position.y) * 5.0;
      newPosition.z += sin(time + position.z) * 5.0;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
      gl_PointSize = 0.0001; // Taille des étoiles
    }
  `,
  fragmentShader: `
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0); // Couleur des étoiles
    }
  `,
  uniforms: {
    time: { value: 0 }
  }
});

// Créer l'objet pour les étoiles
const starsPoints = new THREE.Points(starsGeometry, starsMaterial);
starsMaterial.emissiveIntensity = Math.random() * 500;

// Ajouter l'objet à la scène
solarSystem.add(starsPoints);

// Fonction d'animation
function animateStars() {
  // Mettre à jour le temps pour l'effet de déplacement aléatoire
  starsMaterial.uniforms.time.value += 0.005;

  // Demander une nouvelle frame d'animation
  requestAnimationFrame(animateStars);
}

// Démarrer l'animation des étoiles
animateStars();


//Etoile filante

const starGeometry = new THREE.SphereGeometry(0.1, 1, 1);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const star = new THREE.Mesh(starGeometry, starMaterial);
solarSystem.add(star);

    // Définir les points de contrôle de la courbe de Bézier
    const startPoint = new THREE.Vector3(40, 50, 60); // Point de départ
const controlPoint1 = new THREE.Vector3(5, 10, 44); // Premier point de contrôle
const controlPoint2 = new THREE.Vector3(10, -5, -88); // Deuxième point de contrôle
const endPoint = new THREE.Vector3(15, 80, 33); // Point d'arrivée

//Etoile filante 2
const starGeometry2 = new THREE.SphereGeometry(0.1, 1, 1);
const starMaterial2 = new THREE.MeshBasicMaterial({ color: 0xffffff });
const star2 = new THREE.Mesh(starGeometry2, starMaterial2);
solarSystem.add(star2);

    // Définir les points de contrôle de la courbe de Bézier
    const startPoint2 = new THREE.Vector3(12, 22, 21); // Point de départ
    const controlPoint1_2 = new THREE.Vector3(10, 10, -10); // Premier point de contrôle
const controlPoint2_2 = new THREE.Vector3(20, -5, -10); // Deuxième point de contrôle
const endPoint2 = new THREE.Vector3(30, 0, -10); // Point d'arrivée
 // Point d'arrivée

 // Créer une fonction pour générer une étoile filante
function createShootingStar() {
  // Créer une géométrie et un matériau pour l'étoile
  const starGeometry = new THREE.SphereGeometry(0.2, 8, 8);
  const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const stars = new THREE.Mesh(starGeometry, starMaterial);

  // Définir les points de contrôle de la courbe de Bézier
  const startPoint = new THREE.Vector3(40, 50, 60); // Point de départ
  const controlPoint1 = new THREE.Vector3(5, 10, 44); // Premier point de contrôle
  const controlPoint2 = new THREE.Vector3(10, -5, -88); // Deuxième point de contrôle
  const endPoint = new THREE.Vector3(15, 80, 33); // Point d'arrivée

  // Créer une courbe de Bézier avec les points de contrôle
  const curve = new THREE.CubicBezierCurve3(startPoint, controlPoint1, controlPoint2, endPoint);

  // Définir le nombre d'étapes pour diviser la courbe
  const numSteps = 100;

  // Calculer les positions de l'étoile le long de la courbe
  const positionsStars = curve.getPoints(numSteps);

  // Ajouter l'étoile à la scène
  solarSystem.add(stars);

  // Animer l'étoile en déplaçant sa position à chaque frame
  let step = 0;
  function animateEtoile() {
    // Incrémenter l'étape de l'animation
    step++;

    // Vérifier si l'étoile a atteint la fin de la trajectoire
    if (step >= numSteps) {
      // Réinitialiser l'étape et réanimer l'étoile
      step = 0;
    }

    // Mettre à jour la position de l'étoile
    stars.position.copy(positionsStars[step]);

    // Appeler la fonction animate à la prochaine frame d'animation
    requestAnimationFrame(animateEtoile);
  }

  // Appeler la fonction animate pour démarrer l'animation de l'étoile
  animateEtoile();
}

// Appeler la fonction createShootingStar pour créer 5 étoiles filantes
for (let i = 0; i < 5; i++) {
  createShootingStar();
}


// Paramètre pour contrôler la progression de la trajectoire
let t = 0;

function updateStarPosition() {
  // Calculer la position de l'étoile filante en utilisant la courbe de Bézier
  const position = new THREE.Vector3();
  position.copy(startPoint)
    .lerp(controlPoint1, t)
    .lerp(controlPoint2, t)
    .lerp(endPoint, t);

  // Mettre à jour la position de l'étoile filante
  star.position.copy(position);
  
  // Mettre à jour le paramètre pour progresser sur la trajectoire
  t += 0.005;
  if (t > 1) {
    t = 0;
  }
}

function updateStarPosition2() {
  // Calculer la position de l'étoile filante 2 en utilisant la courbe de Bézier
  const position2 = new THREE.Vector3();
  position2.copy(startPoint2)
    .lerp(controlPoint1_2, t)
    .lerp(controlPoint2_2, t)
    .lerp(endPoint2, t);


  // Mettre à jour la position de l'étoile filante
  star2.position.copy(position2);

  t += 0.005;
  if (t > 1) {
    t = 0;
  }
}

const animationDuration = 10;
let animationTime = 0;
let animationId;
let animationId2;

function startAnimation() {
  if (!animationId) {
    animate();
  }
}

function stopAnimation() {
  cancelAnimationFrame(animationId);
  animationId = undefined;
}

function retourVueInitiale() {
camera.position.set(300, 20, 0);
camera.lookAt(0, 0, 0);
  
  }
  
homeButton.addEventListener('click', retourVueInitiale);

// Récupérez l'élément audio
const backgroundMusic = document.getElementById('background-music');

// Fonction pour démarrer la musique
function playBackgroundMusic() {
  backgroundMusic.play();
}

// Fonction pour arrêter la musique
function stopBackgroundMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}


function animate() {
  animationId = requestAnimationFrame(animate);

    // Faire tourner les autour de leur axe Y
  venusMesh.rotation.y -= 0.0001;
  mercuryMesh.rotation.y -= 0.00001;
  earthMesh.rotation.y -= 0.2;
  marsMesh.rotation.y -= 0.21;
  jupiterMesh.rotation.y -= 0.3;
  saturnMesh.rotation.y -= 0.29;
  uranusMesh.rotation.y -= 0.25
  neptuneMesh.rotation.y -= 0.27;

  // Fait tourner la Terre autour du Soleil sur son orbite (rotation autour du Soleil)
  mercuryMesh.position.x = 60 * Math.cos(animationTime * 2.4);
  mercuryMesh.position.z = 60 * Math.sin(animationTime * 2.4);
  venusMesh.position.x = 70 * Math.cos(animationTime * 1.8);
  venusMesh.position.z = 70 * Math.sin(animationTime * 1.8);
  earthMesh.position.x = 80 * Math.cos(animationTime * 1.4);
  earthMesh.position.z = 80 * Math.sin(animationTime * 1.4);
  marsMesh.position.x = 90 * Math.cos(animationTime * 1.2);
  marsMesh.position.z = 90 * Math.sin(animationTime * 1.2);
  jupiterMesh.position.x = 120 * Math.cos(animationTime * 1);
  jupiterMesh.position.z = 120 * Math.sin(animationTime * 1);
  saturnMesh.position.x = 180 * Math.cos(animationTime * 0.75);
  saturnMesh.position.z = 180 * Math.sin(animationTime * 0.75);
  uranusMesh.position.x = 240 * Math.cos(animationTime * 0.6);
  uranusMesh.position.z = 240 * Math.sin(animationTime * 0.6);
  neptuneMesh.position.x = 280 * Math.cos(animationTime * 0.4);
  neptuneMesh.position.z = 280 * Math.sin(animationTime * 0.4);

 // Rayon de l'orbite de la Lune autour de la Terre

// Mettre à jour la position de la Lune pour créer l'effet d'orbite autour de la Terre
let moonX = Math.cos(animationTime * 4) * moonOrbitRadius;
let moonZ = Math.sin(animationTime * 4) * moonOrbitRadius;
moonMesh.position.set(earthMesh.position.x + moonX, 0, earthMesh.position.z + moonZ);


  // Met à jour le temps de l'animation
  animationTime += 0.01;

  time += params.speed; // Utilisez params.speed au lieu de la valeur fixe

  
  updateStarPosition();
  updateStarPosition2()

  renderer.render(scene, camera);
}

// Déclarer une variable pour suivre l'état de l'animation
let isAnimationPlaying = false;

var icon = toggleButton.querySelector("i");

// Fonction appelée lors du clic sur le bouton
function toggleVideoDemo() {
  if (isAnimationPlaying) {
    // Appeler la fonction d'arrêt de l'animation
    stopAnimation();
    stopBackgroundMusic();
    
    toggleButton.classList.remove("pause");
    toggleButton.classList.add("play");
      icon.classList.remove("fa-pause");
      icon.classList.add("fa-play");
      $('.play').attr('title', "Lancer l'animation");

      homeButton.classList.remove('disabled');
    //   freezeButton.classList.remove('disabled');
      ambientLightBtn.classList.remove('disabled');
  } 

  else {
    // Appeler la fonction de démarrage de l'animation
    playBackgroundMusic();
    videoDemo()

      toggleButton.classList.remove("play");
    toggleButton.classList.add("pause");
      icon.classList.remove("fa-play");
      icon.classList.add("fa-pause");
      $('.pause').attr('title', "Arrêter l'animation");
      

      homeButton.classList.add('disabled');
    //   freezeButton.classList.add('disabled');
      ambientLightBtn.classList.add('disabled');
  }

  // Inverser l'état de l'animation
  isAnimationPlaying = !isAnimationPlaying;

 }
  
const cameraDistanceMin = 50; // Distance minimale de la caméra au soleil
const cameraDistanceMax = 300; // Distance maximale de la caméra au soleil
const cameraRotationSpeed = 0.7; // Vitesse de rotation de la caméra

let cameraDistance = 200; // Distance de départ de la caméra

function videoDemo() {
  animationId = requestAnimationFrame(videoDemo);

  // Calculer la position de la caméra en fonction du temps de l'animation
  const cameraX = Math.sin(animationTime * cameraRotationSpeed) * cameraDistance;
  const cameraY = Math.cos(animationTime * cameraRotationSpeed) * cameraDistance;
  const cameraZ = Math.cos(animationTime * cameraRotationSpeed) * cameraDistance;

  // Mettre à jour la distance de la caméra pour créer des effets de rapprochement et d'éloignement
  cameraDistance += Math.sin(animationTime * cameraRotationSpeed) * 0.1;

  // Limiter la distance de la caméra aux valeurs minimale et maximale
  cameraDistance = Math.max(cameraDistanceMin, Math.min(cameraDistanceMax, cameraDistance));

  // Définir la nouvelle position de la caméra
  camera.position.set(cameraX, cameraY, cameraZ);

  // Orienter la caméra vers le soleil
  camera.lookAt(scene.position);

  //Faire tourner les planètes
  venusMesh.rotation.y -= 0.0001;
  mercuryMesh.rotation.y -= 0.00001;
  earthMesh.rotation.y -= 0.2;
  marsMesh.rotation.y -= 0.21;
  jupiterMesh.rotation.y -= 0.3;
  saturnMesh.rotation.y -= 0.29;
  uranusMesh.rotation.y -= 0.25;
  neptuneMesh.rotation.y -= 0.27;
  
  // Mettre à jour les positions des étoiles filantes
  updateStarPosition();
  updateStarPosition2();
  
  // Rendu de la scène avec la caméra actuelle
  renderer.render(scene, camera);
}



// Fonction pour ajouter ou enlever la luminosité ambiante en fonction de l'état du bouton
function toggleAmbientLight() {
  var toggleAmbientLightBtn = document.getElementById("toggleAmbientLightBtn");
  var toggleAmbientLightIcon = document.getElementById("toggleAmbientLightIcon");

  if (ambientLightEnabled) {
    // Ajouter la lumière ambiante à la scène
    ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Mettre à jour l'état du bouton et l'icône
    toggleAmbientLightBtn.classList.add("active");
    toggleAmbientLightIcon.classList.add("fa-flip-horizontal");

    // freezeButton.classList.add('disabled');
    toggleButton.classList.add('disabled');
  } 

  else {
    // Supprimer la lumière ambiante de la scène
    if (ambientLight !== null) {
      scene.remove(ambientLight);
      ambientLight = null;
    }

    // Mettre à jour l'état du bouton et l'icône
    toggleAmbientLightBtn.classList.remove("active");
    toggleAmbientLightIcon.classList.remove("fa-flip-horizontal");

    // freezeButton.classList.remove('disabled');
    toggleButton.classList.remove('disabled');
  }

  // Inverser l'état du bouton
  ambientLightEnabled = !ambientLightEnabled;
}

toggleButton.addEventListener('click', toggleVideoDemo);
ambientLightBtn.addEventListener('click', toggleAmbientLight)



const minRotationSpeed = 0.0001; // Vitesse minimale de révolution sur elle-même
const maxRotationSpeed = 0.1; // Vitesse maximale de révolution sur elle-même
const defaultRotationSpeed = 0.01; // Vitesse de révolution sur elle-même par défaut
let rotationDirection = 1; // Direction de rotation sur elle-même (1 pour la rotation positive, -1 pour la rotation négative)
let currentRotationSpeed = defaultRotationSpeed; // Vitesse de révolution sur elle-même courante

$(document).ready(function() {
  // Créez le curseur avec les options souhaitées
  $("#slider").slider({
    min: -1,
    max: 1,
    step: 0.1,
    value: 0,
    slide: function(event, ui) {
      // Mettez à jour la direction de rotation en fonction de la valeur du curseur
      rotationDirection = ui.value >= 0 ? 1 : -1;

      // Mettez à jour la vitesse de révolution courante avec la nouvelle vitesse absolue
      const rotationSpeed = calculateRotationSpeed(ui.value);
      currentRotationSpeed = rotationSpeed;
    }
  });

  // Démarrez l'animation par défaut
  animateDefault();
});

function animateDefault() {
  requestAnimationFrame(animateDefault);

  // Augmentez l'animationTime en fonction de la direction de rotation et de la vitesse de révolution courante
  animationTime += rotationDirection * currentRotationSpeed;

  // Mettez à jour la position des planètes avec l'animationTime
}

function calculateRotationSpeed(value) {
  // Vérifiez si la valeur du curseur est égale à 0, et attribuez la vitesse de révolution par défaut dans ce cas
  if (value === 0) {
    return 0; // La vitesse de rotation est nulle lorsque la valeur du curseur est à 0
  }

  // Calculez la vitesse de révolution en fonction de la valeur du curseur
  let rotationProgress = Math.abs(value);
  let rotationSpeed;

  if (value > 0) {
    rotationSpeed = rotationProgress * (maxRotationSpeed - defaultRotationSpeed) + defaultRotationSpeed;
  } else {
    rotationSpeed = rotationProgress * (defaultRotationSpeed - minRotationSpeed) + minRotationSpeed;
  }

  return rotationSpeed;
}

$(document).ready(function() {
    // Ajouter l'icône de planète à l'élément de curseur
    $('.ui-slider-handle.ui-corner-all.ui-state-default').html('<i class="fas fa-globe-americas"></i>');
    $('.ui-slider-handle.ui-corner-all.ui-state-default')
    .html('<i class="fas fa-globe-americas"></i>')
    .find('i.fa-globe-americas')
    .css({
      'font-size': '15px',
      'color': 'rgba(71, 169, 255)',
      'margin-left': '13%'
      
    });
  
    // Ajouter le titre à l'élément de curseur
    $('.ui-slider-handle.ui-corner-all.ui-state-default').attr('title', 'Varier la vitesse des planètes');
  });
  

startAnimation();



  

  
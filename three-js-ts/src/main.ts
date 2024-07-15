import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { main } from "./midi";
import * as Tone from "tone";

// read midi file
Tone.start();

async function game() {
  const notes = await main();
  let noteIdx = 0;

  const withSound = false;

  const lineWidth = 4;
  //const velocity = 0.62;
  const velocity = 0.92;

  const scene = new THREE.Scene();

  //scene.add(mesh);

  const temp = {
    width: 1024,
    height: 576,
  };

  const camera = new THREE.PerspectiveCamera(75, temp.width / temp.height);

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(temp.width, temp.height);

  // camera.translateZ(80);
  // camera.translateY(-0);

  /// camera.translateX(101);
  /// camera.translateY(13);
  /// camera.translateY(11);

  // camera.translateX(94);
  // camera.translateY(12);
  // camera.translateY(-58);

  camera.position.x = 94;
  camera.position.y = 12;
  camera.position.z = -58;

  const objectsPositin = new THREE.Vector3();
  const synth = new Tone.Synth().toDestination();
  let now = Tone.now();

  function addLine(
    position: THREE.Vector3,
    dimensions: THREE.Vector3
  ): THREE.Object3D {
    const color = new THREE.Color(Math.random(), Math.random(), Math.random());
    const geometry = new THREE.BoxGeometry(dimensions.x, 0.5, 0.5);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = position.x;
    mesh.position.y = position.y;
    mesh.position.z = position.z;

    // refactor
    // plat note
    if (withSound) {
      const note = notes[noteIdx];
      synth.triggerAttack(note.name, now);
      synth.triggerRelease(now + note.ticks / 10);
      now = Tone.now() + 1 / 10;
    }

    return mesh;
  }

  let time = 0;

  let meshes: THREE.Object3D[] = [];

  const _mesh = addLine(
    new THREE.Vector3(0, Math.random(), 0),
    new THREE.Vector3(lineWidth, 0, 0)
  );

  let lastMesh: { mesh?: THREE.Object3D; width: number; go?: boolean } = {
    go: false,
    width: lineWidth,
  };

  meshes.push(_mesh);
  scene.add(_mesh);
  lastMesh.mesh = _mesh;
  lastMesh.go = false;

  let angle = 0.0;

  function animate() {
    time += 1;
    objectsPositin.x = objectsPositin.x - velocity;

    for (let i = 0; i < meshes.length; i++) {
      meshes[i].position.x += -velocity;

      //meshes[i].position.y = position.y + objectsPositin.y;
      //meshes[i].position.z = position.z + objectsPositin.z;
    }

    if (meshes.length > 0 && lastMesh?.go === false) {
      const offset = 100;

      if (
        lastMesh.mesh &&
        lastMesh.mesh.position.x < -lastMesh.width + offset &&
        notes[noteIdx]
      ) {
        // debug info
        console.log(camera.position);

        //let _lineWidth = lineWidth  + Math.random() * 20;
        const note = notes[noteIdx++];
        let _lineWidth = note.ticks / 10;

        let heightLine = -20 + note.midi / 2;

        // offset of next line
        let _xx = _lineWidth - lastMesh.width;

        const _mesh = addLine(
          new THREE.Vector3(offset + _xx / 2, heightLine, 0),
          new THREE.Vector3(_lineWidth, 0, 0)
        );

        angle += 0.005;
        lastMesh.go = true;
        //lastMesh.mesh.rotateX(angle)
        //lastMesh.mesh.rotateY(angle)

        meshes.push(_mesh);
        scene.add(_mesh);
        lastMesh.mesh = _mesh;
        lastMesh.go = false;
        lastMesh.width = _lineWidth;
      }
    }

    renderer.render(scene, camera);
  }

  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  renderer.setAnimationLoop(animate);

  //renderer.render(scene, camera);
}

game();

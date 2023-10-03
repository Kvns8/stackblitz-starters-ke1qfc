import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Script from 'next/script';
import * as THREE from 'three';
import { useEffect } from 'react';


export default function Home() {
    useEffect(() => {
        // Create a scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xffffff );
    
        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
    
        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('scene-container').appendChild(renderer.domElement);
    
        // Create a credit card geometry with rounded corners
        const width = 3;
        const height = 1.7;
        const length = 0.1
        const x = 0 - width/2;
        const y = 0 - height/2;
        const z = 0 - length/2
        const radius = 0.2;

        // Create card shape
        const shape = new THREE.Shape()
          .moveTo(x, y + radius)
          .lineTo(x, y + height - radius)
          .quadraticCurveTo(x, y + height, x + radius, y + height)
          .lineTo(x + width - radius, y + height)
          .quadraticCurveTo(x + width, y + height, x + width, y + height - radius)
          .lineTo(x + width, y + radius)
          .quadraticCurveTo(x + width, y, x + width - radius, y)
          .lineTo(x + radius, y)
          .quadraticCurveTo(x, y, x, y + radius);
          
          const extrudeSettings = {
            amount: 0.1,
            steps: 1,
            depth: 0.03,
            bevelEnabled: false,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 1
          };

        // Create card mesh
        const cardGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

        // Create a card material (you can add a texture here for card details)
        const cardMaterial = new THREE.MeshBasicMaterial({ color: 0x001861 });
    
        // Create a card mesh
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
    
        // Add the card to the scene
        scene.add(card);
    
        // Create ambient light
        //const ambientLight = new THREE.AmbientLight(0x001861);
        //scene.add(ambientLight);
    
        // Create directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
    
        // Function to handle window resizing
        window.addEventListener('resize', () => {
          const newWidth = window.innerWidth;
          const newHeight = window.innerHeight;
          renderer.setSize(newWidth, newHeight);
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
        });
    
        /// Animation function
        const animate = () => {
          requestAnimationFrame(animate);
          card.rotation.x += 0.003;
          card.rotation.y += 0.002;
          renderer.render(scene, camera);
        };
    
        animate();
      }, []);
    
      return (
        <div id="scene-container" style={{ width: '100%', height: '100vh' }}></div>
      );
}

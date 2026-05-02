'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ResonanceField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(3, 2, 5);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    
    const points = [];
    for (let i = 0; i < 216; i++) {
      const t = i / 216;
      const theta = 2 * Math.PI * 1.618 * i;
      const phi = Math.acos(1 - 2 * t);
      const r = 1.5;
      points.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta) * 0.8, r * Math.cos(phi)));
    }
    
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(points.length * 3);
    points.forEach((p, i) => {
      vertices[i*3] = p.x;
      vertices[i*3+1] = p.y;
      vertices[i*3+2] = p.z;
    });
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0x00ffaa, size: 0.08 });
    const pointsObj = new THREE.Points(geometry, material);
    scene.add(pointsObj);
    
    const animate = () => {
      pointsObj.rotation.y += 0.005;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();
    
    return () => { if (mountRef.current && renderer.domElement) mountRef.current.removeChild(renderer.domElement); };
  }, []);
  
  return <div ref={mountRef} className="w-full h-full" />;
}
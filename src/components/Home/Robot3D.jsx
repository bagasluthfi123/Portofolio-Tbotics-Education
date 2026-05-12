import { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Torus, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

function RobotHead() {
  const headRef = useRef();
  const ringRef = useRef();
  const ballRef = useRef();
  const leftHandRef = useRef();
  const rightHandRef = useRef();

  const [blink, setBlink] = useState(false);
  const [mood, setMood] = useState('normal');
  const [isSpinning, setIsSpinning] = useState(false);

  const headMatRef = useRef();
  const antennaMatRef = useRef();
  const ballMatRef = useRef();
  const tempColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    const moods = ['normal', 'senang', 'kaget', 'ngantuk'];
    let index = 0;
    const moodInterval = setInterval(() => {
      if (!isSpinning) {
        index = (index + 1) % moods.length;
        setMood(moods[index]);
      }
    }, 4000);
    return () => clearInterval(moodInterval);
  }, [isSpinning]);

  const handleRobotClick = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setMood('pusing');
    setTimeout(() => {
      setIsSpinning(false);
      setMood('senang');
    }, 1500);
  };

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const targetX = state.pointer.x * 0.5;
    const targetY = state.pointer.y * 0.5;

    if (isSpinning) {
      headRef.current.rotation.y += 0.4;
      headRef.current.position.y = Math.sin(time * 10) * 0.1;
    } else {
      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetX + Math.sin(time * 0.5) * 0.2, 0.1);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -targetY, 0.1);
      headRef.current.position.y = Math.sin(time) * 0.2;
    }

    if (leftHandRef.current && rightHandRef.current) {
      if (isSpinning) {
        leftHandRef.current.position.y = THREE.MathUtils.lerp(leftHandRef.current.position.y, 0.8, 0.2);
        rightHandRef.current.position.y = THREE.MathUtils.lerp(rightHandRef.current.position.y, 0.8, 0.2);
      } else {
        leftHandRef.current.position.y = Math.sin(time * 3) * 0.1 - 0.4;
        rightHandRef.current.position.y = Math.sin(time * 3 + Math.PI) * 0.1 - 0.4;
      }
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.5;
      ringRef.current.rotation.x = Math.PI / 2 + Math.sin(time * 0.5) * 0.1;
      ringRef.current.rotation.y = Math.cos(time * 0.5) * 0.1;
    }

    if (ballRef.current) {
      const scale = 1 + Math.sin(time * 15) * 0.15;
      ballRef.current.scale.set(scale, scale, scale);
    }

    if (mood !== 'pusing' && Math.round(time * 10) % 30 === 0) {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }

    const colorSpeed = isSpinning ? 2.0 : 0.4;
    const hue = (time * colorSpeed) % 1;
    tempColor.setHSL(hue, 1.0, 0.6);

    if (headMatRef.current) headMatRef.current.color.copy(tempColor);
    if (antennaMatRef.current) antennaMatRef.current.color.copy(tempColor);
    if (ballMatRef.current) {
      ballMatRef.current.color.copy(tempColor);
      ballMatRef.current.emissive.copy(tempColor);
    }
  });

  let leftRotZ = 0; let rightRotZ = 0; let scaleY = 1;
  let mouthWidth = 0.5; let mouthHeight = 0.1;

  switch (mood) {
    case 'senang':
      leftRotZ = 0.2; rightRotZ = -0.2; mouthWidth = 0.6; mouthHeight = 0.2; break;
    case 'kaget':
      scaleY = 2.0; mouthWidth = 0.2; mouthHeight = 0.3; break;
    case 'ngantuk':
      scaleY = 0.3; mouthWidth = 0.3; mouthHeight = 0.05; break;
    case 'pusing':
      leftRotZ = 0.5; rightRotZ = 0.5; scaleY = 0.6; mouthWidth = 0.3; mouthHeight = 0.3; break;
    default:
      leftRotZ = 0; rightRotZ = 0; scaleY = 1; mouthWidth = 0.5; mouthHeight = 0.1;
  }

  const currentEyeHeight = (blink && mood !== 'pusing') ? 0.05 : (0.3 * scaleY);

  return (
    <group
      ref={headRef}
      onClick={handleRobotClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <Torus ref={ringRef} args={[3.2, 0.03, 16, 50]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} transparent opacity={0.3} />
      </Torus>

      <RoundedBox args={[2, 2, 2]} radius={0.4} smoothness={2}>
        <meshStandardMaterial ref={headMatRef} roughness={0.4} metalness={0.3} />
      </RoundedBox>

      <Box args={[0.1, 1, 0.1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial ref={antennaMatRef} />
      </Box>
      <Sphere ref={ballRef} args={[0.2, 16, 16]} position={[0, 2, 0]}>
        <meshStandardMaterial ref={ballMatRef} emissiveIntensity={2} />
      </Sphere>

      <Box args={[0.4, currentEyeHeight, 0.1]} position={[-0.4, 0.2, 1.01]} rotation={[0, 0, leftRotZ]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={blink ? 0 : 2} />
      </Box>
      <Box args={[0.4, currentEyeHeight, 0.1]} position={[0.4, 0.2, 1.01]} rotation={[0, 0, rightRotZ]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={blink ? 0 : 2} />
      </Box>

      <Sphere args={[0.2, 16, 16]} position={[-0.6, -0.1, 0.95]} scale={[1, 0.5, 0.2]}>
        <meshStandardMaterial color="#ff7777" emissive="#ff7777" emissiveIntensity={0.6} transparent opacity={0.8} />
      </Sphere>
      <Sphere args={[0.2, 16, 16]} position={[0.6, -0.1, 0.95]} scale={[1, 0.5, 0.2]}>
        <meshStandardMaterial color="#ff7777" emissive="#ff7777" emissiveIntensity={0.6} transparent opacity={0.8} />
      </Sphere>

      <Box args={[mouthWidth, mouthHeight, 0.1]} position={[0, -0.3, 1.01]}>
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </Box>

      <Sphere ref={leftHandRef} args={[0.25, 16, 16]} position={[-1.3, -0.4, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </Sphere>
      <Sphere ref={rightHandRef} args={[0.25, 16, 16]} position={[1.3, -0.4, 0]}>
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </Sphere>
    </group>
  );
}

// PASTIKAN NAMA EXPORT-NYA SAMA DENGAN YANG DIIMPORT DI HOME.JSX
export default function Robot3D() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId;
    const checkTime = () => {
      const date = new Date();
      if (date.getHours() === 12) { setIsVisible(false); } else { setIsVisible(true); }
      timeoutId = setTimeout(checkTime, 60000);
    };
    checkTime();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="h-[400px] md:h-[500px] w-full">
      <Canvas
        camera={{ position: [0, 0, 5.5] }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
        {isVisible && <RobotHead />}
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          // KUNCI ATAS-BAWAH (Biar robot ga salto ke atas/bawah)
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          // KUNCI KANAN-KIRI (Biar muka robot ga bisa diputer sampai ke belakang)
          minAzimuthAngle={-Math.PI / 4} 
          maxAzimuthAngle={Math.PI / 4}  
        />
      </Canvas>
    </div>
  );
}
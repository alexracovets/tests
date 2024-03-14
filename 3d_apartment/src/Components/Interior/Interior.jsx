import PropTypes from 'prop-types';
import { useGLTF, OrbitControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

Interior.propTypes = {
    setModelRef: PropTypes.func,
}

export default function Interior({ setModelRef }) {
    const { nodes, materials } = useGLTF('/model/apartment/ofice.gltf');
    const modelRef = useRef();
    const cameraState = useSelector((state) => state.stateCamera);
    const hotspotsStateCurrent = useSelector((state) => state.stateHotspots.current);
    const [isVisible, setIsVisible] = useState(true)
    const [animPosition, setAnimPosition] = useState({
        x: 2.206,
        y: 1.32,
        z: -2.276
    });

    useEffect(() => {
        modelRef && setModelRef(modelRef)
    }, [setModelRef])

    useEffect(() => {
        gsap.to(animPosition, {
            x: cameraState.position[0],
            y: cameraState.position[1],
            z: cameraState.position[2],
            ease: "power2.inOut",
            duration: 1,
            onUpdate: () => {
                setAnimPosition({
                    x: animPosition.x,
                    y: animPosition.y,
                    z: animPosition.z
                });
            }
        })

    }, [cameraState.position])

    useEffect(() => {
        if (materials['My_UV-texture_UVMAT']) {
            const material = materials['My_UV-texture_UVMAT'];
            material.transparent = true;
            material.opacity = 1;
            material.needsUpdate = true;
            material.emissiveIntensity = 0.5
        }
    }, [materials]);

    useEffect(() => {

        setIsVisible(true);
        gsap.to(materials['My_UV-texture_UVMAT'], {
            opacity: 0.5,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                materials['My_UV-texture_UVMAT'].opacity = 1
            }
        })
        setTimeout(() => {
            setIsVisible(false);
        }, 800)
    }, [hotspotsStateCurrent])

    return (
        <group ref={modelRef}>
            <mesh geometry={nodes.Plane4.geometry} visible={isVisible}>
                <primitive object={materials['My_UV-texture_UVMAT']} attach="material" />
            </mesh>
            <OrbitControls
                makeDefault
                minPolarAngle={Math.PI / 2.6}
                maxPolarAngle={Math.PI / 1.65}
                position={[animPosition.x, animPosition.y, animPosition.z]}
                target={[animPosition.x, animPosition.y, animPosition.z]}
                far={1000}
                near={0.1}
                fov={58.716}
                maxDistance={0.1}
                minDistance={-1}
                rotateSpeed={-0.3}
            />
        </group>
    )
}

useGLTF.preload('/model/apartment/ofice.gltf') 
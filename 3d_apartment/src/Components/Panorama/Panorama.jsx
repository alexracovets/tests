import { Sphere } from "@react-three/drei";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import * as THREE from 'three'; 

Panorama.propTypes = {
    rotation: PropTypes.array,
    panoram: PropTypes.object
}

export default function Panorama({ panoram, rotation }) {
    const cameraState = useSelector((state) => state.stateCamera);
    const hotspotsStateCurrent = useSelector((state) => state.stateHotspots.current);
    const [opacityParametr, setOpacityParametr] = useState({ opacity: 1 })

    useEffect(() => {
        setOpacityParametr({
            opacity: 0
        })
        setTimeout(() => {
            setOpacityParametr({
                opacity: 1
            })
        }, 800)
    }, [hotspotsStateCurrent]);

    return (
        <Sphere args={[10, 60, 60]} scale={[1, 1, -1]} position={cameraState.position} rotation={rotation}>
            <meshStandardMaterial
                map={panoram}
                side={THREE.DoubleSide}
                transparent
                opacity={opacityParametr.opacity}
            />
        </Sphere>
    );
}

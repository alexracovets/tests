import { useDispatch } from 'react-redux';
import { Plane, Ring } from "@react-three/drei";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import * as THREE from 'three';
import gsap from 'gsap';

CircleHotspot.propTypes = {
    hotspot: PropTypes.object
}
import { setIsCursorHover } from '../../store/reducers/stateCursor';
import { setPosition } from '../../store/reducers/stateCamera';
import { setCurrent } from '../../store/reducers/stateHotspots';

export default function CircleHotspot({ hotspot }) {
    const [isHover, setIsHover] = useState(false);
    const dispatch = useDispatch();

    const [animParameter] = useState({ opacity: 0 });
    const changeCameraPosition = (position) => {
        dispatch(setPosition(position));
        dispatch(setCurrent(hotspot))
    }
    useEffect(() => {
        gsap.to(animParameter, {
            opacity: isHover ? 1 : 0.3,
            duration: 0.3
        })
    }, [isHover])

    useEffect(() => {
        dispatch(setIsCursorHover(isHover))
    }, [isHover])

    return (
        <mesh
            position={hotspot.position}
            rotation={[Math.PI / 2, 0, 0]}
            onPointerEnter={() => setIsHover(true)}
            onPointerLeave={() => setIsHover(false)}
            onClick={() => changeCameraPosition(hotspot.cameraPosition)}
        >
            <Ring args={[0.1, 0.17, 50, 1]} >
                <meshBasicMaterial color={"white"} side={THREE.DoubleSide} opacity={animParameter.opacity} transparent />
            </Ring>
            <Plane args={[0.5, 0.5]}>
                <meshNormalMaterial side={THREE.DoubleSide} visible={false} />
            </Plane>
        </mesh>

    );
}

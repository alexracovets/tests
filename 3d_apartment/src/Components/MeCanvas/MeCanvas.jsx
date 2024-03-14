import { Canvas } from "@react-three/fiber";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as THREE from 'three'

import Interior from "../Interior/Interior";
import Panorama from "../Panorama/Panorama";
import InteractiveMesh from "../InteractiveMesh/InteractiveMesh";
import CircleHotspot from "../CircleHotspot/CircleHotspot";

import s from './MeCanvas.module.scss';

export default function MeCanvas() {
    const [modelRef, setModelRef] = useState(null);
    const cursorState = useSelector((state) => state.stateCursor.isCursorHover);
    const hotspotsState = useSelector((state) => state.stateHotspots);
    const [texture, setTexture] = useState(null);
    const textureLoader = new THREE.TextureLoader();

    useEffect(() => {
        const loadTexture = async () => {
            const texture = await textureLoader.loadAsync(`panorams/${hotspotsState.current.id}.jpg`);
            setTexture(texture);
        };

        loadTexture();
    }, [hotspotsState.current]);

    return (
        <Canvas
            dpr={window.devicePixelRatio}
            gl={{ preserveDrawingBuffer: true }}
            camera={{ fov: 90, near: 0.1, far: 1000 }}
            className={cursorState ? s.onHover : s.unHover}
        >
            <ambientLight intensity={2} />
            {modelRef && <InteractiveMesh intersect={modelRef.current.children} />}
            <Interior setModelRef={setModelRef} />
            {
                hotspotsState.hotspots?.map((hotspot, index) => {
                    if (hotspot.hideIs.includes(hotspotsState.current.id)) {
                        return
                    }
                    return <CircleHotspot key={index} hotspot={hotspot} />
                })
            }
            <Panorama panoram={texture} rotation={hotspotsState.current.textureRotation} />
            {/* <CircleHotspot position={[positionTest.x, positionTest.y, positionTest.z]} /> */}
        </Canvas>
    );
}

import { useState } from "react";
import PropTypes from 'prop-types';
import { useFrame, useThree } from "@react-three/fiber";

import Marker from "./Marker/Marker";

InteractiveMesh.propTypes = {
    intersect: PropTypes.array
}

export default function InteractiveMesh({ intersect }) {
    const { raycaster, mouse, camera } = useThree();
    const [markerPosition, setMarkerPosition] = useState(null);

    useFrame(() => {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(intersect, true);
        intersects.length > 0
            ? setMarkerPosition({ position: intersects[0].point.toArray(), normal: intersects[0].face.normal.toArray() })
            : setMarkerPosition(null)
    });
    
    return <>
        {markerPosition && <Marker position={markerPosition.position} normal={markerPosition.normal} />}
    </>
}

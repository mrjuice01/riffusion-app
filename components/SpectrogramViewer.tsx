import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei";

import { InferenceResult } from "../types";
import HeightMapImage from "./HeightMapImage";
import ImagePlane from "./ImagePlane";

// import { Effects } from "@react-three/drei";
// import { ShaderPass, VerticalTiltShiftShader} from "three-stdlib";

// extend({ ShaderPass });

// Fun shaders:
// RGBShiftShader
// VerticalBlurShader
// VerticalTiltShiftShader

interface SpectrogramViewerProps {
  paused: boolean;
  inferenceResults: InferenceResult[];
  getTime: () => number;
  use_height_map?: boolean;
}

/**
 * Spectrogram drawing code.
 */
export default function SpectrogramViewer({
  paused,
  inferenceResults,
  getTime,
  use_height_map = true,
}: SpectrogramViewerProps) {
  const { camera } = useThree();

  const playheadRef = useRef(null);

  // Move the camera based on the clock
  useFrame(() => {
    const time = getTime();

    const velocity = -1.0; // [m/s]
    const position = velocity * time; // [m]

    camera.position.y = position;
    playheadRef.current.position.y = camera.position.y;
  });

  const playbarShift = 3.6; // [m]

  // NOTE: this is a hacky way to constrict image and box width to fit in the window for responsiveness
  // if window is between 768px and 1350px, this scales the image to fit using a scaler
  const imageScaler = window.innerHeight / 3.40;
  const boxScaler = window.innerHeight / 3.76;
  const spectrogramImageScale = window.innerWidth > 767 && window.innerWidth < 1350 ? window.innerWidth / imageScaler : 5;
  const spectrogramBoxScale = window.innerWidth > 767 && window.innerWidth < 1350 ? window.innerWidth / boxScaler : 5.5;

  return (
    <group>
      {/* <Effects
        multisamping={8}
        renderIndex={1}
        disableGamma={false}
        disableRenderPass={false}
        disableRender={false}
      >
        <shaderPass attachArray="passes" args={[VerticalTiltShiftShader]} />
      </Effects> */}

      {inferenceResults.map((result: InferenceResult, index: number) => {
        const duration_s = result.duration_s;
        const position = duration_s * (-0.55 - result.counter) + playbarShift;

        if (use_height_map) {
          return (
            <HeightMapImage
              url={result.image}
              position={[0, position, 0]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={[duration_s, spectrogramImageScale, 1]}
              key={index}
            />
          );
        } else {
          return (
            <ImagePlane
              url={result.image}
              height={position}
              duration={duration_s}
              key={index}
            />
          );
        }
      })}

      {/* Playhead as as transparent red box. */}
      {/* TODO(hayk): Synchronize this better with the audio. */}
      <group ref={playheadRef}>
        <Box
          args={[spectrogramBoxScale, 2.0, 0.15]}
          rotation={[Math.PI / 2 - 0.2, 0, 0]}
          position={[0, playbarShift, -0.5]}
        >
          <meshBasicMaterial color="#ee2211" transparent opacity={0.8} />
        </Box>
      </group>
    </group>
  );
}

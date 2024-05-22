import { useEffect, useState } from "react";
import { getGyroLocation } from "../math/getGyroLocation";
import { LineGraph } from "../components/Graph";
import * as THREE from 'three';

export function GyroscopePage() {
  const [acceleration, setAcceleration] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [graphData, setGraphData] = useState<
    { x: number; y: number; z: number }[]
  >([]);
  const [velocity, setVelocity] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [rotation, setRotation] = useState({
    x: 0,
    y: 0,
    z: 0,
  });
  const [isGranted, setIsGranted] = useState(false);
  const [data, setData] = useState(new getGyroLocation());

  const onDevicemotion = (event: any) => {
    setAcceleration({
      x: event.acceleration.x,
      y: event.acceleration.y,
      z: event.acceleration.z,
    });
  };
  const onDeviceRotation = (event: any) => {
    setRotation({
      x: event.alpha,
      y: event.beta,
      z: event.gamma,
    });
  };

  const handleButtonClick = () => {
    const DeviceOrientationEvent: any = window.DeviceOrientationEvent;
    const DeviceMotionEvent: any = window.DeviceMotionEvent;
    const isSafariOver13 =
      window.DeviceOrientationEvent !== undefined &&
      typeof DeviceOrientationEvent.requestPermission === "function";

    if (isSafariOver13) {
      DeviceMotionEvent.requestPermission()
        .then((state: any) => {
          if (state === "granted") {
            setIsGranted(true);
            window.addEventListener("devicemotion", onDevicemotion);
            window.addEventListener("deviceorientation", onDeviceRotation);
          }
        })
        .catch((e: any) => {
          console.error(e);
        });
    } else {
      window.addEventListener("devicemotion", onDevicemotion);
    }
  };


  useEffect(() => {

    data.setAcceleration({
      x: acceleration.x,
      y: acceleration.y,
      z: acceleration.z,
    });


    data.getLocation();

    setVelocity({
      x: data.velocity.x,
      y: data.velocity.y,
      z: data.velocity.z,
    });

    setLocation({
      x: data.location.x,
      y: data.location.y,
      z: data.location.z,
    });


    const acc = new THREE.Object3D()
    acc.position.set(acceleration.x, acceleration.y, acceleration.z)

    const x = acc.position.x
    const y = acc.position.y
    const z = acc.position.z


    graphData.push({ x: x, y: y, z: z });

    if (graphData.length > 50 * 5) {
      graphData.splice(0, 1);
    }

    setGraphData([...graphData]);

  }, [acceleration]);

  return (
    <div>
      <button onClick={handleButtonClick}>enable</button>
      {isGranted && (
        <>
          <LineGraph data={graphData}></LineGraph>
        </>
      )}
    </div>
  )
}
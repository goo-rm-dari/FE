import { useEffect, useState } from "react";
import { getGyroLocation } from "../math/getGyroLocation";
import { LineGraph } from "../components/Graph";
import * as THREE from 'three';
import wt from 'discrete-wavelets';

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
  const [wtData, setWtData] = useState<number[][]>([[]]);

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


    const acc = new THREE.Vector3(acceleration.x, acceleration.y, acceleration.z)

    console.log(acc)

    // const qt = new THREE.Quaternion(rotation.x * Math.PI / 180, rotation.y * Math.PI / 180, rotation.z * Math.PI / 180, 0)
    // qt.normalize()

    // acc.applyQuaternion(qt)
    // console.log(acc)

    const x = acc.x
    const y = acc.y
    const z = acc.z


    graphData.push({ x: x, y: y, z: z });



    if (graphData.length > 2 ** 6) {
      graphData.splice(0, 1);

      let coeffs = wt.wavedec(graphData.map(it => {
        return it.z
      }), 'haar');
      setWtData(coeffs)

    }

    setGraphData([...graphData]);

  }, [acceleration]);

  useEffect(() => {
    const acc = new THREE.Vector3(1, 0.00001, 0.00001)
    acc.normalize()

    console.log(acc)

    const qt = new THREE.Quaternion(180 * Math.PI / 180, 0, 90 * Math.PI / 180, 0)
    qt.normalize()

    acc.applyQuaternion(qt)
    acc.normalize()
    console.log(acc)




  }, [])

  return (
    <div>
      <button onClick={handleButtonClick}>enable</button>
      {isGranted && (
        <>
          {Math.round(rotation.x)},{Math.round(rotation.y)},{Math.round(rotation.z)}
          {JSON.stringify(wtData)}
          <LineGraph data={graphData}></LineGraph>
          <LineGraph title="wavelet" data={wtData.reduce(function (prev, next) {
            return prev.concat(next);
          }).map(it => {
            return { x: 0, y: 0, z: it }
          })}></LineGraph>

        </>
      )}
    </div>
  )
}
import { useEffect, useRef, useState } from 'react';

import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { TopShadow } from '../components/TopShadow';
import { geolocation } from '../utils/getLocation';

export function MapPage() {
  const navigate = useNavigate();

  const [firstLocation, setFirstLocation] = useState({
    long: 33.5563,
    lat: 126.79581,
  });
  const [nowLocation, setNowLocation] = useState({
    long: 33.5563,
    lat: 126.79581,
  });

  const [locationList, setLocationList] = useState([
    {
      long: 33.5563,
      lat: 126.79581,
    },
  ]);

  const [trashLocationList, setTrashLocationList] = useState<any>([]);

  const [moveLine, setMoveLine] = useState<any>();

  const [trashCount, setTrashCount] = useState(0);
  const [distance, setDistance] = useState(0);
  const [kcal, setKcal] = useState(0);

  const [startTime, setStartTime] = useState(new Date());
  const [savedDuration, setSavedDuration] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isClock, setIsClock] = useState(true);
  const timeRef = useRef<any>(null);

  const interval = 1000;
  const markerImage = '/marker.png';
  const trashMarkerImage = '/trash.jpeg';

  const imageShowSize = 30;
  const imageSize = { width: imageShowSize, height: imageShowSize };
  const spriteSize = { width: imageShowSize, height: imageShowSize };
  const storeOrigin = { x: 0, y: 0 };

  const locationBuffer = useRef([]);
  const lastUpdateTime = useRef(new Date().getTime());
  const MAX_BUFFER_SIZE = 5; // Adjust based on the desired smoothing level
  const MIN_TIME_INTERVAL = 5000; // Minimum time interval in ms

  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (coord2.lat - coord1.lat) * (Math.PI / 180);
    const dLon = (coord2.long - coord1.long) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(coord1.lat * (Math.PI / 180)) *
        Math.cos(coord2.lat * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // Distance in meters
  };

  const getFirstLocation = async () => {
    const getLocation = await geolocation.get();
    setLocationList([]);

    setFirstLocation({
      long: getLocation?.long,
      lat: getLocation?.lat,
    });
  };

  const getGeoLocation = async () => {
    const getLocation = await geolocation.get();
    const nowTime = new Date().getTime();
    if (
      calculateDistance(locationList[locationList.length - 1], getLocation) <
        50 &&
      nowTime - lastUpdateTime.current > MIN_TIME_INTERVAL
    ) {
      locationBuffer.current.push(getLocation);
      if (locationBuffer.current.length > MAX_BUFFER_SIZE) {
        locationBuffer.current.shift();
      }
      const averageLocation = locationBuffer.current.reduce(
        (acc, loc) => {
          acc.lat += loc.lat;
          acc.long += loc.long;
          return acc;
        },
        { lat: 0, long: 0 },
      );
      averageLocation.lat /= locationBuffer.current.length;
      averageLocation.long /= locationBuffer.current.length;
      setNowLocation(averageLocation);
      lastUpdateTime.current = nowTime;
    }
  };

  const getGeoLocationLength = () => {
    return Math.round(moveLine.getLength());
  };

  const addTrash = async () => {
    const getLocation = await geolocation.get();
    setTrashLocationList([
      ...trashLocationList,
      {
        long: getLocation?.long,
        lat: getLocation?.lat,
      },
    ]);
  };

  const calculateKcal = () => {
    const kg = 70;
    return (kg * distance) / 1000;
  };

  const startTimer = () => {
    setStartTime(() => new Date());
    setSavedDuration(0);

    timeRef.current = setInterval(() => {
      setDuration(time => time + 1000);
      console.log('AAAA', savedDuration);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timeRef.current);
  };

  const handleClickTrash = () => {
    setTrashCount(trash => trash + 1);
    addTrash();
  };

  const handleClickStopPlogging = () => {
    navigate('/plogging/done');
  };

  const handleClickStopClock = () => {
    setStartTime(() => new Date());
    setSavedDuration(
      saved => saved + (new Date().getTime() - startTime.getTime()),
    );
    setIsClock(false);
    stopTimer();
  };

  const handleClickStartClock = () => {
    setStartTime(() => new Date());
    setIsClock(true);
    startTimer();
  };

  useEffect(() => {
    if (
      locationList.length > 0 &&
      calculateDistance(locationList[locationList.length - 1], nowLocation) < 50
    ) {
      setLocationList([...locationList, nowLocation]);
    }

    try {
      setDistance(getGeoLocationLength());
      setKcal(calculateKcal());
    } catch (error) {}
  }, [nowLocation]);

  useEffect(() => {
    getFirstLocation();
    startTimer();

    const geoInterval = setInterval(() => {
      getGeoLocation();
    }, interval);

    return () => {
      stopTimer();
      clearInterval(geoInterval);
    };
  }, []);

  return (
    <>
      <Map
        center={{ lat: firstLocation.lat, lng: firstLocation.long }}
        style={{ width: '100%', height: '50vh' }}
      >
        <Polyline
          path={[
            locationList.map(item => {
              return { lat: item.lat, lng: item.long };
            }),
          ]}
          strokeWeight={10}
          strokeColor={'#7FD6E1'}
          strokeOpacity={1}
          strokeStyle={'solid'}
          onCreate={setMoveLine}
        />

        <MapMarker
          position={{ lat: nowLocation.lat, lng: nowLocation.long }}
          image={{
            src: markerImage,
            size: imageSize,
            options: {
              spriteSize: spriteSize,
              spriteOrigin: storeOrigin,
            },
          }}
        />

        {trashLocationList.map((trash: any, index: number) => (
          <MapMarker
            key={index}
            position={{ lat: trash.lat, lng: trash.long }}
            image={{
              src: trashMarkerImage,
              size: imageSize,
              options: {
                spriteSize: spriteSize,
                spriteOrigin: storeOrigin,
              },
            }}
          />
        ))}
      </Map>

      <b className='absolute left-2 top-2 z-10'>{trashCount}개의 쓰레기</b>

      <div className='relative bottom-0 left-0 z-10 h-1/2 w-full bg-white'>
        <TopShadow />

        <div className='flex pt-2'>
          <div className='flex flex-1 justify-center'>
            <b>{kcal}kcal</b>
          </div>
          <div className='flex flex-1 justify-center'>
            <b>
              {Math.floor(duration / 60000) +
                ':' +
                (duration < 10 ? '0' : '') +
                ((duration % 60000) / 1000).toFixed(0)}
            </b>
          </div>
          <div className='flex flex-1 justify-center'>
            <b>{distance / 1000}km</b>
          </div>
        </div>

        <div className='absolute bottom-4 flex w-full pt-2'>
          <div className='flex flex-1 justify-center'>
            <Button onClick={handleClickStopPlogging}>플로깅 종료</Button>
          </div>
          <div className='flex flex-1 justify-center'>
            {isClock ? (
              <Button onClick={handleClickStopClock}>시간 중단</Button>
            ) : (
              <Button onClick={handleClickStartClock}>시간 재개</Button>
            )}
          </div>
          <div className='flex flex-1 justify-center'>
            <Button onClick={handleClickTrash}>쓰레기 주움</Button>
          </div>
        </div>
      </div>
    </>
  );
}

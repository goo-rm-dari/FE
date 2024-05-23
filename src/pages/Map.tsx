import { useEffect, useRef, useState } from 'react';

import { Map, MapMarker, Polyline } from 'react-kakao-maps-sdk';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';
import { TopShadow } from '../components/TopShadow';
import { geolocation } from '../utils/getLocation';

const MIN_TIME_INTERVAL = 3000; // Minimum time interval in ms
const MAX_BUFFER_SIZE = 5; // Adjust based on the desired smoothing level

function MapPage() {
  const navigate = useNavigate();

  const [firstLocation, setFirstLocation] = useState<{
    lat: number | null;
    long: number | null;
  }>({ lat: null, long: null });
  const [nowLocation, setNowLocation] = useState<{
    lat: number | null;
    long: number | null;
  }>({ lat: null, long: null });
  const [locationList, setLocationList] = useState<
    Array<{ lat: number; long: number }>
  >([]);
  const [trashLocationList, setTrashLocationList] = useState<
    Array<{ lat: number; long: number }>
  >([]);

  const [moveLine, setMoveLine] = useState<any>(null);

  const [trashCount, setTrashCount] = useState(0);
  const [distance, setDistance] = useState(0);
  const [kcal, setKcal] = useState(0);

  const [duration, setDuration] = useState(0);
  const [isClock, setIsClock] = useState(true);
  const timeRef = useRef<any>(null);

  const interval = 3000; // Set to 3 seconds for recording coordinates
  const markerImage = '/marker.png';
  const trashMarkerImage = '/trash.jpeg';

  const imageShowSize = 30;
  const imageSize = { width: imageShowSize, height: imageShowSize };
  const spriteSize = { width: imageShowSize, height: imageShowSize };
  const storeOrigin = { x: 0, y: 0 };

  const locationBuffer = useRef<Array<{ lat: number; long: number }>>([]);
  const lastUpdateTime = useRef<number>(new Date().getTime());

  const calculateDistance = (
    coord1: { lat: number; long: number },
    coord2: { lat: number; long: number },
  ) => {
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
    if (getLocation) {
      setFirstLocation({
        long: getLocation.long,
        lat: getLocation.lat,
      });
      setLocationList([
        {
          long: getLocation.long,
          lat: getLocation.lat,
        },
      ]);
    }
  };

  const getGeoLocation = async () => {
    const getLocation = await geolocation.get();
    if (getLocation && locationList.length > 0) {
      const nowTime = new Date().getTime();
      if (
        calculateDistance(locationList[locationList.length - 1], getLocation) >=
          50 &&
        nowTime - lastUpdateTime.current > MIN_TIME_INTERVAL
      ) {
        setNowLocation(getLocation);
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
    }
  };

  const getGeoLocationLength = () => {
    return Math.round(moveLine.getLength());
  };

  const addTrash = async () => {
    const getLocation = await geolocation.get();
    if (getLocation) {
      setTrashLocationList([
        ...trashLocationList,
        {
          long: getLocation.long,
          lat: getLocation.lat,
        },
      ]);
    }
  };

  const calculateKcal = () => {
    const kg = 70;
    return (kg * distance) / 1000;
  };

  const startTimer = () => {
    timeRef.current = setInterval(() => {
      setDuration(time => time + 1000);
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
    const createPloggingForm = {
      locationList,
      timer:
        Math.floor(duration / 60000) +
        ':' +
        ((duration % 60000) / 1000).toFixed(0).padStart(2, '0'),
      distance: (distance / 1000).toFixed(2),
      kcal: kcal,
    };
    console.log(createPloggingForm);
    clearInterval(timeRef.current);
    navigate('/plogging/done');
  };

  const handleClickStopClock = () => {
    stopTimer();
    setIsClock(false);
  };

  const handleClickStartClock = () => {
    setIsClock(true);
    startTimer();
  };

  useEffect(() => {
    if (firstLocation.lat !== null && nowLocation.lat !== null) {
      if (
        locationList.length > 0 &&
        calculateDistance(locationList[locationList.length - 1], nowLocation) <
          50
      ) {
        setLocationList([...locationList, nowLocation]);
      }

      try {
        setDistance(getGeoLocationLength());
        setKcal(calculateKcal());
      } catch (error) {}
    }
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

  useEffect(() => {
    const initializeLocation = async () => {
      await getFirstLocation();
      setNowLocation(await geolocation.get());
    };

    initializeLocation();
  }, []);

  return (
    <>
      {firstLocation.lat !== null && firstLocation.long !== null && (
        <Map
          center={{
            lat: nowLocation.lat || firstLocation.lat,
            lng: nowLocation.long || firstLocation.long,
          }}
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

          {nowLocation.lat !== null && nowLocation.long !== null && (
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
          )}

          {trashLocationList.map((trash, index) => (
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
      )}

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
                ((duration % 60000) / 1000).toFixed(0).padStart(2, '0')}
            </b>
          </div>
          <div className='flex flex-1 justify-center'>
            <b>{(distance / 1000).toFixed(2)}km</b>
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

export default MapPage;

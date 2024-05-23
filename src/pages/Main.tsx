import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import Icon from '../components/Icon/icon';
import { geolocation } from '../utils/getLocation';
import axios from 'axios';


const Main = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    long: number;
  }>({ lat: 0, long: 0 });
  const [DummyData, setDummyData] = useState([

  ])

  const [address, setAddress] = useState<string>('서귀포시 성산읍');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getRecords = async () => {

    try {
      const userId = localStorage.getItem('userId');

      const response = await axios.get(`https://k62968f39024da.user-app.krampoline.com/api/plogging-records/all/${userId}`)
      const result = response.data.data.info;

      console.log(result)

      if (result.length > 0) {
        setDummyData(() => [])
      }

      for (let index = 0; index < result.length; index++) {
        const element = result[index];

        DummyData.push({
          id: index,
          date: element.createdTime,
          trash: parseFloat(element.trashCount),
          runTime: element.movingTime,
          kcal: parseFloat(element.totalCalorie),
          distance: parseFloat(element.movingDistance),
        })

        setDummyData(() => [...DummyData])
      }


    } catch (err) {
      console.log("Error >>", err);
    }
  }

  useEffect(() => {
    const fetchGeolocation = async () => {
      try {
        const coords = await geolocation.get();
        if (coords) {
          setCoordinates(coords);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGeolocation();
    getRecords()
  }, []);

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(
      coordinates.long,
      coordinates.lat,
      (result: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          if (result[0].length !== 0) {
            setAddress(
              result[0].address.address_name.split(' ').slice(1, 3).join(' '),
            );
          }
        }
      },
    );
  }, [coordinates]);

  if (loading) {
    return (
      <div className='flex h-full items-center justify-center'>
        <span className="material-symbols-outlined animate-spin">
          progress_activity
        </span>
      </div>
    );
  }

  const handleMoveToPlogging = () => {
    navigate('/plogging');
  };

  return (
    <div className='relative flex grow flex-col gap-5 pt-[60px]'>
      <span className='text-[30px] px-6'>{address}</span>
      <span className='text-gray-500 px-6'>최근 플로깅</span>
      <div className='flex flex-col gap-6 px-6'>
        {DummyData.map((data, index) => (
          <div
            key={`${data.id} - ${index}`}
            className='flex flex-col gap-4 rounded-md border p-4'
          >
            <div className='flex items-center justify-between'>
              <span>{data.date}</span>
              <span className='flex items-center gap-2'>
                <Icon id='leaf' className='text-green-600' /> {data.trash}
              </span>
            </div>
            <div className='flex w-full items-center justify-between'>
              <span className='flex items-center gap-1'>
                <Icon id='time' />
                {data.runTime}
              </span>
              <span>{`${data.kcal} Kcal`}</span>
              <span>{`${data.distance} Km`}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 w-full justify-center pb-6 flex">

        <button
          onClick={handleMoveToPlogging}
          className='mx-auto mt-40 h-[111px] w-[111px] rounded-full bg-gray-200 p-4 text-gray-50'
          style={{ backgroundColor: "#7FD6E1" }}
        >
          플로깅 시작
        </button>
      </div>

    </div>
  );
};

export default Main;

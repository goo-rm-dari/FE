import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Icon from '../components/Icon/icon';
import { geolocation } from '../utils/getLocation';

const Main = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    long: number;
  }>({ lat: 0, long: 0 });
  const [DummyData, setDummyData] = useState([]);

  const [address, setAddress] = useState<string>('서귀포시 성산읍');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const getRecords = async () => {
    try {
      const userId = localStorage.getItem('userId');

      const response = await axios.get(
        `https://k62968f39024da.user-app.krampoline.com/api/plogging-records/all/${userId}`,
      );

      const result = response.data.data.info;

      console.log(result);

      if (result.length > 0) {
        setDummyData(() => []);
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
        });

        setDummyData(() => [...DummyData]);
      }
    } catch (err) {
      console.log('Error >>', err);
    }
  };

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
    getRecords();
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
        <img
          src='/img_trash.png'
          alt='Image 1'
          className='absolute left-0 top-1/2 h-[60px] w-[60px] opacity-100'
        />
        <img
          src='/turtle.png'
          alt='Image 2'
          className='animate-move2 absolute left-[60px] top-1/2 h-[60px] w-[80px] -translate-y-1/2 transform'
        />
      </div>
    );
  }

  const handleMoveToPlogging = () => {
    navigate('/plogging');
  };

  return (
    <div className='relative flex grow flex-col gap-5 p-4 pt-10'>
      <span className='flex items-center gap-1 px-6 text-[#828282]'>
        <Icon id='map-icon' className='text-[#C1C1C1]' />
        {address}
      </span>
      <div className='flex flex-col text-[24px]'>
        <span>오늘 광치기 해변으로</span>
        <span>플로깅 어떠세요 ?</span>
      </div>
      <div className='flex flex-col gap-4 pt-5'>
        <span className='text-[#252730]'>최근 플로깅</span>
        {DummyData.map((data, index) => (
          <div
            key={`${data.id} - ${index}`}
            className='flex flex-col gap-4 rounded-[10px] border border-[#F8F8F8] bg-[#F8F8F8] p-4'
          >
            <div className='flex items-center justify-between p-4'>
              <span className='text-[#828282]'>{data.date}</span>
              <span className='flex items-center gap-1'>
                {data.trash} <Icon id='leaf' className='text-green-600' />
              </span>
            </div>
            <div className='flex w-full items-center gap-6 px-10'>
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
      <div className='absolute bottom-2 flex w-full justify-center pb-6'>
        <button
          onClick={handleMoveToPlogging}
          className='mx-auto mt-40 h-[111px] w-[111px] rounded-full bg-[#7FD6E1] p-4 text-[30px] font-bold text-white'
        >
          시작
        </button>
      </div>
    </div>
  );
};

export default Main;

import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();
  const userID = localStorage.getItem('userId');
  const userINFO = localStorage.getItem('userInfo');

  useEffect(() => {
    if (userID && userINFO) {
      navigate('/');
    }

    if (userID && !userINFO) {
      navigate('/signIn');
    }
  }, []);

  const handleClickButton = () => {
    localStorage.setItem('userId', String(new Date()));
    navigate('/');
  };

  return (
    <div className='w-full'>
      <button
        className='h-[53.7px] w-full bg-gray-300 p-4'
        onClick={handleClickButton}
      >
        산책정보 입력하기
      </button>
    </div>
  );
};

const LoginPage = () => (
  <div className='flex h-full flex-col'>
    <div className='flex h-full flex-col items-center justify-center gap-2'>
      <img src='http://via.placeholder.com/640x393' alt='산책 ㄱ' />
      <div>
        <p className='text-primary'>산책가실?</p>
        <p className='text-primary'>돌하르방과 ?</p>
      </div>
    </div>
    <div className='flex flex-col gap-2 p-4'>
      <LoginButton />
    </div>
  </div>
);

export default LoginPage;

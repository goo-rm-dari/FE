import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const LoginButton = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('userId');
  const userInfo = localStorage.getItem('userInfo');

  useEffect(() => {
    if (token && userInfo) {
      navigate('/');
    }

    if (token && !userInfo) {
      navigate('/signIn');
    }
  }, [token]);

  const handleClickButton = () => {
    localStorage.setItem('userId', String(new Date()));
    navigate('/');
  };

  return (
    <div className='w-full'>
      <button className='h-[53.7px] w-full' onClick={handleClickButton}>
        <img src='http://via.placeholder.com/393x58' alt='네이버 로그인 버튼' />
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

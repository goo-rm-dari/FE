import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const navigate = useNavigate();
  const userINFO = localStorage.getItem('userInfo');

  useEffect(() => {
    if (userINFO) {
      navigate('/');
    }
  }, [userINFO, navigate]);

  const handleOnHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
    setHeight(value);
  };

  const handleOnWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove all non-numeric characters
    setWeight(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!height || !weight || !gender) {
      alert('모든 값을 입력해주세요');
      return;
    }

    const formData = {
      height,
      weight,
      gender,
    };

    localStorage.setItem('userInfo', JSON.stringify(formData));
    alert('성공적으로 저장되었습니다');
    navigate('/');
  };

  return (
    <div className='flex h-full flex-col'>
      <form onSubmit={handleSubmit}>
        <div className='flex h-full flex-col items-center gap-8 p-10'>
          <span className='text-[30px]'>체중과 키를 입력하세요</span>
          <div className='relative flex w-full items-center'>
            <input
              className='w-full border p-4'
              value={height}
              onChange={handleOnHeightChange}
              placeholder='키'
              type='text'
            />
            <span className='absolute right-[200px]'>{height ? 'cm' : ''}</span>
          </div>
          <div className='relative flex w-full items-center'>
            <input
              className='w-full border p-4'
              value={weight}
              onChange={handleOnWeightChange}
              placeholder='체중'
              type='text'
            />
            <span className='absolute right-[200px]'>{weight ? 'kg' : ''}</span>
          </div>

          <select
            className='w-full border p-4'
            onChange={e => setGender(e.target.value)}
            value={gender}
          >
            <option value=''>성별을 선택하세요</option>
            <option value='man'>남성</option>
            <option value='woman'>여성</option>
          </select>
          <div className='w-full grow p-10'></div>
          <button type='submit' className='w-full bg-gray-400 p-4'>
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;

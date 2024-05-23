import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [height, setHeight] = useState<string | undefined>(undefined);
  const [weight, setWeight] = useState<string | undefined>(undefined);
  const [gender, setGender] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  const userINFO = localStorage.getItem('userInfo');

  useEffect(() => {
    if (userINFO) {
      navigate('/');
    }
  }, []);

  const handleOnHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e?.target?.value);
  };

  const handleOnWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e?.target?.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!height || !weight || !gender) {
      alert('모든 값을 입력해주세요');
    }

    const formDate = {
      height,
      weight,
      gender,
    };

    localStorage.setItem('userInfo', JSON.stringify(formDate));
    alert('성공적으로 저장되었습니다');
    navigate('/');
  };

  return (
    <div className='flex h-full flex-col'>
      <form action=''>
        <div className='flex h-full flex-col items-center gap-8 p-10'>
          <span className='text-[30px]'>체중과 키를 입력하세요</span>
          <input
            className='w-full border p-4'
            value={height || ''}
            onChange={handleOnHeightChange}
            placeholder='키'
          />
          <input
            className='w-full border p-4'
            onChange={handleOnWeightChange}
            value={weight || ''}
            placeholder='체중'
          />
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
          <button className='w-full bg-gray-400 p-4' onClick={handleSubmit}>
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/Button';
import { Title } from '../components/Title';

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
        <div className='flex h-full flex-col gap-6 p-6 pt-10'>
          <Title>체중과 키를 입력하세요</Title>
          <div className='w-full p-1'></div>

          <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <div className='relative flex w-full items-center'>
              <input
                className='w-full border p-3 rounded-lg'
                style={{ border: "0.1rem solid #E0E0E0" }}
                value={height}
                onChange={handleOnHeightChange}
                placeholder='키'
                type='text'
              />
              <span className='absolute right-[10px]'>{height ? 'cm' : ''}</span>
            </div>
            <div className='relative flex w-full items-center'>
              <input
                className='w-full border p-3 rounded-lg'
                style={{ border: "0.1rem solid #E0E0E0" }}
                value={weight}
                onChange={handleOnWeightChange}
                placeholder='체중'
                type='text'
              />
              <span className='absolute right-[10px]'>{weight ? 'kg' : ''}</span>
            </div>
          </div>


          <select
            className='w-full border p-3 rounded-lg'
            style={{ border: "0.1rem solid #E0E0E0" }}
            onChange={e => setGender(e.target.value)}
            value={gender}
          >
            <option value=''>성별을 선택하세요</option>
            <option value='man'>남성</option>
            <option value='woman'>여성</option>
          </select>
          <div className='w-full grow p-10'></div>

        </div>
        <div className="absolute p-6 bottom-2 w-full justify-center flex items-center">
          <PrimaryButton
            type='submit'
          >
            완료
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;

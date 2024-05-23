import { PropsWithChildren, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

const DynamicRouter = ({ children }: PropsWithChildren) => {
  const userID = localStorage.getItem('userId');
  const userINFO = localStorage.getItem('userInfo');
  const navigate = useNavigate();
  useEffect(() => {
    if (!userID) return navigate('/login');
    if (!userINFO) return navigate('/signIn');
  }, []);

  return <>{children}</>;
};

export default DynamicRouter;

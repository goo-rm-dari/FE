import { createBrowserRouter } from 'react-router-dom';

import DynamicRouter from './components/DynamicRouter';
import { CheckTrashPage } from './pages/CheckTrash';
// import { CountdownPage } from './pages/Countdown';
import { DonePage } from './pages/Done';
import LoadingPage from './pages/Loading';
// import { GyroscopePage } from './pages/Gyroscope';
import Main from './pages/Main';
import MapPage from './pages/MapPage';
import LoginPage from './pages/login';
import SignInPage from './pages/signIn';

export const router = createBrowserRouter([
  {
    path: '/plogging',
    element: (
      <DynamicRouter>
        <MapPage />
      </DynamicRouter>
    ),
  },
  {
    path: '/plogging/done',
    element: (
      <DynamicRouter>
        <DonePage />
      </DynamicRouter>
    ),
  },
  {
    path: '/plogging/check',
    element: (
      <DynamicRouter>
        <CheckTrashPage />
      </DynamicRouter>
    ),
  },
  {
    path: '/',
    element: (
      <DynamicRouter>
        <Main />
      </DynamicRouter>
    ),
  },
  // {
  //   path: '/test',
  //   element: (
  //     <DynamicRouter>
  //       <GyroscopePage />
  //     </DynamicRouter>
  //   ),
  // },
  // {
  //   path: '/load',
  //   element: <CountdownPage />,
  // },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: 'signIn',
    element: (
      <DynamicRouter>
        <SignInPage />
      </DynamicRouter>
    ),
  },
  {
    path: '/loading',
    element: <LoadingPage />,
  },
]);

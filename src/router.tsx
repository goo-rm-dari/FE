import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import DynamicRouter from './components/DynamicRouter';
// import { CountdownPage } from './pages/Countdown';
import { DonePage } from './pages/Done';
// import { GyroscopePage } from './pages/Gyroscope';
import Main from './pages/Main';
import LoginPage from './pages/login';
import SignInPage from './pages/signIn';
import { CheckTrashPage } from './pages/CheckTrash';

export const router = createBrowserRouter([
  {
    path: '/plogging',
    element: (
      <DynamicRouter>
        <App />
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
]);

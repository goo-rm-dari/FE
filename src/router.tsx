import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { GyroscopePage } from './pages/Gyroscope';
import LoginPage from './pages/login';
import SignInPage from './pages/signIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <GyroscopePage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: 'signIn',
    element: <SignInPage />,
  },
]);

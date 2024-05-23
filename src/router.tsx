import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import DynamicRouter from './components/DynamicRouter';
import { GyroscopePage } from './pages/Gyroscope';
import LoginPage from './pages/login';
import SignInPage from './pages/signIn';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <DynamicRouter>
        <App />
      </DynamicRouter>
    ),
  },
  {
    path: '/test',
    element: (
      <DynamicRouter>
        <GyroscopePage />
      </DynamicRouter>
    ),
  },
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

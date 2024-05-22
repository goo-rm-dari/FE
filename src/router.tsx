import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import { GyroscopePage } from './pages/Gyroscope';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/test',
    element: <GyroscopePage />,
  },
]);

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import Layout from './components/Layout.tsx';
import './index.css';
import { router } from './router.tsx';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <Layout>
    <RouterProvider router={router} />
  </Layout>,
);

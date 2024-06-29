import './App.css';
import { createBrowserRouter, Navigate, NonIndexRouteObject, RouterProvider } from 'react-router-dom';
import { SettingsPage, StatsPage, UserInfoPage } from './pages';
import { MenuLayout } from './layout/menuLayout.tsx';
import { SDKProvider } from '@tma.js/sdk-react';

const routes: NonIndexRouteObject[] = [
  {
    element: <MenuLayout />,
    path: '/Wendy-WebApp',
    children: [{
      index: true,
      element: <Navigate to={'profile'} replace></Navigate>,
    }, {
      path: 'profile',
      element: <UserInfoPage />,
    }, {
      path: 'stats',
      element: <StatsPage />,
    }, {
      path: 'settings',
      element: <SettingsPage />,
    }],
  },
];

export const AppRouter = createBrowserRouter(routes);

function App() {
  return <SDKProvider acceptCustomStyles debug>
    <RouterProvider router={AppRouter} />
  </SDKProvider>;
}

export default App;

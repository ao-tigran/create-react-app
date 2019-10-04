import React from 'react';
import HomeScreen from '../../components/HomeScreen';

const routes = [
  {
    path: '/home',
    component: HomeScreen,
  },
  {
    path: '/private',
    component: () => <h3>Private screen</h3>,
  },
];

export default routes;

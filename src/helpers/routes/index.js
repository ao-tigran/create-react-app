import React from 'react';
import HomeScreen from '../../components/HomeScreen';
import WizardContainer from '../../components/WizardContainer/WizardContainer';

const routes = [
  {
    path: '/home',
    component: HomeScreen,
  },
  {
    path: '/wizard',
    component: WizardContainer,
  },
  {
    path: '/private',
    component: () => <h3>Private screen</h3>,
  },
];

export default routes;

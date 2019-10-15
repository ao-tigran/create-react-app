import React from 'react';
import HomeScreen from '../../components/HomeScreen';
import WizardContainer from '../../components/WizardContainer/WizardContainer';
import DataTable from '../../components/DataTable/DataTable';

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
  {
    path: '/table',
    component: () => (
      <DataTable
        columns={[
          {
            property: 'name',
            title: 'login.username',
          },
          {
            property: 'createdAt',
            title: 'login.password',
          },
        ]}
        dataSource="https://5da09ce0525b790014489ff4.mockapi.io/manan/toys"
      />
    ),
  },
];

export default routes;

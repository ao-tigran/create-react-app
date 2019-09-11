import React from 'react';
import { useUser } from './../../hooks/UseUser';

const HomeScreen = props => {
  const context = useUser();

  return (
    <>
      <div style={{ textAlign: 'center', margin: '10px auto' }}>
        Home Screen
      </div>
      <div style={{ textAlign: 'center', margin: '10px auto' }}>{`Welcome ${
        context.user.username
      }`}</div>
    </>
  );
};

export default HomeScreen;

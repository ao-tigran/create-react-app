import React, { useContext } from 'react';
import AuthContext from './../../context/AuthContext';

const HomeScreen = props => {
  const { user, logout, isLoading, error } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <div style={{ textAlign: 'center', margin: '10px auto' }}>
      <h1>Home Screen</h1>
      <p>{user ? `Welcome ${user.username}` : 'Loading ...'}</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
};

export default HomeScreen;

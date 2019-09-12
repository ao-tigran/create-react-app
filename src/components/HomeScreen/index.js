import React, { useContext } from 'react';
import AuthContext from './../../context/AuthContext';
import { Button } from 'semantic-ui-react';

const HomeScreen = props => {
  const { user, logout, isLoading, error } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <div style={{ textAlign: 'center', margin: '10px auto' }}>
      <h1>Home Screen</h1>
      <p>Welcome {user ? user.username : ''}</p>
      <Button onClick={logout} content="Log out" primary />
    </div>
  );
};

export default HomeScreen;

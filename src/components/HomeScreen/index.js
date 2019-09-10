import React, { Component } from 'react';

class HomeScreen extends Component {
  //LOGOUT
  //axios
  //   .delete(`${API_URL}/auth`)
  //   .then(res => {
  //     removeToken(res);
  //     dispatch(deleteTokenFulfilled(res.data.result));
  //   })
  //   .catch(err => {
  //     dispatch(deleteTokenFailed(err));
  //   });

  render() {
    return (
      <div style={{ textAlign: 'center', margin: '10px auto' }}>
        Home Screen
      </div>
    );
  }
}

export default HomeScreen;

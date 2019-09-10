import React, { Component } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

class LoaderOverlay extends Component {
  render() {
    const { active } = this.props;
    return (
      <div>
        <Dimmer active={active} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        {this.props.children}
      </div>
    );
  }
}

export default LoaderOverlay;

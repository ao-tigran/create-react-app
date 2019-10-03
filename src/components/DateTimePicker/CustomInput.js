import React from 'react';
import { Input } from 'semantic-ui-react';

const CustomInput = props => {
  return <Input 
    icon={props.icon}
    iconPosition='left'
    {...props}
  />
}

export default CustomInput;
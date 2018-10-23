import React  from 'react';
import {Icon, Segment} from 'semantic-ui-react';

const Spinner = ({size}) => (
  <Segment basic textAlign="center">
    <Icon size={size} loading name="spinner" />
  </Segment>
)

Spinner.defaultProps = {
  size: 'huge'
};



export default Spinner

import React from 'react';
import PropTypes from 'prop-types';

class Hoverable extends React.Component {

  static propTypes = {
    onHover: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
  }

  onHover

  render() {
    return (
      <div></div>
    );
  }
}

export default Hoverable;

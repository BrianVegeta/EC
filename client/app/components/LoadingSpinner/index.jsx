import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';

class LoadingSpinner extends React.Component {
  static defaultProps = {
    size: 30,
  };
  static propTypes = {
    size: PropTypes.number,
  };
  render() {
    return (
      <MDSpinner
        style={{ width: this.props.size }}
        color1="#31ABBA"
        color2="#FF9442"
      />
    );
  }
}

export default LoadingSpinner;

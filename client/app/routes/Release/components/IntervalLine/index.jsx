import React from 'react';
import PropTypes from 'prop-types';

class IntervalLine extends React.Component {
  static defaultProps = {
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
    color: '#CECECE',
  };
  static propTypes = {
    width: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]).isRequired,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
    color: PropTypes.string,
  };
  render() {
    const { width, marginBottom, marginTop, color } = this.props;
    const style = {
      width,
      marginTop,
      marginBottom,
      borderBottom: `1px solid ${color}`,
    };
    return <div style={style} />;
  }
}

export default IntervalLine;

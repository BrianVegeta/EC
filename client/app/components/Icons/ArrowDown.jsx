import React from 'react';
import PropTypes from 'prop-types';

class ArrowDown extends React.Component {

  static defaultProps = {
    color: '#999',
    viewBox: '0 -5 16 16',
    size: 16,
  };

  static propTypes = {
    color: PropTypes.string,
    viewBox: PropTypes.string,
    size: PropTypes.number,
  };

  render() {
    const { color, viewBox, size } = this.props;
    return (
      <svg width={`${size}px`} height={`${size}px`} viewBox={viewBox} version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-692.000000, -519.000000)" stroke={color}>
            <g id="Group-12-Copy-4" transform="translate(438.000000, 500.000000)">
              <polyline id="dropdown" points="270 20 262 25 254 20" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default ArrowDown;

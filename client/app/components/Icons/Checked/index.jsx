import React from 'react';
import PropTypes from 'prop-types';

class Checked extends React.Component {

  static defaultProps = {
    size: 19,
    color: '#999999',
  }

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
  }

  render() {
    const { size, color } = this.props;
    return (
      <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-4.000000, -4.000000)">
            <polygon points="0 0 48 0 48 48 0 48" />
            <path
              d="M24,4 C12.95,4 4,12.95 4,24 C4,35.04 12.95,44 24,44 C35.04,44 44,35.04 44,24 C44,12.95 35.04,4 24,4 Z M20,34 L10,24 L12.83,21.17 L20,28.34 L35.17,13.17 L38,16 L20,34 Z"
              fill={color}
              fillRule="nonzero"
            />
          </g>
        </g>
      </svg>
    );
  }
}

export default Checked;

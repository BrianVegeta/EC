import React from 'react';
import PropTypes from 'prop-types';

class Loudspeaker extends React.Component {

  static defaultProps = {
    size: 40,
    color: '#999999',
  }

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
  }

  render() {
    const { size, color } = this.props;
    return (
      <svg width={size} height={size} viewBox="0 0 39 40" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" fillRule="evenodd">
          <g transform="translate(-211 -291)">
            <g transform="translate(205 285)">
              <g transform="translate(6 6)">
                <path
                  d="M16.5,25.1579664 L16.5,39.5 L13.136248,39.5 L7.3442264,21.5973878 L16.5,25.1579664 Z"
                  stroke={color}
                />
                <path
                  d="M7.5,12.3420187 L7.5,21.6579664 L24.4999342,28.269052 L24.4979043,5.73092866 L7.5,12.3420187 Z"
                  stroke={color}
                />
                <rect
                  stroke={color}
                  x="24.5"
                  y=".5"
                  width="7"
                  height="33"
                  rx="3"
                />
                <path
                  d="M7.5,21.5 L7.5,12.5 L3,12.5 C1.61928813,12.5 0.5,13.6192881 0.5,15 L0.5,19 C0.5,20.3807119 1.61928813,21.5 3,21.5 L7.5,21.5 Z"
                  stroke={color}
                />
                <path
                  d="M33.3333333,21.6666667 C36.0947571,21.6666667 38.3333333,19.4280904 38.3333333,16.6666667 C38.3333333,13.9052429 36.0947571,11.6666667 33.3333333,11.6666667 C33.3333333,12.4064092 33.3333333,20.7894476 33.3333333,21.6666667 Z"
                  stroke={color}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Loudspeaker;

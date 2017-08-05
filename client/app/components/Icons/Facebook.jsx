// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';

class Facebook extends React.Component {
  static defaultProps = {
    size: 18,
    color: '#999999',
  }

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
  }

  render() {
    const { size, color } = this.props;
    return (
      <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Foot" transform="translate(-1067.000000, -849.000000)" fillRule="nonzero" fill={color}>
            <g id="Group-18">
              <g id="Foot" transform="translate(282.000000, 834.000000)">
                <g id="logo_facebook" transform="translate(785.000000, 15.000000)">
                  <path d="M18,3 C18,1.42 16.58,0 15,0 L3,0 C1.42,0 0,1.42 0,3 L0,15 C0,16.58 1.42,18 3,18 L9,18 L9,11.2 L6.8,11.2 L6.8,8.2 L9,8.2 L9,7.04 C9,5.02 10.52,3.2 12.38,3.2 L14.8,3.2 L14.8,6.2 L12.38,6.2 C12.12,6.2 11.8,6.52 11.8,7 L11.8,8.2 L14.8,8.2 L14.8,11.2 L11.8,11.2 L11.8,18 L15,18 C16.58,18 18,16.58 18,15 L18,3 Z" id="Facebook__x28_alt_x29_" />
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Facebook;

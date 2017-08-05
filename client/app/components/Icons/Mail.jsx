// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';

class Mail extends React.Component {
  static defaultProps = {
    size: 14,
    color: '#666666',
  }

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
  }

  render() {
    const { size, color } = this.props;
    return (
      <svg width={`${size}px`} height={`${size - 2}px`} viewBox="0 0 14 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Foot" transform="translate(-624.000000, -919.000000)">
            <g id="Group-18">
              <g id="Foot" transform="translate(282.000000, 834.000000)">
                <g id="mail" transform="translate(341.000000, 83.000000)">
                  <g id="ic_email_24px">
                    <path
                      d="M13.3333333,2.66666667 L2.66666667,2.66666667 C1.93333333,2.66666667 1.34,3.26666667 1.34,4 L1.33333333,12 C1.33333333,12.7333333 1.93333333,13.3333333 2.66666667,13.3333333 L13.3333333,13.3333333 C14.0666667,13.3333333 14.6666667,12.7333333 14.6666667,12 L14.6666667,4 C14.6666667,3.26666667 14.0666667,2.66666667 13.3333333,2.66666667 Z M13.3333333,5.33333333 L8,8.66666667 L2.66666667,5.33333333 L2.66666667,4 L8,7.33333333 L13.3333333,4 L13.3333333,5.33333333 Z" id="Shape"
                      fill={color}
                      fillRule="nonzero"
                    />
                    <polygon
                      id="Shape"
                      points="0 0 16 0 16 16 0 16"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Mail;

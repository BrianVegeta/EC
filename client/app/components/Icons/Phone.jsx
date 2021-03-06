// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';

class Phone extends React.Component {
  static defaultProps = {
    size: 12,
    color: '#666666',
  }

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string.isRequired,
  }

  render() {
    const { size, color } = this.props;
    return (
      <svg width={`${size}px`} height={`${size}px`} viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="Foot" transform="translate(-625.000000, -959.000000)">
            <g id="Group-18">
              <g id="Foot" transform="translate(282.000000, 834.000000)">
                <g id="phone" transform="translate(341.000000, 123.000000)">
                  <g id="ic_call_24px">
                    <polygon id="Shape" points="0 0 16 0 16 16 0 16" />
                    <path
                      d="M4.41333333,7.19333333 C5.37333333,9.08 6.92,10.62 8.80666667,11.5866667 L10.2733333,10.12 C10.4533333,9.94 10.72,9.88 10.9533333,9.96 C11.7,10.2066667 12.5066667,10.34 13.3333333,10.34 C13.7,10.34 14,10.64 14,11.0066667 L14,13.3333333 C14,13.7 13.7,14 13.3333333,14 C7.07333333,14 2,8.92666667 2,2.66666667 C2,2.3 2.3,2 2.66666667,2 L5,2 C5.36666667,2 5.66666667,2.3 5.66666667,2.66666667 C5.66666667,3.5 5.8,4.3 6.04666667,5.04666667 C6.12,5.28 6.06666667,5.54 5.88,5.72666667 L4.41333333,7.19333333 Z"
                      id="Shape"
                      fill={color}
                      fillRule="nonzero"
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

export default Phone;

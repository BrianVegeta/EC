// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';

class time extends React.Component {
  static defaultProps = {
    size: 26,
  }

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { size } = this.props;
    return (
      <svg width={`${size}px`} height={`${size - 1}px`}viewBox="0 0 26 25" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-62.000000, -251.000000)">
            <g id="Group-34" transform="translate(57.000000, 245.000000)">
              <rect id="Rectangle-5" x="0" y="0" width="36" height="36" />
              <rect id="Rectangle-8" stroke="#888888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" x="6" y="8.82352941" width="24" height="21.1764706" rx="2" />
              <polyline id="Path-2" stroke="#54B9C5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" points="14.4705882 21.7647317 17.2531326 24.3956801 22.8046875 17.5284926" />
              <path d="M6,10.8303714 C6,9.72202318 6.89702623,8.82352941 8.00494659,8.82352941 L27.9950534,8.82352941 C29.1023548,8.82352941 30,9.71832267 30,10.8303714 L30,14.4705882 L6,14.4705882 L6,10.8303714 Z" id="Rectangle-8" stroke="#888888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.9764706,6.70588235 L13.9764706,10.9411765" id="Line" stroke="#888888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M22.4470588,6.70588235 L22.4470588,10.9411765" id="Line" stroke="#888888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default time;

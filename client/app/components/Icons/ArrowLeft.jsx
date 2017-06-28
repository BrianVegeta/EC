import React from 'react';
import PropTypes from 'prop-types';

class Icon extends React.Component {
  static defaultProps = {
    size: 20,
    color: '#333',
  };
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  };
  render() {
    return (
      <svg width="50px" height="50px" viewBox="0 0 50 50" version="1.1" xmlns="http://www.w3.org/2000/svg" >
        <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <g id="arrow_last" fillRule="nonzero" fill="#FFFFFF">
            <g id="Group-2" transform="translate(16.000000, 12.000000)">
              <polygon id="Triangle" points="15.5126753 2.30843943 13.1080509 0 0 13.6542197 13.1080509 27.3084394 15.5126753 25 4.62072625 13.6542197" />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Icon;

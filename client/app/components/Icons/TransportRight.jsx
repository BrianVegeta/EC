// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';

class TransportRight extends React.Component {
  static defaultProps = {
    width: 31,
    height: 23,
  }

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { width, height } = this.props;
    return (
      <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 31 23" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-357.000000, -252.000000)">
            <g id="Group-82" transform="translate(355.000000, 245.000000)">
              <rect id="Rectangle-5" x="0" y="0" width="36" height="36" />
              <g id="Group-17" transform="translate(3.000000, 7.000000)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <polyline id="Stroke-3" stroke="#54B9C4" points="18.8626435 19.0741315 15.5944186 19.0741315 15.5944186 3.97808313 24.0229985 3.97808313 28.9215636 11.8893734 28.9215636 19.0741315 25.6525843 19.0741315" />
                <polyline id="Stroke-1" stroke="#888888" points="3.43476627 19.0741315 0.469825444 19.0741315 0.469825444 0.928970223 15.5947959 0.928970223 15.5947959 19.0741315 11.2318817 19.0741315" />
                <path d="M10.8221464,19.0741315 C10.8221464,17.2705025 9.30195414,15.8080025 7.42717604,15.8080025 C5.55239793,15.8080025 4.03220562,17.2705025 4.03220562,19.0741315 C4.03220562,20.8777605 5.55239793,22.3402605 7.42717604,22.3402605 C9.30195414,22.3402605 10.8221464,20.8777605 10.8221464,19.0741315 Z" id="Stroke-5" stroke="#888888" />
                <path d="M25.6528861,19.0741315 C25.6528861,17.2705025 24.1326938,15.8080025 22.2579157,15.8080025 C20.3831376,15.8080025 18.8629453,17.2705025 18.8629453,19.0741315 C18.8629453,20.8777605 20.3831376,22.3402605 22.2579157,22.3402605 C24.1326938,22.3402605 25.6528861,20.8777605 25.6528861,19.0741315 Z" id="Stroke-7" stroke="#888888" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default TransportRight;

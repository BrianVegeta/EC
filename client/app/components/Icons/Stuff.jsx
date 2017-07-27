// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';

class Stuff extends React.Component {
  static defaultProps = {
    size: 30,
  }

  static propTypes = {
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { size } = this.props;
    return (
      <svg width={`${size}px`} height={`${size - 2}px`} viewBox="0 0 30 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-60.000000, -171.000000)">
            <g id="Group-74" transform="translate(57.000000, 166.000000)">
              <rect id="Rectangle-5" x="0" y="1" width="36" height="36" />
              <path d="M27.0216137,29.1802512 L27.877142,32.4988777 C28.0119144,33.0216648 27.6921047,33.3387814 27.1893884,33.2137819 L13.0117166,29.688529 C12.4971084,29.5605726 11.9713053,29.0354605 11.8380439,28.5185346 L8.260497,14.6410949 L8.260497,14.6410949 C8.12690365,14.1228812 8.42713181,13.8043655 8.94990201,13.9343514 L12.1227637,14.7232778" id="Rectangle-12" stroke="#888888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" transform="translate(18.068442, 23.573143) rotate(-45.000000) translate(-18.068442, -23.573143) " />
              <path d="M27.0216137,24.3340973 L27.877142,27.6527239 C28.0119144,28.1755109 27.6921047,28.4926275 27.1893884,28.367628 L13.0117166,24.8423752 C12.4971084,24.7144188 11.9713053,24.1893066 11.8380439,23.6723808 L8.260497,9.79494104 L8.260497,9.79494104 C8.12690365,9.27672737 8.42713181,8.95821169 8.94990201,9.08819757 L12.1227637,9.87712397" id="Rectangle-12" stroke="#54B9C4" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" transform="translate(18.068442, 18.726989) rotate(-45.000000) translate(-18.068442, -18.726989) " />
              <path d="M8.29590152,5.09192015 C8.14173027,4.49388404 8.49683201,4.12845158 9.09416878,4.2769783 L22.9805636,7.72980564 C23.5756057,7.87776179 24.1839837,8.4864669 24.3371344,9.08054412 L27.8401621,22.6689212 C27.9943334,23.2669573 27.6392316,23.6323898 27.0418949,23.4838631 L13.1555,20.0310357 C12.560458,19.8830796 11.95208,19.2743745 11.7989293,18.6802973 L8.29590152,5.09192015 Z" id="Rectangle-12" stroke="#888888" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" transform="translate(18.068032, 13.880421) rotate(-45.000000) translate(-18.068032, -13.880421) " />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default Stuff;

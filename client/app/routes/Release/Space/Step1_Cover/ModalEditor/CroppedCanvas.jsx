import React from 'react';
import PropTypes from 'prop-types';

class CroppedCanvas extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    dataUrl: PropTypes.string.isRequired,
  };
  render() {
    const { className, dataUrl } = this.props;
    const innerStyle = {
      height: 550,
      width: 550,
      background: `url(${dataUrl}) center center/cover no-repeat`,
      margin: '0 auto',
    };
    return (
      <div className={className}>
        <div style={innerStyle} />
      </div>
    );
  }
}

export default CroppedCanvas;

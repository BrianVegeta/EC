import React from 'react';
import PropTypes from 'prop-types';

class MainWrapper extends React.Component {
  static defaultProps = {
    wrapperFor: 'normal',
    minHeight: null,
  };
  static propTypes = {
    wrapperFor: PropTypes.oneOf(['largeHeader', 'normal']),
    children: PropTypes.element.isRequired,
    minHeight: PropTypes.number,
  };
  renderPadding() {
    switch (this.props.wrapperFor) {
      case 'largeHeader':
        return 170;
      default:
        return 70;
    }
  }
  render() {
    const { minHeight, children } = this.props;
    const style = {
      paddingTop: this.renderPadding(),
      minHeight,
    };
    return (
      <div className="container clear" >
        <div {...{ className: 'main-container', style }} >{children}</div>
      </div>
    );
  }
}

export default MainWrapper;

import React from 'react';
import PropTypes from 'prop-types';

class MainWrapper extends React.Component {

  static defaultProps = {
    minHeight: null,
    paddingTop: 0,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
    minHeight: PropTypes.number,
    paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  render() {
    const { minHeight, paddingTop, children } = this.props;
    const style = { paddingTop, minHeight };

    return (
      <div className="container main-wrapper clear" >
        <div className="main-container" style={style} >
          {children}
        </div>
      </div>
    );
  }
}

export default MainWrapper;

import React, { PropTypes } from 'react';

class Spinner extends React.PureComponent {
  render() {
    const { height } = this.props;
    const style = { height: `${height}px` };
    return (
      <div className="spinner-outer" >
        <div className="spinner-container" style={style}>
          <div className="spinner">
            <div className="rect1" />
            <div className="rect2" />
            <div className="rect3" />
            <div className="rect4" />
            <div className="rect5" />
          </div>
        </div>
      </div>
    );
  }
}
Spinner.propTypes = {
  height: PropTypes.number.isRequired,
};
export default Spinner;

import React from 'react';
import PropTypes from 'prop-types';
import MDSpinner from 'react-md-spinner';
import colors from 'styles/colorExport.scss';

class LoadingMDSpinner extends React.Component {

  static defaultProps = {
    size: 30,
  };

  static propTypes = {
    size: PropTypes.number,
  };

  render() {
    const { size } = this.props;
    return (
      <MDSpinner
        style={{ width: size, height: size }}
        singleColor={colors.primaryColor}
      />
    );
  }
}

export default LoadingMDSpinner;

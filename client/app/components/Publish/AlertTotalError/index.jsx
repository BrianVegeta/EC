import React from 'react';
import PropTypes from 'prop-types';
import AlertPanel from 'components/Alert/Panel';

class AlertTotalError extends React.Component {

  static defaultProps = {
    totalError: null,
  };

  static propTypes = {
    totalError: PropTypes.string,
  };

  render() {
    const { totalError } = this.props;
    return (
      <AlertPanel
        text={totalError}
        outerStyle={{
          display: 'inline-block',
          width: 'auto',
          marginBottom: 40,
        }}
      />
    );
  }
}

export default AlertTotalError;

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Dates from './Dates';
import WithError from '../../../components/WithError';

class DatesWithError extends React.Component {
  static defaultProps = {
    validator: PropTypes.func.isRequired,
  };
  static propTypes = {
    validator: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }
  valid() {
    const errors = this.props.validator();
    this.setState({ error: _.isEmpty(errors) ? null : errors[0] });
  }
  render() {
    const { validator, ...otherProps } = this.props;
    return (
      <WithError error={this.state.error} >
        <Dates {...otherProps} />
      </WithError>
    );
  }
}

export default DatesWithError;

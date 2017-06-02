import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import WithError from '../WithError';

export default function inputWithError(InputComponent) {
  return class extends React.Component {
    static defaultProps = {
      onBlur: null,
    };
    static propTypes = {
      onBlur: PropTypes.func,
      validator: PropTypes.func.isRequired,
    };
    constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
      this.state = {
        errors: [],
      };
    }
    onBlur() {
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur();
      }
      this.valid();
    }
    valid() {
      const { validator } = this.props;
      const errors = validator();
      this.setState({ errors });
      return _.isEmpty(errors);
    }
    render() {
      const {
        onBlur,
        validator,
        ...otherProps
      } = this.props;
      const inputProps = {
        ...otherProps,
        onBlur: this.onBlur,
      };
      const { errors } = this.state;
      const error = _.isEmpty(errors) ? null : errors[0];
      return (
        <WithError error={error}>
          <InputComponent {...inputProps} />
        </WithError>
      );
    }
  };
}

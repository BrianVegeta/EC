import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import WithError from '../WithError';

export default function inputWithError(InputComponent) {
  return class extends React.Component {
    static defaultProps = {
      onBlur: null,
      width: '100%',
    };
    static propTypes = {
      onBlur: PropTypes.func,
      validator: PropTypes.func.isRequired,
      width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
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
        width,
        ...otherProps
      } = this.props;
      const inputProps = {
        ...otherProps,
        width,
        onBlur: this.onBlur,
      };
      const { errors } = this.state;
      const error = _.isEmpty(errors) ? null : errors[0];
      return (
        <WithError error={error} width={width}>
          <InputComponent {...inputProps} />
        </WithError>
      );
    }
  };
}

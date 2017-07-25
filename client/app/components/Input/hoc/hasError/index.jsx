import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import _ from 'lodash';
import validate from 'validate.js';
import styled from 'styled-components';
import ErrorTooltip from 'components/ErrorTooltip';
import { randomKey } from 'lib/generator';

export default function inputWithError(InputComponent, defaultProps) {
  const Container = styled.div`
    display: inline-block;
  `;

  return class extends React.Component {

    static defaultProps = {
      value: '',
      equalityTarget: null,
      onBlur: null,
      constraints: null,
      width: '100%',
      skipValidation: defaultProps.skipValidation || false,
      validateOnBlur: defaultProps.validateOnBlur && true,
      errorType: defaultProps.errorType || 'tooltip',
    };

    static propTypes = {
      value: PropTypes.string,
      equalityTarget: PropTypes.objectOf(PropTypes.string),
      onBlur: PropTypes.func,
      constraints: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.bool,
          PropTypes.object,
        ]),
      ),
      width: myPropTypes.width,
      skipValidation: PropTypes.bool,
      validateOnBlur: PropTypes.bool,
      errorType: PropTypes.oneOf(['none', 'tooltip', 'inline']),
    };

    constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
      this.state = {
        error: null,
      };
    }

    onBlur() {
      const { onBlur, validateOnBlur } = this.props;
      if (onBlur) onBlur();
      if (validateOnBlur) this.valid();
    }

    clearError() {
      this.setState({ error: null });
    }

    validator() {
      const tempKey = randomKey();
      const { value, constraints, equalityTarget } = this.props;

      /* password confirmation */
      if (equalityTarget) {
        const errors = validate(
          Object.assign({}, equalityTarget, { [tempKey]: value }),
          { [tempKey]: constraints },
        );
        return (errors && errors[tempKey]) || undefined;
      }

      return validate.single(value, constraints);
    }

    valid() {
      if (this.props.skipValidation) {
        this.clearError();
        return true;
      }
      const errors = this.validator();
      if (!_.isArray(errors)) {
        this.clearError();
        return true;
      }

      const error = _.head(errors);
      if (!error) {
        this.clearError();
        return true;
      }

      this.setState({ error });
      return false;
    }

    handle

    render() {
      const { error } = this.state;
      const {
        onBlur,
        constraints,
        skipValidation,
        validateOnBlur,
        errorType,
        width,
        ...otherProps
      } = this.props;

      return (
        <Container style={{ width }}>
          {error && errorType === 'tooltip' && <ErrorTooltip message={error} />}
          <InputComponent
            errorMessage={(error && errorType === 'inline') ? error : null}
            {...otherProps}
            onBlur={this.onBlur}
            width={width}
            invalid={!!error}
          />
        </Container>
      );
    }
  };
}

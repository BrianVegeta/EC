import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import _ from 'lodash';
import validate from 'validate.js';
import styled from 'styled-components';
import ErrorTooltip from 'components/ErrorTooltip';

export default function inputWithError(InputComponent, defaultContraints) {
  const Container = styled.div`
    display: inline-block;
  `;
  return class extends React.Component {

    static defaultProps = {
      value: '',
      onBlur: null,
      constraints: null,
      width: '100%',
      disableValidator: false,
      disableBlurValid: false,
      disableErrorTooltip: false,
    };

    static propTypes = {
      value: PropTypes.string,
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
      disableValidator: PropTypes.bool,
      disableBlurValid: PropTypes.bool,
      disableErrorTooltip: PropTypes.bool,
    };

    constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
      this.state = {
        error: null,
      };
    }

    onBlur() {
      const { onBlur, disableBlurValid } = this.props;
      if (onBlur) onBlur();
      if (!disableBlurValid) {
        this.valid();
      }
    }

    clearError() {
      this.setState({ error: null });
    }

    validator() {
      const { value, constraints } = this.props;
      return validate.single(value, constraints || defaultContraints);
    }

    valid() {
      if (this.props.disableValidator) {
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

    render() {
      const { error } = this.state;
      const {
        onBlur,
        constraints,
        disableValidator,
        disableBlurValid,
        disableErrorTooltip,
        width,
        ...otherProps
      } = this.props;

      return (
        <Container style={{ width }}>
          { !disableErrorTooltip &&
            error &&
            <ErrorTooltip message={error} />}
          <InputComponent
            {...{
              ...otherProps,
              onBlur: this.onBlur,
              width,
              invalid: !!error,
            }}
          />
        </Container>
      );
    }
  };
}

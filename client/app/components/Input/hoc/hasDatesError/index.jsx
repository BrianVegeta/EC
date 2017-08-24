import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import myPropTypes from 'propTypes';
import { isObject, head } from 'lodash';
import validate from 'validate.js';
import styled from 'styled-components';
import ErrorTooltip from 'components/ErrorTooltip';


export default function inputWithError(InputComponent, defaultProps = {}) {
  const Container = styled.div`
    display: inline-block;
  `;

  return class extends React.Component {

    static defaultProps = {
      startDate: null,
      endDate: null,
      onBlur: null,
      width: '100%',
      startDateConstraint: null,
      endDateConstraint: null,

      skipValidation: defaultProps.skipValidation || false,
      validateOnBlur: defaultProps.validateOnBlur && true,
      errorType: defaultProps.errorType || 'tooltip',
    };

    static propTypes = {
      startDate: momentPropTypes.momentObj,
      endDate: momentPropTypes.momentObj,
      onBlur: PropTypes.func,
      width: myPropTypes.width,
      startDateConstraint: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.bool,
          PropTypes.object,
        ]),
      ),
      endDateConstraint: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.number,
          PropTypes.string,
          PropTypes.bool,
          PropTypes.object,
        ]),
      ),
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
      const {
        startDate,
        endDate,
        startDateConstraint,
        endDateConstraint,
      } = this.props;
      return validate(
        { startDate, endDate },
        {
          startDate: startDateConstraint,
          endDate: endDateConstraint,
        },
      );
    }

    valid() {
      if (this.props.skipValidation) {
        this.clearError();
        return true;
      }
      const errors = this.validator();
      if (!isObject(errors)) {
        this.clearError();
        return true;
      }

      const { startDate, endDate } = errors;

      const error = head(startDate) || head(endDate);
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

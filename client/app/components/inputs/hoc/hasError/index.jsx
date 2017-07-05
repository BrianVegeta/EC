import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import _ from 'lodash';
import styled from 'styled-components';
import ErrorTooltip from 'components/ErrorTooltip';

export default function inputWithError(InputComponent) {
  const Container = styled.div`
    display: inline-block;
  `;
  return class extends React.Component {
    static defaultProps = {
      onBlur: null,
      validator: null,
      width: '100%',
    };
    static propTypes = {
      onBlur: PropTypes.func,
      validator: PropTypes.func,
      width: myPropTypes.width,
    };
    constructor(props) {
      super(props);
      this.onBlur = this.onBlur.bind(this);
      this.state = {
        error: null,
      };
    }
    onBlur() {
      const { onBlur } = this.props;
      if (onBlur) {
        onBlur();
      }
      this.valid();
    }
    clearError() {
      this.setState({ error: null });
    }
    valid() {
      const { validator } = this.props;
      if (!validator) {
        this.clearError();
        return true;
      }

      const errors = validator();
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
        validator,
        width,
        ...otherProps
      } = this.props;

      const inputProps = {
        ...otherProps,
        width,
        onBlur: this.onBlur,
        invalid: !!error,
      };
      return (
        <Container style={{ width }}>
          {error && <ErrorTooltip message={error} />}
          <InputComponent {...inputProps} />
        </Container>
      );
    }
  };
}

import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import InputSelection from 'components/inputs/InputSelection';

const Container = styled.div`
  width: 380px;
  margin: 20px 0;
`;

class Coupons extends React.Component {
  static propTypes = {
    model: myPropTypes.reserve.couponsModel.isRequired,
    placeholder: PropTypes.string.isRequired,
  };
  render() {
    const { placeholder, model } = this.props;
    const { value, options, onSelect, validator } = model;

    return (
      <Container>
        <InputSelection
          {...{
            placeholder,
            value,
            options,
            onSelect,
            validator,
          }}
        />
      </Container>
    );
  }
}

export default Coupons;

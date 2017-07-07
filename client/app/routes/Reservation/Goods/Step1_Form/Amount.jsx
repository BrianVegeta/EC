import React from 'react';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import FormControl from 'components/reservation/wrapper/FormControl';
import InputCounter from 'components/inputs/Counter';

const Container = styled.div`
  display: inline-block;
  width: 152px;
`;

class Amount extends React.Component {
  static propTypes = {
    model: myPropTypes.reserve.amountModel.isRequired,
  };
  render() {
    const {
      value,
      remainder,
      onChange,
      validator,
    } = this.props.model;

    const label = <span>數量 ／ 目前{remainder}件</span>;
    return (
      <Container>
        <FormControl label={label}>
          <InputCounter
            suffix="件"
            max={remainder}
            {...{ value, onChange, validator }}
          />
        </FormControl>
      </Container>
    );
  }
}

export default Amount;

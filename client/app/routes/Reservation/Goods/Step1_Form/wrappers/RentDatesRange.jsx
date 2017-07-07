import React from 'react';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import FormControl from 'components/reservation/wrapper/FormControl';
import DatesPicker from 'components/inputs/DatesPicker';

const Container = styled.div`
  vertical-align: top;
  display: inline-block;
  width: 336px;
  margin-right: 30px;
`;

class RentDatesRange extends React.Component {

  static propTypes = {
    label: myPropTypes.label.isRequired,
    model: myPropTypes.addresses.isRequired,
  };

  render() {
    const { label, model } = this.props;
    const {
      startDate,
      endDate,
      minPicks,
      preparation,
      onDatesChange,
      validator,
    } = model;

    return (
      <Container>
        <FormControl label={label} >
          <DatesPicker
            {...{
              startDate,
              endDate,
              minPicks,
              preparation,
              onDatesChange,
              validator,
            }}
          />
        </FormControl>
      </Container>
    );
  }
}

export default RentDatesRange;

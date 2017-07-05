import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InputText from 'components/inputs/Text';
import SelectionCities from 'components/inputs/SelectionCitiesContainer';

const Container = styled.div`
  margin-bottom: 20px;
  & > div:first-child {
    margin-bottom: 20px;
    width: 300px;
  }
`;
const CityContainer = styled.div`
  margin-bottom: 20px;
  width: 300px;
`;
class ExtraAddresses extends React.Component {
  render() {
    return (
      <Container>
        <CityContainer>
          <SelectionCities />
        </CityContainer>
        <InputText />
      </Container>
    );
  }
}

export default ExtraAddresses;

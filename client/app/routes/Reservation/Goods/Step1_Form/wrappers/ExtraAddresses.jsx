import React from 'react';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import InputText from 'components/Input/Text';
import SelectionCities from 'components/inputs/SelectionCitiesContainer';

const Container = styled.div`
  margin-bottom: 20px;
`;

const CityContainer = styled.div`
  margin-bottom: 20px;
  width: 300px;
`;

class ExtraAddresses extends React.Component {

  static propTypes = {
    model: myPropTypes.addresses.isRequired,
  };

  render() {
    const { model } = this.props;
    const { cityName, areaName, address } = model;

    return (
      <Container>
        <CityContainer>
          <SelectionCities
            ref={citiesSelection => (
              this.citiesSelection = (
                citiesSelection && citiesSelection.getWrappedInstance()
              )
            )}
            {...{ cityName, areaName }}
            onSelect={model.onCityareaSelect}
            validator={model.cityareaValidator}
          />
        </CityContainer>
        <InputText
          placeholder="詳細地址"
          value={address}
          onChange={model.onAddressChange}
          validator={model.addressValidator}
        />
      </Container>
    );
  }
}

export default ExtraAddresses;

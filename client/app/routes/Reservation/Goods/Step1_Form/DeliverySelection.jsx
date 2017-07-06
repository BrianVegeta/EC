import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import FormControl from 'components/reservation/wrapper/FormControl';
import DeliverySingle from 'components/reservation/wrapper/DeliverySingle';
import InputSelection from 'components/inputs/InputSelection';

const DeliveryContainer = styled.div`
  width: 300px;
`;
class Deliverydelivery extends React.Component {
  static defaultProps = {
    helper: null,
  };
  static propTypes = {
    label: PropTypes.string.isRequired,
    model: myPropTypes.deliverySelectionInstace.isRequired,
    helper: PropTypes.string,
  };
  render() {
    const { label, model, helper } = this.props;
    const {
      value,
      options,
      onSelect,
      isOptionAlone,
      singleOptionDesc,
      singleOptionToUpdate,
      validator,
    } = model;

    if (isOptionAlone) {
      return (
        <DeliverySingle
          label={`${label}：`}
          content={singleOptionDesc}
          helper={helper}
          singleOptionToUpdate={singleOptionToUpdate}
        />
      );
    }
    return (
      <FormControl {...{ label, helper }}>
        <DeliveryContainer >
          <InputSelection
            placeholder={`選擇${label}`}
            {...{ value, options, onSelect, validator }}
          />
        </DeliveryContainer>
      </FormControl>
    );
  }
}

export default Deliverydelivery;

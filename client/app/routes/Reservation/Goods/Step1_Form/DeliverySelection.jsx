import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import styled from 'styled-components';
import FormControl from 'components/reservation/wrapper/FormControl';
import DeliverySingle from 'components/reservation/wrapper/DeliverySingle';
import InputSelection from 'components/inputs/InputSelection';

const Selection = styled.div`
  width: 300px;
`;
class DeliverySelection extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    instance: myPropTypes.deliverySelectionInstace.isRequired,
  };
  render() {
    const { label, instance } = this.props;
    const {
      options,
      onSelect,
      isOptionAlone,
      singleOptionDesc,
      validator,
    } = instance;

    if (isOptionAlone) {
      return <DeliverySingle label={`${label}：`} content={singleOptionDesc} />;
    }
    return (
      <FormControl label={label}>
        <Selection >
          <InputSelection
            {...{
              placeholder: `選擇${label}`,
              options,
              onSelect,
              validator,
            }}
          />
        </Selection>
      </FormControl>
    );
  }
}

export default DeliverySelection;

import React, { PropTypes } from 'react'

class DeliveryAddresses extends React.Component {
  render () {
    return (
      <div>
        <InputSelectionCitiesWithError {...citiesProps} />
        <div styleName="addressDetailContainer">
          <InputTextWithError {...addressDetailProps} />
        </div>
      </div>
    );
  }
}

export default DeliveryAddresses;

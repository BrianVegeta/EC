import React, { PropTypes } from 'react';
import Card from './Card';

class Items extends React.Component {

  render() {
    return (
      <div>
        {
          this.props.items.records.map((item, index) =>
            <div key={`${index + 1}`} styleName="item-container" >
              <Card item={item} />
            </div>,
          )
        }
      </div>
    );
  }
}

export default Items;

import React, { PropTypes } from 'react';
import Card from './Card';

class Items extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.items.map(item =>
            <div styleName="item-container" >
              <Card item={item} />
            </div>,
          )
        }
      </div>
    );
  }
}

export default Items;

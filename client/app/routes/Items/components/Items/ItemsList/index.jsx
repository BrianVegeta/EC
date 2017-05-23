import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Card from './Card';

class Items extends React.Component {

  render() {
    return (
      <div style={{ minHeight: '1500px' }}>
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

export default CSS(Items, styles);

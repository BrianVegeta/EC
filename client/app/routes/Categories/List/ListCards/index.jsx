import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Card from '../Card';

const propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.object.isRequired,
};
class Cards extends React.Component {
  render() {
    const { items, type } = this.props;
    const { categories } = items;

    if (categories === false) {
      return null;
    }
    return (
      <div className="clear" styleName="container" >
        {categories[type].map(cateDetail =>
          <div key={cateDetail.id} styleName="card" >
            <Card {...cateDetail} />
          </div>,
        )}
      </div>
    );
  }
}
Cards.propTypes = propTypes;
export default CSS(Cards, styles);

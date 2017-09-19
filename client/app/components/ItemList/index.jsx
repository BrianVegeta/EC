import React from 'react';
// import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';

import ItemBoard, {
  CONTROL_TYPE_PUBLIC,
  CONTROL_TYPE_PRIVATE,
  CONTROL_TYPE_PRIVATE_COLLECTION,
} from 'components/ItemBoard';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  ItemsContainer,
  ItemContainer,
} from './styles';

const cx = classnames.bind(styles);
class ItemList extends React.Component {

  static defaultProps = {
    eachMargin: 26,
    type: CONTROL_TYPE_PUBLIC,
    onDelete: null,
  };

  static propTypes = {
    records: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    eachMargin: PropTypes.number,
    type: PropTypes.oneOf([
      CONTROL_TYPE_PUBLIC,
      CONTROL_TYPE_PRIVATE,
      CONTROL_TYPE_PRIVATE_COLLECTION]),
    onDelete: PropTypes.func,
  };

  render() {
    const { records, eachMargin, type, onDelete } = this.props;
    return (
      <div styleName="container">
        <ItemsContainer marginLeft={eachMargin} className="clear">
          {records.map((item, index) => (
            <ItemContainer
              key={`${index + 1}`}
              className={cx('item-card')}
              marginLeft={eachMargin}
            >
              <ItemBoard
                item={item}
                type={type}
                onDelete={onDelete}
              />
            </ItemContainer>
          ))}
        </ItemsContainer>
      </div>
    );
  }
}
export {
  CONTROL_TYPE_PUBLIC,
  CONTROL_TYPE_PRIVATE,
};
export default CSS(ItemList, styles);

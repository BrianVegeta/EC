import React from 'react';
// import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';

import ItemBoard from 'components/ItemBoard';

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
  };

  static propTypes = {
    records: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    eachMargin: PropTypes.number,
  };

  render() {
    const { records, eachMargin } = this.props;

    return (
      <div styleName="container">
        <ItemsContainer marginLeft={eachMargin} className="clear">
          {records.map((item, index) => (
            <ItemContainer
              key={`${index + 1}`}
              className={cx('item-card')}
              marginLeft={eachMargin}
            >
              <ItemBoard item={item} />
            </ItemContainer>
          ))}
        </ItemsContainer>
      </div>
    );
  }
}

export default CSS(ItemList, styles);

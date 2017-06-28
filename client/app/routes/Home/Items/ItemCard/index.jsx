/* eslint-disable camelcase */
import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Picture from '../../../../components/Picture';
import Avatar from '../../../../components/Avatar';
import myPropTypes from '../../../../propTypes';

class ItemCard extends React.Component {
  static propTypes = {
    item: myPropTypes.itemCard.isRequired,
  };
  render() {
    const { item } = this.props;
    return (
      <div styleName="container">
        <div styleName="cover">
          <Picture src={item.coverUrl} />
        </div>
        <div styleName="title">{item.pname}</div>
        <div styleName="price">{item.priceDesc}</div>
        <div styleName="footer">
          <div styleName="footer-row">
            <div styleName="owner">
              <div styleName="user-avatar">
                <Avatar src={item.avatarUrl} />
              </div>
              <span styleName="username">{item.ownerName}</span>
            </div>
            <div styleName="evaluation">
              <span styleName="score">{item.favoriteCount}</span>
              <span styleName="mark">
                <i className="fa fa-heart" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(ItemCard, styles);

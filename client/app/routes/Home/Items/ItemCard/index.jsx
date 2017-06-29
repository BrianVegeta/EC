import React from 'react';
import { Link } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Picture from '../../../../components/Picture';
import Avatar from '../../../../components/Avatar';
import myPropTypes from '../../../../propTypes';
import IconFavoriteO from 'react-icons/lib/md/favorite-outline';
import IconFavorite from 'react-icons/lib/md/favorite';

class ItemCard extends React.Component {
  static propTypes = {
    item: myPropTypes.itemCard.isRequired,
  };
  render() {
    const { item } = this.props;
    const path = `/p/${item.pname}-i.${item.pid}`;
    return (
      <div styleName="container">
        <Link to={path} >
          <div styleName="cover">
            <Picture src={item.coverUrl} />
          </div>
        </Link>
        <Link to={path} >
          <div styleName="title">{item.pname}</div>
        </Link>
        <div styleName="price">{item.priceDesc}</div>
        <div styleName="footer">
          <div styleName="owner">
            <div styleName="avatar">
              <Avatar src={item.avatarUrl} />
            </div>
            <span styleName="username">{item.ownerName}</span>
          </div>
          <div styleName="favorite">
            <span styleName="favoriteCount">{item.favoriteCount}</span>
            <button className="button" styleName="favoriteHeart">
              <IconFavoriteO size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(ItemCard, styles);

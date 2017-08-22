import React from 'react';
import myPropTypes from 'propTypes';

import { Link } from 'react-router';
import FavoriteHeart from 'components/Button/FavoriteHeart';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';

import { itemPath } from 'lib/paths';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class ItemCard extends React.Component {
  static propTypes = {
    item: myPropTypes.itemCard.isRequired,
  };
  render() {
    const { item, dispatch } = this.props;
    const {
      isMyFavorite,
      pname,
      pid,
      img1,
      priceDesc,
      avatarUrl,
      ownerName,
      favoriteCount,
    } = item;

    return (
      <div styleName="container">
        <Link to={itemPath(pname, pid)} >
          <div styleName="cover">
            <Picture src={img1} />
          </div>
        </Link>
        <Link to={itemPath(pname, pid)} >
          <div styleName="title">{pname}</div>
        </Link>
        <div styleName="price">{priceDesc}</div>
        <div styleName="footer">
          <div styleName="owner">
            <div styleName="avatar">
              <Avatar src={avatarUrl} />
            </div>
            <span styleName="username">{ownerName}</span>
          </div>
          <div style={{ float: 'right' }}>
            <FavoriteHeart
              pid={pid}
              isActive={isMyFavorite}
              count={favoriteCount}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(ItemCard, styles);

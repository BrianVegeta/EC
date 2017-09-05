import React from 'react';
import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import FavoriteHeart from 'containers/FavoriteHeart/Container';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import {
  CHARGE_TYPE_FIX,
  CHARGE_TYPE_COUNT,
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_MONTH,
} from 'constants/publishTypes';

import { itemPath } from 'lib/paths';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class ItemCard extends React.Component {
  static propTypes = {
    item: myPropTypes.itemCard.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  renderUnit(ChargeType) {
    switch (ChargeType) {
      case CHARGE_TYPE_FIX:
        return '/次';
      case CHARGE_TYPE_COUNT:
        return '/件';
      case CHARGE_TYPE_DAY:
        return '/天';
      case CHARGE_TYPE_MONTH:
        return '/月';
      default:
        return '';
    }
  }

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
      calculate_charge_type,
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
        <div styleName="price">{priceDesc}{this.renderUnit(calculate_charge_type)}</div>
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

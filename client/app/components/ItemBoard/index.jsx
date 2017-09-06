/* eslint-disable camelcase */
import React from 'react';
import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';

import IconDelete from 'react-icons/lib/md/delete';
import { Link } from 'react-router';
import FavoriteHeart from 'containers/FavoriteHeart/Container';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';

import { itemPath, userprofilePaths } from 'lib/paths';
import { formatCurrency } from 'lib/currency';
import {
  CHARGE_TYPE_FIX,
  CHARGE_TYPE_COUNT,
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_MONTH,
} from 'constants/publishTypes';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';


import styles from './styles.sass';
import { CoverContainer } from './styles';


export const CONTROL_TYPE_PUBLIC = 'CONTROL_TYPE_PUBLIC';
export const CONTROL_TYPE_PRIVATE = 'CONTROL_TYPE_PRIVATE';
const cx = classnames.bind(styles);
class ItemBoard extends React.Component {

  static defaultProps = {
    size: 246,
    canFavorite: true,
    type: CONTROL_TYPE_PUBLIC,
    onDelete: null,
  };

  static propTypes = {
    item: myPropTypes.itemBoard.isRequired,
    size: PropTypes.number,
    type: PropTypes.oneOf([CONTROL_TYPE_PUBLIC, CONTROL_TYPE_PRIVATE]),
    onDelete: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { onDelete, item: { pid } } = this.props;
    if (onDelete) onDelete(pid);
  }

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

  renderDelete() {
    return (
      <div styleName="delete">
        <button className={`button ${cx('deleteBtn')}`} onClick={this.onDelete} >
          <IconDelete size={20} />
          <span styleName="delete-text">刪除</span>
        </button>
      </div>
    );
  }

  renderFavorite() {
    const { item: { favorite_count, in_my_favorite, pid } } = this.props;
    // return (
    //   <div styleName="favorite">
    //     <span styleName="favoriteCount">{favorite_count}</span>
    //     <button className="button" styleName="favoriteHeart">
    //       <FavoriteHeart
    //         size={20}
    //         active={in_my_favorite}
    //       />
    //     </button>
    //   </div>
    // );
    return (
      <div styleName="favorite">
        <FavoriteHeart
          pid={pid}
          count={favorite_count}
          isActive={in_my_favorite}
        />
      </div>
    );
  }

  render() {
    const { item, size, type } = this.props;
    const {
      pname,
      pid,
      img1,
      price,
      owner_name,
      owner_img,
      calculate_charge_type,
      uid,
    } = item;

    return (
      <div styleName="container" >
        <Link to={itemPath(pname, pid)} >
          <CoverContainer styleName="cover" size={size}>
            <Picture src={img1} />
          </CoverContainer>
        </Link>
        <Link to={itemPath(pname, pid)} >
          <div styleName="title">{pname}</div>
        </Link>
        <div styleName="price">{formatCurrency(price)}{this.renderUnit(calculate_charge_type)}</div>
        <div styleName="footer">
          <Link
            to={userprofilePaths.indexPath(uid)}
            styleName="owner"
          >
            <div styleName="avatar">
              <Avatar src={owner_img} />
            </div>
            <span styleName="username">{owner_name}</span>
          </Link>
          {{
            [CONTROL_TYPE_PUBLIC]: this.renderFavorite(),
            [CONTROL_TYPE_PRIVATE]: this.renderDelete(),
          }[type]}
        </div>
      </div>
    );
  }
}

export default CSS(ItemBoard, styles);

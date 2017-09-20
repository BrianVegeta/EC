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
export const CONTROL_TYPE_PRIVATE_COLLECTION = 'CONTROL_TYPE_PRIVATE';
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

  renderUnit() {
    const { item: { calculate_charge_type } } = this.props;
    switch (calculate_charge_type) {
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

  renderCollection() {
    const { item: { favorite_count, pid }, onDelete } = this.props;
    return (
      <div styleName="favorite">
        <FavoriteHeart
          pid={pid}
          count={favorite_count}
          onRemoveDone={() => { onDelete(pid); }}
          isActive
        />
      </div>
    );
  }

  renderFavorite() {
    const { item: { favorite_count, in_my_favorite, pid } } = this.props;
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
  renderPanel() {
    const { type } = this.props;
    switch (type) {
      case CONTROL_TYPE_PUBLIC:
        return this.renderFavorite();
      case CONTROL_TYPE_PRIVATE:
        return this.renderDelete();
      case CONTROL_TYPE_PRIVATE_COLLECTION:
        return this.renderCollection();
      default:
        return null;
    }
  }
  render() {
    const { item, size } = this.props;
    const {
      pname,
      pid,
      img1,
      price,
      owner_name,
      owner_img,
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
        <div styleName="price">{formatCurrency(price)}{this.renderUnit()}</div>
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
          {this.renderPanel()}
        </div>
      </div>
    );
  }
}

export default CSS(ItemBoard, styles);

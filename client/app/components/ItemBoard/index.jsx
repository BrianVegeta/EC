/* eslint-disable camelcase */
import React from 'react';
import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';

import IconDelete from 'react-icons/lib/md/delete';
import { Link } from 'react-router';
import FavoriteHeart from 'components/FavoriteHeart';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';

import { itemPath } from 'lib/paths';
import { formatCurrency } from 'lib/currency';

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
    const { item: { favorite_count } } = this.props;
    return (
      <div styleName="favorite">
        <span styleName="favoriteCount">{favorite_count}</span>
        <button className="button" styleName="favoriteHeart">
          <FavoriteHeart size={20} />
        </button>
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
        <div styleName="price">{formatCurrency(price)}</div>
        <div styleName="footer">
          <div styleName="owner">
            <div styleName="avatar">
              <Avatar src={owner_img} />
            </div>
            <span styleName="username">{owner_name}</span>
          </div>
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

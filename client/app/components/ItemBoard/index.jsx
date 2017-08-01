/* eslint-disable camelcase */
import React from 'react';
import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';

import { Link } from 'react-router';
import FavoriteHeart from 'components/FavoriteHeart';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';

import { itemPath } from 'lib/paths';
import { formatCurrency } from 'lib/currency';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import { CoverContainer } from './styles';

class ItemBoard extends React.Component {

  static defaultProps = {
    size: 246,
  };

  static propTypes = {
    item: myPropTypes.itemBoard.isRequired,
    size: PropTypes.number,
  };

  render() {
    const { item, size } = this.props;
    const {
      pname,
      pid,
      img1,
      price,
      owner_name,
      owner_img,
      favorite_count,
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
          <div styleName="favorite">
            <span styleName="favoriteCount">{favorite_count}</span>
            <button className="button" styleName="favoriteHeart">
              <FavoriteHeart size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(ItemBoard, styles);

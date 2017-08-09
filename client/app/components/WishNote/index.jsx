/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import IconDelete from 'react-icons/lib/md/delete';

import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import { formatCurrency } from 'lib/currency';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class WishNote extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      picture: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
      pname: PropTypes.string.isRequired,
      expprice: PropTypes.number.isRequired,
      uid: PropTypes.string.isRequired,
      user_img: PropTypes.string.isRequired,
      user_name: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { data } = this.props;
    const {
      picture,
      description,
      id,
      pname,
      expprice,
      uid,
      user_img,
      user_name,
    } = data;

    return (
      <div styleName="container">
        {picture && <div styleName="picture" />}
        {picture &&
          <div styleName="picture-layer">
            <Picture
              src={picture}
              hasShadow={false}
              style={{
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
              }}
            />
          </div>
        }
        <div styleName="body-container">
          <div styleName="title">{pname}</div>
          {description &&
            <div styleName="description">{description}</div>
          }
          <div styleName="expect-price">預算 {formatCurrency(expprice)}</div>
          <div styleName="footer">
            <div styleName="userprofile">
              <div styleName="avatar">
                <Avatar src={user_img} />
              </div>
              <div styleName="username">{user_name}</div>
            </div>
            <div styleName="delete">
              <IconDelete />
              <span styleName="delete-text">刪除</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(WishNote, styles);

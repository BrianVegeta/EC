/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import IconDelete from 'react-icons/lib/md/delete';
import { Link } from 'react-router';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import { formatCurrency } from 'lib/currency';
import { userprofilePaths, wishRouter } from 'lib/paths';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class WishNote extends React.Component {

  static defaultProps = {
    editable: true,
  };

  static propTypes = {
    editable: PropTypes.bool,
    // onShow: PropTypes.func.isRequired,
    data: PropTypes.shape({
      picture: PropTypes.string,
      description: PropTypes.string,
      id: PropTypes.number.isRequired,
      pname: PropTypes.string.isRequired,
      expprice: PropTypes.number.isRequired,
      uid: PropTypes.string.isRequired,
      user_img: PropTypes.string,
      user_name: PropTypes.string.isRequired,
    }).isRequired,
  };

  // renderDeleteButton() {
  //   return (
  //     <div styleName="delete">
  //       <IconDelete />
  //       <span styleName="delete-text">刪除</span>
  //     </div>
  //   );
  // }

  render() {
    const { editable, data } = this.props;
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
          <Link
            to={wishRouter.detailPath(id)}
            styleName="picture-layer"
          >
            <Picture
              src={picture}
              hasShadow={false}
              style={{
                borderTopLeftRadius: 4,
                borderTopRightRadius: 4,
              }}
            />
          </Link>
        }
        <div styleName="body-container">
          <Link
            to={wishRouter.detailPath(id)}
          >
            <span styleName="title">{pname}</span>
          </Link>
          {description &&
            <div styleName="description">{description}</div>
          }
          <div styleName="expect-price">預算 {formatCurrency(expprice)}</div>
          <div styleName="footer">
            <div styleName="userprofile">
              <div styleName="avatar">
                <Avatar src={user_img} />
              </div>
              <Link
                to={userprofilePaths.indexPath(uid)}
                styleName="username"
              >
                {user_name}
              </Link>
            </div>
            { editable &&
              <div styleName="delete">
                <IconDelete />
                <span styleName="delete-text">刪除</span>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(WishNote, styles);

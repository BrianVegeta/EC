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
    deletable: null,
  };

  static propTypes = {
    deletable: PropTypes.shape({
      isDeleting: PropTypes.bool.isRequired,
      onDelete: PropTypes.func.isRequired,
    }),
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

  renderDelete() {
    const {
      deletable: {
        onDelete,
        isDeleting,
      },
      data: {
        id,
      },
    } = this.props;
    return (
      <button
        className="button"
        styleName="delete"
        onClick={isDeleting ? null : () => onDelete(id)}
      >
        <IconDelete />
        <span styleName="text">刪除</span>
      </button>
    );
  }

  render() {
    const { deletable, data } = this.props;
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
          <Link to={wishRouter.detailPath(id)} >
            <span styleName="title">{pname}</span>
          </Link>
          {description && <div styleName="description">{description}</div>}
          <div styleName="expect-price">
            預算: {expprice > 0 ? formatCurrency(expprice) : '議價'}
          </div>
          <div styleName="footer">
            <div styleName="userprofile">
              <div styleName="avatar">
                <Link to={userprofilePaths.indexPath(uid)} >
                  <Avatar src={user_img} />
                </Link>
              </div>
              <Link
                to={userprofilePaths.indexPath(uid)}
                styleName="username"
              >
                {user_name}
              </Link>
            </div>
            {deletable && this.renderDelete()}
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(WishNote, styles);

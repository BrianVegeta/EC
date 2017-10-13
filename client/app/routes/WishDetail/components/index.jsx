import React from 'react';
import { browserHistory, Link } from 'react-router';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import { formatCurrency } from 'lib/currency';
import { fromNow } from 'lib/time';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import { publishWishRouter, userprofilePaths } from 'lib/paths';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class ShowWish extends React.Component {

  static propTypes = {
    wishDetail: PropTypes.shape({
      id: PropTypes.number,
      pname: PropTypes.string,
      description: PropTypes.string,
      city: PropTypes.string,
      area: PropTypes.string,
      expprice: PropTypes.number,
      expcurrency: PropTypes.string,
      expday: PropTypes.number,
      picture: PropTypes.string,
      catId: PropTypes.string,
      categoryName: PropTypes.string,
      userImg: PropTypes.string,
      userName: PropTypes.string,
      uid: PropTypes.string,
    }).isRequired,
    dispatchRecord: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchRedirectToLogin: PropTypes.func.isRequired,
    dispatchAddToChatRoom: PropTypes.func.isRequired,
    auth: PropTypes.shape({
      isLogin: PropTypes.bool.isRequired,
      currentUser: PropTypes.object,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    this.props.dispatchRecord();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  onEdit() {
    const { wishDetail: { id } } = this.props;
    browserHistory.push(publishWishRouter.indexPath(id));
  }

  render() {
    const {
      dispatchAddToChatRoom,
      dispatchRedirectToLogin,
      wishDetail: {
        picture,
        userImg,
        userName,
        pname,
        expprice,
        categoryName,
        city,
        description,
        publishAt,
        uid,
      },
      auth: { isLogin, currentUser },
    } = this.props;
    if (!publishAt) return null;
    return (
      <div styleName="container">
        <div styleName="wishContent">
          {
            picture &&
            <div styleName="picture">
              <Picture src={picture} />
            </div>
          }
          <div styleName="title">{pname}</div>
          <div styleName="price">預算：{formatCurrency(expprice)}</div>
          <div styleName="category">分類：{categoryName}</div>
          <div styleName="city">所在城市：{city}</div>
          <div styleName="content">{description}</div>
        </div>
        <div styleName="wishFooter">
          <Link styleName="avatar" to={userprofilePaths.indexPath(uid)} >
            <Avatar src={userImg} />
          </Link>
          <div styleName="profile">
            <Link to={userprofilePaths.indexPath(uid)} >
              <div styleName="username">
                {truncate(userName, { length: 15 })}
              </div>
            </Link>
            <div styleName="publish-at">{fromNow(publishAt)}</div>
          </div>
          <div styleName="sendMessage">
            {isLogin && currentUser.uid === uid ?
              <button
                className="button"
                styleName="editMessageButton"
                onClick={this.onEdit}
              >
                編輯
              </button> :
              <button
                className="button"
                styleName="sendMessageButton"
                onClick={isLogin ?
                  () => {
                    dispatchAddToChatRoom({ uid, name: userName, picture: userImg });
                  }
                  : dispatchRedirectToLogin
                  }
              >
                私訊
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(ShowWish, styles);

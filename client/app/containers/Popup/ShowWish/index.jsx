import React from 'react';
import PropTypes from 'prop-types';
import Close from 'react-icons/lib/md/close';
import { truncate } from 'lodash';
import { formatCurrency } from 'lib/currency';
import { fromNow } from 'lib/time';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';
import { browserHistory } from 'react-router';
import { publishWishRouter } from 'lib/paths';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class ShowWish extends React.Component {
  static defaultProps = {
    card: '',
  }

  static propTypes = {
    card: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    dispatchClose: PropTypes.func.isRequired,
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

  onEdit() {
    const { card } = this.props;
    browserHistory.push(publishWishRouter.indexPath(card.id));
    this.props.dispatchClose();
  }

  render() {
    const {
      dispatchAddToChatRoom,
      dispatchRedirectToLogin,
      card,
      auth: { isLogin, currentUser },
    } = this.props;
    return (
      <div styleName="container">
        <div styleName="wishContent">
          <div className="clear">
            <button
              className="button"
              styleName="close"
              onClick={this.props.dispatchClose}
            >
              <Close />
            </button>
          </div>
          {card.picture &&
          <div styleName="picture">
            <Picture src={card.picture} />
          </div>}
          <div styleName="title">{card.pname}</div>
          <div styleName="price">預算：{formatCurrency(card.expprice)}</div>
          <div styleName="category">分類：{card.category_name}</div>
          <div styleName="city">所在城市：{card.city}</div>
          <div styleName="content">{card.description}</div>
        </div>
        <div styleName="wishFooter">
          <div styleName="image">
            <Avatar src={card.user_img} />
          </div>
          <div styleName="content">
            <div styleName="title">{truncate(card.user_name, { length: 15 })}</div>
            <div styleName="hour">{fromNow(card.create_time)}</div>
          </div>
          <div styleName="sendMessage">
            {isLogin && currentUser.uid === card.uid ?
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
                onClick={isLogin ? dispatchAddToChatRoom : dispatchRedirectToLogin}
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

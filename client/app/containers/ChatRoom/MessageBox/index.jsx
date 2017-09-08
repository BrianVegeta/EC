/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { List } from 'immutable';
import { truncate, split, isEqual } from 'lodash';
import IconError from 'react-icons/lib/md/error';
import Avatar from 'components/Avatar';
import Picture from 'components/Picture';
import { formatDate, now, moment } from 'lib/time';
import { formatCurrency } from 'lib/currency';
import { itemPath } from 'lib/paths';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const TYPE_TEXT = 'TEXT';
const TYPE_IMAGE = 'IMAGE';
const TYPE_ITEM = 'ITEM';
const TYPE_SELECT_ITEM = 'SELECT_ITEM';


class MessageBox extends React.Component {

  static propTypes = {
    logs: PropTypes.arrayOf(
      PropTypes.shape({
        user_img: PropTypes.string.isRequired,
        user_name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        create_time: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    currentUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
  };

  static renderSendError({ is_sending, create_time }) {
    if ((now() - create_time) > 30000) {
      return <IconError styleName="warning" size={20} color="#F26363" />;
    }
    return null;
  }

  static renderItemTitle(message) {
    return <div styleName="title">{split(message, '，', 1)[0]}</div>;
  }

  static renderCreatedAt(createTime) {
    return (
      <div styleName="created-at">
        {formatDate(createTime, 'YYYY/MM/DD HH:MM')}
      </div>
    );
  }

  static renderMsgContent({ type, message, create_time, img, ...others }) {
    switch (type) {
      case TYPE_TEXT:
        return message;

      case TYPE_IMAGE:
        return (
          <a href={img} target="_blank">
            <div styleName="image">
              <Picture src={img} style={{ backgroundSize: 'cover' }} />
            </div>
          </a>
        );

      case TYPE_ITEM:
      case TYPE_SELECT_ITEM: {
        const { arg1: pname, arg2: pid, arg3: price } = others;
        return (
          <Link to={itemPath(pname, pid)} >
            <div styleName="item">
              <div styleName="cover"><Picture src={img} /></div>
              <div styleName="content">
                <div styleName="pname">
                  {truncate(pname, { length: 20, separator: /,? +/ })}
                </div>
                <div styleName="price">{formatCurrency(price)}</div>
              </div>
            </div>
          </Link>
        );
      }

      default:
        return type;
    }
  }

  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  shouldComponentUpdate({ logs, currentUser }) {
    if (
      isEqual(logs, this.props.logs) &&
      isEqual(currentUser, this.props.currentUser)
    ) {
      return false;
    }
    return true;
  }

  componentDidUpdate({ logs }) {
    if (logs.length === 0 && this.props.logs.length > 0) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  scrollBottom() {
    setTimeout(() => {
      this.container.scrollTop = this.container.scrollHeight;
    }, 200);
  }

  renderMsgContainer({ create_time, ...others }) {
    const {
      renderItemTitle,
      renderCreatedAt,
      renderMsgContent,
      renderError,
    } = this.constructor;
    const { message, type, is_sending } = others;
    console.log(others);
    console.log(create_time, now());
    return (
      <div styleName="message">
        {type === TYPE_ITEM && renderItemTitle(message)}
        <div styleName="inner-text">
          {renderMsgContent(others)}
          {is_sending && renderError()}
        </div>
        {renderCreatedAt(create_time)}
      </div>
    );
  }

  renderMessage(item, i) {
    const { currentUser: { uid } } = this.props;
    const { uid: targetUid } = item;
    const isMine = targetUid === uid;
    return (
      <div key={`${i + 1}`} styleName="message-item" className="clear">
        {isMine ? this.renderMyMessage(item) : this.renderTargetMessage(item)}
      </div>
    );
  }

  renderTargetMessage({ user_img, ...others }) {
    return (
      <div styleName="message-item-inner">
        <div styleName="avatar"><Avatar src={user_img} /></div>
        {this.renderMsgContainer(others)}
      </div>
    );
  }

  renderMyMessage({ user_img, ...others }) {
    return (
      <div styleName="message-item-inner-right">
        {this.renderMsgContainer(others)}
        <div styleName="avatar"><Avatar src={user_img} /></div>
      </div>
    );
  }

  render() {
    const {
      logs,
    } = this.props;
    const refContainer = container => (this.container = container);
    return (
      <div ref={refContainer} styleName="container" >
        <div styleName="message-container">
          {List(logs).reverse().toJS().map(this.renderMessage)}
        </div>
      </div>
    );
  }
}

export default CSS(MessageBox, styles);

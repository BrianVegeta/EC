/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { truncate, split, isEqual } from 'lodash';
import IconError from 'react-icons/lib/md/error';
import Avatar from 'components/Avatar';
import Picture from 'components/Picture';
import { formatDate, now } from 'lib/time';
import { formatCurrency } from 'lib/currency';
import { itemPath } from 'lib/paths';
import { htmlNewLineToBreak } from 'lib/htmlUtils';
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
        user_img: PropTypes.string,
        user_name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        create_time: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    currentUser: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired,
    sendRead: PropTypes.func.isRequired,
    targetRoom: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
  };

  static rSendError({ is_sending, create_time }) {
    const isTimeout = is_sending && (now() - create_time) > 60000;
    if (!isTimeout) return null;
    return <IconError styleName="warning" size={20} color="#F26363" />;
  }

  static rItemTitle(message) {
    return <div styleName="title">{split(message, '，', 1)[0]}</div>;
  }

  static rCreateAt(createTime, read) {
    return (
      <div styleName="created-at">
        {read && <span styleName="read">已讀 </span>}
        {formatDate(createTime, 'YYYY/MM/DD HH:MM')}
      </div>
    );
  }

  static rMsgContent({ type, message, create_time, img, ...others }) {
    switch (type) {
      case TYPE_TEXT:
        return (
          <div styleName="text">
            {htmlNewLineToBreak(message)}
          </div>
        );

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
          <a href={itemPath(pname || '', pid)}>
            <div styleName="item">
              <div styleName="cover"><Picture src={img} /></div>
              <div styleName="content">
                <div styleName="pname">
                  {truncate(pname, { length: 20, separator: /,? +/ })}
                </div>
                <div styleName="price">{formatCurrency(price)}</div>
              </div>
            </div>
          </a>
        );
      }

      default:
        return type;
    }
  }

  constructor(props) {
    super(props);
    this.rMessage = this.rMessage.bind(this);
  }

  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
    this.props.sendRead();
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
      this.props.sendRead();
    }
  }

  scrollBottom() {
    setTimeout(() => {
      if (this.container) {
        this.container.scrollTop = this.container.scrollHeight;
      }
    }, 200);
  }

  rMessage(item, i) {
    const { currentUser: { uid } } = this.props;
    const { uid: targetUid } = item;
    const isMine = targetUid === uid;
    return (
      <div key={`${i + 1}`} styleName="message-item" className="clear">
        {isMine ? this.rMyMessage(item) : this.rTargetMessage(item)}
      </div>
    );
  }

  rTargetMessage({ user_img, ...others }) {
    const { targetRoom: { picture } } = this.props;
    return (
      <div styleName="message-item-inner">
        <div styleName="avatar"><Avatar src={picture} /></div>
        {this.rMsgContainer(others)}
      </div>
    );
  }

  rMyMessage({ user_img, ...others }) {
    const { is_read } = others;
    return (
      <div styleName="message-item-inner-right">
        {this.rMsgContainer(others, is_read)}
      </div>
    );
  }

  rMsgContainer({ create_time, ...others }, read) {
    const {
      rItemTitle,
      rCreateAt,
      rMsgContent,
      rSendError,
    } = this.constructor;
    const { message, type, is_sending } = others;
    return (
      <div styleName="message">
        {type === TYPE_ITEM && rItemTitle(message)}
        <div styleName="message-inner">
          {rMsgContent(others)}
          {rSendError({ create_time, is_sending })}
        </div>
        {rCreateAt(create_time, read)}
      </div>
    );
  }

  render() {
    const { logs } = this.props;
    const refContainer = container => (this.container = container);
    return (
      <div ref={refContainer} styleName="container" >
        <div styleName="message-container">
          {List(logs).reverse().toJS().map(this.rMessage)}
        </div>
      </div>
    );
  }
}

export default CSS(MessageBox, styles);

/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import Avatar from 'components/Avatar';
import { formatDate } from 'lib/time';
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

  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  componentDidMount() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  componentDidUpdate({ logs }) {
    if (
      logs.length === 0 &&
      this.props.logs.length > 0
    ) {
      this.container.scrollTop = this.container.scrollHeight;
    }
  }

  renderMessage(item, i) {
    const { currentUser: { uid } } = this.props;
    const { uid: targetUid } = item;
    return (
      <div key={`${i + 1}`} styleName="message-item" className="clear">
        {targetUid === uid ?
          this.renderMyMessage(item, i) :
          this.renderTargetMessage(item, i)
        }
      </div>
    );
  }

  renderMessageContent({ type, message, create_time }) {
    switch (type) {
      case TYPE_TEXT:
        return (
          <div styleName="message">
            <div styleName="inner-text">{message}</div>
            <div styleName="created-at">
              {formatDate(create_time, 'YYYY/MM/DD HH:MM')}
            </div>
          </div>
        );
      default:
        return <div styleName="message">{type}</div>;
    }
  }

  renderTargetMessage({ user_img, ...others }) {
    return (
      <div styleName="message-item-inner">
        <div styleName="avatar"><Avatar src={user_img} /></div>
        {this.renderMessageContent(others)}
      </div>
    );
  }

  renderMyMessage({ user_img, ...others }) {
    return (
      <div styleName="message-item-inner-right">
        {this.renderMessageContent(others)}
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

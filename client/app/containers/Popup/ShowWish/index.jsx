// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Close from 'react-icons/lib/md/close';
import { truncate } from 'lodash';
import { formatCurrency } from 'lib/currency';
import { fromNow } from 'lib/time';
import Picture from 'components/Picture';
import Avatar from 'components/Avatar';

import CSS from 'react-css-modules';
import styles from './styles.sass';


class ShowWish extends React.Component {
  static defaultProps = {
    dispatch: '',
    card: '',
  }

  static propTypes = {
    card: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
    dispatchClose: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.props.dispatchClose();
  }

  render() {
    const { card } = this.props;

    return (
      <div styleName="container">
        <div styleName="wishContent">
          <div className="clear">
            <button className="button" styleName="close" onClick={this.onClose}>
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
            <button className="button" styleName="sendMessageButton">私訊</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { schedule } = state;
  return { schedule };
};
export default connect(mapStateToProps)(CSS(ShowWish, styles));

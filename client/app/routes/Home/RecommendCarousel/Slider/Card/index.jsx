import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Card extends React.Component {
  render() {
    const { coverUrl, title, price, user, score } = this.props.item;
    return (
      <div styleName="container">
        <div styleName="cover" style={{ backgroundImage: `url(${coverUrl})` }} />
        <div styleName="title">{title}</div>
        <div styleName="price">{price}</div>
        <div styleName="footer">
          <div styleName="footer-row">
            <div styleName="owner">
              <div styleName="user-avatar">
                <img alt="" src={user.avatarUrl} />
              </div>
              <span styleName="username">{user.name}</span>
            </div>
            <div styleName="evaluation">
              <span styleName="score">{score}</span>
              <span styleName="mark">
                <i className="fa fa-heart" />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(Card, styles);

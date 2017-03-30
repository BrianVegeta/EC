import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './card.css';

class Card extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="cover">
          cover
        </div>
        <div styleName="title">
          微型迷你投影機家庭劇院神器迷你投影機
        </div>
        <div styleName="price">TWD$1000/天</div>
        <div styleName="footer">
          <div styleName="footer-row">
            <div styleName="owner">
              <div styleName="user-avatar">
                <img alt="" src="https://www.meionorte.com/uploads/pagina/2016/3/31/avatar-kate-hudson-dd704d2b-2cc3-4fd8-9f6d-1415f23a43a3.jpg" />
              </div>
              <span styleName="username">Yo, Mother fucker</span>
            </div>
            <div styleName="evaluation">
              <span styleName="score">999+</span>
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

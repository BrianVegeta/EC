import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './header.css';

class Header extends React.Component {
  mapHeader() {
    const initialHeaderState = { seeAllPath: '/', title: '推薦' };
    switch (this.props.category) {
      case 'goods':
        return Object.assign({}, initialHeaderState, {
          seeAllPath: '/', title: '產品推薦',
        });
      case 'service':
        return Object.assign({}, initialHeaderState, {
          seeAllPath: '/', title: '服務推薦',
        });
      case 'space':
        return Object.assign({}, initialHeaderState, {
          seeAllPath: '/', title: '空間推薦',
        });
      default:
        return initialHeaderState;
    }
  }

  render() {
    const settings = this.mapHeader();
    return (
      <div styleName="container">
        <div styleName="row">
          <div styleName="title">
            <h3>{settings.title}</h3>
          </div>
          <div styleName="see-all">
            <a href="#">查看全部</a>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(Header, styles);

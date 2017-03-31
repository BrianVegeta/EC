import React, { PropTypes } from 'react';

class Header extends React.Component {
  mapHeader() {
    const { category } = this.props;
    const initialHeaderState = { seeAllPath: '/', title: '推薦' };
    switch (category) {
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
export default Header;

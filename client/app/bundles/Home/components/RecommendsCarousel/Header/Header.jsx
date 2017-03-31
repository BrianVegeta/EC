import React, { PropTypes } from 'react';

class Header extends React.Component {
  mapHeader() {
    const { category } = this.props;
    switch (category) {
      case 'goods':
        return { seeAllPath: '/', title: '產品推薦' };
      case 'service':
        return { seeAllPath: '/', title: '服務推薦' };
      case 'space':
        return { seeAllPath: '/', title: '空間推薦' };
      default:
        return { seeAllPath: '/', title: '推薦分類' };
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

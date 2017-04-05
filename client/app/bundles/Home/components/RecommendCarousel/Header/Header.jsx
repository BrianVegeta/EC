import React, { PropTypes } from 'react';

const propTypes = {
  type: PropTypes.string.isRequired,
};
class Header extends React.Component {
  mapHeader() {
    const { type } = this.props;
    switch (type) {
      case 'goods':
        return { title: '產品推薦' };
      case 'service':
        return { title: '服務推薦' };
      case 'space':
        return { title: '空間推薦' };
      default:
        return { title: '推薦分類' };
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
            <a href="/">查看全部</a>
          </div>
        </div>
      </div>
    );
  }
}
Header.propTypes = propTypes;
export default Header;
import React, { PropTypes } from 'react';

const propTypes = {
  type: PropTypes.string.isRequired,
};
class Header extends React.Component {

  mapTitle() {
    const { type } = this.props;
    const mapper = {
      goods: '物品推薦',
      service: '服務推薦',
      space: '空間推薦',
      category: '推薦分類',
    };
    return mapper[type];
  }

  render() {
    const title = this.mapTitle();
    return (
      <div styleName="container">
        <div styleName="row">
          <div styleName="title">
            <h3>{title}</h3>
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

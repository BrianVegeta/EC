import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const propTypes = {
  type: PropTypes.string.isRequired,
};
class Header extends React.Component {

  mapHeaderConf() {
    const { type } = this.props;
    switch (type) {
      case 'goods':
        return { iconClass: 'suitcase', title: '全部物品' };
      case 'service':
        return { iconClass: 'group', title: '全部服務' };
      case 'space':
        return { iconClass: 'home', title: '全部空間' };
      default:
        return { iconClass: 'suitcase', title: '全部物品' };
    }
  }

  render() {
    const headerConf = this.mapHeaderConf();
    return (
      <div styleName="container">
        <span styleName="icon">
          <i className={`fa fa-${headerConf.iconClass}`} />
        </span>
        <span styleName="title">{headerConf.title}</span>
      </div>
    );
  }
}
Header.propTypes = propTypes;
export default CSS(Header, styles);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const propTypes = {
  type: PropTypes.string.isRequired,
  routesHelper: PropTypes.object.isRequired,
};
class Header extends React.Component {

  headerConf() {
    const { type, routesHelper } = this.props;
    const mapper = {
      goods: { text: '物品推薦', link: routesHelper.items.goods },
      service: { text: '服務推薦', link: routesHelper.items.service },
      space: { text: '空間推薦', link: routesHelper.items.space },
      category: { text: '推薦分類', link: routesHelper.categories },
    };
    return mapper[type];
  }

  render() {
    const { link, text } = this.headerConf();
    return (
      <div styleName="container">
        <div styleName="row">
          <div styleName="title">
            <h3>{text}</h3>
          </div>
          <div styleName="see-all">
            <Link to={link} >查看全部</Link>
          </div>
        </div>
      </div>
    );
  }
}
Header.propTypes = propTypes;
export default CSS(Header, styles);

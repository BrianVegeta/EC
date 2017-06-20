import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import IconService from 'react-icons/lib/md/group';
import IconSpace from 'react-icons/lib/md/home';
import IconProduct from 'react-icons/lib/md/now-widgets';
import IconRank from 'react-icons/lib/md/looks-one';
import IconWish from 'react-icons/lib/fa/magic';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class ShortcutNavbar extends React.Component {
  render() {
    const { routesHelper } = this.props;
    return (
      <div className="navbar" styleName="navs-center">
        <ul className="navs clear">
          <li className="nav" styleName="nav">
            <Link to={routesHelper.items.service} styleName="link">
              <div styleName="icon-container">
                <IconService size={48} />
              </div>
              <div styleName="name">服務</div>
            </Link>
          </li>
          <li className="nav" styleName="nav">
            <Link to={routesHelper.items.space} styleName="link">
              <div styleName="icon-container">
                <IconSpace size={48} />
              </div>
              <div styleName="name">空間</div>
            </Link>
          </li>
          <li className="nav" styleName="nav">
            <Link to={routesHelper.items.goods} styleName="link">
              <div styleName="icon-container">
                <IconProduct size={48} />
              </div>
              <div styleName="name">物品</div>
            </Link>
          </li>
          <li className="nav" styleName="nav">
            <a href="/" styleName="link">
              <div styleName="icon-container">
                <IconRank size={48} />
              </div>
              <div styleName="name">排行榜</div>
            </a>
          </li>
          <li className="nav" styleName="nav">
            <Link to={routesHelper.tanzaku} styleName="link">
              <div styleName="icon-container">
                <div style={{ padding: 3 }}>
                  <IconWish size={42} />
                </div>
              </div>
              <div styleName="name">許願看板</div>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default CSS(ShortcutNavbar, styles);

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import {
  items as itemsRouter,
  wishRouter,
} from 'lib/paths';
import {
  CATEGORY_GOODS,
  CATEGORY_SERVICE,
  CATEGORY_SPACE,
  CATEGORY_USED_GOODS,
} from 'constants/enums';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const navs = [
  { name: '分享服務', href: itemsRouter.servicePath, topCategory: CATEGORY_SERVICE },
  { name: '租借空間', href: itemsRouter.spacePath, topCategory: CATEGORY_SPACE },
  { name: '租借物品', href: itemsRouter.goodsPath, topCategory: CATEGORY_GOODS },
  { name: '二手出清', href: itemsRouter.usedGoodsPath, topCategory: CATEGORY_USED_GOODS },
  { name: '許願看板', href: wishRouter.indexPath },
];

const cx = classnames.bind(styles);
class HomeTopMenu extends React.Component {

  static defaultProps = {
    topCategory: null,
  };

  static propTypes = {
    topCategory: PropTypes.string,
  };

  render() {
    const { topCategory } = this.props;
    return (
      <div className="container clear">
        <div className={`navbar ${cx('container', 'navbar')}`} >
          <ul className="navs clear" styleName="menu">
            {navs.map((nav, i) => (
              <li
                key={`${i + 1}`}
                styleName="nav"
              >
                <Link
                  className={cx({ active: nav.topCategory === topCategory })}
                  activeClassName={cx('active')}
                  styleName="link"
                  to={nav.href}
                  onlyActiveOnIndex
                >
                  {nav.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
export default CSS(HomeTopMenu, styles);

import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { Sticky, StickyContainer } from 'react-sticky';
import { Link } from 'react-router';
import IconFlag from 'react-icons/lib/fa/flag';
import { formatCurrency } from 'lib/currency';
import styled from 'styled-components';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import {
  CHARGE_TYPE_FIX,
  CHARGE_TYPE_DAY,
  CHARGE_TYPE_COUNT,
  CHARGE_TYPE_MONTH,
} from 'constants/publishTypes';

import styles from './styles.sass';

import OrderBoard from './OrderBoard';
import InteractiveBoard from './InteractiveBoard';
import BoardModel from './boardModel';

const ReportLink = styled.div`
  text-align: center;
  margin-top: 20px;
  & > a {
    color: #666;
  }
  & > a > svg {
    margin-right: 12px;
  }
  & > a > span {
    vertical-align: middle;
    font-size: 16px;
  }
`;

const cx = classnames.bind(styles);
class Sidebar extends React.Component {

  static propTypes = {
    itemDetail: myPropTypes.item.isRequired,
    isMyOwn: PropTypes.bool.isRequired,
    dispatchReport: PropTypes.func.isRequired,
    dispatchAddFavorite: PropTypes.func.isRequired,
    dispatchRemoveFavorite: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
  };

  renderUnit({ calculate_charge_type }) {
    switch (calculate_charge_type) {
      case CHARGE_TYPE_FIX:
        return ('次');
      case CHARGE_TYPE_DAY:
        return ('天');
      case CHARGE_TYPE_COUNT:
        return ('件');
      case CHARGE_TYPE_MONTH:
        return ('月');
      default:
        return ('件');
    }
  }
  render() {
    const { itemDetail, isMyOwn, dispatchAddFavorite,
      dispatchRemoveFavorite, dispatchReport, isLogin } = this.props;
    const { price } = itemDetail;
    return (
      <StickyContainer style={{ height: 1700 }}>
        <Sticky>
          {({ style, isSticky }) => (
            <div style={{ paddingBottom: 100, ...style }}>
              <div className={`clear ${cx('container')}`}>
                <div className={cx('header', { reverse: isSticky })}>
                  <div className={cx('price-container')}>
                    <span className={cx('dollar')}>NTD </span>
                    <span className={cx('price')}>{formatCurrency(price, '')}</span>
                     /{this.renderUnit(itemDetail)}
                  </div>
                </div>
                <div className={cx('body')} >
                  <OrderBoard
                    model={new BoardModel(itemDetail, isMyOwn)}
                    isSticky={isSticky}
                  />
                  <InteractiveBoard
                    pid={itemDetail.pid}
                    isLogin={isLogin}
                    dispatchAddFavorite={dispatchAddFavorite}
                    dispatchRemoveFavorite={dispatchRemoveFavorite}
                    favorite={itemDetail.favorite_count}
                    isFavorite={itemDetail.in_my_favorite}
                  />
                  <ReportLink >
                    <button
                      className="button"
                      onClick={() => dispatchReport(itemDetail.pid)}
                    >
                      <div>
                        <IconFlag size={18} />
                        <span style={{ marginLeft: 10 }}>檢舉此物品</span>
                      </div>
                    </button>
                  </ReportLink>
                </div>
              </div>
            </div>
          )}
        </Sticky>
      </StickyContainer>
    );
  }
}
export default CSS(Sidebar, styles);

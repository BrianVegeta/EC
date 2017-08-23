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
    item: myPropTypes.item.isRequired,
    isMyOwn: PropTypes.bool.isRequired,
  };

  render() {
    const { item, isMyOwn } = this.props;
    const { price } = item;

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
                     /天
                  </div>
                </div>
                <div className={cx('body')} >
                  <OrderBoard
                    model={new BoardModel(item, isMyOwn)}
                    isSticky={isSticky}
                  />
                  <InteractiveBoard favorite={item.favorite_count} />
                  <ReportLink >
                    <Link to="/" >
                      <IconFlag size={18} />
                      <span>檢舉此物品</span>
                    </Link>
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

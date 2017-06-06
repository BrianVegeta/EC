import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { TitleWrapper } from '../../components';
import {
  OPTION_IN_PERSON,
  OPTION_MAIL,
  OPTION_SEVEN,
  getCategoryNamesFromId,
} from '../../../../actions/publishActions';
import {
  fetchCities,
} from '../../../../actions/addressActions';
import { unzip } from '../../../../reducers/publishOptions';
import Block from './Block';

const cx = classnames.bind(styles);
class ConfirmContainer extends React.Component {
  static propTypes = {
    publish: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.string,
      PropTypes.number,
    ])).isRequired,
    items: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
  };
  componentDidMount() {
    this.props.dispatch(fetchCities());
  }
  render() {
    const { publish } = this.props;
    const { coverThumbs } = publish;
    const photoProps = {
      title: '物品照片',
      wrapper: 'photo',
      content: (
        <div className={cx('photos')}>
          {coverThumbs.map(cover =>
            <image className={cx('photo')} src={cover.s3Url} />,
          )}
        </div>
      ),
    };
    const { title, descript, city, area, amount, categoryId, hashtags } = publish;
    const { categories } = this.props.items;
    const categoryInitial = { parentCateName: '', categoryName: '' };
    const {
      parentCateName,
      categoryName,
    } = categories ? getCategoryNamesFromId(categoryId, categories) : categoryInitial;
    const aboutProps = {
      title: '關於物品',
      wrapper: 'table',
      content: [
        ['服務名稱', title.value],
        ['描述', descript.value],
        ['物品資訊',
          (<div>
            <div className={cx('list')}>
              物品地區：<span className={cx('hightlight')}>{city}{area}</span>
            </div>
            <div className={cx('list')}>
              數量：<span className={cx('hightlight')}>{amount}</span>
            </div>
          </div>),
        ],
        ['分類',
          (<div>
            {parentCateName}
            <span className={cx('categoryArrow')}>&gt;</span>
            {categoryName}
          </div>),
        ],
        ['標籤', (
          <div>
            {_.chain(hashtags).filter(tag => !_.isNull(tag)).map((tag, i) =>
              <div key={`${i + 1}`}>＃{tag}</div>,
            )}
          </div>
        )],
      ],
    };
    const { sendOptions, returnOptions, returnAddresses } = publish;
    const sendOptKeys = unzip(sendOptions);
    const returnOptKeys = unzip(returnOptions);
    const deliveryProps = {
      title: '寄件資訊',
      wrapper: 'table',
      content: [
        ['寄件日期', `使用的前${2}天內到貨`],
        ['可寄件方式', (
          <div>
            {!_.isUndefined(sendOptKeys[OPTION_SEVEN]) && <div>7-11交貨便</div>}
            {!_.isUndefined(sendOptKeys[OPTION_MAIL]) && <div>自行寄件</div>}
            {!_.isUndefined(sendOptKeys[OPTION_IN_PERSON]) && <div>面交（自行協調取貨地點）</div>}
          </div>
        )],
        ['可寄還方式', (
          <div>
            <div>
              {!_.isUndefined(returnOptKeys[OPTION_SEVEN]) && <div>7-11交貨便</div>}
              {!_.isUndefined(returnOptKeys[OPTION_MAIL]) &&
                <div>
                  自行寄件：
                  <span className={cx('hightlight')}>{returnAddresses.join('')}</span>
                </div>
              }
              {!_.isUndefined(returnOptKeys[OPTION_IN_PERSON]) && <div>面交（自行協調取貨地點）</div>}
            </div>
          </div>
        )],
      ],
    };
    const { price, deposit, minLeaseDays, discounts } = publish;
    const priceSettingProps = {
      title: '設定價格',
      wrapper: 'table',
      content: [
        ['價格', (
          <div>
            <div>分享金：<span className={cx('hightlight')}>NT${price}</span></div>
            <div>押金：<span className={cx('hightlight')}>NT${deposit}</span></div>
          </div>
        )],
        ['最短租借天數', `${minLeaseDays}天`],
      ],
    };
    if (discounts.length > 0) {
      priceSettingProps.content.push(
        ['自訂折扣', (
          <div>
            {discounts.map((discount, i) =>
              <div key={`${i + 1}`}>
                {`${discount.days}天以上，${discount.offer}租金`}
              </div>,
            )}
          </div>
        )],
      );
    }
    const { regulation, cancelPolicy, overduePercentagePerDay } = publish;
    const overdueAmount = Math.ceil((deposit * overduePercentagePerDay) / 100);
    return (
      <div styleName="container">
        <TitleWrapper>確認發佈資訊</TitleWrapper>
        <Block {...photoProps} />
        <Block {...aboutProps} />
        <Block {...deliveryProps} />
        <Block {...priceSettingProps} />
        {
          !_.isEmpty(regulation) &&
          <Block
            {...{
              title: '分享人守則',
              wrapper: 'plaintext',
              content: regulation,
            }}
          />
        }
        {
          !_.isEmpty(cancelPolicy) &&
          <Block
            {...{
              title: '退訂政策',
              wrapper: 'plaintext',
              content: `開始租借前${cancelPolicy.advanceDays}天取消訂單，扣除${cancelPolicy.rate}%分享金`,
            }}
          />
        }
        {
          overduePercentagePerDay > 0 &&
          <Block
            {...{
              title: '逾期金政策',
              wrapper: 'plaintext',
              content: `逾期一天，扣除押金${overduePercentagePerDay}%(約NT$${overdueAmount})`,
            }}
          />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish, items } = state;
  return ({ environment, routesHelper, publish, items });
};
export default connect(mapStateToProps)(CSS(ConfirmContainer, styles));

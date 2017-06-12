import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { TitleWrapper } from '../../components';
import { fetchCities } from '../../../../actions/addressActions';
import Title from './Title';
import Row from './Row';
import Model from '../Model';

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
    const { publish, dispatch } = this.props;
    const { coverThumbs } = publish;
    const {
      title,
      descript,
      category,
      assignment,
      tags,
      appointmentPrior,
      chargeType,
      datesRange,
      amount,
      payment,
      serviceDiscount,
      regulation,
      cancelPolicy,
    } = new Model(publish, dispatch);
    const { categories } = this.props.items;
    return (
      <div styleName="container">
        <TitleWrapper>確認發佈資訊</TitleWrapper>
        <Title title="物品照片" >
          <div className={cx('photos')}>
            {coverThumbs.map((cover, i) =>
              <div key={`${i + 1}`} className={cx('photo')}>
                <img
                  src={cover.s3Url}
                  alt={i === 0 ? '封面' : '圖片'}
                />
                <div className={cx('coverLabel')}>封面</div>
              </div>,
            )}
          </div>
        </Title>
        <Title title="關於服務">
          <table styleName="table">
            <tbody>
              <Row title="服務名稱">{title.value}</Row>
              <Row title="描述">{descript.value}</Row>
              <Row title="分類">{category.getCategoryNames(categories.service)}</Row>
              <Row title="標籤">
                <div>
                  {tags.existHashtags().map((tag, i) =>
                    <div key={`${i + 1}`}>＃{tag}</div>,
                  )}
                </div>
              </Row>
            </tbody>
          </table>
        </Title>
        <Title title="服務資訊">
          <table styleName="table">
            <tbody>
              <Row title="提前預約天數">{`${appointmentPrior.value}天`}</Row>
              <Row title="可服務方式">{assignment.optionsText}</Row>
              {assignment.isComeToActive &&
                <Row title="服務地址">{assignment.addresses}</Row>
              }
            </tbody>
          </table>
        </Title>
        <Title title="設定價格">
          <table styleName="table">
            <tbody>
              <Row title="價格">
                <div>
                  <div>
                    分享金：
                    <span className={cx('hightlight')}>NT${payment.price}</span>
                  </div>
                  <div>
                    押金：
                    <span className={cx('hightlight')}>NT${payment.deposit}</span>
                  </div>
                </div>
              </Row>
              <Row title="計費方式">
                <span className={cx('hightlight')}>{chargeType.text}</span>
                {chargeType.is('fix') &&
                  <div>
                    <div>
                      活動時間：
                      <span className={cx('hightlight')}>
                        {datesRange.startDateText}-{datesRange.endDateText}
                      </span>
                    </div>
                    <div>
                      人數上限：
                      <span className={cx('hightlight')}>{amount.value}</span>
                    </div>
                  </div>
                }
              </Row>
              {serviceDiscount.isSettedUp &&
                <Row title="優惠價">{serviceDiscount.value}</Row>
              }
            </tbody>
          </table>
        </Title>
        {regulation.isSettedUp &&
          <Title title="分享人守則" >
            <div>{regulation.value}</div>
          </Title>
        }
        {cancelPolicy.isSettedUp &&
          <Title title="退訂政策">
            {`開始前${cancelPolicy.advanceDays}天取消訂單，扣除${cancelPolicy.rate}%分享金`}
          </Title>
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

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from '../../components/confirm.sass';
import { TitleWrapper } from '../../components';
import ConfirmGroup from '../../components/ConfirmGroup';
import ConfirmRow from '../../components/ConfirmRow';
import { fetchCities } from '../../../../actions/addressActions';
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
      payment,
      discounts,
      regulation,
      cancelPolicy,
    } = new Model(publish, dispatch);
    const { categories } = this.props.items;
    return (
      <div styleName="container">
        <TitleWrapper>確認發佈資訊</TitleWrapper>
        <ConfirmGroup title="空間照片" >
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
        </ConfirmGroup>
        <ConfirmGroup title="空間名稱">
          <table styleName="table">
            <tbody>
              <ConfirmRow title="空間名稱">{title.value}</ConfirmRow>
              <ConfirmRow title="描述">{descript.value}</ConfirmRow>
              <ConfirmRow title="分類">{category.getCategoryNames(categories.space)}</ConfirmRow>
              <ConfirmRow title="標籤">
                <div>
                  {tags.existHashtags().map((tag, i) =>
                    <div key={`${i + 1}`}>＃{tag}</div>,
                  )}
                </div>
              </ConfirmRow>
            </tbody>
          </table>
        </ConfirmGroup>
        <ConfirmGroup title="空間資訊">
          <table styleName="table">
            <tbody>
              <ConfirmRow title="提前預約天數">{`${appointmentPrior.value}天`}</ConfirmRow>
              <ConfirmRow title="空間地址">{assignment.addresses}</ConfirmRow>
            </tbody>
          </table>
        </ConfirmGroup>
        <ConfirmGroup title="設定價格">
          <table styleName="table">
            <tbody>
              <ConfirmRow title="價格">
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
              </ConfirmRow>
              <ConfirmRow title="計費方式">
                <span className={cx('hightlight')}>{chargeType.text}</span>
              </ConfirmRow>
              { discounts.isSettedUp &&
                <ConfirmRow title="優惠價格">
                  {discounts.texts.map(text =>
                    <div>{text}</div>,
                  )}
                </ConfirmRow>
              }
            </tbody>
          </table>
        </ConfirmGroup>
        {regulation.isSettedUp &&
          <ConfirmGroup title="分享人守則" >
            <div>{regulation.value}</div>
          </ConfirmGroup>
        }
        {cancelPolicy.isSettedUp &&
          <ConfirmGroup title="退訂政策">
            {`開始前${cancelPolicy.advanceDays}天取消訂單，扣除${cancelPolicy.rate}%分享金`}
          </ConfirmGroup>
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

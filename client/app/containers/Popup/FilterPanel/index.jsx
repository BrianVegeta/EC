import React from 'react';
import PropTypes from 'prop-types';
import InputTextCurrency from 'components/Input/TextCurrency';
import FormGroup from 'components/Form/Group';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class FilterSearch extends React.Component {

  static propTypes = {
    filter: PropTypes.shape({
      price: PropTypes.object.isRequired,
      sort: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
      sendOption: PropTypes.string.isRequired,
    }).isRequired,
    dispatchChangePriceMax: PropTypes.func.isRequired,
    dispatchChangePriceMin: PropTypes.func.isRequired,
    dispatchChangeSort: PropTypes.func.isRequired,
    dispatchChangeLocation: PropTypes.func.isRequired,
    dispatchChangeSendOption: PropTypes.func.isRequired,
  };

  render() {
    const {
      dispatchChangePriceMax,
      dispatchChangePriceMin,
      filter: {
        price,
        sort,
        locations,
        sendOption,
      },
    } = this.props;

    return (
      <div styleName="container">
        <div styleName="price" >
          <FormGroup helperText="價格範圍">
            <div styleName="input">
              <InputTextCurrency
                max={99999}
                value={price.min}
                onChange={dispatchChangePriceMin}
              />
            </div>
            <div styleName="symbol">~</div>
            <div styleName="input">
              <InputTextCurrency
                max={99999}
                value={price.max}
                onChange={dispatchChangePriceMax}
              />
            </div>
          </FormGroup>
          <FormGroup helperText="排序">
            export const SORT_NEWEST = 'SORT_NEWEST'; // 最新上架
            export const SORT_POPULAR = 'SORT_POPULAR'; // 人氣好物
            export const SORT_LOW_PRICE = 'SORT_LOW_PRICE'; // 價格由低至高
            export const SORT_HIGH_PRICE = 'SORT_HIGH_PRICE'; // 價格由高至低
            <div>最新上架</div>
          </FormGroup>
        </div>
      </div>
    );
  }
}

export default CSS(FilterSearch, styles);

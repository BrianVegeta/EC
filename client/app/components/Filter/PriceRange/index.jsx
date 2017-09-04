import React from 'react';
import PropTypes from 'prop-types';
import InputTextCurrency from 'components/Input/TextCurrency';
import FilterButton from 'components/Filter/Button';
import FormGroup from 'components/Form/Group';
import { formatCurrency } from 'lib/currency';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class PriceRange extends React.Component {

  static propTypes = {
    price: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }).isRequired,

    isOpening: PropTypes.bool.isRequired,
    onButtonToggle: PropTypes.func.isRequired,
    onApplyChange: PropTypes.func.isRequired,
  };

  static renderButtonContent({ min, max }, defaultContent) {
    const minPrice = min ? formatCurrency(min, '') : null;
    const maxPrice = max ? formatCurrency(max, '') : null;
    if (min && max) {
      return `${minPrice}~${maxPrice}`;
    } else if (min) {
      return `${minPrice}以上`;
    } else if (max) {
      return `${maxPrice}以下`;
    }
    return defaultContent;
  }

  constructor(props) {
    super(props);
    const {
      price: { min, max },
    } = props;
    this.state = {
      max,
      min,
      errorMessage: null,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onCancel() {
    const {
      price: { min, max },
      onButtonToggle,
    } = this.props;
    this.setState({ min, max });
    onButtonToggle();
  }

  onApply() {
    const {
      onApplyChange,
      onButtonToggle,
    } = this.props;
    const {
      min, max,
    } = this.state;

    if (min && max && max < min) {
      this.setState({ errorMessage: '輸入錯誤，最低價格須小於最高價格！' });
    } else {
      this.setState({ errorMessage: null });
      onApplyChange({ min, max });
      onButtonToggle();
    }
  }

  onClear() {
    const state = { min: null, max: null };
    this.props.onApplyChange(state);
    this.setState(state);
  }

  render() {
    const {
      isOpening,
      onButtonToggle,
    } = this.props;
    const {
      min, max, errorMessage,
    } = this.state;
    const {
      renderButtonContent,
    } = this.constructor;

    return (
      <FilterButton
        content={renderButtonContent({ max, min }, '價格範圍')}
        isOpen={isOpening}
        onClick={onButtonToggle}
        onClickClear={min || max ? this.onClear : null}
      >
        <div styleName="container">
          <div styleName="input">
            <FormGroup helperText="最低價格" groupStyle={{ marginBottom: 20 }}>
              <InputTextCurrency
                max={99999}
                value={min}
                onChange={value => this.setState({ min: value })}
              />
            </FormGroup>
          </div>
          <FormGroup helperText="最高價格" groupStyle={{ marginBottom: 20 }}>
            <div styleName="input">
              <InputTextCurrency
                max={99999}
                value={max}
                onChange={value => this.setState({ max: value })}
              />
            </div>
          </FormGroup>
          {errorMessage && <div styleName="error">{errorMessage}</div>}
          <div className="clear">
            <button
              className="button"
              styleName="cancel-button"
              onClick={this.onCancel}
            >
              <span>取消</span>
            </button>
            <button
              className="button"
              styleName="apply-button"
              onClick={this.onApply}
            >
              <span>套用</span>
            </button>
          </div>
        </div>
      </FilterButton>
    );
  }
}

export default CSS(PriceRange, styles);

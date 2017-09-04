import React from 'react';
import PropTypes from 'prop-types';
import InputRadio from 'components/Input/Radio';
import FilterButton from 'components/Filter/Button';
import {
  mapSortType,
  SORT_NEWEST,
  SORT_POPULAR,
  SORT_LOW_PRICE,
  SORT_HIGH_PRICE,
} from 'modules/filter';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Sort extends React.Component {

  static defaultProps = {
    sort: null,
  };

  static propTypes = {
    sort: PropTypes.oneOf([
      SORT_NEWEST,
      SORT_POPULAR,
      SORT_LOW_PRICE,
      SORT_HIGH_PRICE,
    ]),
    isOpening: PropTypes.bool.isRequired,
    onButtonToggle: PropTypes.func.isRequired,
    onApplyChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      sort: props.sort,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onClear = this.onClear.bind(this);
  }

  onCancel() {
    const {
      onButtonToggle,
      sort,
    } = this.props;
    this.setState({ sort });
    onButtonToggle();
  }

  onApply() {
    const {
      onApplyChange,
      onButtonToggle,
    } = this.props;
    const {
      sort,
    } = this.state;
    onApplyChange({ sort });
    onButtonToggle();
  }

  onClear() {
    const sort = null;
    this.props.onApplyChange({ sort });
    this.setState({ sort });
  }

  onRadioToggle(type) {
    const {
      sort,
    } = this.state;
    this.setState({
      sort: sort === type ? null : type,
    });
  }

  render() {
    const {
      isOpening,
      onButtonToggle,
    } = this.props;
    const {
      sort,
    } = this.state;

    return (
      <FilterButton
        content={sort ? mapSortType[sort] : '排序'}
        isOpen={isOpening}
        onClick={onButtonToggle}
        onClickClear={sort ? this.onClear : null}
      >
        <div styleName="container">
          <div styleName="input">
            <InputRadio
              checked={sort === SORT_NEWEST}
              onChange={() => this.onRadioToggle(SORT_NEWEST)}
            >
              最新上架
            </InputRadio>
          </div>
          <div styleName="input">
            <InputRadio
              checked={sort === SORT_POPULAR}
              onChange={() => this.onRadioToggle(SORT_POPULAR)}
            >
              人氣好物
            </InputRadio>
          </div>
          <div styleName="input">
            <InputRadio
              checked={sort === SORT_LOW_PRICE}
              onChange={() => this.onRadioToggle(SORT_LOW_PRICE)}
            >
              價格由低至高
            </InputRadio>
          </div>
          <div styleName="input">
            <InputRadio
              checked={sort === SORT_HIGH_PRICE}
              onChange={() => this.onRadioToggle(SORT_HIGH_PRICE)}
            >
              價格由高至低
            </InputRadio>
          </div>
          <div className="clear" styleName="controller">
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

export default CSS(Sort, styles);

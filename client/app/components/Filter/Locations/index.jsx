import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import InputCheckBox from 'components/Input/CheckBox';
import FilterButton from 'components/Filter/Button';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const northCities = [
  '基隆市', '台北市', '新北市', '桃園市', '新竹縣', '新竹市',
];
const centralCities = [
  '苗栗縣', '臺中市', '彰化縣', '雲林縣', '南投縣', '嘉義縣', '嘉義市',
];
const southCities = [
  '臺南市', '高雄市', '屏東縣',
];
const eastCities = [
  '宜蘭縣', '花蓮縣', '臺東縣',
];
const IslandCities = [
  '金門縣', '連江縣', '澎湖縣',
];
class Locations extends React.Component {

  static defaultProps = {
    sort: null,
  };

  static propTypes = {
    locations: PropTypes.arrayOf(PropTypes.string).isRequired,
    isOpening: PropTypes.bool.isRequired,
    openFilter: PropTypes.func.isRequired,
    closeFilter: PropTypes.func.isRequired,
    onApplyChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      locations: List(props.locations),
    };
    this.onCancel = this.onCancel.bind(this);
    this.onApply = this.onApply.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onButtonToggle = this.onButtonToggle.bind(this);
    this.renderInputCheck = this.renderInputCheck.bind(this);
    this.onOutsideClick = this.onOutsideClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onOutsideClick, false);
  }

  onOutsideClick(e) {
    if (!this.container) return;
    if (this.container.contains(e.target)) return;
    const { closeFilter, locations } = this.props;
    closeFilter();
    this.setState({ locations: List(locations) });
  }

  onButtonToggle() {
    const {
      isOpening,
      openFilter,
      closeFilter,
      locations,
    } = this.props;
    if (isOpening) {
      closeFilter();
      this.setState({ locations: List(locations) });
    } else {
      openFilter();
    }
  }

  onCheck(checked, city) {
    const { locations } = this.state;
    this.setState({
      locations: checked ?
        locations.push(city) :
        locations.delete(locations.indexOf(city)),
    });
  }

  onCancel() {
    const {
      closeFilter,
      locations,
    } = this.props;
    this.setState({ locations: List(locations) });
    closeFilter();
  }

  onApply() {
    const {
      onApplyChange,
      closeFilter,
    } = this.props;
    const {
      locations,
    } = this.state;
    onApplyChange(locations.toJS());
    closeFilter();
  }

  onClear() {
    this.props.onApplyChange([]);
    this.setState({ locations: List([]) });
  }

  renderInputCheck(city, i) {
    const { locations } = this.state;
    return (
      <div styleName="input" key={`${i + 1}`}>
        <InputCheckBox
          checked={locations.includes(city)}
          onChange={checked => this.onCheck(checked, city)}
        >
          <span styleName="city-label">{city}</span>
        </InputCheckBox>
      </div>
    );
  }

  renderButtonContent(defaultContent) {
    const {
      locations,
    } = this.state;
    if (locations.size === 0) return defaultContent;
    if (locations.size > 3) {
      return `${locations.take(3).join('、')}、${locations.get(3)}...`;
    }
    return locations.take(3).join('、');
  }

  render() {
    const { isOpening } = this.props;
    const { locations } = this.state;

    return (
      <div ref={container => (this.container = container)}>
        <FilterButton
          content={this.renderButtonContent('所在地區')}
          isOpen={isOpening}
          onClick={this.onButtonToggle}
          onClickClear={locations.size > 0 ? this.onClear : null}
        >
          <div styleName="container">
            <div styleName="title">北部地區</div>
            <div styleName="inputs">
              {northCities.map(this.renderInputCheck)}
            </div>
            <div styleName="title">中部地區</div>
            <div styleName="inputs">
              {centralCities.map(this.renderInputCheck)}
            </div>
            <div styleName="title">南部地區</div>
            <div styleName="inputs">
              {southCities.map(this.renderInputCheck)}
            </div>
            <div styleName="title">東部地區</div>
            <div styleName="inputs">
              {eastCities.map(this.renderInputCheck)}
            </div>
            <div styleName="title">外島地區</div>
            <div styleName="inputs">
              {IslandCities.map(this.renderInputCheck)}
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
      </div>
    );
  }
}

export default CSS(Locations, styles);

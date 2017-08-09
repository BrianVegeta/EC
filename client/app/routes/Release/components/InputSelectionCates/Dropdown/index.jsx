// TODO: category motion expand
import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import _ from 'lodash';
import Panel from '../Panel';
import styles from './styles.sass';

class Dropdown extends React.Component {
  static defaultProps = {
    categories: null,
    singleLevel: false,
  };
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
    onSelect: PropTypes.func.isRequired,
    singleLevel: PropTypes.bool,
  };
  constructor(props) {
    super(props);
    this.onLeftPanelSelect = this.onLeftPanelSelect.bind(this);
    this.onRightPanelSelect = this.onRightPanelSelect.bind(this);
    this.state = {
      tracks: [],
      rightPanelWidth: null,
    };
  }
  onLeftPanelSelect(category) {
    // TODO: set select value
    this.setState({ tracks: [category.text] });
  }
  onRightPanelSelect(category) {
    this.props.onSelect(category);
  }
  childrenCategories(text) {
    const find = _.find(this.props.categories, { text });
    return (find ? find.subcates : []);
  }
  renderSingleLevel() {
    const { categories } = this.props;
    return (
      <div styleName="dropdown">
        <div styleName="dropdownInner">
          <Panel
            {...{
              categories,
              onSelect: this.onRightPanelSelect,
            }}
          />
        </div>
      </div>
    );
  }
  renderTwoLevel() {
    const { tracks } = this.state;
    const { categories } = this.props;
    const panelLeftProps = {
      categories,
      onSelect: this.onLeftPanelSelect,
      style: tracks[0] && {
        width: '50%',
        borderRight: `2px solid ${styles.inputBorderColor}`,
      },
      isParent: true,
    };
    return (
      <div styleName="dropdown">
        <div styleName="dropdownInner">
          <Panel {...panelLeftProps} />
          {
            tracks[0] &&
            <Panel
              {...{
                categories: this.childrenCategories(tracks[0]),
                style: { width: '50%' },
                onSelect: this.onRightPanelSelect,
              }}
            />
          }
        </div>
      </div>
    );
  }
  render() {
    const { singleLevel } = this.props;
    return singleLevel ? this.renderSingleLevel() : this.renderTwoLevel();
  }
}

export default CSS(Dropdown, styles);

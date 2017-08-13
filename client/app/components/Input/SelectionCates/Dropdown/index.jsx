// TODO: category motion expand
import React from 'react';
import PropTypes from 'prop-types';
import {
  find,
} from 'lodash';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import Panel from '../Panel';

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

  onLeftPanelSelect({ name }) {
    // TODO: set select value
    this.setState({ tracks: [name] });
  }

  onRightPanelSelect(category) {
    this.props.onSelect({
      middleCategoryName: this.state.tracks[0],
      categoryName: category.name,
      categoryID: category.id,
    });
  }

  childrenCategories(name) {
    const { categories } = this.props;
    const middleCategory = find(categories, { name });
    if (!middleCategory) return [];
    return middleCategory.children;
  }

  renderSingleLevel() {
    const { categories } = this.props;
    return (
      <div styleName="dropdown">
        <div styleName="dropdownInner">
          <Panel
            categories={categories}
            onSelect={this.onRightPanelSelect}
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
              categories={this.childrenCategories(tracks[0])}
              style={{ width: '50%' }}
              onSelect={this.onRightPanelSelect}
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

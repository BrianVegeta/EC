import React, { PropTypes } from 'react';
import _ from 'lodash';
import { Motion, spring } from 'react-motion';
import Panel from '../Panel';

class SelectionCategory extends React.Component {

  static defaultProps = {
    categories: null,
  };

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.onLeftPanelSelect = this.onLeftPanelSelect.bind(this);
    this.state = {
      tracks: [],
      rightPanelWidth: null,
    };
  }

  onLeftPanelSelect(text) {
    this.setState({ tracks: [text] });
  }

  childrenCategories(text) {
    const find = _.find(this.props.categories, { text });
    return (find ? find.subcates : []);
  }

  render() {
    const { tracks } = this.state;
    const { categories } = this.props;
    return (
      <div styleName="dropdown">
        <div styleName="dropdownInner" className="clear" style={{ display: 'table' }}>
          <Panel
            categories={categories}
            onSelect={text => this.onLeftPanelSelect(text)}
            isFull
            style={{ display: 'table-cell' }}
          />
          {
            tracks[0] &&
            <Motion
              defaultStyle={{ x: 140 }}
              style={{ x: spring(248, { stiffness: 500, damping: 50, precision: 1 }) }}
            >
              {value =>
                <div style={{ display: 'table-cell', width: Math.floor(value.x) }}>
                  <Panel categories={this.childrenCategories(tracks[0])} />
                </div>
              }
            </Motion>
          }
        </div>
      </div>
    );
  }
}

export default SelectionCategory;

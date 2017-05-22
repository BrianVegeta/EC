// TODO: category motion expand
import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import _ from 'lodash';
import Panel from '../Panel';
import styles from './styles.sass';

class Dropdown extends React.Component {
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
    // TODO: set select value
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
        <div styleName="dropdownInner">
          <Panel
            categories={categories}
            onSelect={text => (this.onLeftPanelSelect(text))}
            style={{ width: (tracks[0] && '50%') }}
          />
          {
            tracks[0] &&
            <Panel
              categories={this.childrenCategories(tracks[0])}
              style={{ width: (tracks[0] && '50%') }}
            />
          }
        </div>
      </div>
    );
  }
}

export default CSS(Dropdown, styles);

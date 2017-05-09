import React, { PropTypes } from 'react';
import _ from 'lodash';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import Panel from '../Panel';
import styles from './styles.sass';

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
            <CSSTransitionGroup
              transitionName={{
                appear: styles.appear,
                appearActive: styles.appearActive,
              }}
              transitionAppear
              transitionAppearTimeout={500}
              transitionEnter={false}
              transitionLeave={false}
              style={{ display: 'table-cell' }}
              className={styles.test}
              component="div"
            >
              <Panel categories={this.childrenCategories(tracks[0])} />
            </CSSTransitionGroup>
          }
        </div>
      </div>
    );
  }
}

export default SelectionCategory;

import React, { PropTypes } from 'react';
import Measure from 'react-measure';
import _ from 'lodash';
import Panel from './Panel';
import Dropdown from './Dropdown';

class SelectionCategory extends React.Component {

  static defaultProps = {
    categories: null,
  };

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object),
  };

  constructor(props) {
    super(props);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = { isFocusing: true };
  }

  onBlur() {
    this.setState({ isFocusing: true });
  }

  onFocus() {
    this.setState({ isFocusing: true });
  }

  render() {
    const { isFocusing } = this.state;
    const { categories } = this.props;
    return (
      <button
        styleName={isFocusing ? 'inputFocusing' : 'input'}
        className="button"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <div styleName="innerWrapper">select</div>
        { categories && <Dropdown categories={categories} /> }
      </button>
    );
  }
}

export default SelectionCategory;

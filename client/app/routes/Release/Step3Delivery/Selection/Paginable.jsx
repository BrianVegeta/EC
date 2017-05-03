import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import _ from 'lodash';
import styles from './styles.sass';

class Paginable extends React.Component {

  constructor(props) {
    super(props);
    this.onRootClick = this.onRootClick.bind(this);
    this.state = { choosed: '' };
  }

  onRootClick(option) {
    this.setState({ choosed: option.text });
  }

  rOptions() {
    const { choosed } = this.state;
    const { options } = this.props;
    if (choosed === '') {
      return this.rRoots(options);
    }
    const parentOptions = _.find(options, o => (o.text === choosed)).children;
    return this.rParents(parentOptions);
  }

  rParents(options) {
    return (
      <div styleName="selectionGrid">
        <div styleName="title">{this.state.choosed}</div>
        <div styleName="options">
          {options.map((option, i) =>
            <div key={`${i + 1}`} styleName="option">
              <div
                role="button"
                styleName="optionInner"
                onClick={() => this.onRootClick(option)}
              >
                {option.text}
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }

  rRoots(options) {
    return (
      <div styleName="selectionGrid">
        <div styleName="options">
          {options.map((option, i) =>
            <div key={`${i + 1}`} styleName="option">
              <div
                role="button"
                styleName="optionInner"
                onClick={() => this.onRootClick(option)}
              >
                {option.text}
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }

  render() {
    return this.rOptions();
  }
}

export default CSS(Paginable, styles);

// TODO: now is only two level, need change to be levels 3, 4, etc... with limit.
import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import _ from 'lodash';
import styles from './styles.sass';

class Paginable extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectionClick = this.onSelectionClick.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.state = { choosedText: '' };
  }

  onParentClick(option) {
    this.setState({ choosedText: option.text });
    this.props.onParentSelect(option.text);
  }

  onLeafClick(option) {
    this.props.onLeafSelect();
  }


  onSelectionClick(type, option) {
    switch (type) {
      case 'roots':
        return this.onParentClick(option);
      case 'parents':
        return this.onParentClick(option);
      default:
        return this.onLeafClick(option);
    }
  }

  prevPage() {
    this.setState({ choosedText: '' });
  }

  handleOptions() {
    const { state, props } = this;

    if (state.choosedText === '') {
      return { type: 'roots', options: props.options };
    }
    const choosedNode = _.find(props.options, o => (o.text === state.choosedText));
    if (_.has(choosedNode.children[0], 'children')) {
      return { type: 'parents', options: choosedNode.children };
    }
    return { type: 'leaves', options: choosedNode.children };
  }

  render() {
    console.log(this.props.options);
    const { type, options } = this.handleOptions();
    return (
      <div styleName="selectionGrid">
        {type !== 'roots' &&
          <div styleName="title">
            <span
              className="fa fa-arrow-left button"
              {...{ role: 'button', onClick: this.prevPage }}
            />
            {this.state.choosedText}
          </div>}
        <div styleName="options">
          {options.map((option, i) =>
            <div key={`${i + 1}`} styleName="option">
              <div
                styleName="optionInner"
                {...{
                  role: 'button',
                  onClick: () => this.onSelectionClick(type, option),
                }}
              >
                {option.text}
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }
}

export default CSS(Paginable, styles);

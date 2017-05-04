// TODO: now is only two level, need change to be levels 3, 4, etc... with limit.
import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import _ from 'lodash';
import styles from './styles.sass';

class Paginable extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onParentSelect: PropTypes.func.isRequired,
    onLeafSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSelectionClick = this.onSelectionClick.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.state = { choosedText: '' };
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props;
    if (options.length > 0 && prevProps.options.length === 0) {
      this.panelMinHeight = this.selection.clientHeight;
    }
  }

  onParentClick(option) {
    this.setState({ choosedText: option.text });
    this.props.onParentSelect(option.text);
  }

  onLeafClick(option) {
    this.props.onLeafSelect([this.state.choosedText, option.text]);
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

  handleOptions(options) {
    const { state } = this;

    if (state.choosedText === '') {
      return { type: 'roots', options };
    }
    const choosedNode = _.find(options, o => (o.text === state.choosedText));
    if (_.has(choosedNode.children[0], 'children')) {
      return { type: 'parents', options: choosedNode.children };
    }
    return { type: 'leaves', options: choosedNode.children };
  }

  render() {
    const { type, options } = this.handleOptions(this.props.options);
    return (
      <div
        styleName="selectionPaginable"
        ref={s => (this.selection = s)}
        style={{ minHeight: (options.length === 0 && this.panelMinHeight) }}
      >
        {type !== 'roots' &&
          <div styleName="title">
            <div
              className="button"
              {...{ role: 'button', onClick: this.prevPage }}
            >
              <span className="fa fa-angle-left" />
              {this.state.choosedText}
            </div>
          </div>}
        <div styleName="options">
          {options.map((option, i) =>
            <div key={`${i + 1}`} styleName={type === 'roots' ? 'option' : 'optionZone'}>
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

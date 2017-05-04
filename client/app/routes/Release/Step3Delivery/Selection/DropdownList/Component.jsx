import React, { PropTypes } from 'react';

class List extends React.PureComponent {
  static propTypes = {
    onSelect: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static renderAddition(option) {
    return <span styleName="addition">{option.addition}</span>;
  }

  renderOptionProps(option) {
    return {
      role: 'button',
      onClick: () => this.props.onSelect(option),
    };
  }

  render() {
    const { renderAddition } = this.constructor;
    return (
      <div styleName="selection">
        {this.props.options.map((opt, i) =>
          <div key={`${i + 1}`} styleName="row">
            <div styleName="option" {...this.renderOptionProps(opt)} >
              {opt.text}
              {opt.addition && renderAddition(opt)}
            </div>
          </div>,
        )}
      </div>
    );
  }
}
export default List;

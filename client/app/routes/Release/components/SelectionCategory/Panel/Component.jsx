import React, { PropTypes } from 'react';

class Panel extends React.Component {
  static defaultProps = {
    style: {},
    onSelect: null,
    isFull: false,
  };

  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    isFull: PropTypes.bool,
  };

  render() {
    const { categories, style, isFull } = this.props;
    return (
      <div styleName={isFull ? 'PanelFull' : 'Panel'} style={style} >
        {categories.map((category, i) =>
          <div
            {...{
              key: `${i + 1}`,
              role: 'button',
              onClick: () => this.props.onSelect(category.text),
              styleName: 'category',
            }}
          >
            <div styleName="text">
              {category.text}
            </div>
            <div styleName="arrow">
              <span className="fa fa-angle-right" />
            </div>
          </div>,
        )}
      </div>
    );
  }
}

export default Panel;

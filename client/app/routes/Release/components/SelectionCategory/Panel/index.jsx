import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Panel extends React.Component {
  static defaultProps = {
    style: {},
    onSelect: null,
  };
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
  };
  render() {
    const { categories, style, onSelect } = this.props;
    return (
      <div style={style} styleName="panel">
        {categories.map((category, i) =>
          <div
            styleName="category"
            {...{
              key: `${i + 1}`,
              role: 'button',
              onClick: onSelect && (() => onSelect(category.text)),
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
export default CSS(Panel, styles);

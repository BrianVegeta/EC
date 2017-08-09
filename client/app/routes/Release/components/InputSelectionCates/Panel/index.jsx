import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Panel extends React.Component {
  static renderArrow() {
    return (
      <div styleName="arrow">
        <span className="fa fa-angle-right" />
      </div>
    );
  }
  static defaultProps = {
    style: {},
    isParent: false,
  };
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    onSelect: PropTypes.func.isRequired,
    style: PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ])),
    isParent: PropTypes.bool,
  };
  getCategoryProps(category, index) {
    return {
      styleName: 'category',
      key: `${index + 1}`,
      role: 'button',
      onClick: () => this.props.onSelect(category),
    };
  }
  render() {
    const { categories, style, isParent } = this.props;
    return (
      <div style={style} styleName="panel">
        {categories.map((category, i) =>
          <div {...this.getCategoryProps(category, i)}>
            <div styleName="text">{category.text}</div>
            {isParent && this.constructor.renderArrow()}
          </div>,
        )}
      </div>
    );
  }
}
export default CSS(Panel, styles);

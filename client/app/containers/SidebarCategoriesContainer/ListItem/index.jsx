import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import IconDown from 'react-icons/lib/fa/angle-down';
import IconUp from 'react-icons/lib/fa/angle-up';
import { categoriedItemPath } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class ListItem extends React.Component {

  static defaultProps = {
    isHovering: false,
    isExpanding: false,
    onSubCategoriesExpand: null,
  };

  static propTypes = {
    isHovering: PropTypes.bool, // ReactHoverObserver
    isExpanding: PropTypes.bool,
    category: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
    onSubCategoriesExpand: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onSubCategoriesExpand = this.onSubCategoriesExpand.bind(this);
  }

  onSubCategoriesExpand(e) {
    e.preventDefault();
    this.props.onSubCategoriesExpand();
  }

  render() {
    const {
      category,
      isExpanding,
      isHovering,
    } = this.props;

    const iconProps = {
      size: 50,
      viewBox: '-30 -25 100 100',
      onClick: this.onSubCategoriesExpand,
    };

    return (
      <Link
        to={categoriedItemPath(category.name, category.id)}
        activeClassName={cx('active')}
        onlyActiveOnIndex
      >
        <div styleName="container" className="clear">
          {isExpanding && <IconUp {...iconProps} />}
          {isHovering && !isExpanding && <IconDown {...iconProps} />}
          <div styleName="text">{category.name}</div>
        </div>
      </Link>
    );
  }
}

export default CSS(ListItem, styles);

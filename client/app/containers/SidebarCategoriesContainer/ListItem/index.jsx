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
  };

  static propTypes = {
    isHovering: PropTypes.bool,
    isSubCategoryOpen: PropTypes.bool.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
    onSubCatesToggleOpen: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubCatesToggleOpen = this.onSubCatesToggleOpen.bind(this);
  }

  onSubCatesToggleOpen(e) {
    e.preventDefault();
    this.props.onSubCatesToggleOpen();
  }

  render() {
    const {
      category,
      isSubCategoryOpen,
      isHovering,
    } = this.props;

    const iconProps = {
      size: 50,
      viewBox: '-30 -25 100 100',
      onClick: this.onSubCatesToggleOpen,
    };

    return (
      <Link
        to={categoriedItemPath(category.name, category.id)}
        activeClassName={cx('active')}
        onlyActiveOnIndex
      >
        <div styleName="container" className="clear">
          {isSubCategoryOpen && <IconUp {...iconProps} />}
          {isHovering && !isSubCategoryOpen && <IconDown {...iconProps} />}
          <div styleName="text">{category.name}</div>
        </div>
      </Link>
    );
  }
}

export default CSS(ListItem, styles);

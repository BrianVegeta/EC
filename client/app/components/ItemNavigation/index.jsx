import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Navs from './Navs';

const cx = classnames.bind(styles);
class ItemNavigation extends React.Component {
  static defaultProps = {
    visible: false,
  };
  static propTypes = {
    visible: PropTypes.bool,
  };
  render() {
    const { visible } = this.props;
    return (
      <div className={cx('container', { visible })}>
        <div styleName="inner" className="container clear">
          <div styleName="menu">
            <Navs {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}
export default CSS(ItemNavigation, styles);

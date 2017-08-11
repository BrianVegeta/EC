import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import IconChecked from 'components/Icons/Checked';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import colors from 'styles/colorExport.scss';
import styles from './styles.sass';

export const STATUS_CHECKED = 'STATUS_CHECKED';
export const STATUS_UNCHECK = 'STATUS_UNCHECK';

const cx = classnames.bind(styles);
class SidebarCheck extends React.Component {

  static defaultProps = {
    isTouched: false,
  };

  static propTypes = {
    isTouched: PropTypes.bool,
    status: PropTypes.oneOf([
      STATUS_UNCHECK,
      STATUS_CHECKED,
    ]).isRequired,
    text: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
  };

  render() {
    const { text, path, status, isTouched } = this.props;
    return {
      [STATUS_UNCHECK]: (
        <Link to={path}>
          <div className={cx('container', { untouched: !isTouched })}>
            <div styleName="text">{text}</div>
          </div>
        </Link>
      ),
      [STATUS_CHECKED]: (
        <Link to={path}>
          <div className={cx('container', 'checked')}>
            <div styleName="icon">
              <IconChecked size={18} color={colors.primaryColor} />
            </div>
            <div styleName="text">{text}</div>
          </div>
        </Link>
      ),
    }[status];
  }
}

export default CSS(SidebarCheck, styles);

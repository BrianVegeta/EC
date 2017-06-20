import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
class ModalSearch extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };
  render() {
    return (
      <div className={cx('overlay')} >
        <div styleName="scroller">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default CSS(ModalSearch, styles);

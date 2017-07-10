import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import classnames from 'classnames/bind';
import _ from 'lodash';
import CSS from 'react-css-modules';
import styles from './styles.sass';

const cx = classnames.bind(styles);
const BOTTOM_FIX_LIMIT = 2503;
const initialState = {
  isFixing: false,
  isBodyBottom: false,
};
class Sidebar extends React.Component {
  // TODO: clearup
  static propTypes = {
    header: PropTypes.node.isRequired,
    children: myPropTypes.children.isRequired,
  };

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = initialState;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    _.debounce(
      () => this.setState(this.checkFixingState()),
      250,
    );
  }

  checkFixingState() {
    const containerTop = this.container.getBoundingClientRect().top;
    if (containerTop > 0) {
      return Object.assign({}, initialState);
    } else if (containerTop <= 0 && containerTop >= -(BOTTOM_FIX_LIMIT)) {
      return Object.assign({}, initialState, { isFixing: true });
    }
    return Object.assign({}, initialState, { isFixing: true, isBodyBottom: true });
  }

  render() {
    const { isFixing, isBodyBottom } = this.state;
    return (
      <div
        className={`clear ${cx('container', { fixed: isFixing })}`}
        ref={container => (this.container = container)}
      >
        <div
          className={cx('body', { bottom: isBodyBottom })}
          style={{ top: isBodyBottom && BOTTOM_FIX_LIMIT }}
        >
          {this.props.children}
        </div>
        <div styleName="header">
          {this.props.header}
        </div>
      </div>
    );
  }
}
export default CSS(Sidebar, styles);

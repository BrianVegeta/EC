import React from 'react';
import PropTypes from 'prop-types';
import Picture from 'components/Picture';
import { formatCurrency } from 'lib/currency';
import { formatDate } from 'lib/time';
import CSS from 'react-css-modules';
import classnames from 'classnames/bind';
import styles from './styles.sass';


const cx = classnames.bind(styles);
const TAB_MY = 'TAB_MY';
const TAB_TARGET = 'TAB_TARGET';
class ItemsSelection extends React.Component {

  static propTypes = {
    items: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
    fetchMyItems: PropTypes.func.isRequired,
    fetchTargetItems: PropTypes.func.isRequired,
    targetRoom: PropTypes.shape({
      uid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    selectItem: PropTypes.func.isRequired,
    closeSelection: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTab: TAB_MY,
    };
    this.onMyTab = this.onMyTab.bind(this);
    this.onTargetTab = this.onTargetTab.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    this.props.fetchMyItems();
    document.addEventListener('click', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, false);
  }

  onMyTab() {
    this.props.fetchMyItems();
    this.setState({ currentTab: TAB_MY });
  }

  onTargetTab() {
    this.props.fetchTargetItems();
    this.setState({ currentTab: TAB_TARGET });
  }

  handleClickOutside(e) {
    if (this.wrapper.contains(e.target)) {
      return;
    }
    this.props.closeSelection();
  }

  renderItem({ pid, img1, pname, price, create_time }, i) {
    const { selectItem } = this.props;
    return (
      <div
        key={`${i + 1}`}
        styleName="item-container"
        role="button"
        tabIndex="-1"
        onClick={() => selectItem({ pid, pname, price, img: img1 })}
      >
        <div styleName="cover">
          <div styleName="cover-inner">
            <Picture src={img1} />
          </div>
        </div>
        <div styleName="content">
          <div styleName="title">{pname}</div>
          <div styleName="price">{formatCurrency(price)}</div>
          <div styleName="time">{formatDate(create_time)}</div>
        </div>
      </div>
    );
  }

  render() {
    const { currentTab } = this.state;
    const { items: { records }, targetRoom } = this.props;
    return (
      <div styleName="wrapper" ref={wrapper => (this.wrapper = wrapper)}>
        <div styleName="container">
          <div styleName="header">
            <div
              role="button"
              tabIndex="-1"
              className={cx('nav', { active: (TAB_MY === currentTab) })}
              onClick={this.onMyTab}
            >
              我的分享
            </div>
            <div
              role="button"
              tabIndex="-1"
              className={cx('nav', { active: (TAB_TARGET === currentTab) })}
              onClick={this.onTargetTab}
            >
              {targetRoom.name}
            </div>
          </div>
          <div styleName="body">
            {records.map(this.renderItem)}
          </div>
        </div>
        <div styleName="arrow" />
      </div>
    );
  }
}

export default CSS(ItemsSelection, styles);

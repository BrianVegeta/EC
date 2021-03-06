import React from 'react';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';
import { isEqual } from 'lodash';
import WishNote from 'components/WishNote';
import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import { ListContainer, ItemContainer } from './styles';


const cx = classnames.bind(styles);
class WishList extends React.Component {

  static defaultProps = {
    deletable: null,
    eachMargin: 26,
    shouldInitAnimate: false,
  };

  static propTypes = {
    deletable: PropTypes.shape({
      isDeleting: PropTypes.bool.isRequired,
      onDelete: PropTypes.func.isRequired,
    }),
    shouldInitAnimate: PropTypes.bool,
    onShow: PropTypes.func.isRequired,
    records: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    eachMargin: PropTypes.number,
  };

  static shouldUpdateProps({ records }, { isWaiting }) {
    return { records, isWaiting };
  }

  constructor(props) {
    super(props);
    const { shouldInitAnimate } = props;
    this.state = {
      isWaiting: shouldInitAnimate,
    };
  }

  componentDidMount() {
    if (this.props.shouldInitAnimate) {
      this.startMasonry();
    }
  }

  shouldComponentUpdate({ records }, { isWaiting }) {
    const { shouldUpdateProps } = this.constructor;
    return !isEqual(
      shouldUpdateProps(this.props, this.state),
      { records, isWaiting },
    );
  }

  startMasonry() {
    this.setState({ isWaiting: false });
  }

  render() {
    const { records, eachMargin, onShow, deletable } = this.props;
    const { isWaiting } = this.state;
    const mountRecords = isWaiting ? [] : records;
    return (
      <div styleName="container">
        <ListContainer marginLeft={eachMargin} className="clear">
          <Masonry>
            {mountRecords.map((record, index) => (
              <ItemContainer
                key={`${index + 1}`}
                className={cx('item')}
                marginLeft={eachMargin}
              >
                <WishNote
                  onShow={() => onShow(record.id)}
                  data={record}
                  deletable={deletable}
                />
              </ItemContainer>
            ))}
          </Masonry>
        </ListContainer>
      </div>
    );
  }
}

export default CSS(WishList, styles);

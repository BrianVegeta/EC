import React from 'react';
// import myPropTypes from 'propTypes';
import PropTypes from 'prop-types';
import Masonry from 'react-masonry-component';

import WishNote from 'components/WishNote';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import {
  ListContainer,
  ItemContainer,
} from './styles';

const cx = classnames.bind(styles);
class WishList extends React.Component {

  static defaultProps = {
    eachMargin: 26,
  };

  static propTypes = {
    records: PropTypes.arrayOf(
      PropTypes.object.isRequired,
    ).isRequired,
    eachMargin: PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
      isWaiting: true,
    };
  }

  componentDidMount() {
    this.setState({ isWaiting: false });
  }

  render() {
    const { records, eachMargin } = this.props;
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
                <WishNote data={record} />
              </ItemContainer>
            ))}
          </Masonry>
        </ListContainer>
      </div>
    );
  }
}

export default CSS(WishList, styles);

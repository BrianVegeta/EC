import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';
import { Sticky, StickyContainer } from 'react-sticky';

import classnames from 'classnames/bind';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class StickyStepContainer extends React.Component {

  static propTypes = {
    screenHeight: PropTypes.number.isRequired,
    children: myPropTypes.children.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      wrapperHeight: null,
    };
  }

  componentDidUpdate() {
    if (
      this.mainWrapper &&
      this.mainWrapper.clientHeight > 0 &&
      this.state.wrapperHeight === null
    ) {
      this.setWrapperContentHeight(this.mainWrapper.clientHeight);
    }
  }

  setWrapperContentHeight() {
    this.setState({ wrapperHeight: this.mainWrapper.clientHeight });
  }

  render() {
    const {
      screenHeight,
      children,
    } = this.props;
    const ref = mainWrapper => (this.mainWrapper = mainWrapper);
    const stickyStyle = { height: (this.state.wrapperHeight || screenHeight) };
    return (
      <div className={cx('container')}>
        <StickyContainer style={stickyStyle} className={cx('sidebar')} >
          <Sticky>
            {({ style }) => (
              <div style={{ paddingBottom: 100, ...style }}>
                {children[0]}
              </div>
            )}
          </Sticky>
        </StickyContainer>
        <div ref={ref} className={cx('main-wrapper')}>
          {children[1]}
        </div>
      </div>
    );
  }
}

export default StickyStepContainer;

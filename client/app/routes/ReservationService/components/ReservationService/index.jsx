import React from 'react';
import PropTypes from 'prop-types';
import { Sticky, StickyContainer } from 'react-sticky';

import SidebarSteps, { stepPropType } from 'components/Sidebar/Steps';
import myPropTypes from 'propTypes';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class PublishService extends React.Component {

  static propTypes = {
    isFetched: PropTypes.bool.isRequired,
    steps: PropTypes.arrayOf(stepPropType.isRequired).isRequired,
    touchedPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,

    dispatchCheckBankInfoReady: PropTypes.func.isRequired,
    dispatchResetBankInfo: PropTypes.func.isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      wrapperHeight: null,
    };
  }

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchItem();
    this.props.dispatchCheckBankInfoReady();
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

  componentWillUnmount() {
    this.props.dispatchReset();
    this.props.dispatchResetBankInfo();
  }

  setWrapperContentHeight(height) {
    this.setState({ wrapperHeight: height });
  }

  render() {
    const {
      children,
      environment: { height: screenHeight },
      touchedPaths,
      steps,
      isFetched,
    } = this.props;
    if (!isFetched) return null;

    const ref = mainWrapper => (this.mainWrapper = mainWrapper);
    const stickyStyle = { height: (this.state.wrapperHeight || screenHeight) };
    return (
      <div styleName="container">
        <StickyContainer style={stickyStyle} className={cx('sidebar')} >
          <Sticky>
            {({ style }) => (
              <div style={{ paddingBottom: 100, ...style }}>
                <SidebarSteps
                  touchedPaths={touchedPaths}
                  steps={steps}
                />
              </div>
            )}
          </Sticky>
        </StickyContainer>
        <div ref={ref} styleName="main-wrapper">
          {children}
        </div>
      </div>
    );
  }
}

export default CSS(PublishService, styles);

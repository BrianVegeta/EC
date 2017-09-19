import React from 'react';
import PropTypes from 'prop-types';

import SidebarSteps, { stepPropType } from 'components/Sidebar/Steps';
import StickyStepContainer from 'components/StickyStepContainer';
import myPropTypes from 'propTypes';

// import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


// const cx = classnames.bind(styles);
class reservationGoods extends React.Component {

  static defaultProps = {
    touchedPaths: null,
  };

  static propTypes = {
    touchedPaths: PropTypes.arrayOf(PropTypes.string),
    isFetched: PropTypes.bool.isRequired,
    steps: PropTypes.arrayOf(stepPropType.isRequired).isRequired,
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,
    dispatchCheckBankInfoReady: PropTypes.func.isRequired,
    dispatchResetBankInfo: PropTypes.func.isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchCheckEdit: PropTypes.func.isRequired,
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
    this.props.dispatchCheckEdit();
    this.props.dispatchCheckBankInfoReady();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
    this.props.dispatchResetBankInfo();
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
    return (
      <StickyStepContainer screenHeight={screenHeight}>
        <SidebarSteps
          marginTop={30}
          touchedPaths={touchedPaths}
          steps={steps}
        />
        {children}
      </StickyStepContainer>
    );
  }
}

export default CSS(reservationGoods, styles);

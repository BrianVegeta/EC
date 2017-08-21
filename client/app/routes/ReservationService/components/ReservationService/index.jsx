import React from 'react';
import PropTypes from 'prop-types';
import { Sticky, StickyContainer } from 'react-sticky';

import myPropTypes from 'propTypes';
import SidebarCheck, {
  STATUS_CHECKED,
  STATUS_UNCHECK,
} from 'components/Publish/SidebarCheck';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class PublishService extends React.Component {

  static propTypes = {
    steps: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string,
        text: PropTypes.string,
        isValid: PropTypes.bool,
        isTouched: PropTypes.bool,
      }),
    ).isRequired,
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,

    dispatchCheckBankInfoReady: PropTypes.func.isRequired,
    dispatchResetBankInfo: PropTypes.func.isRequired,
    dispatchFetchItem: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchReset();
    this.props.dispatchFetchItem();

    this.props.dispatchCheckBankInfoReady();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
    this.props.dispatchResetBankInfo();
  }

  render() {
    const {
      children,
      environment,
      steps,
    } = this.props;

    return (
      <div styleName="container">
        <StickyContainer
          style={{ height: environment.height }}
          className={cx('sidebar')}
        >
          <Sticky>
            {({ style }) => (
              <div style={{ paddingBottom: 100, ...style }}>
                {steps.map((step, index) => {
                  const { text, isValid, isTouched, path } = step;
                  return (
                    <SidebarCheck
                      key={`${index + 1}`}
                      text={text}
                      status={
                        (isValid && isTouched) ?
                          STATUS_CHECKED : STATUS_UNCHECK
                      }
                      isTouched={isTouched}
                      path={path}
                    />
                  );
                })}
              </div>
            )}
          </Sticky>
        </StickyContainer>
        <div styleName="main-wrapper">
          {children}
        </div>
      </div>
    );
  }
}

export default CSS(PublishService, styles);

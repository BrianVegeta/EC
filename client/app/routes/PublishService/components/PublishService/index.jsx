import React from 'react';
import PropTypes from 'prop-types';
import { Sticky, StickyContainer } from 'react-sticky';

import myPropTypes from 'propTypes';
import SidebarSteps, { stepPropType } from 'components/Sidebar/Steps';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class PublishService extends React.Component {

  static defaultProps = {
    touchedPaths: null,
  };

  static propTypes = {
    touchedPaths: PropTypes.arrayOf(PropTypes.string),
    isFetched: PropTypes.bool.isRequired,
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,
    steps: PropTypes.arrayOf(stepPropType.isRequired).isRequired,

    dispatchReset: PropTypes.func.isRequired,
    dispatchFetchCities: PropTypes.func.isRequired,
    dispatchFetchCategories: PropTypes.func.isRequired,
    dispatchCheckEdit: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.dispatchFetchCities();
    this.props.dispatchFetchCategories();
    this.props.dispatchCheckEdit();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const {
      children,
      environment,
      touchedPaths,
      steps,

      isFetched,
    } = this.props;

    if (!isFetched) return null;
    return (
      <div styleName="container">
        <StickyContainer
          style={{ height: environment.height }}
          className={cx('sidebar')}
        >
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
        <div styleName="main-wrapper">
          {children}
        </div>
      </div>
    );
  }
}

export default CSS(PublishService, styles);

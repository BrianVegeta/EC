import React from 'react';
import PropTypes from 'prop-types';
import { Sticky, StickyContainer } from 'react-sticky';
import { includes } from 'lodash';

import myPropTypes from 'propTypes';
import SidebarCheck, {
  STATUS_CHECKED,
  STATUS_UNCHECK,
} from 'components/Publish/SidebarCheck';
import { publishServiceRouter } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class PublishService extends React.Component {

  static propTypes = {
    touchedStepPaths: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,
    isCoversValid: PropTypes.bool.isRequired,
    isAboutValid: PropTypes.bool.isRequired,
    isDeliveryValid: PropTypes.bool.isRequired,
    isPriceValid: PropTypes.bool.isRequired,
    isRegulationValid: PropTypes.bool.isRequired,
    dispatchReset: PropTypes.func.isRequired,
    dispatchFetchCities: PropTypes.func.isRequired,
    dispatchFetchCategories: PropTypes.func.isRequired,
    dispatchCheckEdit: PropTypes.func.isRequired,
    isFetched: PropTypes.bool.isRequired,
  };

  static mapPathsTouched(paths, touchedStepPaths) {
    return paths.map(path => ({
      isTouched: includes(touchedStepPaths, path.path),
      ...path,
    }));
  }

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
      touchedStepPaths,
      isCoversValid,
      isAboutValid,
      isDeliveryValid,
      isPriceValid,
      isRegulationValid,
      isFetched,
    } = this.props;

    if (!isFetched) return null;

    const {
      indexPath,
      aboutPath,
      deliveryPath,
      pricePath,
      regulationPath,
      confirmPath,
    } = publishServiceRouter;

    const stepPaths = [
      {
        text: '上傳照片',
        path: indexPath(),
        isValid: isCoversValid,
      },
      {
        text: '關於服務',
        path: aboutPath(),
        isValid: isAboutValid,
      },
      {
        text: '服務資訊',
        path: deliveryPath(),
        isValid: isDeliveryValid,
      },
      {
        text: '設定價格',
        path: pricePath(),
        isValid: isPriceValid,
      },
      {
        text: '建立分享人守則',
        path: regulationPath(),
        isValid: isRegulationValid,
      },
      {
        text: '確認發佈',
        path: confirmPath(),
        isValid: false,
      },
    ];
    const { mapPathsTouched } = this.constructor;
    return (
      <div styleName="container">
        <StickyContainer
          style={{ height: environment.height }}
          className={cx('sidebar')}
        >
          <Sticky>
            {({ style }) => (
              <div style={{ paddingBottom: 100, ...style }}>
                {mapPathsTouched(stepPaths, touchedStepPaths).map((stepPath, index) => {
                  const { text, isValid, isTouched, path } = stepPath;
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

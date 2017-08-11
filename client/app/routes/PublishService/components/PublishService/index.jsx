import React from 'react';
import PropTypes from 'prop-types';
import { Sticky, StickyContainer } from 'react-sticky';
import { findIndex } from 'lodash';

import myPropTypes from 'propTypes';
import SidebarCheck, {
  STATUS_CHECKED,
  STATUS_UNCHECK,
} from 'components/Publish/SidebarCheck';
import { publishService } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class PublishService extends React.Component {

  static propTypes = {
    currentPath: PropTypes.string.isRequired,
    children: myPropTypes.children.isRequired,
    environment: myPropTypes.environment.isRequired,
  };

  static mapPathsTouched(paths, currentPath) {
    const index = findIndex(paths, { path: currentPath });
    return paths.map((path, i) => ({
      isTouched: (i <= index),
      ...path,
    }));
  }

  render() {
    const {
      children,
      environment,
      currentPath,
    } = this.props;

    const stepPaths = [
      {
        text: '上傳照片',
        path: publishService.indexPath,
        status: STATUS_CHECKED,
      },
      {
        text: '關於物品',
        path: publishService.aboutPath,
        status: STATUS_CHECKED,
      },
      {
        text: '寄件資訊',
        path: publishService.coverPath,
        status: STATUS_UNCHECK,
      },
      {
        text: '設定價格',
        path: publishService.pricePath,
        status: STATUS_UNCHECK,
      },
      {
        text: '建立分享人守則',
        path: publishService.regulationPath,
        status: STATUS_UNCHECK,
      },
      {
        text: '確認發佈',
        path: publishService.confirmPath,
        status: STATUS_UNCHECK,
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
                {mapPathsTouched(stepPaths, currentPath).map((stepPath, index) => (
                  <SidebarCheck
                    key={`${index + 1}`}
                    text={stepPath.text}
                    status={stepPath.status}
                    isTouched={stepPath.isTouched}
                    path={stepPath.path}
                  />
                ))}
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

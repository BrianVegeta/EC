import React from 'react';

import Hover from 'react-hover-observer';
import IconPublishGoods from 'components/Icons/Publish/Goods';
import IconPublishSpace from 'components/Icons/Publish/Space';
import IconPublishService from 'components/Icons/Publish/Service';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';


const cx = classnames.bind(styles);
class Test extends React.Component {

  render() {
    return (
      <div styleName="container">
        <Hover className={cx('publish-icon')}>
          <IconPublishGoods />
        </Hover>
        <Hover className={cx('publish-icon')}>
          <IconPublishSpace />
        </Hover>
        <Hover className={cx('publish-icon')}>
          <IconPublishService />
        </Hover>
      </div>
    );
  }
}

export default CSS(Test, styles);

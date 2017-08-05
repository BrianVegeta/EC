import React from 'react';

import Hover from 'react-hover-observer';
import IconPublishGoods from 'components/Icons/Publish/Goods';
import IconPublishSpace from 'components/Icons/Publish/Space';
import IconPublishService from 'components/Icons/Publish/Service';
import Line from 'components/Icons/Line';
import Facebook from 'components/Icons/Facebook';
import Mail from 'components/Icons/Mail';
import Phone from 'components/Icons/Phone';
import Calendar from 'components/Icons/Calendar';
import Wallet from 'components/Icons/Wallet';
import Chat from 'components/Icons/Chat';
import Search from 'components/Icons/Search';
import Stuff from 'components/Icons/Stuff';
import Time from 'components/Icons/Time';
import TransportRight from 'components/Icons/TransportRight';
import TransportLeft from 'components/Icons/TransportLeft';

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
        <Phone size={40} color={'blue'} />
        <Line size={30} color={'red'} />
        <Facebook size={40} color={'blue'} />
        <Mail size={50} color={'red'} />
        <Calendar width={187} height={142} color={'red'} />
        <Wallet width={164} height={166} color={'blue'} />
        <Chat width={150} height={150} color={'red'} />
        <Search size={70} color={'red'} />
        <Stuff size={40} />
        <Time size={30} />
        <TransportRight width={41} height={33} />
        <TransportLeft width={41} height={33} />
      </div>
    );
  }
}

export default CSS(Test, styles);

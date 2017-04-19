import React from 'react';
import OrderBoard from './OrderBoard';
import ShareBoard from './ShareBoard';
import ReportLink from './ReportLink';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.state = {
      isFixing: false,
      isBodyBottom: false,
    };
    this.bottomLimit = 2503;
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const containerTop = this.container.getBoundingClientRect().top;
    if (containerTop > 0) {
      this.setState({ isFixing: false, isBodyBottom: false });
    } else if (containerTop <= 0 && containerTop >= -(this.bottomLimit)) {
      this.setState({ isFixing: true, isBodyBottom: false });
    } else {
      this.setState({ isFixing: true, isBodyBottom: true });
    }
    // const containerRect = this.container.getBoundingClientRect();
    // const headerRect = this.header.getBoundingClientRect();
    // console.log(`container top: ${containerRect.top}, bottom: ${containerRect.bottom}`);
    // console.log(`header top: ${headerRect.top}, bottom: ${headerRect.bottom}`);
    // console.log('---');
  }

  render() {
    const { isFixing, isBodyBottom } = this.state;
    return (
      <div
        styleName={isFixing ? 'container-fixed' : 'container'}
        className="clear"
        ref={container => (this.container = container)}
      >
        <div
          styleName={isBodyBottom ? 'body-bottom' : 'body'}
          style={{ top: isBodyBottom && this.bottomLimit }}
        >
          <OrderBoard />
          <div styleName="share-board">
            <ShareBoard />
          </div>
          <div styleName="report">
            <ReportLink />
          </div>
        </div>
        <div styleName="header" ref={header => (this.header = header)}>
          <div styleName="header-price">
            NT$99,999 / 一日
          </div>
        </div>
      </div>
    );
  }
}
export default Sidebar;

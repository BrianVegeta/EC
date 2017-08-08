import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Banner extends React.Component {

  static propTypes = {
    type: PropTypes.number.isRequired,
  };

  render() {
    console.log(this.props);
    return (
      <div styleName="banner_bkg">
        <div styleName="title_content">
          <div>
            <Icon styleName="icon" size={35} />
          </div>
          <div styleName="title">請同意預訂單</div>
        </div>
        <div styleName="body_content">
          <span>請在 2017/04/10 出貨前同意預訂單，逾時將自動取消。</span>
        </div>
      </div>
    );
  }
}
export default CSS(Banner, styles);

import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';
import { formatDate } from 'lib/time'
import styles from './styles.sass';

class Banner extends React.Component {

  static propTypes = {
    type: PropTypes.number.isRequired,
    startDate: PropTypes.number.isRequired,
  };

  render() {
    const { type, startDate } = this.props;

    switch (type) {
      case 1:
        this.title = '請同意預訂單';
        this.text = `請在${formatDate(startDate)}出貨前同意預訂單，逾時將自動取消。`;
        break;
      default:
        this.title = 'ERROR~~~';
        break;
    }
    return (
      <div styleName="banner_bkg">
        <div styleName="title_content">
          <div>
            <Icon styleName="icon" size={35} />
          </div>
          <div styleName="title">{ this.title }</div>
        </div>
        <div styleName="body_content">
          <span>{ this.text }</span>
        </div>
      </div>
    );
  }
}
export default CSS(Banner, styles);

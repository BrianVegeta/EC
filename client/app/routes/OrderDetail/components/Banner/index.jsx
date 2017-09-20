/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-icons/lib/fa/adjust';
import CSS from 'react-css-modules';

import { generateOwnerItemString, generateOwnerServiceString,
  generateOwnerSpaceString, generateLesseeItemString,
  generateLesseeServiceString, generateLesseeSpaceString,
  generateOwnerUsedItemString, generateLesseeUsedItemString }
  from 'lib/contractString';
import styles from './styles.sass';

class Banner extends React.Component {

  static propTypes = {
    order: PropTypes.shape({
      type: PropTypes.string,
      contractstage: PropTypes.number,
      leasestart: PropTypes.number,
      create_time: PropTypes.number,
      display: PropTypes.shape({
        is_owner: PropTypes.bool,
      }),
    },
    ).isRequired,
  };

  generateString() {
    const { order } = this.props;
    const { type, contractstage, leasestart, create_time, display } = order;
    const { is_owner } = display;
    if (is_owner) {
      switch (type) {
        case 'ITEM':
          return generateOwnerItemString(contractstage, leasestart);
        case 'SERVICE': {
          const { is_owner_end, is_lessee_end } = display;
          return generateOwnerServiceString(contractstage, leasestart, is_owner_end, is_lessee_end);
        }
        case 'SPACE': {
          const { is_owner_end, is_lessee_end } = display;
          return generateOwnerSpaceString(contractstage, leasestart, is_owner_end, is_lessee_end);
        }
        case 'USED_ITEM':
          return generateOwnerUsedItemString(contractstage, create_time);
        default:
          return ({ title: '', text: '' });
      }
    } else {
      switch (type) {
        case 'ITEM':
          return generateLesseeItemString(contractstage, leasestart);
        case 'SERVICE': {
          const { is_owner_end, is_lessee_end } = display;
          return generateLesseeServiceString(contractstage, leasestart,
            is_owner_end, is_lessee_end);
        }
        case 'SPACE': {
          const { is_owner_end, is_lessee_end } = display;
          return generateLesseeSpaceString(contractstage, leasestart,
            is_owner_end, is_lessee_end);
        }
        case 'USED_ITEM':
          return generateLesseeUsedItemString(contractstage, create_time);
        default:
          return ({ title: '', text: '' });
      }
    }
  }

  render() {
    const objString = this.generateString();
    return (
      <div styleName="order_banner_bkg" className="clear">
        <div styleName="order_banner_title_content">
          <div>
            <Icon styleName="order_banner_icon" size={35} />
          </div>
          <div styleName="order_banner_title">{ objString.title }</div>
        </div>
        <div styleName="order_banner_body_content">
          <span>{ objString.text }</span>
        </div>
      </div>
    );
  }
}
export default CSS(Banner, styles);

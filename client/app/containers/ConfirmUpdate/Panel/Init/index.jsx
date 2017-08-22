import React from 'react';
import PropTypes from 'prop-types';
import { TO_CREATE, TO_UPDATE } from 'modules/confirmUpdate';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class PanelInit extends React.Component {

  static propTypes = {
    valueType: PropTypes.oneOf(['phone', 'email']).isRequired,
    value: PropTypes.string.isRequired,
    actionType: PropTypes.string.isRequired,
    toEdit: PropTypes.func.isRequired,
  };

  render() {
    const { valueType, actionType, value, toEdit } = this.props;

    switch (actionType) {
      case TO_CREATE:
        return (
          <div styleName="container">
            <button styleName="create-button" onClick={toEdit} >
              {{
                phone: '＋新增電話號碼',
                email: '＋新增電子信箱',
              }[valueType]}
            </button>
          </div>
        );
      case TO_UPDATE:
        return (
          <div styleName="container">
            <span styleName="label">
              {{
                phone: '手機：',
                email: '信箱：',
              }[valueType]}
            </span>
            <span>
              {{
                phone: <span><span>(+886) </span>{value}</span>,
                email: value,
              }[valueType]}
            </span>
            <span styleName="verified">已驗證</span>
            <button
              className="button"
              styleName="update-button"
              onClick={toEdit}
            >
              變更
            </button>
          </div>
        );
      default:
        return null;
    }
  }
}

export default CSS(PanelInit, styles);

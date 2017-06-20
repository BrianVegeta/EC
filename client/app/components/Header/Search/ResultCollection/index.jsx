import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';


class ResultCollection extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div styleName="block">
          <div styleName="header">
            用戶
            <button className="button" styleName="all">看全部&gt;</button>
          </div>
          <div>test</div>
        </div>
        <div styleName="block">
          <div styleName="header">
            許願紙條
          </div>
        </div>
        <div styleName="block">
          <div styleName="header">
            物品
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(ResultCollection, styles);

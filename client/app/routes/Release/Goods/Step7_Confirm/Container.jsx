import React from 'react';
import CSS from 'react-css-modules';
import { connect } from 'react-redux';
import styles from './styles.sass';
import {
  TitleWrapper,
  IntervalLine,
} from '../../components';

class ConfirmContainer extends React.Component {
  render() {
    return (
      <div styleName="container">
        <TitleWrapper>確認發佈資訊</TitleWrapper>
        <div styleName="subTitle">物品照片</div>
        <div styleName="photos">
          <div styleName="photo" />
          <div styleName="photo" />
          <div styleName="photo" />
        </div>
        <IntervalLine color="#888" marginTop={10} marginBottom={40} />
        <Block
          {...{
            title: '關於物品',
            content: [
              { head: '服務名稱', body: '微型迷你投影機家庭劇院神器' },
              { head: '描述', body: '清楚介紹您的物品，敘述更多吸引人的細節清楚介紹您的物品，敘述更多吸引人的細節清楚介紹您的物品，敘述更多吸引人的細節不內然此，起分今過師；是良者可手，人小能些油一外響把大史足媽業然麼何二！腦企他到流我。' },
              {
                head: '物品資訊',
                body: (
                  <div>
                    <div styleName="list">物品地區：<span styleName="hightlight">基隆市七堵區</span></div>
                    <div styleName="list">數量：<span styleName="hightlight">10</span></div>
                  </div>
                ),
              },
            ],
          }}
        />
        <div styleName="subTitle">關於物品</div>
        <table>
          <tr>
            <th styleName="tdHead">分類</th>
            <td styleName="tdContent">
              家電<span styleName="categoryArrow">&gt;</span>投影機
            </td>
          </tr>
          <tr>
            <th styleName="tdHead">標籤</th>
            <td styleName="tdContent">
              <div>＃微型迷你投影機家庭劇院神器</div>
              <div>＃家庭劇院</div>
              <div>＃方便好攜帶</div>
            </td>
          </tr>
        </table>
        <IntervalLine color="#888" marginTop={10} marginBottom={40} />
        <div styleName="subTitle">寄件資訊</div>
        <table>
          <tr>
            <th styleName="tdHead" width={154}>寄件日期</th>
            <td styleName="tdContent">使用的前1天內到貨</td>
          </tr>
          <tr>
            <th styleName="tdHead">可寄件方式</th>
            <td styleName="tdContent">
              <div>7-11交貨便</div>
              <div>自行寄件</div>
              <div>面交（自行協調取貨地點）</div>
            </td>
          </tr>
          <tr>
            <th styleName="tdHead">可寄還方式</th>
            <td styleName="tdContent">
              <div>
                自行寄件：
                <span styleName="hightlight">基隆市七堵區OO里XXX路三段34號5樓</span>
              </div>
              <div>面交（自行協調取貨地點）</div>
            </td>
          </tr>
        </table>
        <IntervalLine color="#888" marginTop={10} marginBottom={40} />
        <div styleName="subTitle">設定價格</div>
        <table>
          <tr>
            <th styleName="tdHead" width={154}>價格</th>
            <td styleName="tdContent">
              <div>分享金：<span styleName="hightlight">NT$7000</span></div>
              <div>押金：<span styleName="hightlight">NT$200</span></div>
            </td>
          </tr>
          <tr>
            <th styleName="tdHead">最短租借天數</th>
            <td styleName="tdContent">2天</td>
          </tr>
          <tr>
            <th styleName="tdHead">自訂折扣</th>
            <td styleName="tdContent">
              <div>3天以上，1000租金</div>
              <div>3天以上，1000租金</div>
              <div>3天以上，1000租金</div>
            </td>
          </tr>
        </table>
        <IntervalLine color="#888" marginTop={10} marginBottom={40} />
        <div styleName="subTitle">分享人守則</div>
        <table>
          <tr>
            <td styleName="tdContent">
              甲方向晴日有限公司〈以下簡稱乙方〉承租各式攝影用品（如附件明示）特訂立本契約並經雙方同意，條件如下：
              第一條：標的物本合約中甲方所承租之標的物名稱、型號、數量詳如附件。
              第二條：租期本合約以標的物驗收手續完成後起租，標的物返還時間以本合約規定為準。
              第三條：租金、押金及質押證件
            </td>
          </tr>
        </table>
        <IntervalLine color="#888" marginTop={10} marginBottom={40} />
        <div styleName="subTitle">退訂政策</div>
        <table>
          <tr>
            <td styleName="tdContent">
              開始租借前3天取消訂單，扣除50%分享金
            </td>
          </tr>
        </table>
        <IntervalLine color="#888" marginTop={10} marginBottom={40} />
        <div styleName="subTitle">逾期金政策</div>
        <table>
          <tr>
            <td styleName="tdContent">
              逾期一天，扣除押金NT$30
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(CSS(ConfirmContainer, styles));

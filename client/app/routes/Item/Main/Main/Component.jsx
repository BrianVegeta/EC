import React, { PropTypes } from 'react';
import Cover from './Cover';
import Breadcrumbs from './Breadcrumbs';
import Title from './Title';
import TitleFooter from './TitleFooter';
import Description from './Description';
import Tags from './Tags';
import Detail from './Detail';
import Regulation from './Regulation';
import CancelPolicy from './CancelPolicy';
// import PublicComment from './PublicComment';
import Comments from './Comments';
import Sharer from './Sharer';
import {
  ITEM_MAIN_INTRODUCTION,
  ITEM_MAIN_REGULATION,
  ITEM_MAIN_COMMENT,
  ITEM_MAIN_SHARER,
} from '../../../constants/itemDetailScrollNavs';

const title = '微型迷你投影機家庭劇院神器微型迷你投影機家庭劇院神器劇院神器';
const description = '走到哪拍到哪，到處旅行收藏美麗的的畫面，這台復古相機，跟著我3年時間留下了很多回憶，走到哪拍到哪。面，這台復古相機，跟著我3年時間留下了很多回憶，這台復古相機到處旅行收藏美麗的的畫面，跟著我3年時間留下了很多回憶，走到哪拍到哪'
const regulations = [
  { describe: '請勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。' },
  { describe: '請勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。' },
  { describe: '請勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。' },
  { describe: '請勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。' },
  { describe: '請勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。' },
  { describe: '請勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。' },
  { describe: '請勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。勿弄髒、重摔。' },
];

class Main extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };
  rComment() {
    const id = ITEM_MAIN_COMMENT;
    const ref = comment => (this[ITEM_MAIN_COMMENT] = comment);
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Comments />
      </div>
    );
  }

  rRegulation() {
    const id = ITEM_MAIN_REGULATION;
    const ref = regulation => (this[ITEM_MAIN_REGULATION] = regulation);
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Regulation rules={regulations} />
        <CancelPolicy />
      </div>
    );
  }

  rIntroduction() {
    const id = ITEM_MAIN_INTRODUCTION;
    const ref = intro => (this[ITEM_MAIN_INTRODUCTION] = intro);
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Title title={title} />
        <div styleName="title-footer">
          <TitleFooter location="台北市中正區" orderedCount={8} />
        </div>
        <Description description={description} />
        <Tags />
        <Detail />
      </div>
    );
  }

  rSharer() {
    const id = ITEM_MAIN_SHARER;
    const ref = sharer => (this[ITEM_MAIN_SHARER] = sharer);
    return (
      <div styleName="nav-anchor" {...{ id, ref }} >
        <Sharer />
      </div>
    );
  }
  render() {
    return (
      <div styleName="container">
        <div styleName="cover">
          <Cover />
        </div>
        <Breadcrumbs />
        {this.rIntroduction()}
        {this.rRegulation()}
        {this.rSharer()}
        {this.rComment()}
      </div>
    );
  }
}
export default Main;

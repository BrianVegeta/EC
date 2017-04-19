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
import PublicComment from './PublicComment';
import {
  ITEM_MAIN_INTRODUCTION,
  ITEM_MAIN_REGULATION,
  ITEM_MAIN_COMMENT,
  ITEM_MAIN_SHARER,
} from '../../../constants/htmlIds';
import {
  changeCurrentNav,
} from '../../../actions/itemLayoutActions';

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

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  itemLayout: PropTypes.object.isRequired,
};
class Main extends React.Component {

  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  onScroll() {
    const ids = [
      ITEM_MAIN_INTRODUCTION,
      ITEM_MAIN_REGULATION,
      ITEM_MAIN_COMMENT,
    ];
    const blocks = ids.map((id) => {
      const top = this[id].getBoundingClientRect().top;
      const height = this[id].clientHeight;
      const flag = (top + height) - (window.innerHeight / 2);
      return { id, flag };
    });

    const pendings = blocks.filter(block => block.flag > 0);
    const currentNav = pendings.length === 0 ? ids[ids.length - 1] : pendings[0].id;

    if (this.props.itemLayout.currentNav !== currentNav) {
      this.props.dispatch(changeCurrentNav(currentNav));
    }
  }

  rComment() {
    return (
      <div
        style={{ borderTop: '1px solid red' }}
        id={ITEM_MAIN_COMMENT}
        ref={comment => (this.comment = comment)}
      >
        <PublicComment />
      </div>
    );
  }

  rRegulation() {
    return (
      <div
        style={{ borderTop: '1px solid red' }}
        id={ITEM_MAIN_REGULATION}
        ref={regulation => (this.regulation = regulation)}
      >
        <Regulation rules={regulations} />
        <CancelPolicy />
      </div>
    );
  }

  rIntroduction() {
    return (
      <div
        style={{ borderTop: '1px solid red' }}
        id={ITEM_MAIN_INTRODUCTION}
        ref={intro => (this.introduction = intro)}
      >
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

  render() {
    return (
      <div styleName="container">
        <div styleName="cover">
          <Cover />
        </div>
        <div styleName="breadcrumbs">
          <Breadcrumbs />
        </div>
        {this.rIntroduction()}
        {this.rRegulation()}
        {this.rComment()}
        <div id="owner" />
      </div>
    );
  }
}
Main.propTypes = propTypes;
export default Main;

import React from 'react';
import Cover from './Cover';
import Breadcrumbs from './Breadcrumbs';
import Title from './Title';
import TitleFooter from './TitleFooter';
import Description from './Description';

const title = '微型迷你投影機家庭劇院神器微型迷你投影機家庭劇院神器劇院神器';
const description = '走到哪拍到哪，到處旅行收藏美麗的的畫面，這台復古相機，跟著我3年時間留下了很多回憶，走到哪拍到哪。面，這台復古相機，跟著我3年時間留下了很多回憶，這台復古相機到處旅行收藏美麗的的畫面，跟著我3年時間留下了很多回憶，走到哪拍到哪'
const Main = () => (
  <div styleName="container">
    <div styleName="cover">
      <Cover />
    </div>
    <div styleName="breadcrumbs">
      <Breadcrumbs />
    </div>
    <div id="introduction">
      <Title title={title} />
      <div styleName="title-footer">
        <TitleFooter location="台北市中正區" orderedCount={8} />
      </div>
      <Description description={description} />
    </div>
  </div>
);
export default Main;

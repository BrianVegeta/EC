import React from 'react';
import Cover from './Cover';
import Breadcrumbs from './Breadcrumbs';
import Title from './Title';
import TitleFooter from './TitleFooter';

const title = '微型迷你投影機家庭劇院神器微型迷你投影機家庭劇院神器劇院神器';
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
    </div>
  </div>
);
export default Main;

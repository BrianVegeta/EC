import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import SearchPanel from './SearchPanel';
import ResultCollection from './ResultCollection';
import Inputer from './Inputer';
import Model from './Model';

class Search extends React.Component {
  render() {
    const model = new Model(this.props);
    return (
      <div styleName="container">
        <Inputer
          placeholder="尋找你的好物、服務、空間、分享人名稱"
          onChange={model.doSearch}
        />
        <SearchPanel>
          <ResultCollection />
        </SearchPanel>
      </div>
    );
  }
}
export default CSS(Search, styles);

import React from 'react';

// const cx = classnames.bind(styles);
class SeventEleven extends React.Component {

  componentDidMount() {
    console.log('componentDidMount');
    const f = document.getElementById('PostForm');
    f.submit();
  }
  render() {
    return (
      <div>
        <form method="post" action="https://emap.pcsc.com.tw/ecmap/default.aspx" id="PostForm">
          <input type="hidden" name="eshopparid" value="935" />
          <input type="hidden" name="eshopid" value="001" />
          <input type="hidden" name="eshoppwd" value="presco123" />
          <input type="hidden" name="url" value="http://debug.shareapp.com.tw:10380/ajax/store_result.json" />
          <input type="hidden" name="tempvar" value="" />
          <input type="hidden" name="sid" value="1" />
          <input type="hidden" name="storecategory" value="3" />
          <input type="hidden" name="showtype" value="1" />
          <input type="hidden" name="storeid" value="" />
        </form>
      </div>
    );
  }
}
export default SeventEleven;

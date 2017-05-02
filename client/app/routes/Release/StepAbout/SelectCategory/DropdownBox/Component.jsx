import React, { PropTypes } from 'react';
import Panel1st from './Panel1st';
import Panel2nd from './Panel2nd';

const _ = require('lodash');

const propTypes = {
  categories: PropTypes.array.isRequired,
};
class Component extends React.Component {
  constructor(props) {
    super(props);
    this.navigateSubcates = this.navigateSubcates.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.state = {
      pickingParent: false,
      subcates: [],
    };
  }

  navigateSubcates(categoryId) {
    const { categories } = this.props;
    const pickingParent = _.find(categories, c => (c.id === categoryId));
    const subcates = pickingParent.subcates;
    this.setState({ pickingParent, subcates });
  }

  prevPage() {
    this.setState({ pickingParent: false, subcates: [] });
  }

  render() {
    const { categories } = this.props;
    const { pickingParent } = this.state;
    const panel2ndStyle = {
      right: (pickingParent ? 320 : 0),
    };
    return (
      <div styleName="dropdown">
        <div styleName="dropdownBox">
          <div style={{ width: 640 }}>
            <Panel1st
              categories={categories}
              navigateSubcates={this.navigateSubcates}
            />
            <Panel2nd
              categories={this.state.subcates}
              prevPage={this.prevPage}
              style={panel2ndStyle}
            />
          </div>
        </div>
      </div>
    );
  }
}
Component.propTypes = propTypes;
export default Component;

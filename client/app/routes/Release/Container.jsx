import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarNavs from './SidebarNavs';
import MainForm from './MainForm';

const propTypes = {
  environment: PropTypes.object.isRequired,
};
const ReleaseContainer = (props) => {
  const minHeight = props.environment.height - 70;
  const paddingTop = 100;
  return (
    <div className="release-wrapper" style={{ minHeight }} >
      <div className="main" style={{ minHeight, paddingTop, paddingLeft: 50 }}>
        {props.formComponent}
      </div>
      <div className="sidebar-left" style={{ minHeight, paddingTop }}>
        <SidebarNavs />
      </div>
    </div>
  );
};
ReleaseContainer.propTypes = propTypes;
const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(ReleaseContainer);

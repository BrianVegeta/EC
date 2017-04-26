import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarNavs from './SidebarNavs';
import MainForm from './MainForm';

const propTypes = {
  environment: PropTypes.object.isRequired,
};
const ReleaseContainer = (props) => {
  const paddingTop = 170;
  const mainMinHeight = props.environment.height;
  return (
    <div className="release-wrapper" >
      <div
        className="sidebar-left"
        style={{ paddingTop, backgroundColor: '#fff' }}
      >
        <SidebarNavs />
      </div>
      <div className="main" style={{ minHeight: mainMinHeight }} >
        <MainForm />
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

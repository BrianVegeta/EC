import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarNavs from './SidebarNavs';

const propTypes = {
  environment: PropTypes.object.isRequired,
};
const ReleaseContainer = (props) => {
  const wrapperPaddingTop = 70;
  const mainMinHeight = props.environment.height - wrapperPaddingTop;
  return (
    <div className="release-wrapper" style={{ paddingTop: wrapperPaddingTop }} >
      <div className="sidebar-left">
        <SidebarNavs />
      </div>
      <div className="main" style={{ minHeight: mainMinHeight }} >
        <div className="tooltip" />
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

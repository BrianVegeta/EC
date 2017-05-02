import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SidebarNavs from './SidebarNavs';

const propTypes = {
  environment: PropTypes.object.isRequired,
  formComponent: PropTypes.node.isRequired,
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
  const { environment, routesHelper, release } = state;
  return ({ environment, routesHelper, release });
};
export default connect(mapStateToProps)(ReleaseContainer);

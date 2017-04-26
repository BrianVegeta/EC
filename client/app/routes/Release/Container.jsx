import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const propTypes = {
  environment: PropTypes.object.isRequired,
};
const ReleaseContainer = (props) => {
  const paddingTop = 70;
  const mainMinHeight = props.environment.height - paddingTop;
  return (
    <div className="release-wrapper" style={{ paddingTop }} >
      <div className="sidebar-left" />
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

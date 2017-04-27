import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import styles from './container.sass';
import SidebarNavs from './SidebarNavs';

const propTypes = {
  environment: PropTypes.object.isRequired,
  formComponent: PropTypes.node.isRequired,
  release: PropTypes.object.isRequired,
};
const ReleaseContainer = (props) => {
  const minHeight = props.environment.height - 70;
  const paddingTop = 100;
  return (
    <div className="release-wrapper" style={{ minHeight }} >
      <div className="main" style={{ minHeight, paddingTop, paddingLeft: 50 }}>
        <h2 styleName="title">{props.release.currentStep.title}</h2>
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
export default connect(mapStateToProps)(CSS(ReleaseContainer, styles));

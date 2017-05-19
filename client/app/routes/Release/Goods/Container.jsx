import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SidebarNavs from '../SidebarNavs';
import { confirmLeavePage } from '../../../funcs/confirm';

class ReleaseGoods extends React.PureComponent {
  static propTypes = {
    formComponent: PropTypes.node.isRequired,
    environment: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.number, PropTypes.bool,
      ]),
    ).isRequired,
    router: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.array,
      ]),
    ).isRequired,
    route: PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.string,
        PropTypes.number,
      ]),
    ).isRequired,
  };
  componentDidMount() {
    const { router, route } = this.props;
    router.setRouteLeaveHook(route, () => {
      const sureToLeave = confirm('確定離開？您的變更將不會儲存');
      if (sureToLeave) {
        window.removeEventListener('beforeunload', confirmLeavePage);
      }
    });
  }
  render() {
    const FIXED_HEADER_HEIGHT = 70;
    const PADDING_TOP = 100;
    const { environment } = this.props;
    const minHeight = environment.height - FIXED_HEADER_HEIGHT;
    const paddingTop = PADDING_TOP;
    const releaseWrapperStyle = {
      minHeight,
    };
    const mainStyle = {
      minHeight,
      paddingTop,
    };
    const sidebarLeftStyle = {
      minHeight: environment.height,
      paddingTop: PADDING_TOP + FIXED_HEADER_HEIGHT,
    };
    return (
      <div className="release-wrapper" style={releaseWrapperStyle} >
        <div className="main" style={mainStyle} >
          <div className="content-wrapper">
            {this.props.formComponent}
          </div>
        </div>
        <div className="sidebar-left" style={sidebarLeftStyle} >
          <SidebarNavs />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, itemRelease } = state;
  return ({ environment, routesHelper, itemRelease });
};
export default connect(mapStateToProps)(withRouter(ReleaseGoods));

import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import mapper from './mapper';
import Naver from './Naver';

class Sidebar extends React.Component {
  static propTypes = {
    publish: PropTypes.object.isRequired,
  };
  render() {
    const { publish } = this.props;
    return (
      <div styleName="container">
        <ul styleName="list">
          {mapper(publish).map((nav, i) =>
            <li key={`${i + 1}`} styleName="row">
              <Naver nav={nav} />
            </li>,
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper, publish } = state;
  return ({ environment, routesHelper, publish });
};
export default connect(mapStateToProps)(withRouter(CSS(Sidebar, styles)));

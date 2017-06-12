import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import mapper from './mapper';
import Naver from './Naver';

class Sidebar extends React.Component {
  render() {
    return (
      <div styleName="container">
        <ul styleName="list">
          {mapper.map((link, i) =>
            <li key={`${i + 1}`} styleName="row">
              <Naver text={link.text} />
            </li>,
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, routesHelper } = state;
  return ({ environment, routesHelper });
};
export default connect(mapStateToProps)(withRouter(CSS(Sidebar, styles)));

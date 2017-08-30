import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';

import InnerNavigation from 'components/InnerNavigation';
import { my } from 'lib/paths';

import classnames from 'classnames/bind';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Container from '../Container';



const cx = classnames.bind(styles);
class Profile extends React.Component {

  static defaultProps = {
    children: null,
  };

  static propTypes = {
    manage: PropTypes.shape({
      data: PropTypes.object,
    }).isRequired,
    children: myPropTypes.children,
    dispatchChangeData: PropTypes.func.isRequired,
    dispatchReset: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.dispatchChangeData();
    this.props.dispatchReset();
  }

  componentWillUnmount() {
    this.props.dispatchReset();
  }

  render() {
    const {
      manage,
      children,
    } = this.props;

    return (
      <Container titleText="帳號管理" >
        <InnerNavigation
          navs={[
            ['帳號驗證', my.manageVerifyPath],
            ['變更密碼', my.managePasswordChangePath],
          ]}
        />
        <div styleName="form-container">
          {children}
        </div>
      </Container>
    );
  }
}

export default CSS(Profile, styles);

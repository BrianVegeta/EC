import React from 'react';
import myPropTypes from 'propTypes';

import AcccountNav from 'constants/myAccountNavs';
import InnerNavigation from 'components/InnerNavigation';
import { my } from 'lib/paths';

import CSS from 'react-css-modules';
import styles from './styles.sass';
import Container from '../Container';

const titleName = AcccountNav.manageVerify.text;
class Profile extends React.Component {

  static defaultProps = {
    children: null,
  };

  static propTypes = {
    children: myPropTypes.children,
  };

  render() {
    const {
      children,
    } = this.props;

    return (
      <Container titleText={titleName} >
        <div styleName="navigation">
          <InnerNavigation
            navs={[
              ['帳號驗證', my.manageVerifyPath],
              ['變更密碼', my.managePasswordChangePath],
            ]}
          />
        </div>
        {children}
      </Container>
    );
  }
}

export default CSS(Profile, styles);

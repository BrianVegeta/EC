import React from 'react';

import IconPostGoods from 'components/Icons/PostGoods';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Test extends React.Component {
  componentDidMount() {
    // this.setState({ transForm: '' })
  }
  render() {
    return (
      <div styleName="container">
        <IconPostGoods />
      </div>
    );
  }
}

export default CSS(Test, styles);

import React from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Test extends React.Component {
  componentDidMount() {
    // this.setState({ transForm: '' })
  }
  render() {
    return (
      <div styleName="container">test</div>
    );
  }
}

export default CSS(Test, styles);

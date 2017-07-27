import React from 'react';

import IconPostGoods from 'components/Icons/PostGoods';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class Test extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };

    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ isHover: true });
  }

  onMouseLeave() {
    this.setState({ isHover: false });
  }

  render() {
    return (
      <div styleName="container">
        <div
          style={{ marginLeft: 100, marginTop: 100 }}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        >
          <IconPostGoods isHover={this.state.isHover} />
        </div>
      </div>
    );
  }
}

export default CSS(Test, styles);

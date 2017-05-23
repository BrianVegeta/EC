import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import Header from './ListHeader';
import Cards from './ListCards';

const propTypes = {
  type: PropTypes.string.isRequired,
};
class List extends React.Component {
  render() {
    const { type } = this.props;
    return (
      <div>
        <Header {...{ type }} {...this.props} />
        <div styleName="cards">
          <Cards {...{ type }} {...this.props} />
        </div>
      </div>
    );
  }
}
List.propTypes = propTypes;
export default CSS(List, styles);

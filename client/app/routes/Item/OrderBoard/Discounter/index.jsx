import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class Discounter extends React.Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  };
  render() {
    const { text, price } = this.props;
    return (
      <div styleName="container">
        {text}
        <span styleName="price">{price}</span>
      </div>
    );
  }
}

export default CSS(Discounter, styles);

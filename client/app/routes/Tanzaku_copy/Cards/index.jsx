// @author: vincent
import React from 'react';
import Masonry from 'react-masonry-component';
import CSS from 'react-css-modules';
import PropTypes from 'prop-types';
import styles from './styles.sass';
import CardContainer from '../CardContainer';


class Cards extends React.Component {
  static defaultProps = {
    cards: '',
  }
  static propTypes = {
    cards: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  }

  constructor(props) {
    super(props);

    this.state = {
      openModal: false,
    };
  }

  render() {
    const { cards } = this.props;
    return (
      <Masonry styleName="container">
        {cards.map((card, i) =>
          card !== null && <CardContainer card={card} key={`${i + 1}`} />,
        )}
      </Masonry>
    );
  }
}

export default CSS(Cards, styles);

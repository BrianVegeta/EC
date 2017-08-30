// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatCurrency } from 'lib/currency';

import { popupShowWish } from 'actions/popupActions';
import CSS from 'react-css-modules';
import Contact from './Contact';
import Picture from 'components/Picture';

import styles from './styles.sass';


class CardContainer extends React.Component {
  static hasCover(card) {
    return Boolean(card.picture);
  }

  static defaultProps = {
    card: '',
  }

  static propTypes={
    dispatch: PropTypes.func.isRequired,
    card: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  };

  constructor(props) {
    super(props);
    this.showWish = this.showWish.bind(this);
  }

  showWish(card) {
    this.props.dispatch(popupShowWish(card, 600));
  }

  render() {
    const { hasCover } = this.constructor;
    const { card } = this.props;
    return (
      <div styleName="container">
        <div styleName="card-block">
          <div styleName="card">
            { hasCover(card) &&
            <button
              className="button"
              onClick={() => this.showWish(card)}
              styleName="coverPicture"
            >
              <Picture
                src={card.picture}
                style={{ borderRadius: '5px 5px 0 0',
                  backgroundSize: 'contain',
                  backgroundColor: 'white' }}
              />
            </button> }
            <div styleName={hasCover(card) ? 'cardBodyHalf' : 'cardBodyFull'} >
              <button
                className="button"
                onClick={() => this.showWish(card)}
              >
                <h3 styleName="title">
                  {card.pname}
                </h3>
              </button>
              { card.description &&
                <div styleName="description">{card.description}</div> }
              <div styleName="expprice">預算{formatCurrency(card.expprice)}</div>
              <div styleName="cardFooter">
                <Contact avatarSrc={card.user_img} username={card.user_name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment } = state;
  return ({ environment });
};
export default connect(mapStateToProps)(CSS(CardContainer, styles));

import React, { PropTypes } from 'react';
import Masonry from 'react-masonry-component';
import cards from './sample';

class Cards extends React.Component {

  static hasCover(card) {
    return Boolean(card.coverSrc);
  }

  static rCardBgStyle(card) {
    return { backgroundImage: `url(${card.coverSrc})` };
  }

  render() {
    const { hasCover, rCardBgStyle } = this.constructor;
    return (
      <Masonry styleName="container">
        {cards.map((card, i) =>
          <div key={`${i + 1}`} styleName="card-block">
            <div styleName="card">
              { hasCover(card) &&
                <div styleName="cover" style={rCardBgStyle(card)} /> }
              <div styleName={hasCover(card) ? 'cardBodyHalf' : 'cardBodyFull'} >
                <h3 styleName="title">{card.title}</h3>
                { card.description &&
                  <div styleName="description"> {card.description}</div> }
                <div styleName="lastDay">使用天數 {card.lastDayCount}天</div>
                <div styleName="cardFooter">
                  <div styleName="ownBy"></div>
                </div>
              </div>
            </div>
          </div>,
        )}
      </Masonry>
    );
  }
}

export default Cards;

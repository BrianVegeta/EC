import React from 'react';
import PropTypes from 'prop-types';
import CSS from 'react-css-modules';
import styles from './styles.sass';

class CollectButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStatus: 'pending',
      isSaving: false,
    };
    this.collecting = this.collecting.bind(this);
    this.mouseOverToCancel = this.mouseOverToCancel.bind(this);
    this.mouseOutToCollected = this.mouseOutToCollected.bind(this);
    this.cancelToPending = this.cancelToPending.bind(this);
    this.pending = this.pending.bind(this);

    this.iconHeartO = <i className="fa fa-heart-o" />;
    this.iconHeart = <i className="fa fa-heart" />;
    this.iconHeartBeat = <i className="fa fa-heartbeat" />;
  }

  cancelToPending() {
    setTimeout(this.pending, 1000);
    this.setState({ isSaving: true });
  }

  collecting() {
    setTimeout(() => this.collected(), 1000);
    this.setState({ isSaving: true });
  }

  pending() {
    this.setState({ btnStatus: 'pending', isSaving: false });
  }

  collected() {
    this.setState({ btnStatus: 'collected', isSaving: false });
  }

  mouseOverToCancel() {
    this.setState({ btnStatus: 'toCancel' });
  }

  mouseOutToCollected() {
    this.setState({ btnStatus: 'collected' });
  }

  switchButtonRender() {
    switch (this.state.btnStatus) {
      case 'collected': return this.renderCollected();
      case 'toCancel': return this.renderToCancel();
      default: return this.renderToCollect();
    }
  }

  renderToCancel() {
    const { isSaving } = this.state;
    return (
      <button
        styleName="collected-btn"
        onMouseOut={!isSaving && this.mouseOutToCollected}
        onClick={this.cancelToPending}
      >
        <div styleName="content">
          <div styleName="icon">{this.iconHeartBeat}</div>
          <div styleName="text">取消收藏</div>
        </div>
      </button>
    );
  }

  renderToCollect() {
    return (
      <button styleName="pending-btn" onClick={this.collecting} >
        <div styleName="content">
          <div styleName="icon">{this.iconHeartO}</div>
          <div styleName="text">收藏此物品</div>
        </div>
      </button>
    );
  }

  renderCollected() {
    const { isSaving } = this.state;
    return (
      <button styleName="collected-btn" onMouseOver={!isSaving && this.mouseOverToCancel} >
        <div styleName="content">
          <div styleName="icon">{this.iconHeart}</div>
          <div styleName="text">已收藏</div>
        </div>
      </button>
    );
  }

  render() {
    const { isSaving } = this.state;
    return (
      <div styleName="container">
        { this.switchButtonRender() }
        { isSaving && <div styleName="collecting-layer" /> }
      </div>
    );
  }
}
export default CSS(CollectButton, styles);

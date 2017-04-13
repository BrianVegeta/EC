import React, { PropTypes } from 'react';

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
  }

  cancelToPending() {
    setTimeout(() => {
      this.setState({ btnStatus: 'pending', isSaving: false });
    }, 1000);
    this.setState({ isSaving: true });
  }

  collecting() {
    setTimeout(() => this.collected(), 1000);
    this.setState({ isSaving: true });
  }

  collected() {
    this.setState({
      btnStatus: 'collected',
      isSaving: false,
    });
  }

  mouseOverToCancel() {
    this.setState({ btnStatus: 'toCancel' });
  }

  mouseOutToCollected() {
    this.setState({ btnStatus: 'collected' });
  }

  switchButtonRender() {
    switch (this.state.btnStatus) {
      case 'collected':
        return this.renderCollected();
      case 'toCancel':
        return this.renderToCancel();
      default:
        return this.renderToCollect();
    }
  }

  renderToCancel() {
    return (
      <button
        styleName="collected-btn"
        onMouseOut={this.mouseOutToCollected}
        onClick={this.cancelToPending}
      >
        <div styleName="content">
          <div styleName="icon">
            <i className="fa fa-heartbeat" />
          </div>
          <div styleName="text">取消收藏</div>
        </div>
      </button>
    );
  }

  renderToCollect() {
    return (
      <button styleName="pending-btn" onClick={this.collecting} >
        <div styleName="content">
          <div styleName="icon">
            <i className="fa fa-heart-o" />
          </div>
          <div styleName="text">收藏此物品</div>
        </div>
      </button>
    );
  }

  renderCollected() {
    return (
      <button styleName="collected-btn" onMouseOver={this.mouseOverToCancel} >
        <div styleName="content">
          <div styleName="icon">
            <i className="fa fa-heart" />
          </div>
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
export default CollectButton;

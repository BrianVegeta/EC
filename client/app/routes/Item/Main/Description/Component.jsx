import React, { PropTypes } from 'react';
import Truncate from 'react-text-truncate';

const propTypes = {
  description: PropTypes.string.isRequired,
};
class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDescriptExpened: false,
    };
    this.expandDescripton = this.expandDescripton.bind(this);
  }

  expandDescripton() {
    this.setState({ isDescriptExpened: true });
  }

  renderExpendButton() {
    return (
      <button styleName="showall-btn" onClick={this.expandDescripton}>
        <span styleName="showall-text">顯示全部描述</span>
      </button>
    );
  }

  renderTruncated() {
    const { description } = this.props;
    return (
      <Truncate
        line={3}
        truncateText="…"
        text={description}
      />
    );
  }

  render() {
    const { description } = this.props;
    const { isDescriptExpened } = this.state;
    return (
      <div styleName="container">
        <div styleName="header">
          <h2>物品描述</h2>
        </div>
        <div styleName="body">
          { isDescriptExpened ? description : this.renderTruncated() }
        </div>
        <div styleName="footer">
          { !isDescriptExpened && this.renderExpendButton() }
        </div>
      </div>
    );
  }
}
Description.propTypes = propTypes;
export default Description;

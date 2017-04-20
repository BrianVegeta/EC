import React, { PropTypes } from 'react';
// import TextTruncate from 'react-text-truncate';
import Truncate from 'react-truncate';
import { gBackgroundImage } from '../../../../../funcs/styles';
import styles from './styles.sass';

const propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.displayMore = this.displayMore.bind(this);
    this.state = {
      isCollapse: true,
    };
  }

  rContentHeader() {
    const { name, createdAt } = this.props;
    return (
      <div styleName="content-header">
        <span styleName="name">{name}</span>
        <span styleName="relative-time">{createdAt}</span>
      </div>
    );
  }

  displayMore() {
    this.setState({ isCollapse: false });
  }

  rReadMore() {
    return (
      <span>
        ...
        <button
          className={styles.displayMore}
          onClick={this.displayMore}
        >
          顯示更多
        </button>
      </span>
    );
  }

  rShortenText() {
    const { text } = this.props;
    return text.split('\n').slice(0, 3).map((lineText, i, arr) => {
      const line = <span key={`${i + 1}_line`}>{lineText}</span>;
      if (i === arr.length - 1) {
        return [line, this.rReadMore()];
      }
      return [line, <br key={`${i + 1}_br`} />];
    });
  }

  rAllText() {
    const { text } = this.props;
    return text.split('\n').map((lineText, i, arr) => {
      const line = <span key={`${i + 1}_line`}>{lineText}</span>;
      if (i === arr.length - 1) {
        return line;
      }
      return [line, <br key={`${i + 1}_br`} />];
    });
  }

  render() {
    return (
      <div styleName="container">
        <div
          styleName="avatar"
          style={gBackgroundImage(this.props.avatarSrc)}
        />
        <div styleName="content-wrapper">
          {this.rContentHeader()}
          <div styleName="content-textarea">
            {
              this.state.isCollapse ?
              this.rShortenText() :
              this.rAllText()
            }
          </div>
        </div>
      </div>
    );
  }
}
Comment.propTypes = propTypes;
export default Comment;

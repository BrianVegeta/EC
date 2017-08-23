import React from 'react';
import PropTypes from 'prop-types';
// import TextTruncate from 'react-text-truncate';
// import Truncate from 'react-truncate';
import styles from './styles.sass';
import Avatar from 'components/Avatar';
import moment from 'moment';
import 'moment/locale/zh-tw';


class Comment extends React.Component {
  static propTypes = {
    avatarSrc: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    // this.displayMore = this.displayMore.bind(this);
    this.state = {
      isCollapse: true,
    };
  }

  rContentHeader() {
    const { name, createdAt } = this.props;
    return (
      <div styleName="content-header">
        <div styleName="name">{name}</div>
        <div styleName="relative-time">{moment(createdAt).fromNow()}</div>
      </div>
    );
  }

  // displayMore() {
  //   this.setState({ isCollapse: false });
  // }

  // rReadMore() {
  //   return (
  //     <span>
  //       ...
  //       <button
  //         className={styles.displayMore}
  //         onClick={this.displayMore}
  //       >
  //         顯示更多
  //       </button>
  //     </span>
  //   );
  // }

  // rShortenText() {
  //   const { text } = this.props;
  //   return text.split('\n').slice(0, 3).map((lineText, i, arr) => {
  //     const line = <span key={`${i + 1}_line`}>{lineText}</span>;
  //     if (i === arr.length - 1) {
  //       return [line, this.rReadMore()];
  //     }
  //     return [line, <br key={`${i + 1}_br`} />];
  //   });
  // }
  //
  // rAllText() {
  //   const { text } = this.props;
  //   return text.split('\n').map((lineText, i, arr) => {
  //     const line = <span key={`${i + 1}_line`}>{lineText}</span>;
  //     if (i === arr.length - 1) {
  //       return line;
  //     }
  //     return [line, <br key={`${i + 1}_br`} />];
  //   });
  // }

  render() {
    const { text } = this.props;
    return (
      <div styleName="container">
        <div styleName="profile">
          <div styleName="image">
            <Avatar src={this.props.avatarSrc} width={50} height={50} />
          </div>
          {this.rContentHeader()}
        </div>
        <div styleName="content-wrapper">
          <div styleName="content-textarea">
            {text}
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;

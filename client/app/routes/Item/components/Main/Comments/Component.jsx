import React from 'react';
import PropTypes from 'prop-types';
import CommentRow from './CommentRow';
import CommentBox from './CommentBox';

class Comments extends React.Component {


  static propTypes = {
    isPaginable: PropTypes.bool.isRequired,
    isLogin: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatchRecords: PropTypes.func.isRequired,
    dispatchAddMessage: PropTypes.func.isRequired,
  };

  rloadMoreBtn() {
    return (
      <button
        styleName="morebtn"
        className="button"
        onClick={this.props.dispatchRecords}
      >
        查看更多留言
      </button>
    );
  }

  render() {
    const { comments, isPaginable, dispatchAddMessage, isLogin } = this.props;
    // console.log(this.props);
    return (
      <div styleName="container">
        <h2 styleName="title">公開留言</h2>
        <CommentBox dispatchAddMessage={dispatchAddMessage} isLogin={isLogin} />
        <div styleName="comments">
          {comments.map((comment, i) => {
            const props = {
              avatarSrc: comment.user_image,
              name: comment.user_name,
              createdAt: comment.create_time,
              text: comment.message,
            };
            return (
              <CommentRow
                key={`${comment.user_name}_${i + 1}`}
                {...props}
              />
            );
          })}
          {isPaginable && this.rloadMoreBtn()}
        </div>
      </div>
    );
  }
}
export default Comments;

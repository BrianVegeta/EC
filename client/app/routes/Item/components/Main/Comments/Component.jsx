import React from 'react';
import PropTypes from 'prop-types';
import CommentRow from './CommentRow';
import CommentBox from './CommentBox';

const fakerComment = {
  avatarSrc: 'https://www.meionorte.com/uploads/pagina/2016/3/31/avatar-kate-hudson-dd704d2b-2cc3-4fd8-9f6d-1415f23a43a3.jpg',
  name: '陳小明',
  createdAt: '23分鐘前',
  text: '有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？\n有沒有更清楚的規格可以看？\n有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？\n有沒有更',
};
class Comments extends React.Component {
  static defaultProps = {
    comments: PropTypes.array,
  }

  constructor(props) {
    super(props);
    const { comments } = this.props;
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      comments: comments.map(comment => comment),
    };
    this.loadMore = this.loadMore.bind(this);
  }

  loadMore(lastIndex = 0) {
    const { comments } = this.state;
    this.setState({
      comments: comments.concat(comments.slice(lastIndex)),
    });
  }

  rloadMoreBtn() {
    return (
      <button
        styleName="morebtn"
        className="button"
        onClick={this.loadMore}
      >
        查看更多留言
      </button>
    );
  }

  render() {
    const { comments } = this.state;
    return (
      <div styleName="container">
        <h2 styleName="title">公開留言</h2>
        <div styleName="comments">
          {comments.map((comment, i) => {
            const props = {
              avatarSrc: comment.user_img,
              name: comment.user_name,
              createdAt: comment.create_time,
              text: comment.comment,
            };
            return (
              <CommentRow
                key={`${comment.user_name}_${i + 1}`}
                {...props}
              />
            );
          })}
          {this.rloadMoreBtn()}
        </div>
        <CommentBox />
      </div>
    );
  }
}
export default Comments;

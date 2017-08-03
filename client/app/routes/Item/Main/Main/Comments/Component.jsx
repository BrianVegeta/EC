import React, { PropTypes } from 'react';
import CommentRow from './CommentRow';
import CommentBox from './CommentBox';

const fakerComment = {
  avatarSrc: 'https://www.meionorte.com/uploads/pagina/2016/3/31/avatar-kate-hudson-dd704d2b-2cc3-4fd8-9f6d-1415f23a43a3.jpg',
  name: '陳小明',
  createdAt: '23分鐘前',
  text: '有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？\n有沒有更清楚的規格可以看？\n有沒有更清楚的規格可以看？有沒有更清楚的規格可以看？\n有沒有更',
};
class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.state = {
      comments: [1, 2, 3, 4].map(() => fakerComment),
    };
  }

  loadMore() {
    const { comments } = this.state;
    this.setState({
      comments: comments.concat([1, 2, 3, 4].map(() => fakerComment)),
    });
  }

  rloadMoreBtn() {
    return (
      <button
        styleName="morebtn"
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
        <h2 styleName="title">公開留言 | 86則</h2>
        <div styleName="comments">
          {comments.map((comment, i) => {
            const { avatarSrc, name, createdAt, text } = comment;
            return (
              <CommentRow
                key={`${comment.name}_${i + 1}`}
                {...{ avatarSrc, name, createdAt, text }}
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

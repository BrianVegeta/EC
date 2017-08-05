import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import Container from '../components/Container';

class CommentContainer extends React.Component {

  static propTypes = {
    comment: PropTypes.shape({
      records: PropTypes.array.isRequired,
    }).isRequired,
  };

  render() {
    console.log(this.props);
    const { comment } = this.props;
    return (
      <Container titleText={'評價'}>
        {comment.records.map(commentItem => (
          <div>{commentItem.comments}</div>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const { environment, comment } = state;
  return ({ environment, comment });
};
export default connect(mapStateToProps)(CommentContainer);

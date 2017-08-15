import React from 'react';
import ReleaseEnterModal from '../../ReleaseEnterModal';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.openChoosingModal = this.openChoosingModal.bind(this);
    this.closeChoosingModal = this.closeChoosingModal.bind(this);
    this.state = {
      isChoosing: false,
    };
  }
  openChoosingModal() {
    this.setState({ isChoosing: true });
  }
  closeChoosingModal() {
    this.setState({ isChoosing: false });
  }
  render() {
    return (
      <div>
        <button className="button" onClick={this.openChoosingModal}>發佈</button>
        { this.state.isChoosing && <ReleaseEnterModal onClose={this.closeChoosingModal} /> }
      </div>
    );
  }
}

export default Post;

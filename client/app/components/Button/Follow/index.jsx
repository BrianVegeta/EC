import React from 'react';
import PropTypes from 'prop-types';

import ThreeBounce from 'components/Loading/ThreeBounce';

import classnames from 'classnames/bind';
import styles from './styles.sass';

import { addFollowAction, removeFollowAction } from 'actions/module/followActions';

const cx = classnames.bind(styles);
class Follow extends React.Component {

  static defaultProps = {
    isActive: false,
  };

  static propTypes = {
      target_uid: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
      super(props);
      this.state = { 
        isActive: this.props.isActive,
        isLoading: false,
      }
      
      
      this.addFollow = this.addFollow.bind(this);
      this.waiting = this.waiting.bind(this);
      this.addDone = this.addDone.bind(this);
   
      this.removeFollow = this.removeFollow.bind(this);
      this.removeDone = this.removeDone.bind(this);

  }
  
  addFollow() {
     this.props.dispatch(
        addFollowAction(this.props.target_uid, this.waiting, this.addDone),
     );
  }
  
  waiting() {
     this.setState({
       isLoading: true
     });
     
  }
  
  addDone() {
 
    this.setState({
      isActive: true,
      isLoading: false,
    }); 
  }
  
  removeFollow() {
      this.props.dispatch(
        removeFollowAction(this.props.target_uid, this.waiting, this.removeDone),
      );
  }
  
  removeDone(){
    this.setState({
      isActive: false,
      isLoading: false,
    });       
  }
  
  
  render() {
    return (
        <button 
            className="default-button" 
            onClick={this.state.isActive ? this.removeFollow : this.addFollow}
            >+&nbsp;{this.state.isActive ? '已追蹤' : '追蹤' }
        </button>
    );
  }
}

export default Follow;

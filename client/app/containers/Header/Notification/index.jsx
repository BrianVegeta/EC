import React from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from 'components/Loading/MDSpinner';
import CSS from 'react-css-modules';
import styles from './styles.sass';
import myPropTypes from '../../../propTypes';
import Model from './Model';
import ModelRow from './ModelRow';

class Notification extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    notification: myPropTypes.notification.isRequired,
  };
  componentDidMount() {
    const { notification, dispatch } = this.props;
    const model = new Model(notification, dispatch);
    model.getNotitications();
  }
  render() {
    const { notification, dispatch } = this.props;
    const { boxItems } = new Model(notification, dispatch);
    return (
      <div styleName="container">
        <div styleName="inner">
          {boxItems.length === 0 && <LoadingSpinner /> }
          {boxItems.map((item) => {
            const itemModel = new ModelRow(item, dispatch);
            return (
              <div
                key={item.id}
                styleName="card">
                <div styleName="title"></div>
                <div styleName="content">{itemModel.description}</div>
                <div styleName="created">{itemModel.created}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default CSS(Notification, styles);

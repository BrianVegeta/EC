import React, { PropTypes } from 'react';
import CSS from 'react-css-modules';
import EditIcon from 'react-icons/lib/md/edit';
import RemoveIcon from 'react-icons/lib/go/trashcan';
import styles from './styles.sass';
import { DROPBOX_SIZE } from '../../../../../constants/coverCropper';

class ThumbDropped extends React.Component {
  static defaultProps = {
    coverLabel: null,
  };
  static propTypes = {
    coverLabel: PropTypes.node,
    coverUrl: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };
  render() {
    const { coverUrl, onEdit, onRemove } = this.props;
    const iconProps = { size: 16, color: '#fff', style: { display: 'block' } };
    return (
      <div
        styleName="imageDropped"
        style={{
          backgroundImage: `url(${coverUrl})`,
          width: DROPBOX_SIZE,
          height: DROPBOX_SIZE,
        }}
      >
        {this.props.coverLabel}
        <div styleName="ctrlGroups" >
          <button className="button" styleName="ctrlIcon" onClick={onEdit} >
            <EditIcon {...iconProps} />
          </button>
          <button className="button" styleName="ctrlIcon" onClick={onRemove} >
            <RemoveIcon {...iconProps} />
          </button>
        </div>
      </div>
    );
  }
}

export default CSS(ThumbDropped, styles);

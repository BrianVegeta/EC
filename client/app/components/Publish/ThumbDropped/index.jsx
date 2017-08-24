import React from 'react';
import PropTypes from 'prop-types';
import EditIcon from 'react-icons/lib/md/edit';
import RemoveIcon from 'react-icons/lib/go/trashcan';

import Picture from 'components/Picture';
import { DROPBOX_SIZE } from 'constants/coverCropper';

import CSS from 'react-css-modules';
import styles from './styles.sass';

class ThumbDropped extends React.Component {
  static defaultProps = {
    coverLabel: null,
    coverUrl: null,
  };
  static propTypes = {
    coverLabel: PropTypes.node,
    coverUrl: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };
  render() {
    const { coverUrl, onEdit, onRemove, coverLabel } = this.props;
    const iconProps = { size: 16, color: '#fff', style: { display: 'block' } };
    return (
      <div
        styleName="imageDropped"
        style={{ width: DROPBOX_SIZE, height: DROPBOX_SIZE }}
      >
        <Picture src={coverUrl} />
        {coverLabel}
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

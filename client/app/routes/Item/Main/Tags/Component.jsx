import React from 'react';
import PropTypes from 'prop-types';

const propTypes = { tags: PropTypes.arrayOf(PropTypes.string).isRequired };
const Tags = props => (
        <div styleName="container">
        {props.tags.map((tag, i) =>
            <div key="{i}" styleName="label-block">
              <div styleName="label">
                  <div styleName="text">{tag}</div>
              </div>
            </div>
        )}
        </div>
);
Tags.propTypes = propTypes;
export default Tags;

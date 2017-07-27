import React from 'react';
import PropTypes from 'prop-types';

class IconPostGoods extends React.Component {

  static defaultProps = {
    isHover: false,
  };

  static propTypes = {
    isHover: PropTypes.bool.isRequired,
  };

  render() {
    return (
      <svg width="34px" height="30px" viewBox="0 0 34 30" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="切圖" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
          <g id="Artboard" transform="translate(-5.000000, -6.000000)">
            <g id="Group-22">
              <rect id="Container" x={0} y={0} width={43} height={43} />
              <g
                id="Group-2"
                transform="translate(6.000000, 6.000000)"
                stroke={this.props.isHover ? '#777' : '#999'}
                strokeWidth="1.45454545"
              >
                <rect id="Rectangle-2" x="1.34265734" y="11.9946178" width="29.3146853" height="17.2781095" rx="3.41364296" />
                <path
                  d="M4.50039123e-15,6.85973881 C5.18193947e-15,5.84540597 0.823173046,5.02312673 1.84706578,5.02312673 L30.1529342,5.02312673 C31.1730405,5.02312673 32,5.83974896 32,6.85973881 L32,13.5935452 C32,14.607878 31.1837502,15.536236 30.1627722,15.668921 L17.8213239,17.2727996 C16.806651,17.4046652 15.1694674,17.4054846 14.150517,17.2727996 L1.83357906,15.668921 C0.820921306,15.5370554 -7.09522109e-16,14.613535 -2.4172825e-17,13.5935452 L4.50039123e-15,6.85973881 Z"
                  id="Rectangle-2"
                  fill={this.props.isHover ? '#31ABBA' : '#FDB485'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  id="Rectangle"
                  fill={this.props.isHover ? '#F0EFEF' : '#333'}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  x="13.3846154"
                  y="14.3894542"
                  width="5.53846154"
                  height="5.61979648"
                  rx="1.23076923"
                />
                <path d="M9.35319296,4.47545214 L9.34243472,4.04074855 C9.34265734,2.21774778 10.813089,0.727272727 12.6173498,0.727272727 L19.9980348,0.727272727 C21.8026059,0.727272727 23.2727273,2.21940838 23.2727273,4.05874191 L23.2637053,4.47545214 L9.35319296,4.47545214 Z" id="Rectangle-4" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default IconPostGoods;

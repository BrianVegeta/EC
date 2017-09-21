import React from 'react';
import PropTypes from 'prop-types';
import myPropTypes from 'propTypes';


class IconAppeal extends React.Component {

  static defaultProps = {
    style: {},
    size: 24,
  };

  static propTypes = {
    style: myPropTypes.style,
    size: PropTypes.number,
  };

  render() {
    const { style, size } = this.props;
    return (
      <svg
        width={`${size}px`}
        height={`${size}px`}
        style={style}
        viewBox="0 0 36 36"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(-393.000000, -195.000000)" stroke="#FFFFFF">
            <g id="Group" transform="translate(370.000000, 180.000000)">
              <g id="ic_orderdetail" transform="translate(24.000000, 16.000000)">
                <g
                  transform="translate(9.000000, 8.000000)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    d="M10.2348633,1 L14,1 L14,3.796875 M14,12.3348389 L14,18 L0,18 L0,1 L3.93115234,1"
                    strokeWidth="1.5"
                  />
                  <path d="M3,7 L9,7" strokeWidth="1.5" />
                  <path d="M3,11 L9.51999998,11" id="Line" strokeWidth="1.5" />
                  <rect strokeWidth="1.5" x="4.25" y="0.25" width="5.5" height="2.5" />
                  <path
                    d="M12,2.00312478 C12,0.896829513 12.8877296,4.08562073e-14 14,4.08562073e-14 L14,4.08562073e-14 C15.1045695,4.08562073e-14 16,0.896634189 16,2.00312478 L16,12.4675325 L14,16 L12,12.4675325 L12,2.00312478 Z"
                    strokeWidth="1.2"
                    transform="translate(14.000000, 8.000000) rotate(30.000000) translate(-14.000000, -8.000000) "
                  />
                </g>
                <circle id="Oval-7" cx="17" cy="17" r="17" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    );
  }
}

export default IconAppeal;

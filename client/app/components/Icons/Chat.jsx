// @author: vincent
import React from 'react';
import PropTypes from 'prop-types';

class Chat extends React.Component {
  static defaultProps = {
    width: 200,
    height: 200,
    color: '#B3B4B4',
    background: '#fff',
  }

  static propTypes = {
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    color: PropTypes.string,
    background: PropTypes.string,
  }

  render() {
    const { width, height, color, background } = this.props;
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 500 500"
        width={`${width}px`}
        height={`${height}px`}
      >
        <g>
          <g>
            <path fill={color} d="M17.4,206.7c0,4,3.3,7.3,7.3,7.3H49v-17H17.4L17.4,206.7z" />
          </g>
          <g>
            <path
              fill={color}
              d="M42.3,185.2l-2.4-1.7l-5.9-4.3l-2.5-1.8l1.8-2.4l4.8-6.5c-4.1-1.6-7.3-5.1-8.5-9.4h-4.8c-4,0-7.3,3.3-7.3,7.3
              l0,20.6H49v-10.9l-5,6.8L42.3,185.2z"
            />
          </g>
          <g>
            <path
              fill={color}
              d="M83.3,159.1h-4.8c-1.2,4.4-4.4,7.9-8.6,9.5l4.7,6.4l1.8,2.4l-2.5,1.8l-5.9,4.3l-2.4,1.7l-1.8-2.4l-4.9-6.7
              V187h31.6v-20.6C90.6,162.4,87.3,159.1,83.3,159.1z"
            />
          </g>
          <g>
            <path fill={color} d="M59,214h24.3c4,0,7.3-3.3,7.3-7.3V197H59V214z" />
          </g>
          <g>
            <path
              fill={color}
              d="M65.2,144.6C65.2,144.6,65.2,144.6,65.2,144.6C65.2,144.6,65.2,144.6,65.2,144.6c-0.1,0-0.2,0-0.3,0
              c-0.3,0-0.7,0-1,0.1c-0.2,0-0.4,0.1-0.7,0.1c-0.2,0-0.3,0.1-0.5,0.1c-0.3,0.1-0.5,0.1-0.8,0.2c-0.1,0-0.1,0-0.2,0
              c-2.4,0.8-4.5,2.3-5.9,4.4l-1.8,2.5l-1.6-2.2c-1.5-2.4-3.8-4.1-6.5-4.8c-0.1,0-0.1,0-0.2,0c-0.4-0.1-0.7-0.2-1.1-0.2
              c-0.1,0-0.2,0-0.2,0c-0.4-0.1-0.9-0.1-1.3-0.1c0,0,0,0,0,0c0,0,0,0,0,0c-6.1,0-11,4.9-11,11c0,0,0,0,0,0c0,0,0,0,0,0
              c0,0.3,0,0.6,0,0.9c0,0,0,0,0,0c0.1,0.9,0.3,1.8,0.6,2.7c1.5,4.3,5.6,7.4,10.4,7.4c0.1,0,0.2,0,0.2,0l-7.6,10.3l5.9,4.3l12.3-16.8
              l12.3,16.8l5.9-4.3l-7.6-10.3c0.1,0,0.2,0,0.3,0c4.8,0,8.9-3.1,10.4-7.4c0.4-1.1,0.6-2.4,0.6-3.6
              C76.2,149.5,71.3,144.6,65.2,144.6z M43.2,159.2c-2,0-3.7-1.6-3.7-3.7c0-2,1.6-3.7,3.7-3.7s3.7,1.6,3.7,3.7
              C46.9,157.6,45.2,159.2,43.2,159.2z M65.2,159.2c-2,0-3.7-1.6-3.7-3.7c0-2,1.6-3.7,3.7-3.7s3.7,1.6,3.7,3.7
              C68.8,157.6,67.2,159.2,65.2,159.2z"
            />
          </g>
        </g>
        <g>
          <line fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="172" y1="289.5" x2="204" y2="206.5" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M213.4,188.9c0,0-3.1,3-5.4,7.6c-1,2-3.6,9.3-3.6,9.3" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M221.1,201.8c0,0-0.8,1.9-4.7,3.5c-5.4,2.3-12.1,0.5-12.1,0.5" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M195.2,191.2c0,0-0.2,3.2,1.4,7.1c1.7,3.9,7.8,7.5,7.8,7.5" />
        </g>
        <g>
          <path
            fill={color}
            d="M219.8,102.8c-16.8,0-30.5,13.7-30.5,30.5c0,16.8,13.7,30.5,30.5,30.5s30.5-13.7,30.5-30.5
            C250.3,116.4,236.7,102.8,219.8,102.8z M223.6,149.2v5h-7v-5.1c-4.5-1-8.3-3.8-8.6-8.9h5.1c0.3,2.8,2.1,4.9,7,4.9
            c5.2,0,6.3-2.6,6.3-4.2c0-2.2-1.2-4.2-7-5.6c-6.5-1.6-11-4.2-11-9.6c0-4.5,3.6-7.4,8.2-8.4v-5h7v5.1c4.9,1.2,7.3,4.9,7.5,8.9h-5.2
            c-0.1-2.9-1.7-4.9-5.8-4.9c-3.9,0-6.3,1.8-6.3,4.3c0,2.2,1.7,3.6,7,5c5.3,1.4,11,3.6,11,10.3C231.7,145.7,228.1,148.4,223.6,149.2z
            "
          />
        </g>
        <g>
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M221,169.5c0,0,2,7,12,12c10.5,5.2,22,4,22,4" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M219,154.5c0,0-1,1.9-1,6c0,5,3,9,3,9" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M207,159.5c0,0,0,2,3,5c4.1,4.1,11,5,11,5" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M235,159.5c0,0-1,3-4,6s-10,4-10,4" />
        </g>
        <g>
          <path
            fill={background}
            d="M363.9,323.9c-0.7,0-1.4-0.2-2-0.5c-1.4-0.8-2.2-2.4-2-4l3.6-29.7c-60.9-0.5-110.3-41.9-110.3-92.6
            c0-51.1,50-92.6,111.5-92.6s111.5,41.5,111.5,92.6c0,14-3.7,27.4-10.9,40c-5.4,9.4-12.6,17.8-21.4,25.2c-1.7,1.5-3.6,2.9-5.5,4.3
            L366.3,323C365.6,323.6,364.8,323.9,363.9,323.9z"
          />
          <path
            fill={color}
            d="M364.7,108.5c59.4,0,107.5,39.7,107.5,88.6c0,13.6-3.7,26.5-10.4,38c-5.2,9-12.2,17.2-20.5,24.2
            c-1.7,1.4-3.5,2.8-5.3,4.1l-72.2,56.5l4.2-34.2c-1.1,0-2.2,0-3.3,0c-59.4,0-107.5-39.7-107.5-88.6
            C257.2,148.2,305.4,108.5,364.7,108.5 M364.7,100.5c-30.6,0-59.4,9.9-81.1,27.8c-22.2,18.3-34.4,42.7-34.4,68.8
            s12.2,50.5,34.4,68.8c20.4,16.8,47,26.5,75.4,27.7l-3.1,25.3c-0.4,3.2,1.2,6.3,4,7.9c1.2,0.7,2.6,1,3.9,1c1.8,0,3.5-0.6,4.9-1.7
            l72.1-56.4c1.9-1.4,3.8-2.9,5.6-4.4c9.2-7.7,16.7-16.5,22.3-26.3c7.6-13.1,11.4-27.3,11.4-42c0-26.1-12.2-50.5-34.4-68.8
            C424.1,110.4,395.3,100.5,364.7,100.5L364.7,100.5z"
          />
        </g>
        <g>
          <ellipse fill={color} cx="299.6" cy="206.8" rx="8.2" ry="8" />
        </g>
        <g>
          <ellipse fill={color} cx="383" cy="206.8" rx="8.2" ry="8" />
        </g>
        <g>
          <g>
            <path
              fill={background}
              d="M138.4,429.5c-0.9,0-1.7-0.3-2.5-0.8l-72.1-56.5c-1.9-1.4-3.7-2.8-5.4-4.3c-8.8-7.4-16-15.9-21.4-25.2
              c-7.2-12.5-10.9-26-10.9-40c0-51.1,50-92.6,111.5-92.6S249,251.7,249,302.7c0,50.7-49.4,92-110.3,92.6l3.6,29.7
              c0.2,1.6-0.6,3.2-2,4C139.7,429.3,139,429.5,138.4,429.5z"
            />
            <path
              fill={color}
              d="M137.5,214.1c59.4,0,107.5,39.7,107.5,88.6c0,48.9-48.1,88.6-107.5,88.6c-1.1,0-2.2,0-3.3,0l4.2,34.2
              L66.2,369c-1.8-1.3-3.6-2.7-5.3-4.1c-8.4-7-15.3-15.2-20.5-24.2c-6.6-11.5-10.4-24.4-10.4-38C30,253.8,78.1,214.1,137.5,214.1
              M137.5,206.1c-30.6,0-59.4,9.9-81.1,27.8C34.2,252.2,22,276.6,22,302.7c0,14.7,3.8,28.8,11.4,42c5.6,9.8,13.1,18.6,22.3,26.3
              c1.8,1.5,3.7,3,5.6,4.4l72.1,56.4c1.4,1.1,3.2,1.7,4.9,1.7c1.4,0,2.7-0.3,3.9-1c2.8-1.6,4.4-4.7,4-7.9l-3.1-25.3
              c28.4-1.2,55-10.9,75.4-27.7c22.2-18.3,34.4-42.7,34.4-68.8s-12.2-50.5-34.4-68.8C196.9,216,168.1,206.1,137.5,206.1L137.5,206.1z
              "
            />
          </g>
          <g>
            <ellipse fill={color} cx="210.4" cy="283.2" rx="8.2" ry="8" />
          </g>
          <g>
            <ellipse fill={color} cx="127" cy="283.2" rx="8.2" ry="8" />
          </g>
          <path fill="#FFFFFF" stroke={color} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M191.6,314.2l-1.5,0.8c-9.4,5.1-20.4,5.9-30.4,2.2l-8.2-3" />
        </g>
        <g>
          <path
            fill={background}
            d="M339.6,260.7c-1.3,0-2.6-0.1-4-0.3c-18.2-2.3-20.6-27.6-20.7-28.7c-0.1-1,0.3-1.9,1.1-2.6
            c0.5-0.5,1.2-0.7,1.9-0.7c0.3,0,0.5,0,0.8,0.1c0.1,0,10.8,2.9,19.3,2.9c8.6,0,22.2-2.9,22.4-2.9c0.2,0,0.4-0.1,0.6-0.1
            c0.7,0,1.4,0.2,1.9,0.7c0.7,0.6,1.1,1.4,1.1,2.3C363.9,241.6,358.7,260.7,339.6,260.7C339.6,260.7,339.6,260.7,339.6,260.7z"
          />
          <path
            fill={color}
            d="M361,231.5c0,0-0.2,26.2-21.4,26.2c-1.1,0-2.3-0.1-3.6-0.2c-16-2-18.1-26-18.1-26s11.1,3,20.1,3
            S361,231.5,361,231.5 M361,225.5c-0.4,0-0.8,0-1.3,0.1c-0.1,0-13.5,2.9-21.7,2.9c-8.1,0-18.4-2.8-18.5-2.8c-0.5-0.1-1-0.2-1.6-0.2
            c-1.4,0-2.8,0.5-3.9,1.4c-1.5,1.3-2.3,3.2-2.1,5.1c0.1,1.2,2.8,28.9,23.3,31.4c1.5,0.2,2.9,0.3,4.3,0.3c11.2,0,19.8-6,24.2-16.8
            c3.1-7.5,3.2-15,3.2-15.4c0-1.8-0.8-3.5-2.2-4.7C363.7,226,362.4,225.5,361,225.5L361,225.5z M361,237.5L361,237.5L361,237.5
            L361,237.5z"
          />
        </g>
        <g>
          <path
            fill={color}
            d="M311.2-149.9h-8c0.4-1.2,0.7-2.4,0.7-3.7c0-6.1-4.9-11-11-11c-3.8,0-7.2,2-9.1,4.9l-1.8,2.5l-1.8-2.5
            c-2-3-5.3-4.9-9.1-4.9c-6.1,0-11,4.9-11,11c0,1.3,0.3,2.5,0.7,3.7h-8c-4,0-7.3,3.3-7.3,7.3l0,40.2c0,4,3.3,7.3,7.3,7.3h58.5
            c4,0,7.3-3.3,7.3-7.3v-40.2C318.5-146.6,315.3-149.9,311.2-149.9z M292.9-157.2c2,0,3.7,1.6,3.7,3.7c0,2-1.6,3.7-3.7,3.7
            c-2,0-3.7-1.6-3.7-3.7C289.3-155.5,290.9-157.2,292.9-157.2z M271-157.2c2,0,3.7,1.6,3.7,3.7c0,2-1.6,3.7-3.7,3.7
            c-2,0-3.7-1.6-3.7-3.7C267.3-155.5,269-157.2,271-157.2z M311.2-102.3h-58.5v-40.2h18.6l-7.6,10.4l5.9,4.3l12.3-16.8l12.3,16.8
            l5.9-4.3l-7.6-10.4h18.6V-102.3z"
          />
        </g>
        <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M470,274.5c0,0-0.5-16.7-10-31c-10-15-20-20-20-20" />
        <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M472,293.5c0,0,1-3.9,1-9c0-7-3-10-3-10" />
        <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M484,284.5c0,0,0-2-3-5c-4.1-4.1-11-5-11-5" />
        <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M456,284.5c0,0,1-3,4-6s10-4,10-4" />
        <g>
          <line fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" x1="87" y1="316.5" x2="51" y2="223.5" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M49,208.5c0,0-1,1.9-1,6c0,5,3,9,3,9" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M37,213.5c0,0,0,2,3,5c4.1,4.1,11,5,11,5" />
          <path fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M65,213.5c0,0-1,3-4,6s-10,4-10,4" />
        </g>
      </svg>
    );
  }
}

export default Chat;

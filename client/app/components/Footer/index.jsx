import React from 'react';
import CSS from 'react-css-modules';
import IconFacebook from 'components/Icons/Facebook';
import IconLine from 'components/Icons/Line';
import IconEmail from 'react-icons/lib/md/email';
import IconPhone from 'react-icons/lib/md/phone';
import { SHAREAPP_OFFICAL, SHAREAPP_BLOG, SHAREAPP_ABOUT,
 SHAREAPP_TERM, SHAREAPP_FACEBOOK, SHAREAPP_LINEAPP,
 SHAREAPP_APPLESTORE, SHAREAPP_GOOGLESTORE } from 'constants/config';
import { Link } from 'react-router';

import styles from './styles.sass';

class Footer extends React.Component {
  render() {
    return (
      <div styleName="container">
        <div
          className="clear"
          styleName="context"
        >
          <div styleName="linfo-content">
            <div className="clear">
              <div styleName="qrcode" />
              <Link
                to={SHAREAPP_APPLESTORE}
                target="_blank"
                styleName="download"
              >
                <div styleName="apple" />
              </Link>
              <Link
                to={SHAREAPP_GOOGLESTORE}
                target="_blank"
                styleName="download"
              >
                <div styleName="google" />
              </Link>
              <div styleName="copyright-text">
                © 2017 ShareApp. All rights reserved
              </div>
            </div>
          </div>
          <div styleName="rinfo-content">
            <div styleName="link-collection">
              <a
                target="_blank"
                href={SHAREAPP_ABOUT}
              >
                關於我們
              </a>
              <a
                target="_blank"
                href={SHAREAPP_OFFICAL}
              >
                官方網站
              </a>
              <a
                target="_blank"
                href={SHAREAPP_BLOG}
              >
                部落格
              </a>
              <a
                target="_blank"
                href={SHAREAPP_TERM}
              >
                服務條款
              </a>
              <a
                target="_blank"
                href={SHAREAPP_FACEBOOK}
              >
                <IconFacebook size={16} />
              </a>
              <a
                href={SHAREAPP_LINEAPP}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconLine size={16} />
              </a>
            </div>
            <div styleName="contact-email">
              <IconEmail size={16} />
              <span styleName="span-text">
                {' customer@shareapp.com.tw'}
              </span>
            </div>
            <div styleName="contact-number">
              <IconPhone size={16} />
              <span styleName="span-text">
                {' (02)23620581 (平日9:00-12:30、13:30-18:00/週六、週日及例假日休)'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CSS(Footer, styles);

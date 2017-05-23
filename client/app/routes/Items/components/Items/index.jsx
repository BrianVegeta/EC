import CSS from 'react-css-modules';
import Page from './Page';
import styles from './styles.sass';
import FeatureHeader from './FeatureHeader';

module.exports = {
  ItemsPage: CSS(Page, styles),
  FeatureHeader,
};

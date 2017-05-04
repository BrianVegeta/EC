import React, { PropTypes } from 'react';
import _ from 'lodash';

class Cities extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.object).isRequired,
    onPagination: PropTypes.arrayOf(PropTypes.func).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.prevPage = this.prevPage.bind(this);
    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
    this.rootMinHeight = this.roots.clientHeight;
  }

  onRootPagination(opt) {
    const { onPagination } = this.props;
    onPagination[0](opt);
    const tracks = this.state.tracks.concat(opt.text);
    this.setState({ tracks });
  }

  prevPage() {
    const tracks = _.clone(this.state.tracks);
    tracks.pop();
    this.setState({ tracks });
  }

  trace(jobs, options) {
    if (jobs.length === 0) {
      return options;
    }
    const job = jobs.shift();
    const nextOptions = _.find(options, { text: job }).children;
    return this.trace(jobs, nextOptions);
  }

  renderRoots(options) {
    return (
      <div styleName="selection" ref={r => (this.roots = r)}>
        <div styleName="options">
          {options.map((opt, i) =>
            <div key={`${i + 1}`} styleName="rootOption">
              <div
                styleName="optioner"
                {...{ role: 'button', onClick: () => this.onRootPagination(opt) }}
              >
                {opt.text}
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }

  // TODO: current two level
  // renderNodes() {
  // }

  renderLeaves(options) {
    const { onSelect } = this.props;
    const minHeight = (options.length === 0 && this.rootMinHeight);
    return (
      <div styleName="selection" style={{ minHeight }}>
        <div styleName="title">
          <div
            styleName="prev"
            className="button"
            {...{ role: 'button', onClick: this.prevPage }}
          >
            <span className="fa fa-angle-left" />
            {this.state.tracks.join(',')}
          </div>
        </div>
        <div styleName="options">
          {options.map((opt, i) =>
            <div key={`${i + 1}`} styleName="leafOption">
              <div
                styleName="optioner"
                {...{ role: 'button', onClick: () => onSelect(this.state.tracks) }}
              >
                {opt.text}
              </div>
            </div>,
          )}
        </div>
      </div>
    );
  }

  render() {
    const { options } = this.props;
    const { tracks } = this.state;
    if (tracks.length === 0) {
      return this.renderRoots(options);
    }
    const nodes = this.trace(_.clone(tracks), options);
    return this.renderLeaves(nodes);
  }
}

export default Cities;

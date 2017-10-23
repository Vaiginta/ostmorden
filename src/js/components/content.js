import React, { Component } from 'react';

class Content extends Component {

  constructor (props) {
    super(props);
  }

  componentDidMount() {
    let apisArray = this.props.currentData.reduce((array, d) => {
      array.push(d['content_url'].split('api/')[1] + (d['content_type'] === 'episode' ? 'items/' : ''));
      return array;
    }, []);
    let paths = this.props.currentData.map(d => d['content_url'].split('api/')[1]);
    this.props.fetchAll(apisArray, paths);
  }

  render () {
    let { data, currentData } = this.props;
    let paths = currentData && currentData.map(d => d['content_url'].split('api/')[1]);

    return (
      <div className='set'>
        { paths && paths.map((p, i ) => {
          let item = data.get(p);
          return (
            <div key={i}>
              {  (item && item['name'])
                    ? <div>
                        <h2>{item['name'] + ' divider'}</h2>
                      </div>
                    : <div>
                        <h2>{('episode' + (i + 1))}</h2>
                        {item && ('published on :' + item['publish_on'])} <br />
                        {item && ('release date :' + item['release_date'])}<br />
                        {item && ('duration in seconds : ' + item['duration_in_seconds'])}<br />
                      </div>
              }
            </div>
          )
        }) }
      </div>
    );
  }
}

export default Content;

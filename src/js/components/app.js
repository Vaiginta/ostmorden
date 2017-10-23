import React, { Component } from 'react';
import Content from './content.js';

class App extends Component {

  constructor () {
    super();

    this.goToSet = this.goToSet.bind(this);
  }

  componentDidMount() {
    this.props.fetchSetsAndImages();
  }

  goToSet(set) {
    location.hash = set.title.split(' ').join('%%');
    let setItems = 'sets/' + set.uid + '/items';
    this.props.fetchData(setItems, set.uid);
  }

  render () {
    const { currentPath, data, fetchData, fetchAll, images } = this.props;

    let setsData = data && data.get('sets');
    let currentData = data && data.get(currentPath);
    let setImages = images && images.map(img => {
      let obj = {};
      obj['setId'] = img['content_url'] !== null && img['content_url'].split('/api/sets/')[1];
      obj['imgUrl'] = img['url'];
      return obj;
    });

    return (
      <div className='app-root'>
        { currentPath === 'sets'
            ? <div className='sets'>
                <h1>Sets</h1>
                { setsData && setsData.map((set, i) => {
                    var image = setImages.filter(img => set.uid + '/' === img['setId'] )[0];
                    var imgUrl = image && image['imgUrl'];
                    return (
                      <div className='set' key={i}>
                        <h2 onClick={() => this.goToSet(set)}>{set.title}</h2>
                        {imgUrl
                            ? <div className='set-image' style={{backgroundImage:'url('+imgUrl+')'}}>
                              </div>
                            : 'no image'}
                      </div>
                    );
                  }) }
              </div>
            : <div className='set-content'>
            { data && <Content
              {...{currentData, fetchAll, data}}
            />}

              </div> }
      </div>
    );
  }
}

export default App;

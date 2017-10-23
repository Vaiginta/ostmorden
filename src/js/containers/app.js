import {connect} from 'react-redux'
import App from '../components/app.js'
import * as actionCreators from '../actions/app.js';

const mapStateToProps = state => {
  return {
    data: state.getIn(['app', 'data']),
    currentPath: state.getIn(['app', 'currentPath']),
    images: state.getIn(['app', 'data', 'images'])
  }
}

const AppContainer = connect(
  mapStateToProps,
  actionCreators
)(App)

export default AppContainer;

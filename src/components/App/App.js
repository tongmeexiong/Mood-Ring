import React, { Component } from 'react';
import {connect} from 'react-redux'
import TagSection from '../TagSection/TagSection'
import './App.css';

class App extends Component {
  // Renders the entire app on the DOM

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_IMAGES'})
    this.props.dispatch({ type: 'FETCH_TAGS' })

  }
  render() {
    return (
      <div className="App">
        <p>Empty Page</p>
        <TagSection />
      </div>
    );
  }
}

const mapToRedux = (reduxState) => {
  return{
    reduxState
  }
}

export default connect(mapToRedux)(App);

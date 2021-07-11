import './App.css';
import FaqComponent from './components/faq-component/FaqComponent';

import React, { Component } from 'react'
// import { CoServices } from './services/CoServices';

export default class App extends Component {
  componentDidMount(){
    // Promise.all([CoServices.getAllMiscInfo(), CoServices.getAllStates()])
    // .then(([result1, result2]) => {
    //   // console.log('result1', result1,result2);
    // }).catch(([err]) => {
      
    // });
    
  }
  render() {
    return (
      <div className="App">

        <article className="articleBody">
          <FaqComponent />
        </article>
      </div>
    )
  }
}

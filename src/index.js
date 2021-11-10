import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './redux/reducers';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
} from "react-router-dom";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);


ReactDOM.render(
  <React.StrictMode>
    <Provider store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
  <Router>
  <App />
  </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function solution(s) {

  let answer = '';
  let cnt = 1;

  for (let i = 0; i < s.length; i++) {
    
    if(s[i] === s[i+1]) {
      cnt++;
    } 
    else {
      answer += s[i];
      if(cnt !== 1) answer += cnt;
      cnt = 1;
    }
  }
  
  return answer;

}

console.log(solution('KKHSSSSSSSE'));
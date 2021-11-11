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



function solution(n, m ,arr) {

  let answer = 0;
  let cnt = 0;
  let pi = 0;
  let pj = 0;

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      cnt = 0;
      for (let k = 0; k < m; k++) {
        for (let s = 0; s < n; s++) {
          if(arr[k][s] === i) pi = s;
          if(arr[k][s] === j) pj = s;
        }
        if(pi > pj) cnt++;
      }
      if(cnt === m) answer++; 
    }
  }
  
  
  
  return answer;

}

console.log(solution(4,3,[[3,4,1,2], [4,3,2,1], [3,1,4,2]]));
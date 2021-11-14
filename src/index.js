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

// 시간복잡도 O(n^2)
function compareMaps(map1, map2) {

  if(map1.size !== map2.size) return false;

  for(let [key, val] of map1) {
      if(!map2.has(key) || map2.get(key) !== val) return false;
  }
  return true;  
}

function solution(s, t) {

  let answer = 0;
  let th = new Map();
  let sh = new Map();

  for(let x of t) {
      if(th.has(x)) th.set(x, th.get(x) + 1);
      else th.set(x, 1);
  }

  let len = t.length - 1;

  for (let i = 0; i < len; i++) {
      if(sh.has(s[i])) sh.set(s[i], sh.get(s[i]) + 1);
      else sh.set(s[i], 1);
  }

  let lt = 0;
  
  for (let rt = len; rt < s.length; rt++) {
      if(sh.has(s[rt])) sh.set(s[rt], sh.get(s[rt]) + 1);
      else sh.set(s[rt], 1);

      if(compareMaps(sh, th)) answer++;
  
      sh.set(s[lt], sh.get(s[lt]) - 1);
      if(sh.get(s[lt]) === 0) sh.delete(s[lt]);
      lt++;
  }

  return answer;
}

console.log(solution('bacaAacba', 'abc'));

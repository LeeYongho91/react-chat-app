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

function solution(arr) {

  let answer = 0;
  let n = arr.length;
  let posX = [0,0,-1,1];
  let posY = [1,-1,0,0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let check = true;
      for (let k = 0; k < 4; k++) {

        let px = i + posX[k];
        let py = j + posY[k];

        if(px >= 0 && px < n && py >= 0 && py < n && arr[i][j] <= arr[px][py]) {
          check = false;
          break;
        }
      }

      if(check) answer++;
    }
  }



  return answer;
}

console.log(solution([[5,3,7,2,3],
                      [3,7,1,6,1],
                      [7,2,5,3,4],
                      [4,3,6,4,1],
                      [8,7,3,5,2]]));
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



    function count(stable, dist) {
      let cnt = 1;
      let ep = stable[0];

      for (let i = 1; i < stable.length; i++) {
        if(stable[i] - ep >= dist) {
          cnt++;
          ep = stable[i];
        }  
      }
      return cnt;
    }

    function solution(c, stable){
      
      let answer = 0;
      stable.sort((a,b) => a-b);

      let lt = 1
      let rt = stable[stable.length -1];

      while(lt<=rt) {
        let mid = parseInt((lt+rt) / 2);

        if(count(stable, mid) >= c) {
          answer = mid;
          lt = mid + 1;
        }
        else {
          rt = mid - 1;     
        }
      }
      
      return answer; 
      }
      
      console.log(solution(3, [1,2,8,4,9]));

 




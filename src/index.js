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

    function solution(board, moves){
  
      let answer = 0;
      let stack = [];

      for (let i = 0; i < moves.length; i++) {
          for (let j = 0; j < board.length; j++) {
              if(board[j][moves[i]-1] !== 0) {
                if(stack[stack.length - 1] === board[j][moves[i]-1]) {
                  stack.pop();
                  answer += 2;
                }
                else stack.push(board[j][moves[i]-1]);

                board[j][moves[i]-1] = 0;
                break;
              }           
          }                   
        }                
      return answer;      
      }

      console.log(solution([[0,0,0,0,0],
                            [0,0,1,0,3], 
                            [0,2,5,0,1], 
                            [4,2,4,4,2], 
                            [3,5,1,3,1]], [1,5,3,5,1,2,1,4]));
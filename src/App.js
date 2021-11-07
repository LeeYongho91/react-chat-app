import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import React, {useEffect} from 'react'
import ChatPage from './components/ChatPage/ChatPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import { getAuth, onAuthStateChanged } from './firebase';

import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './redux/actions/user_action'

function App() {
  let history = useHistory();
  let dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        history.push('/');
        dispatch(setUser(user));
      } else {
        history.push('/login');
      }
    });
  }, [history,dispatch]);

  if(isLoading) {
    return (
      <div>
        ...loading
      </div>
    )
  } else {
    return (
      <Router>
          <Switch>
            <Route path="/" exact component={ChatPage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
          </Switch>
      </Router>
    );
  }
};


export default App;



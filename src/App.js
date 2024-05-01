import React from 'react';
import './App.css';
import {HashRouter, Navigate, Route, Routes} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './stores/store';
import LoginWrapper from './components/loginWrapper';
import ChatWrapper from './components/chatWrapper';
import RegisterWrapper from './components/registerWrapper';
import CheckAuth from './components/checkAuth';
import PrivateRoute from './components/privateRoute';

function App() {
  const authChecker = (element) => <CheckAuth element={element} />;
  const privChecker = (element) => <PrivateRoute element={element} />;
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <div>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={authChecker(<LoginWrapper />)} />
                <Route path="/signup" element={authChecker(<RegisterWrapper />)} />
                <Route path="/chat" element={privChecker(<ChatWrapper />)} />
              </Routes>
          </div>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;


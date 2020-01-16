import React, { Fragment } from 'react';
import {GlobalStyle} from './style'
import Header from './common/header/index'
import GlobalFontStyle from './statics/iconfont/iconfont.js'
import store from './store';
import { Provider } from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import  Home  from './pages/home';
import Detail from './pages/detail';
import Login from './pages/login';
import Write from './pages/write';


function App() {
  return (
    <Fragment>
      <Provider store={store}>

        <BrowserRouter>
        <div>
          <Header/>
          <Route path='/' exact component={Home}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/write' exact component={Write}></Route>
          <Route path='/detail/:id' exact component={Detail}></Route>
        </div>
        </BrowserRouter>
      </Provider>
      <GlobalStyle />
      <GlobalFontStyle/>
    </Fragment>
  );
}

export default App;

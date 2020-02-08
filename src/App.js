import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

import Home from './pages/home/home';
import Login from './pages/login';
import Owners from './pages/owners';
import Meters from './pages/meters';
import Payments from './pages/payments';
import Bills from './pages/bills';
import Requests from './pages/requests';
import SendMeters from './pages/sendMeters';
import Realty from './pages/realty';
import RealtyCard from './pages/realty/card';

import messagesRu from './translations/ru.json';
import messagesUa from './translations/ua.json';

import Header from './components/header';
import ErrorNotification from './components/errorNotification';

import './App.scss';
import 'antd/dist/antd.css';

import ruRU from 'antd/es/locale/ru_RU';
import ukUA from 'antd/es/locale/uk_UA';
import { ConfigProvider } from 'antd';

import moment from 'moment';
import 'moment/locale/ru';
import 'moment/locale/uk';
typeof window !== undefined && (window.moment = moment); //just for test


const messages = {
  ru: messagesRu,
  ua: messagesUa,
};

function App({ lang }) {

  let antLocale = lang == 'ru' ? ruRU : ukUA;
  moment.locale(lang == 'ru' ? 'ru' : 'uk');

  return (
    <ConfigProvider locale={antLocale}>
    <IntlProvider locale={lang} messages={messages[lang]}>
      <div className="App">
        <div className="content-wrapper">
          <ErrorNotification />
          <Header />
          <Switch>
            <Route exact path="/">
              <Owners />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/requests">
              <Requests />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/owners">
              <Owners />
            </Route>
            <Route exact path="/payments">
              <Payments />
            </Route>
            <Route exact path="/bills">
              <Bills />
            </Route>
            <Route exact path="/meters">
              <Meters />
            </Route>
            <Route exact path="/meters/send">
              <SendMeters />
            </Route>
            <Route exact path="/realty">
              <Realty />
            </Route>
            <Route exact path="/realty/:realtyId">
              <RealtyCard />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </IntlProvider>
    </ConfigProvider>
  );
}

const mapStateToProps = state => ({
  lang: state.lang.language,
});

export default connect(mapStateToProps)(App);

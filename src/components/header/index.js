import React from 'react';
import { connect } from 'react-redux';
import { Link , NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import buildingUrl from '../../assets/images/header/building.svg';
import logoUrl from '../../assets/images/header/logo.svg';
import logoTextUrl from '../../assets/images/header/logo-text.svg';
import { changeLanguage } from '../../store/actions/lang';

import { UA_LANG, RU_LANG } from '../../store/types/lang';

import './styles.scss';

const changeLanguageTo = (props, lang) => {
  props.dispatch(changeLanguage(lang));
};

const getActiveClass = (props, lang) => {
  return props.lang === lang ? 'active' : '';
};

const Header = props => {
  return (
    <div className="header">
      <div className="top-wrapper">
        <div className="logo-block">
          <img src={logoUrl} alt="House Manager логотип" />
          <img src={logoTextUrl} alt="House Manager" />
        </div>
        <div className="lang-user-block">
          <div className="lang-switch">
            <div
              className={getActiveClass(props, RU_LANG)}
              onClick={() => {
                changeLanguageTo(props, RU_LANG);
              }}
            >
              Рус
            </div>
            <div
              className={getActiveClass(props, UA_LANG)}
              onClick={() => {
                changeLanguageTo(props, UA_LANG);
              }}
            >
              Укр
            </div>
          </div>
          <div className="user-login-block">
            <div className="user-block">
              <div>Юрий Гуртовой</div>
              <div>Админ. ЖК “Вернисаж”</div>
            </div>
            <div className="login-block">
              <FormattedMessage id="header.logout" />
            </div>
          </div>
        </div>
      </div>
      <div className="control-wrapper">
        <ul className="nav-menu">
          <li className="nav-realty">
            <NavLink to="/realty" activeClassName='active'>
              <div className="nav-name">
                <FormattedMessage id="header.objects" />
              </div>
              <div className="nav-descr">
                <FormattedMessage id="header.objects.descr" />
              </div>
            </NavLink>
          </li>
          <li className="nav-owners">
            <NavLink to="/owners" activeClassName='active'>
              <div className="nav-name">
                <FormattedMessage id="header.balance" />
              </div>
              <div className="nav-descr">
                <FormattedMessage id="header.balance.descr" />
              </div>
            </NavLink>
          </li>
          <li className="nav-meters">
            <NavLink to="/meters">
              <div className="nav-name">
                <FormattedMessage id="header.meters" />
              </div>
              <div className="nav-descr">
                <FormattedMessage id="header.meters.descr" />
              </div>
            </NavLink>
          </li>
          <li className="nav-bills">
            <NavLink to="/bills">
              <div className="nav-name">
                <FormattedMessage id="header.bills" />
              </div>
              <div className="nav-descr">
                <FormattedMessage id="header.bills.descr" />
              </div>
            </NavLink>
          </li>
          <li className="nav-payments">
            <NavLink to="/payments" activeClassName='active'>
              <div className="nav-name">
                <FormattedMessage id="header.payments" />
              </div>
              <div className="nav-descr">
                <FormattedMessage id="header.payments.descr" />
              </div>
            </NavLink>
          </li>
          <li className="nav-requests">
            <NavLink to="/requests">
              <div className="nav-name">
                <FormattedMessage id="header.requests" />
              </div>
              <div className="nav-descr">
                <FormattedMessage id="header.requests.descr" />
              </div>
            </NavLink>
          </li>

        </ul>
      </div>
    </div>
  );
};

Header.propTypes = {};
Header.defaultProps = {};

const mapStateToProps = state => ({
  lang: state.lang.language,
});

export default connect(mapStateToProps)(Header);

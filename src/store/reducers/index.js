import { combineReducers } from 'redux';

import users from './users';
import payments from './payments';
import bills from './bills';
import owners from './owners';
import modal from './modal';
import modalReview from './modalReview';
import meters from './metersData';
import errors from './errors';
import lang from './lang';
import realty from './realty';
import realtyCard from './realtyCard';
import billTemplate from "./billTemplate";

export default combineReducers({
  users,
  payments,
  bills,
  owners,
  modal,
  modalReview,
  meters,
  errors,
  lang,
  realty,
  realtyCard,
  billTemplate
});

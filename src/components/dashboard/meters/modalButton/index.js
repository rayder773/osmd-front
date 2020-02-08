/* eslint-disable no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getModalReviewData } from '../../../../store/actions/modalReview';
import status from '../../../../constants/meters';
import {setDate} from '../../../../helpers';

import './styles.scss';

const setStyle = meterStatus => {
  if (meterStatus === 1 || meterStatus === 2) {
    return {
      border: 'none',
    };
  }
};

const setName = meterStatus => {
  switch (meterStatus) {
    case 0:
      return status.NOT_CHECKED;
    case 1:
      return (
        <div className="meters-accepted-button">
          {status.ACCEPTED} {setDate(new Date())}
        </div>
      );
    case 2:
      return (
        <div className="meters-declined-button">
          {status.DECLINED} {setDate(new Date())}
        </div>
      );
    default:
      return status.NOT_CHECKED;
  }
};

const Modalbutton = props => {
  const { meterStatus, getModalReviewData, id } = props;

  return (
    <button type="button" className="meters-modal-button" onClick={() => getModalReviewData(id)} style={setStyle(meterStatus)}>
      {setName(meterStatus)}
    </button>
  );
};

const mapDispatchToProps = {
  getModalReviewData,
};

Modalbutton.propTypes = {
  id: PropTypes.number,
  openModal: PropTypes.func,
  meterStatus: PropTypes.number,
};

export default connect(null, mapDispatchToProps)(Modalbutton);

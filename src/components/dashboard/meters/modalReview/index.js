import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Row, Col, Icon } from 'antd';

import ModalFooter from './modalFooter';

import './styles.scss';
import avatarUrl from '../../../../assets/images/user-photo.png';
import {connect} from "react-redux";
import {getMetersImage, SeviceImage, serviceTypes} from "../../../../dataModels/metersData";
import { closeModalReview } from '../../../../store/actions/modalReview';
import { formatDate } from '../../../../helpers';

const ModalReview = props => {
  const { isFetching, modalReviewData, onClose, closeModalReview } = props;

  const metersImageUrl = getMetersImage(modalReviewData.service_type_Id).url;
  const name = () => {
    return modalReviewData.appartment
        && modalReviewData.appartment.appartments_payers[0]
        && modalReviewData.appartment.appartments_payers[0].payer.name;
  }
  const address = () => {
    return modalReviewData.appartment
        && `г. Одесса, ул.${modalReviewData.appartment.building.street_name}, ${modalReviewData.appartment.building.number}`
        + `, кв. ${modalReviewData.appartment.appartment_number}`;
  }
  return (
    <div className="meters-review">
      <Modal
        style={{ maxWidth: '1100px' }}
        bodyStyle={{ padding: '0 40px' }}
        title="ПОКАЗАНИЯ СЧЕТЧИКОВ"
        visible={!!modalReviewData.id}
        onCancel={closeModalReview}
        width="100%"
        centered
        footer={null}
        mask
        className="meters-review"
      >
        <div className="meters-review-modal-content">
          <div className="meters-wrapper">
            <div className="meters-values-holder">
              <Row>
                <Col span={3} >
                  <div className="title">
                  <SeviceImage type={modalReviewData.service_type_Id} />
                  {modalReviewData.service_type_Id && serviceTypes[modalReviewData.service_type_Id].name}
                  </div>
                </Col>
                <Col span={5}>
                  <div className="desc">
                    Текущее
                    <br />
                    {formatDate(modalReviewData.dateOf)}
                  </div>
                  <div className="value">
                    {modalReviewData.value}
                  </div>
                </Col>
                <Col span={5} >
                  <div className="desc">
                    Предыдущее
                    <br />
                    {formatDate(modalReviewData.prevDateOf)}
                  </div>
                  <div className="value">
                    {modalReviewData.prevValue}
                  </div>
                </Col>
              </Row>
            </div>
            <div className="status-string">
              <div className="payer-info">
                <div className="payer-avatar" style={{ backgroundImage: `url(${avatarUrl})` }} />
                <ul className="payer-name">
                  <li>{name()}</li>
                  <li>{address()}</li>
                </ul>
              </div>
              <div className="profile-link">
                Профиль <Icon type="right" />
              </div>
            </div>
            <img className="meters-image" src={metersImageUrl} alt="Фото счечтика" />

            <ModalFooter serviceValue={modalReviewData} onClose={onClose} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

ModalReview.propTypes = {
  onClose: PropTypes.func,
};

ModalReview.defaultProps = {
  onClose: () => {},
};

const mapStateToProps = state => ({
  isFetching: state.modalReview.isFetching,
  modalReviewData: state.modalReview.modalReviewData,
});

const map = {
  closeModalReview
};

export default connect(mapStateToProps, map)(ModalReview);

import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { updateModalReviewStatus, changeModalReview } from '../../../../../store/actions/modalReview';
import './styles.scss';
import { Form, Icon, Input, Button } from 'antd';

const ModalFooter = ({ serviceValue, updateModalReviewStatus, changeModalReview, onClose }) => {

  const [isButtonsVisible, setIsButtonsVisible] = useState(false);

  useEffect(() => {
    setIsButtonsVisible(false);
  }, [serviceValue.id]);

  const handleOnClose = () => {
    changeModalReview({status: 2});
    updateModalReviewStatus();
    onClose();
  };

  const handleOnAccept = () => {
    changeModalReview({status: 1});
    updateModalReviewStatus();
    onClose();
  };

  const toggleButtonsVisible = event => {
    setIsButtonsVisible(!isButtonsVisible);
  }
  const handleOnCommentChange = (e) => {
    changeModalReview({statusComment: e.target.value});
  };

  return (
    <div className="review-modal-footer">
      {serviceValue.status == 0 || isButtonsVisible ?
      <div className="controls">
        <Input.TextArea className="input-comment" type="textarea" placeholder="Сообщение для пользователя" value={serviceValue.statusComment} onChange={handleOnCommentChange} /> <br />
        <button className="decline" type="button" onClick={() => handleOnClose()}>
          Отклонить
        </button>
        <button className="accept" type="button" onClick={() => handleOnAccept()}>
          Принять
        </button>
      </div>
          :
      <div className="controls" onClick={toggleButtonsVisible}>
        Статус {serviceValue.status == 1 ? '"Принято"' : '"Отклонено"'}
        <a>изменить</a>
      </div>
      }
    </div>
  );
};

const mapStateToProps = state => ({
  activeId: state.modal.active_id,
});

const mapDispatchToPtops = {
  updateModalReviewStatus,
  changeModalReview
};

export default connect(mapStateToProps, mapDispatchToPtops)(ModalFooter);

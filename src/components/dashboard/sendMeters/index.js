/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { changeMetersRequest } from '../../../store/actions/sendMeters';

const SendMeters = () => {
  const [value, setValue] = useState();
  const [serviceType, setServiceType] = useState();
  const [roomNumber, setRoomNumber] = useState();

  return (
    <div className="send-meters">
      <select onChange={e => setServiceType(e.target.value)}>
        <option>Газ</option>
        <option>Вода</option>
        <option>Свет</option>
        <option>Отопление</option>
      </select>
      <div>
        <label htmlFor="meters-data">Meters</label>
        <input id="meters-data" type="number" value={value} onChange={e => setValue(e.target.value)} />
      </div>
      <div>
        <label htmlFor="room-number">Номер кв от 1 до 100</label>
        <input id="room-number" type="number" value={roomNumber} onChange={e => setRoomNumber(e.target.value)} />
      </div>
      <button type="button" onClick={changeMetersRequest(value, serviceType, roomNumber)}>
        Send
      </button>
    </div>
  );
};

export default SendMeters;

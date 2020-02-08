/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/prop-types */
import React from 'react';

import status from '../constants/meters';
import Button from '../components/dashboard/meters/modalButton';
import {setDate} from '../helpers';

import serviceIconGaz from '../assets/images/services/flame.png';
import serviceIconElectricity from '../assets/images/services/flash.png';
import serviceIconHeating from '../assets/images/services/heating.png';
import serviceIconInternet from '../assets/images/services/internet.png';
import serviceIconWater from '../assets/images/services/water.png';
import serviceIconLift from '../assets/images/services/lift.png';
import serviceIconRent from '../assets/images/services/key.png';
import serviceIconUndefined from '../assets/images/services/undefined.png';

import metersUserGaz from '../assets/images/meters/meters-user-gaz.png';
import metersUserHeating from '../assets/images/meters/meters-user-heater.png';
import metersUserWater from '../assets/images/meters/meters-user-water.jpg';
import metersUserElectricity from '../assets/images/meters/meters-user-electricity.jpg';

import '../components/dashboard/meters/styles.scss';

const filters = [
  { text: status.NOT_CHECKED, value: 0 },
  { text: status.DECLINED, value: 2 },
  { text: status.ACCEPTED, value: 1 },
];

const serviceTypes = {
  1: { url: serviceIconGaz, name: 'Газ' },
  2: { url: serviceIconWater, name: 'Вода' },
  3: { url: serviceIconElectricity, name: 'Электроэнергия' },
  4: { url: serviceIconLift, name: 'Лифт' },
  5: { url: serviceIconInternet, name: 'Интернет' },
  6: { url: serviceIconHeating, name: 'Отопление' },
  7: { url: serviceIconRent, name: 'Аренда' },
};

const filterServices = () => {
  return Object.keys(serviceTypes).map(key => {
    return { text: serviceTypes[key].name, value: parseInt(key, 10) };
  });
};

// we should get images urls from server, but for now
// get our own images
const getMetersImage = type => {
  let image = null;
  // 6 electr
  // 1 gaz
  // 4 water
  if (type === 1) {
    image = metersUserGaz;
  } else if (type === 2) {
    image = metersUserHeating;
  } else if (type === 3) {
      image = metersUserElectricity;
  } else if (type === 4) {
    image = metersUserWater;
  } else if (type === 5) {
      image = metersUserWater;
  } else if (type === 6) {
    image = metersUserElectricity;
  }

  return {
    url: image,
  };
};

const getServiceImage = type => {
  return serviceTypes[type] ? serviceTypes[type].url : serviceIconUndefined;
};

const ImageWithData = ({ img, data }) => (
  <div className="meters-date-col">
    <span>{data}</span>
    <img src={img} alt="" />
  </div>
);

const SeviceImage = ({ type }) => {
  return (
    <div>
      <img src={getServiceImage(type)} alt="service image" />
    </div>
  );
};

const mapToNormalData = data =>
  data.map(item => ({
    id: item.id,
    key: item.key,
    service: {
      image: <SeviceImage type={item.service.type} />,
      type: item.service.type,
    },
    date: setDate(item.date),
    street: item.address.street,
    app: item.address.app,
    number: <ImageWithData img={getMetersImage(item.service.type).url} data={item.number} />,
    number_data: item.number,
    owner: item.name,
    status: <Button meterStatus={item.status} id={item.id} />,
    status_data: item.status,
    metersImage: getMetersImage(item.service.type),
    previous_number_data: item.previous_value,
  }));

export { filters, filterServices, mapToNormalData, SeviceImage, serviceTypes, getMetersImage };

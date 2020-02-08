import React from 'react';
import { useParams } from 'react-router-dom';
import RealtyCardComponent from '../../../components/dashboard/realty/card';

import './styles.scss';

const RealtyCard = props => {
  const { realtyId } = useParams();
  return (
    <div className="page-realty-card">
      <RealtyCardComponent realtyId={realtyId} />
    </div>
  );
};

export default RealtyCard;

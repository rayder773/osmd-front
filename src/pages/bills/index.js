import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import BillsComponent from '../../components/dashboard/bills';

const Bills = () => <div className="page-bills"><BillsComponent /></div>;

Bills.propTypes = {};

Bills.defaultProps = {};

export default Bills;

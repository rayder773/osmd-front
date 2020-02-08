import React from 'react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import './preloader.scss';

const Preloader = () => {
    return (
        <div className="preloader">
            <Spin />
        </div>
    )
}

export default Preloader;
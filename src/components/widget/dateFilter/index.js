import React, { useRef } from 'react';
import './styles.scss';
import {Icon, DatePicker} from "antd";
import PropTypes from "prop-types";

const DateFilter = props => {
    const {onChange} = props;
    const fromEl = useRef(null);
    const toEl = useRef(null);


    const fireChange = (filter) => {
        let {from, to} = filter;
        if (from === undefined){
            from = (fromEl.current.picker.state.value && fromEl.current.picker.state.value.toDate()) || null;
        }
        if (to === undefined){
            to = (toEl.current.picker.state.value && toEl.current.picker.state.value.toDate()) || null;
        }
        onChange({from, to});
    }

    const onFromChanged = (date, dateString) => {
        fireChange({from: (date && date.toDate()) || null});
    }
    const onToChanged = (date, dateString) => {
        fireChange({to: (date && date.toDate()) || null});
    }
    const onClear = (date, dateString) => {
        fromEl.current.picker.setState({value: null});
        toEl.current.picker.setState({value: null});
        fireChange({from: null, to: null});
    }

    return (
        <div className="date-filter-container">
            <div className="date-filter-date">
                <label>От</label>
                <DatePicker ref={fromEl} onChange={onFromChanged} placeholder={"Выберите дату"} />
            </div>
            <div className="date-filter-date">
                <label>До</label>
                <DatePicker ref={toEl} onChange={onToChanged} placeholder={"Выберите дату"} />
            </div>
            <div className="date-filter-clear" onClick={onClear}>
                <Icon type="close" fill={"red"} />
            </div>
        </div>
    );
}

DateFilter.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default DateFilter;
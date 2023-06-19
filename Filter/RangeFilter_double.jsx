import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


function valuetext(value) {
    return `${value}°C`;
}

const RangeFilter = () => {
    const [itemList, setItemList] = useState([]);
    const [filterList, setFilterList] = useState([]);

    const [value, setValue] = React.useState([20, 37]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(value[0])
        const filtered = itemList.filter((item) => item.price >= value[0] && item.price <= value[1]);
        setFilterList(filtered);
        console.log(filterList)
    };
    
    const data = async () => {
        let res = await fetch('https://fakestoreapi.com/products');
        let prdList = await res.json();
        setItemList(prdList);
    }

    useEffect(() => {
        data();
    }, [])






    return (
            
        <div className="group">
            <form >
                <Box sx={{ width: 300 }}>
                    <Slider
                        getAriaLabel={() => 'Temperature range'}
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                </Box>
            </form>



            <hr />
            {filterList.length > 0 && filterList.map((item, index) => (
                <div className="card" key={index}>
                    <div className="cared-header">
                        <h4>{item.title}</h4>
                    </div>
                    <div className="card-content">
                        <p>{item.description}</p>
                        <button className='btn btn-success'>{item.price}</button>
                    </div>
                </div>
            ))}

            {filterList.length < 1 && itemList.map((item, index) => (
                <div className="card" key={index}>
                    <div className="cared-header">
                        <h4>{item.title}</h4>
                    </div>
                    <div className="card-content">
                        <p>{item.description}</p>
                        <button className='btn btn-success'>{item.price}</button>
                    </div>
                </div>
            ))}
        </div>

            
    );
};

export default RangeFilter;

import React from 'react'
import { BsFillGridFill } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { useFilterContext } from '../context/FilterContext';


const Sort = () => {
    const { filterProducts, setGridView, setListView, sorting, gridView, sortValue } = useFilterContext();


    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <div className="btn-group">
                    <button onClick={setGridView} className={`btn ${gridView === true && 'btn-primary'}`}><BsFillGridFill /></button>
                    <button onClick={setListView} className={`btn ${gridView === false && 'btn-primary'}`}><IoMdMenu /></button>
                </div>
                <div className="totalProduct">
                    {filterProducts.length} Products
                </div>
                <div className="filter-prd">
                    <select id='sort' name='sort' onChange={sorting} className='form-control'>
                        <option value="lowest">Price (Lowest)</option>
                        <option value="highest">Price (Highest)</option>
                        <option value="a-z">Name (a-z)</option>
                        <option value="z-a">Name (z-a)</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default Sort
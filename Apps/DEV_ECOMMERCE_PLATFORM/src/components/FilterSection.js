import React from 'react'
import { useFilterContext } from '../context/FilterContext'
import { FaCheck } from 'react-icons/fa';

const FilterSection = () => {
    const { filters: { text, category, company, colors, price, maxPrice }, updateFilter, allProducts, clearFilter } = useFilterContext();

    const getUniqueValue = (data, attr) => {
        let uniqueValue = data.map((curElem) => {
            return curElem[attr]
        })

        if (attr === 'colors') {
            uniqueValue = uniqueValue.flat();
        }


        uniqueValue = ['All', ...new Set(uniqueValue)];
        return uniqueValue;
    }


    const categoryData = getUniqueValue(allProducts, 'category');
    const companyData = getUniqueValue(allProducts, 'company');
    const colorData = getUniqueValue(allProducts, 'colors');


    return (
        <>
            <div className="search-text mb-5">
                <input type="text" name='text' value={text} onChange={updateFilter} className='form-control' placeholder='Search...' />
            </div>

            <div className="category mb-5">
                <h6>Category</h6>
                <ul className='listData'>
                    {
                        categoryData && categoryData.length > 0 &&
                        categoryData.map((curCat, index) => <li key={index} className={`${curCat === category ? 'active' : ''}`} ><button name='category' value={curCat} onClick={updateFilter}>{curCat}</button></li>)
                    }
                </ul>
            </div>

            <div className="company mb-5">
                <h6>Company</h6>
                <select className='form-control' name='company' value={company} onChange={updateFilter}>
                    {
                        companyData && companyData.length > 0 &&
                        companyData.map((curCom, index) => <option
                            key={index}
                            value={curCom}>
                            {curCom}
                        </option>
                        )
                    }
                </select>
            </div>

            <div className="colors mb-5">
                <h6>Colors</h6>
                <div className="d-flex">
                    {
                        colorData && colorData.length > 0 &&
                        colorData.map((curColor, index) => {

                            if (curColor === 'All') {
                                return <button name='colors'
                                    value={curColor}
                                    style={{ backgroundColor: 'transparent', border: '0' }}
                                    onClick={updateFilter}>All</button>
                            }

                            return <button
                                className={`${curColor === colors ? 'colorButton active' : 'colorButton'}`}
                                style={{ backgroundColor: curColor, marginRight: '5px' }}
                                key={index}
                                name='colors'
                                value={curColor}
                                onClick={updateFilter}>
                                {
                                    curColor === colors && <FaCheck />
                                }

                            </button>
                        })
                    }
                </div>
            </div>

            <hr />

            <div className="price">
                <h6>Price</h6>
                <b className='d-block mb-2'>{price}</b>
                <input type="range" min={0} max={maxPrice} name='price' value={price} onChange={updateFilter} />
            </div>

            <hr />
            <div className="clear-filter">
                <button onClick={clearFilter} className='btn btn-danger'>Clear Filter</button>
            </div>

        </>
    )
}

export default FilterSection
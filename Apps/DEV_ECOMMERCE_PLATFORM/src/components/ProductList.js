import React from 'react'
import GridView from './GridView'
import { useFilterContext } from '../context/FilterContext'
import ListView from './ListView'


const ProductList = () => {
    const { gridView } = useFilterContext();

    if (gridView) {
        return <GridView />
    }

    if (!gridView) {
        return <ListView />
    }
}

export default ProductList
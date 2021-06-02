import React, {useContext, useState} from 'react'
import CategorySearchForm from './CategorySearchForm'
import {ResponsiveContext} from 'grommet'

export default function CategorySearchFormContainer({
                                                      addOneCategory, categoriesList,
                                                      categoriesSortingOrders, componentHeight,
                                                      values, setValues
                                                    }) {
    const size = useContext(ResponsiveContext)
    const [collapse, setCollapse] = useState(false)

    return  <CategorySearchForm
            values={values}
            setValues={setValues}
            collapse={collapse}
            setCollapse={setCollapse}
            size={size}
            categoriesSortingOrders={categoriesSortingOrders}
            componentHeight={componentHeight}
            addOneCategory={addOneCategory}
            categoriesList={categoriesList}
        />
}
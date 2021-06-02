import React from 'react'
import {Box} from 'grommet'
import CategorySearchFormContainer from './search_form/CategorySearchFormContainer'
import CategoriesList from './categories_list/CategoriesList'

export default function CategoryPage({
                                       categoriesList, windowHeight, categoriesSortingOrders,
                                       topHeight, values, setValues, onMore, hasMore, 
                                       size, appLoading, addOneCategory, deleteOneCategory
}) {
    return (
        <Box
            direction={'row'}
            height={windowHeight - topHeight + 'px'}
        >
            <CategorySearchFormContainer
                categoriesList={categoriesList}
                categoriesSortingOrders={categoriesSortingOrders}
                componentHeight={windowHeight}
                values={values}
                setValues={setValues}
                addOneCategory={addOneCategory}
            />
            <CategoriesList
                onMore={onMore}
                height={windowHeight - topHeight + 'px'}
                categoriesList={categoriesList}
                hasMore={hasMore}
                size={size}
                appLoading={appLoading}
                deleteOneCategory={deleteOneCategory}
            />
        </Box>
    )
}
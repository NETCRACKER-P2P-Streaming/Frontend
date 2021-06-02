import React, {useContext, useState} from 'react'
import StreamSearchForm from './StreamSearchForm'
import {ResponsiveContext} from 'grommet'

export default function StreamSearchFormContainer({
                                                      categoriesList, streamsSortingTypes,
                                                      streamsSortingOrders, componentHeight,
                                                      values, setValues
                                                  }) {

    const size = useContext(ResponsiveContext)
    const [collapse, setCollapse] = useState(false)

    return  <StreamSearchForm
                values={values}
                setValues={setValues}
                categoriesColl={categoriesList}
                collapse={collapse}
                setCollapse={setCollapse}
                size={size}
                streamsSortingTypes={streamsSortingTypes}
                streamsSortingOrders={streamsSortingOrders}
                componentHeight={componentHeight}
            />
}
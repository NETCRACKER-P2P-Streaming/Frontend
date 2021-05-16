import React, {useContext, useState} from 'react'
import StreamSearchForm from './StreamSearchForm'
import {ResponsiveContext} from 'grommet'
import StreamSearchFormMobile from './StreamSearchFormMobile'


export default function StreamSearchFormContainer({
                                                      categoriesList, streamsSortingTypes,
                                                      streamsSortingOrders, componentHeight,
                                                      values, setValues
}) {



    const size = useContext(ResponsiveContext)
    const [collapse, setCollapse] = useState(false)

    return size === 'small'
        ? <StreamSearchFormMobile
            values={values}
            setValues={setValues}
            categoriesColl={categoriesList}
            collapse={collapse}
            size={size}
            setCollapse={setCollapse}
            streamsSortingTypes={streamsSortingTypes}
            streamsSortingOrders={streamsSortingOrders}
            componentHeight={componentHeight}
        />
        : <StreamSearchForm
            values={values}
            setValues={setValues}
            categoriesColl={categoriesList}
            collapse={collapse}
            setCollapse={setCollapse}
            size={size}
            streamsSortingTypes={streamsSortingTypes}
            streamsSortingOrders={streamsSortingOrders}
        />
}
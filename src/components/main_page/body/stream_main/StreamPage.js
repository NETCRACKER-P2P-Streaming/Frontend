import React, {memo} from 'react'
import {Box} from 'grommet'
import StreamSearchFormContainer from './search_form/StreamSearchFormContainer'
import StreamsList from './streams_list/StreamsList'

const StreamPage = memo(({
                                       categoriesList, windowHeight, streamsList,
                                       streamsSortingTypes, streamsSortingOrders,
                                       topHeight, values, setValues, onMore, hasMore,
                                       size, appLoading
}) => {
    return (
        <Box
            direction={'row'}
            height={windowHeight - topHeight + 'px'}
        >
            <StreamSearchFormContainer
                categoriesList={categoriesList}
                streamsSortingTypes={streamsSortingTypes}
                streamsSortingOrders={streamsSortingOrders}
                componentHeight={windowHeight}
                values={values}
                setValues={setValues}
            />
            <StreamsList
                onMore={onMore}
                height={windowHeight - topHeight + 'px'}
                streamsList={streamsList}
                hasMore={hasMore}
                size={size}
                appLoading={appLoading}
            />
        </Box>
    )
})

export default StreamPage
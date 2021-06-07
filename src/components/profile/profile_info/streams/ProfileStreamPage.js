import React from 'react'
import {Box} from 'grommet'
import StreamSearchFormContainer from '../../../main_page/body/stream_main/search_form/StreamSearchFormContainer'
import ProfileStreamsList from './ProfileStreamsList'

export default function ProfileStreamPage({
                                       categoriesList, windowHeight, streamsList,
                                       streamsSortingTypes, streamsSortingOrders,
                                       topHeight, values, setValues, onMore, hasMore,
                                       size, appLoading,profile, streamsSortingStatuses
}) {
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
                streamsSortingStatuses={streamsSortingStatuses}
            />
            <ProfileStreamsList
                onMore={onMore}
                height={windowHeight - topHeight + 'px'}
                streamsList={streamsList}
                hasMore={hasMore}
                size={size}
                appLoading={appLoading}
                profile={profile}
            />
        </Box>
    )
}
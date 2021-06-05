import React from 'react'
import {Box} from 'grommet'
import FormCore from './FormCore'

export default function StreamSearchForm({
                                             setValues, values, categoriesColl, size,
                                             streamsSortingTypes, streamsSortingOrders,
                                             componentHeight, streamsSortingStatuses
                                         }) {
    return (
        <>
            <Box
                direction={'row'}
                margin={{left: 'xsmall', right: 'small'}}
                basis={'medium'}
                overflow={'auto'}
                height={componentHeight}
            >
                <Box
                    flex={true}
                    direction={'row'}
                    pad={'small'}
                >
                    <FormCore
                        size={size}
                        categoriesColl={categoriesColl}
                        setValues={setValues}
                        values={values}
                        streamsSortingTypes={streamsSortingTypes}
                        streamsSortingOrders={streamsSortingOrders}
                        streamsSortingStatuses={streamsSortingStatuses}
                    />
                </Box>
            </Box>
        </>
    )
}
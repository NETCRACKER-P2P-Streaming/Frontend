import React from 'react'
import {Box, Button, Layer} from 'grommet'
import {Next, Previous} from 'grommet-icons'
import FormCore from './FormCore'

export default function StreamSearchFormMobile({
                                             setValues, values, categoriesColl,
                                             collapse, setCollapse, size, streamsSortingTypes,
                                             streamsSortingOrders, componentHeight, streamsSortingStatuses
                                         }) {
    return (
        <>
            <Box
                align={'center'}
                justify={'center'}
                pad={'medium'}
            >
                    <Button
                        label={<Next color={'brand'}/>}
                        plain={true}
                        onClick={() => setCollapse(!collapse)}
                    />

            </Box>
            {
                collapse
                &&
                <Layer
                        modal={true}
                        position={'top-left'}
                        full={'vertical'}
                        responsive={false}
                        animation={'fadeIn'}
                    >
                        <Box
                            direction={'row-reverse'}
                            width={'medium'}
                            justify={'center'}
                            align={'center'}
                            fill
                            pad={'medium'}

                        >
                            <Button
                                label={<Previous color={'brand'}/>}
                                justify={'center'}
                                plain={true}
                                onClick={() => setCollapse(!collapse)}
                                margin={{left: 'medium'}}
                            />
                            <Box
                                overflow={'scroll'}
                                height={componentHeight + 'px'}
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
                    </Layer>
            }
        </>
    )
}
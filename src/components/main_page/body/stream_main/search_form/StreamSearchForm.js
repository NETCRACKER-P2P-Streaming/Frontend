import React from 'react'
import {Box} from 'grommet'
import FormCore from "./FormCore";

export default function StreamSearchForm({
                                             setValues, values, loading, categoriesColl, size
                                         }) {
    return (
        <>
            <Box
                direction={'row'}
                margin={{left: 'xsmall', right: 'large'}}
                width={'medium'}
            >
                <Box
                    flex={true}
                    direction={'row'}
                    width={'medium'}
                >
                    <FormCore
                        size={size}
                        categoriesColl={categoriesColl}
                        loading={loading}
                        setValues={setValues}
                        values={values}
                    />
                </Box>
            </Box>
        </>
    )
}
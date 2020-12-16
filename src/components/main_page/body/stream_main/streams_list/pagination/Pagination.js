import React from 'react'
import {Box, Button, Text} from 'grommet'
import {Next, Previous} from 'grommet-icons'

export default function Pagination({totalCount, actualPageNumber, paginationSize}) {
    const pagesRadiusArray = [],
        countOfPages = Math.ceil(totalCount / paginationSize),

        /*  Границы для заполнение массива значениями 1...[5, 6, 7, 8]...12 */
        startOfIteration = actualPageNumber <= 4 ? 1 : actualPageNumber - 2,
        endOfIteration = actualPageNumber >= (countOfPages - 3) ? countOfPages : actualPageNumber + 2

    for(let i = startOfIteration; i <= endOfIteration; i++)
        pagesRadiusArray.push(i)

    return (
        <Box
            direction={'row'}
            align={'baseline'}
            margin={{
                horizontal: 'auto'
            }}
        >
            <Button
                icon={<Previous size={'small'}/>}
            />
            {
                actualPageNumber > 4
                    ? <>
                        <Text>1</Text>
                        <Text>&nbsp;...&nbsp;</Text>
                    </>
                    : null
            }
            {
                pagesRadiusArray.map(pageItem => <Text>{pageItem}</Text>)
            }
            {
                actualPageNumber < countOfPages - 3
                    ? <>
                        <Text>&nbsp;...&nbsp;</Text>
                        <Text>{countOfPages}</Text>
                    </>
                    : null
            }
            <Button
                icon={<Next size={'small'}/>}
            />
        </Box>
    )
}
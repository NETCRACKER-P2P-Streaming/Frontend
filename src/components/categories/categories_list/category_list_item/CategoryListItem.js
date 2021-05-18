import React from 'react'
import { Box, Button, Text } from 'grommet'

export default function CategoryListItem({ 
                                            categoryTitle, categoryDesc, 
                                            categoryId, deleteOneCategory 
                                         }) {
    return (
        <Box
            height={'140px'}
            width={'300px'}
            elevation={'medium'}
            margin={'small'}
        >
            <Box
                direction={'row'}
                justify={'around'}
                pad={{horizontal: 'small'}}
                margin={{top: 'xsmall'}}
            >
                <Box
                    width={'small'}
                    align={'center'}
                >
                    <Text
                        color={'dark-3'}
                        weight={'bold'}
                        size={'large'}
                        margin={{bottom: 'xsmall'}}
                    >{categoryTitle}</Text>
                    <Text
                        color={'dark-4'}
                        size={'medium'}
                    >{categoryDesc}</Text>
                    <Button 
                        margin={{ top: 'small' }}
                        label={'Delete category'} 
                        size={'small'} 
                        onClick={()=>{deleteOneCategory(categoryId)}}
                    >
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
import React from 'react'
import { Box, Button, Text } from 'grommet'
import { Trash } from 'grommet-icons'


export default function CategoryListItem({ 
                                            categoryTitle, categoryDesc, 
                                            categoryId, deleteOneCategory, goToEditMode 
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
                    <Box
                        direction={'row'}
                        pad={ 'xsmall'}
                        justify={'stretch'}

                    >
                        <Button
                            default={true}
                            label={'Edit category'}
                            size={'small'} 
                            onClick={goToEditMode} 
                            color={'Silver'}

                        />&nbsp;&nbsp;&nbsp;
                        <Button 
                            margin={{ top: 'small' }}
                            size={'small'} 
                            onClick={()=>{deleteOneCategory(categoryId)}}
                            icon={<Trash />}
                            plain={'true'}

                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
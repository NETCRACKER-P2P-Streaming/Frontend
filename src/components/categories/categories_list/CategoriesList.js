import React from 'react'
import {Box, Text} from 'grommet'
import InfiniteScroll from 'react-infinite-scroll-component'
import {InProgress} from 'grommet-icons'
import CategoryListItemContainer from './category_list_item/CategoryListItemContainer'

export default function CategoriesList({ categoriesList, height, onMore, updateOneCategory,
                                         hasMore, size, appLoading, deleteOneCategory }) {
    return <Box
        margin={{vertical: '0', horizontal: 'auto'}}
        basis={size === 'small' ? 'full' : '3/4'}
        height={height}
        className={'scrolled'}
        id={'category_container'}
    >
        {
            !hasMore && categoriesList.length === 0 && !appLoading
                ? <Text
                    color={'brand'}
                    alignSelf={'center'}
                    margin={'medium'}
                    size={'xlarge'}
                    weight={'bold'}
                >
                    There is nothing here yet :(
                </Text>
                : <InfiniteScroll
                    dataLength={categoriesList.length}
                    hasMore={true}
                    next={onMore}
                    loader={!appLoading && hasMore && <CustomLoader/>}
                    scrollableTarget={'category_container'}
                    style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}
                >
                    {
                        categoriesList.map((c) => <CategoryListItemContainer
                            categoryDesc={c.description}
                            categoryTitle={c.name}
                            categoryId={c.id}
                            deleteOneCategory={deleteOneCategory}
                            updateOneCategory={updateOneCategory}
                        />)
                    }
                </InfiniteScroll>
        }
    </Box>
}

function CustomLoader() {
    return (
        <Box
            fill
            align={'center'}
            margin={{vertical: 'medium'}}
        >
            <Box
                animation={{
                    type: 'pulse',
                    delay: 0,
                    duration: 500,
                    size: 'medium'
                }}
            >
                <InProgress
                    color={'brand'}
                    size={'xlarge'}
                />
            </Box>
        </Box>
    )
}
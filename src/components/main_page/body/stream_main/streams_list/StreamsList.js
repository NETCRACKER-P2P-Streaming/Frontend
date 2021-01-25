import React from 'react'
import {Box} from 'grommet'
import InfiniteScroll from 'react-infinite-scroll-component'
import {InProgress} from 'grommet-icons'
import StreamListItemContainer from './stream_list_item/StreamListItemContainer'

export default function StreamsList({streamsList, height, onMore, hasMore, size}) {
    return <Box
        margin={{vertical: '0', horizontal: 'auto'}}
        basis={size ==='small' ? 'full' : '3/4'}
        height={height}
        className={'scrolled'}
        id={'stream_container'}
    >
        <InfiniteScroll
            dataLength={streamsList.length}
            hasMore={true}
            next={onMore}
            loader={hasMore && <CustomLoader />}
            scrollableTarget={'stream_container'}
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around'}}
        >
            {
                streamsList.map((s) => <StreamListItemContainer
                    key={s.userId}
                    userId={s.userId}
                    streamTitle={s?.streamDesc.title}
                    fullCategories={s?.streamDesc.fullCategories}
                    countViewers={s?.information.countViewers}
                    streamLinkImage={s?.streamDesc.linkImage}
                    streamUserAttributes={s?.user}
                />)
            }
        </InfiniteScroll>
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
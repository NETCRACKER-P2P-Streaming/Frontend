import React, {useState} from 'react'
import {Box, TextInput} from 'grommet'
import {Down} from 'grommet-icons'
import StreamInfo from './StreamInfo'

export default function Chat({
                                 chatRef, height, avatarImage, countViewers,
                                 fullCategories, streamTitle, streamUserAttributes, userId,
                                 streamDesc
                             }) {

    const [isStreamInfoOpened, setStreamInfoOpened] = useState(false)
    return <Box
        height={height}
        width={'small'}
        direction={'column'}
        flex={true}
        ref={chatRef}
    >

        {/*{*/}
        {/*    isStreamInfoOpened || (*/}
        {/*        <Box*/}
        {/*            fill={'horizontal'}*/}
        {/*            background={'neutral-2'}*/}
        {/*            round={{corner: 'bottom', size: 'xlarge'}}*/}
        {/*            align={'center'}*/}
        {/*            style={{cursor: 'pointer'}}*/}
        {/*            animation={{*/}
        {/*                type: 'fadeIn',*/}
        {/*                delay: 0,*/}
        {/*                duration: 500,*/}
        {/*                size: "xsmall"*/}
        {/*            }}*/}
        {/*            onClick={() => setStreamInfoOpened(!isStreamInfoOpened)}*/}
        {/*        >*/}
        {/*            <Down />*/}
        {/*        </Box>*/}
        {/*    )*/}
        {/*}*/}

        {/*{
            isStreamInfoOpened
                ?*/}
        <StreamInfo
            streamTitle={streamTitle}
            avatarImage={avatarImage}
            userId={userId}
            fullCategories={fullCategories}
            isStreamInfoOpened={isStreamInfoOpened}
            setStreamInfoOpened={setStreamInfoOpened}
            streamDesc={streamDesc}
            countViewers={countViewers + 1}
        />
        {/*: <>*/}
        {/*    <Box*/}
        {/*        fill={'vertical'}*/}
        {/*    >*/}

        {/*    </Box>*/}
        {/*    <TextInput*/}
        {/*        placeholder={'Send a message'}*/}
        {/*        width={'large'}*/}
        {/*    />*/}
        {/*</>*/}
        {/*}*/}

    </Box>
}
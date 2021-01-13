import React from 'react'
import {Main} from 'grommet'
import StreamSearchFormContainer from './stream_main/search_form/StreamSearchFormContainer'
import StreamsListContainer from './stream_main/streams_list/StreamsListContainer'

export default function MainBody() {
    return (
        <Main
            direction={'row'}
        >
            <StreamSearchFormContainer/>
            <StreamsListContainer />
        </Main>
    )
}

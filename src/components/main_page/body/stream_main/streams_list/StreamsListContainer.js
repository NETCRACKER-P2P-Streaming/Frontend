import React, {useState} from 'react'
import {connect} from 'react-redux'
import StreamsList from './StreamsList'
import {
    streamsListSelect,
    streamsTotalCount
} from '../../../../../redux/selectors/selectors'
//import Pagination from './pagination/Pagination'
import {Box} from 'grommet'


function StreamsListContainer({streamsList, streamsTotalCount}) {

    const [loading, setLoading] = useState(false)

    return <Box
        direction={'column'}
    >
        <StreamsList
            streamsList={streamsList}
            loading={loading}
            streamsTotalCount={streamsTotalCount}
        />
        {
            /*
                <Pagination
                    paginationSize={4}
                    totalCount={30}
                    actualPageNumber={4}
                />
             */
        }

    </Box>
}

function mapStateToProps(state) {
    return {
        streamsList: streamsListSelect(state),
        streamsTotalCount: streamsTotalCount(state)
    }
}

export default connect(mapStateToProps, {})(StreamsListContainer)
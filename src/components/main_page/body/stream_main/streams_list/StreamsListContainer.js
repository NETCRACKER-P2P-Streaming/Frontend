import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import StreamsList from './StreamsList'
import {streamsListSelect, streamsTotalCount} from '../../../../../redux/selectors/selectors'
import useWindowDimensions from '../../../../utils/useWindowDimention'


function StreamsListContainer({streamsList, streamsTotalCount}) {

    const [loading, setLoading] = useState(false)
    const { height, width } = useWindowDimensions()
    const [headerHei, setHeaderHei] = useState(document.querySelector('header')?.clientHeight)

    useEffect(() => {

        setHeaderHei(document.querySelector('header')?.clientHeight)

    }, [height, width])

    return <StreamsList
            streamsList={streamsList}
            loading={loading}
            streamsTotalCount={streamsTotalCount}
            height={height - headerHei + 'px'}
        />
}

function mapStateToProps(state) {
    return {
        streamsList: streamsListSelect(state),
        streamsTotalCount: streamsTotalCount(state)
    }
}

export default connect(mapStateToProps, {})(StreamsListContainer)
import React from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Stream from './Stream'

function StreamContainer(props) {
    const history = useHistory()

    return <Stream
        streamId={props.match.params.streamId}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {

})(StreamContainer)
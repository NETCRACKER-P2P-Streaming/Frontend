import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Stream from './Stream'
import * as Stomp from 'stomp-websocket'
import useWindowDimensions from "../../../utils/useWindowDimention";

function StreamContainer(props) {

    const history = useHistory()

    const {height, width} = useWindowDimensions()
    const [headerHei, setHeaderHei] = useState(document.querySelector('header')?.clientHeight)
    useEffect(
        () => setHeaderHei(document.querySelector('header')?.clientHeight),
        [height, width]
    )

    useEffect(() => {
        //connectToStream()
    }, [])
    async function connectToStream() {
        const ws = new WebSocket('ws://localhost:3030/signaling')
        const client = Stomp.over(ws)
        const watcherPeerConnection = new RTCPeerConnection({})
        const offer = await watcherPeerConnection.createOffer()
        await watcherPeerConnection.setLocalDescription(offer)

        ws.onopen = evt => {
            client.subscribe('/user/queue/api/error', message => console.log(message))

            client.subscribe('/user/queue/viewer/answer', message => {
                watcherPeerConnection.setLocalDescription(JSON.parse(message).answerSDP.sdp)
            })
        }

        client.send(`/app/viewer/offer`, {}, JSON.stringify({
            streamId: props.match.params.streamId,
            offerSDP: {
                sdp: watcherPeerConnection.localDescription.sdp
            }
        }))


    }

    return <Stream
        streamId={props.match.params.streamId}
        height={height - headerHei + 'px'}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {

})(StreamContainer)
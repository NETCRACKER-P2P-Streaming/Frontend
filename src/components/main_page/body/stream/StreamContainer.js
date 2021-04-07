import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Stream from './Stream'
import * as Stomp from 'stomp-websocket'
import useWindowDimensions from "../../../utils/useWindowDimention";


async function connectToStream(streamId) {
    const ws = new WebSocket('ws://localhost:3030/signaling')
    const client = Stomp.over(ws)
    const watcherPeerConnection = new RTCPeerConnection({})
    const offer = await watcherPeerConnection.createOffer()

    const onConnect = frame => {
        client.subscribe('/user/queue/api/error', message => console.log(message))
        client.send(
            '/app/viewer/offer',
            {},
            JSON.stringify({
                streamId: streamId,
                offerSDP: {
                    sdp: offer.sdp
                }
            })
        )
        client.subscribe('/user/queue/viewer/answer', message => {
            watcherPeerConnection.setLocalDescription(JSON.parse(message).answerSDP.sdp)
        })
    }
    if (ws.readyState === WebSocket.OPEN) {
        onConnect()
    } else {
        client.connect({}, onConnect)
    }
}


function StreamContainer(props) {

    const history = useHistory()

    const {height, width} = useWindowDimensions()
    const [headerHei, setHeaderHei] = useState(document.querySelector('header')?.clientHeight)
    useEffect(
        () => setHeaderHei(document.querySelector('header')?.clientHeight),
        [height, width]
    )

    useEffect(() => {
        connectToStream(props.match.params.streamId)
    }, [])

    const [isStreamCommonInfoOpened, setStreamCommonInfoOpened] = useState(false)
    return <Stream
        streamId={props.match.params.streamId}
        height={height - headerHei + 'px'}
        isStreamCommonInfoOpened={isStreamCommonInfoOpened}
        setStreamCommonInfoOpened={setStreamCommonInfoOpened}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(StreamContainer)
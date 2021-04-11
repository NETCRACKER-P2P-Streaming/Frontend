import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Stream from './Stream'
import * as Stomp from 'stomp-websocket'
import useWindowDimensions from "../../../utils/useWindowDimention";

async function connectToStream(streamId) {
    const ws = new WebSocket('ws://localhost:3030/signaling')
    const client = Stomp.over(ws)
    const watcherPeerConnection = new RTCPeerConnection({
        /*iceServers: [     // Information about ICE servers - Use your own!
            {
                urls: "stun:stun4.l.google.com:19302"
            }
        ]*/
    })

    function onicecandidate(event) {
        if (!watcherPeerConnection || !event || !event.candidate)
            return
        const candidate = event.candidate
        alert(candidate)

        // POST-ICE-to-other-Peer(candidate.candidate, candidate.sdpMLineIndex);
    }
    watcherPeerConnection.addEventListener("icecandidate", onicecandidate)

    watcherPeerConnection.ontrack = e => {
        document.getElementById('my_video').srcObject = e.streams[0]
    }

    const onConnect = frame => {


        client.subscribe('/user/queue/api/error', message => console.log(message))
        watcherPeerConnection.createOffer()
            .then(offer => watcherPeerConnection.setLocalDescription(offer))
            .then(() => {
                client.send(
                    '/app/viewer/offer',
                    {},
                    JSON.stringify({
                        streamId: streamId,
                        offerSDP: {
                            sdp: watcherPeerConnection.localDescription.sdp
                        }
                    })
                )
            })

        client.subscribe('/user/queue/viewer/answer', message => {
            const messageParsed = JSON.parse(message.body)
            watcherPeerConnection.setRemoteDescription({sdp: messageParsed.answerSDP.sdp, type: 'answer'})
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
import React, {useEffect, useLayoutEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Stream from './Stream'
import * as Stomp from 'stomp-websocket'
import useWindowDimensions from "../../../utils/useWindowDimention";

let watcherPeerConnection = null
let client = null
let config = {
    iceServers: [     // Information about ICE servers - Use your own!
        {
            'urls': [
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun.l.google.com:19302?transport=udp',
            ]
        }
    ]
}

async function connectToStream(streamId) {
    const ws = new WebSocket('ws://localhost:3030/signaling')
    client = Stomp.over(ws)


    let headers = {
        'stream-id': streamId
    };
    watcherPeerConnection = new RTCPeerConnection(config)
    watcherPeerConnection.ontrack = event => {
        console.log("tracked =", event.streams.length)
        document.getElementById('my_video').srcObject = event.streams[0]
    }
    watcherPeerConnection.onsignalingstatechange = function() {
        if (watcherPeerConnection && watcherPeerConnection.iceConnectionState && watcherPeerConnection.iceConnectionState.search(/disconnected|closed|failed/gi) !== -1) {
            console.log("Remove stream ended")
        }
    };

    const onConnect = frame => {
        client.subscribe('/user/queue/api/error', message => console.log(message))
        //Ждем сообщения от стримера

        client.subscribe('/user/queue/offer', message => {
            const messageParsed = JSON.parse(message.body)
            console.log(`1. Offer received ${messageParsed.sessionId}`)
            watcherPeerConnection
                .setRemoteDescription({sdp: messageParsed.sdp, type: 'offer'})
                .then(() => watcherPeerConnection.createAnswer())
                .then(sdp => watcherPeerConnection.setLocalDescription(sdp))
                .then(() => {
                    console.log("3. Answer sent")
                    client.send("/app/answer", {},
                        JSON.stringify({
                            streamId: streamId,
                            sdp: watcherPeerConnection.localDescription.sdp
                        }));
                }).catch(e => console.log(e));;
        })

        watcherPeerConnection.onicecandidate = event => {
            if (event.candidate) {
                console.log(`4. Candidate sent for ${streamId}`)
                client.send("/app/watcher/candidate", {}, JSON.stringify({
                    streamId: streamId,
                    candidate: event.candidate
                }));
            }
            console.log(watcherPeerConnection)
        };

        client.subscribe("/user/queue/watcher/candidate", message => {
            const messageParsed = JSON.parse(message.body)
            console.log(`2. Candidate received ${messageParsed.sessionId}`)
            try {
                watcherPeerConnection
                    .addIceCandidate(new RTCIceCandidate(messageParsed.candidate))
                    .catch(e => console.log(e));
            } catch (e) {
                console.log("Known issue")
            }
        })

    }
    if (ws.readyState === WebSocket.OPEN) {
        onConnect()
    } else {
        client.connect(headers, onConnect)
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

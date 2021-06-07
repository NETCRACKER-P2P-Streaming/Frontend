import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import Stream from './Stream'
import * as Stomp from 'stomp-websocket'
import useWindowDimensions from '../../../utils/useWindowDimention'
import {
    selectActualStream,
    selectStreamsList,
    selectUserData,
    selectViewerStreamStates
} from '../../../../redux/selectors/selectors'
import {
    increaseViewsOnServ,
    increaseViewersOnServ,
    decreaseViewersOnServ,
    setActualStream, getSingleStreamFromServ
} from '../../../../redux/reducers/stream_reducer'
import ReactPlayer from 'react-player'
import {Redirect, useHistory} from 'react-router-dom'
import {config} from '../../../../config/config'

let tracks = null
const connectionConfig = {
    iceServers: [
        {
            'urls': [
                'stun:stun.sipgate.net',
                'stun:stun.l.google.com:19302',
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun.l.google.com:19302?transport=udp',
            ]
        }
    ]
}

const MyPlayer = () => {
    return <ReactPlayer
        url={tracks}
        controls={true}
        height={'100%'}
        width={'100%'}
        playing={true}
    >

    </ReactPlayer>
}


function StreamContainer({
                             streamsList, watcherId, streamStates, increaseViewsOnServ,
                             increaseViewersOnServ, setActualStream, actualStream,
                             getSingleStreamFromServ,
                             decreaseViewersOnServ, ...props
                         }) {

    const [isStreamInitialized, setStreamInitialized] = useState(streamStates.NON_INITIALIZED)

    async function connectToStream(streamId) {
        const ws = new WebSocket(config.signalingSocketAddress)
        const client = Stomp.over(ws)

        const onConnect = frame => {
            const watcherPeerConnection = new RTCPeerConnection(connectionConfig)

            increaseViewsOnServ(streamId)
            increaseViewersOnServ(streamId)

            watcherPeerConnection.ontrack = e => {
                tracks = e.streams[0]
                setStreamInitialized(streamStates.OPENED)
            }

            client.subscribe('/user/queue/api/error', message => console.log(message.body))

            client.subscribe('/user/queue/viewer/offer', message => {
                const sdp = JSON.parse(message.body).sdp
                watcherPeerConnection.setRemoteDescription({sdp, type: 'offer'})
                    .then(() => watcherPeerConnection.createAnswer())
                    .then(answer => watcherPeerConnection.setLocalDescription(answer))
                    .then(() => {
                        client.send(
                            '/app/answer',
                            {},
                            JSON.stringify({
                                recipientId: streamId,
                                sdp: watcherPeerConnection.localDescription.sdp
                            })
                        )
                    })
                    .then(() => {
                        watcherPeerConnection.onicecandidate = event => {
                            if (event.candidate && watcherPeerConnection.localDescription && watcherPeerConnection?.remoteDescription?.type) {
                                client.send(
                                    '/app/viewer/candidate',
                                    {},
                                    JSON.stringify({
                                        recipientId: streamId,
                                        candidate: event.candidate
                                    })
                                )
                            }
                        }
                    })
            })

            client.subscribe('/user/queue/viewer/candidate', message => {
                const messageParsed = JSON.parse(message.body)
                watcherPeerConnection
                    .addIceCandidate(new RTCIceCandidate(messageParsed.candidate))
            })

            client.subscribe(`/topic/streamer/${streamId}/close`, message => {
                setStreamInitialized(streamStates.CLOSED)
                watcherPeerConnection.close()
            })

            setTimeout(() => {
                watcherPeerConnection.createOffer()
                    .then(offer => watcherPeerConnection.setLocalDescription(offer))
                    .then(() => {
                        client.send(
                            '/app/notify',
                            {},
                            JSON.stringify({id: streamId})
                        )
                    })
            }, 1000)
        }
        if (ws.readyState === WebSocket.OPEN) {
            onConnect()
        } else {
            client.connect({}, onConnect)
        }
    }

    const actualStreamId = props.match.params.streamId
    const {height, width} = useWindowDimensions()
    const [headerHei, setHeaderHei] = useState(document.querySelector('header')?.clientHeight)
    const history = useHistory()
    const [avatarImage, setAvatarImage] = useState(null)
    const streamUserAttributes = actualStream?.user

    useEffect(() => {
        // Если у пользователя существует поле аватарки -
        // идет проверка на валидность используемого изображения. Если изображение
        // не может быть загружено, тогда идет установка изображения в null
        // -> будет отображена заглушка
        if (streamUserAttributes && streamUserAttributes['custom:linkImage']) {
            const img = new Image()
            img.onload = () => {
                setAvatarImage(streamUserAttributes['custom:linkImage'])
            }
            img.onerror = () => {
                setAvatarImage(null)
            }
            img.src = streamUserAttributes['custom:linkImage']
        }
    }, [streamUserAttributes])

    useEffect(
        () => setHeaderHei(document.querySelector('header')?.clientHeight),
        [height, width]
    )


    useEffect(() => {
        window.onunload = () => {
            decreaseViewersOnServ(actualStreamId)
        }
        getSingleStreamFromServ(actualStreamId)
            .then(stream => {
                setActualStream(stream)
                return stream
            })
            .then(stream => {
                if(stream && stream.information.status === 'RUNNING') {
                    return connectToStream(stream.id)
                }
                return Promise.resolve()
            })
            .catch(e => {
                console.log(e.message)
                history.push('/')
            })

        return () => {
            decreaseViewersOnServ(actualStreamId)
        }
    }, [])

    const [isStreamCommonInfoOpened, setStreamCommonInfoOpened] = useState(false)

    let mustBeClosed = true
    const openStreamCommonInfo = () => {
        if (isStreamInitialized === streamStates.OPENED) {
            mustBeClosed = false
            setStreamCommonInfoOpened(true)
        }
    }
    const closeStreamCommonInfo = () => {
        mustBeClosed = true
        setTimeout(() => mustBeClosed ? setStreamCommonInfoOpened(false) : null, 500)
    }

    if (watcherId && actualStream && watcherId === actualStream?.userId) {
        return <Redirect
            to={`/start-stream/${actualStream.id}`}
        />
    }
    if(!actualStream) {
        return <div></div>
    }
    return <Stream
        streamTitle={actualStream?.streamDesc.title}
        fullCategories={actualStream?.streamDesc.fullCategories}
        countViewers={actualStream?.information.countViewers}
        streamDesc={actualStream?.streamDesc.description}
        userId={actualStream?.userId}
        status={actualStream?.information.status}
        avatarImage={avatarImage}
        streamUserAttributes={actualStream?.user}
        height={height - headerHei + 'px'}
        isStreamCommonInfoOpened={isStreamCommonInfoOpened}
        openStreamCommonInfo={openStreamCommonInfo}
        closeStreamCommonInfo={closeStreamCommonInfo}
        MyPlayer={MyPlayer}
        isStreamInit={isStreamInitialized}
        streamStates={streamStates}
    />
}

function mapStateToProps(state) {
    return {
        streamsList: selectStreamsList(state),
        watcherId: selectUserData(state)?.username,
        streamStates: selectViewerStreamStates(state),
        actualStream: selectActualStream(state)
    }
}

export default connect(mapStateToProps, {
    increaseViewsOnServ,
    increaseViewersOnServ,
    decreaseViewersOnServ,
    setActualStream,
    getSingleStreamFromServ
})(StreamContainer)
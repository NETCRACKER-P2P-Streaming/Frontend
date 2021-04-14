import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Stream from './Stream'
import * as Stomp from 'stomp-websocket'
import useWindowDimensions from '../../../utils/useWindowDimention'
import {selectStreamsList} from '../../../../redux/selectors/selectors'
import StreamListItemContainer from "../stream_main/streams_list/stream_list_item/StreamListItemContainer";

const connectionConfig = {
    iceServers: [
        {
            urls: "stun:stun4.l.google.com:19302"
        }
    ]
}
async function connectToStream(streamId) {
    const ws = new WebSocket('ws://localhost:3030/signaling')
    const client = Stomp.over(ws)
    const watcherPeerConnection = new RTCPeerConnection(connectionConfig)

    /*function onicecandidate(event) {
        if (!watcherPeerConnection || !event || !event.candidate)
            return
        const candidate = event.candidate
        alert(candidate)
    }
    watcherPeerConnection.addEventListener("icecandidate", onicecandidate)
*/
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


function StreamContainer({streamsList, ...props}) {

    const actualStreamId = props.match.params.streamId
    const actualStream = streamsList.filter(s => s.id === actualStreamId)[0]
    const {height, width} = useWindowDimensions()
    const [headerHei, setHeaderHei] = useState(document.querySelector('header')?.clientHeight)

    const [avatarImage, setAvatarImage] = useState(null)
    const streamUserAttributes = actualStream.user

    useEffect(() => {
        // Если у пользователя существует поле аватарки -
        // идет проверка на валидность используемого изображения. Если изображение
        // не может быть загружено, тогда идет установка изображения в null
        // -> будет отображена заглушка
        if(streamUserAttributes && streamUserAttributes['custom:linkImage']) {
            const img = new Image()
            img.onload = () => {setAvatarImage(streamUserAttributes['custom:linkImage'])}
            img.onerror = () => {setAvatarImage(null)}
            img.src = streamUserAttributes['custom:linkImage']
        }
    }, [streamUserAttributes])

    useEffect(
        () => setHeaderHei(document.querySelector('header')?.clientHeight),
        [height, width]
    )

    useEffect(() => {
        connectToStream(actualStreamId)
            .catch(e => console.log(e.message))
    }, [])

    const [isStreamCommonInfoOpened, setStreamCommonInfoOpened] = useState(false)

    let mustBeClosed = true
    const openStreamCommonInfo = () => {
        mustBeClosed = false
        setStreamCommonInfoOpened(true)
    }
    const closeStreamCommonInfo = () => {
        mustBeClosed = true
        setTimeout(() => mustBeClosed ? setStreamCommonInfoOpened(false) : null, 500)
    }

    return <Stream
        streamTitle={actualStream.streamDesc.title}
        fullCategories={actualStream.streamDesc.fullCategories}
        countViewers={actualStream.information.countViewers}
        streamDesc={actualStream.streamDesc.description}
        userId={actualStream.userId}
        avatarImage={avatarImage}
        streamUserAttributes={actualStream.user}
        height={height - headerHei + 'px'}
        isStreamCommonInfoOpened={isStreamCommonInfoOpened}
        openStreamCommonInfo={openStreamCommonInfo}
        closeStreamCommonInfo={closeStreamCommonInfo}
    />
}

function mapStateToProps(state) {
    return {
        streamsList: selectStreamsList(state)
    }
}

export default connect(mapStateToProps, {})(StreamContainer)
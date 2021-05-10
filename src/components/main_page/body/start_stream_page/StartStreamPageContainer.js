import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import StartStreamPage from './StartStreamPage'
import {addStreamOnServ, setActualStream, deleteStreamOnServ} from '../../../../redux/reducers/stream_reducer'
import {getCategoriesToSearchFromServ} from '../../../../redux/reducers/category_reducer'
import {getUser} from '../../../../API/user_api'
import {
    selectActualStream,
    selectCategoriesList,
    selectStreamerStreamStates, selectUserData
} from '../../../../redux/selectors/selectors'
import {setLoadingAC} from '../../../../redux/reducers/app_reducer'
import Notification from '../../../util_components/Notification'
import {closeStream} from '../../../../API/streams_api'
import * as Stomp from 'stomp-websocket'
import {useHistory} from 'react-router-dom'

export let stream = null
const connections = new Map()
let viewersCounterForCleaning = 0
const peerConnectionConfig = {
    iceServers: [
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

export async function openStreamerConnection(streamId) {
    const ws = new WebSocket('ws://localhost:8081/signaling')
    const client = Stomp.over(ws)

    client.connect({}, frame => {

        client.subscribe(`/queue/${streamId}/streamer/listen`, message => {
            const messageParsed = JSON.parse(message.body)
            const streamerPeerConnection = new RTCPeerConnection(peerConnectionConfig)
            connections[messageParsed.id] = streamerPeerConnection
            stream.getTracks().forEach(t => streamerPeerConnection.addTrack(t, stream))

            cleanConnections()
            // 3
            streamerPeerConnection.createOffer()
                .then(offer => streamerPeerConnection.setLocalDescription(offer))
                .then(() => client.send(
                    '/app/offer',
                    {},
                    JSON.stringify({
                        viewerId: messageParsed.id,
                        sdp: streamerPeerConnection.localDescription.sdp
                    })
                ))
        })

        client.subscribe(`/queue/${streamId}/streamer/answer`, message => {
            const messageParsed = JSON.parse(message.body)
            connections[messageParsed.viewerId].setRemoteDescription({sdp: messageParsed.sdp, type: 'answer'})

            connections[messageParsed.viewerId].onicecandidate = event => {
                if (event.candidate && connections[messageParsed.viewerId].localDescription && connections[messageParsed.viewerId]?.remoteDescription?.type) {
                    client.send(
                        '/app/streamer/candidate',
                        {},
                        JSON.stringify({
                            viewerId: messageParsed.viewerId,
                            icecandidate: event.candidate
                        })
                    )
                }
            }
        })

        client.subscribe(`/queue/${streamId}/streamer/candidate`, message => {
            const messageParsed = JSON.parse(message.body)
            connections[messageParsed.sessionId]
                .addIceCandidate(new RTCIceCandidate(messageParsed.icecandidate))
        })
    })
}


async function cleanConnections() {
    viewersCounterForCleaning++
    if (viewersCounterForCleaning >= 10) {
        for (let key of connections.keys()) {
            if (connections[key].connectionState === 'closed' || connections[key].connectionState === 'failed') {
                connections.delete(key)
            }
        }
        viewersCounterForCleaning = 0
    }
}

function StartStreamPageContainer({
                                      headerHei, height, addStreamOnServ, getCategoriesToSearchFromServ,
                                      categories, setLoading, actualStream, streamStates, setActualStream,
                                      deleteStreamOnServ, actualUser
                                  }) {

    const initialStartStreamFormValues = {
        title: '',
        description: '',
        linkImage: '',
        categories: []
    }

    const [streamState, setStreamState] = useState(streamStates.NON_INITIALIZED)
    const [isEditable, setIsEditable] = useState(false)
    const [areNotificationOpen, setNotificationOpen] = useState(false)
    const [selectOptions, setSelectOptions] = useState(categories)
    const [startStreamFormValues, setStartStreamFormValues] = useState(initialStartStreamFormValues)
    const history = useHistory()

    useEffect(() => {console.log(streamState)}, [streamState])

    useEffect(() => {
        setLoading(true)
        getCategoriesToSearchFromServ()
            .catch(err => {
                alert(err.message)
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        setSelectOptions(categories)
    }, [categories])


    function getPrettyStreamCategories(fullCategories) {
        return categories
            .filter(x => fullCategories.includes(x.id))
            .map(x => x.name)
    }

    const showNotification = () => {
        setNotificationOpen(true)
        setTimeout(() => {
            setNotificationOpen(false)
        }, 3000)
    }

    async function onStartSharing() {
        try {
            const options = {
                video: {
                    cursor: true,
                },
                audio: true
            }
            stream = await navigator.mediaDevices.getDisplayMedia(options)
            document.getElementById('share_video_container').srcObject = stream
            if(streamState === streamStates.NON_INITIALIZED) {
                setStreamState(streamStates.PREPARED)
            }
            if(streamState === streamStates.SUSPENDED) {
                setStreamState(streamStates.SUSPENDED_PREPARED)
            }

            stream.oninactive = () => onStopSharing()

        } catch (err) {
            console.error(err)
        }
    }

    function onStopSharing() {
        try {
            const _videoElem = document.getElementById('share_video_container')
            let tracks = _videoElem.srcObject.getTracks()
            tracks.forEach(track => track.stop())
            _videoElem.srcObject = null

            if(!actualStream) {
                setStreamState(streamStates.NON_INITIALIZED)
            }
            // } else {
            //
            //     // closeStream(actualStream.id, 'some cause')
            //     //     .catch(err => alert(err))
            // }

        } catch (err) {
            console.error(err)
        }
    }

    function onDeleteStream() {
        try {
            deleteStreamOnServ(actualStream.id)
                .then(() => history.push('/'))
        } catch (err) {
            alert(err)
        }
    }

    function onSuspendStream() {
        onStopSharing()
        closeStream(actualStream.id, 'some cause')
            .then(() => setStreamState(streamStates.SUSPENDED))
            .catch(err => alert(err))
    }

    function onResumeStream() {
        if(streamState === streamStates.SUSPENDED) {
            showNotification()
            return
        }
        openStreamerConnection(actualStream.id)
            .catch(err => alert(err))
        setStreamState(streamStates.OPENED)
    }

    function checkStreamState() {
        return streamState === streamStates.PREPARED
            || streamState === streamStates.OPENED
            || streamState === streamStates.SUSPENDED_PREPARED
    }

    function onSubmit(values) {
        if (streamState) {
            addStreamOnServ({
                ...values,
                categories: values.categories.filter(c => !!c)
            })
                .then(response => {
                    setActualStream(response)
                    setStartStreamFormValues({
                        title: response.streamDesc.title,
                        description: response.streamDesc.description,
                        linkImage: response.streamDesc.linkImage,
                        categories: response.streamDesc.categories
                    })
                    return response.id
                })
                .then(id => openStreamerConnection(id))
                .then(() => setStreamState(streamStates.OPENED))
                .catch(err => {
                    alert(err.message)
                    console.log(err)
                })
        } else {
            showNotification()
        }
    }

    return <StartStreamPage
        onStartSharing={onStartSharing}
        onStopSharing={onStopSharing}
        streamState={streamState}
        selectOptions={selectOptions}
        setSelectOptions={setSelectOptions}
        initialStartStreamFormValues={initialStartStreamFormValues}
        startStreamFormValues={startStreamFormValues}
        setStartStreamFormValues={setStartStreamFormValues}
        height={height}
        headerHei={headerHei}
        onSubmit={onSubmit}
        areNotificationOpen={areNotificationOpen}
        streamStates={streamStates}
        Notification={() => <Notification
            content={'You must select screen for sharing'}
            setAreOpen={setNotificationOpen}
        />}
        actualStream={actualStream}
        onResumeStream={onResumeStream}
        checkStreamState={checkStreamState}
        onSuspendStream={onSuspendStream}
        onDeleteStream={onDeleteStream}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        getPrettyStreamCategories={getPrettyStreamCategories}
        actualUser={actualUser}
    />
}


function mapStateToProps(state) {
    return {
        categories: selectCategoriesList(state),
        actualStream: selectActualStream(state),
        streamStates: selectStreamerStreamStates(state),
        actualUser: selectUserData(state)
    }
}

export default connect(mapStateToProps, {
    addStreamOnServ,
    getCategoriesToSearchFromServ,
    setLoading: setLoadingAC,
    setActualStream,
    deleteStreamOnServ
})(StartStreamPageContainer)
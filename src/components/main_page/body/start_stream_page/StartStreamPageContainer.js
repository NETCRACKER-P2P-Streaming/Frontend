import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import StartStreamPage from './StartStreamPage'
import {
    addStreamOnServ,
    setActualStream,
    deleteStreamOnServ,
    editStreamOnServ,
    closeStreamOnServ,
    getSingleStreamFromServ
} from '../../../../redux/reducers/stream_reducer'
import {getCategoriesToSearchFromServ} from '../../../../redux/reducers/category_reducer'
import {
    selectActualStream, selectAppLoading,
    selectCategoriesList,
    selectStreamerStreamStates, selectUserData
} from '../../../../redux/selectors/selectors'
import {setLoadingAC} from '../../../../redux/reducers/app_reducer'
import Notification from '../../../util_components/Notification'
import * as Stomp from 'stomp-websocket'
import {useHistory, useParams} from 'react-router-dom'

export let stream = null
const connections = new Map()
let streamerPeerConnection
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
            streamerPeerConnection = new RTCPeerConnection(peerConnectionConfig)
            connections[messageParsed.id] = streamerPeerConnection
            if (stream) {
                stream.getTracks().forEach(t => streamerPeerConnection.addTrack(t, stream))
            }

            cleanConnections()
            streamerPeerConnection.createOffer()
                .then(offer => streamerPeerConnection.setLocalDescription(offer))
                .then(() => client.send(
                    '/app/offer',
                    {},
                    JSON.stringify({
                        recipientId: messageParsed.id,
                        sdp: streamerPeerConnection.localDescription.sdp
                    })
                ))
        })

        client.subscribe(`/queue/${streamId}/streamer/answer`, message => {
            const messageParsed = JSON.parse(message.body)
            connections[messageParsed.senderId].setRemoteDescription({sdp: messageParsed.sdp, type: 'answer'})

            connections[messageParsed.senderId].onicecandidate = event => {
                if (event.candidate && connections[messageParsed.senderId].localDescription && connections[messageParsed.viewerId]?.remoteDescription?.type) {
                    client.send(
                        '/app/streamer/candidate',
                        {},
                        JSON.stringify({
                            recipientId: messageParsed.senderId,
                            candidate: event.candidate
                        })
                    )
                }
            }
        })

        client.subscribe(`/queue/${streamId}/streamer/candidate`, message => {
            const messageParsed = JSON.parse(message.body)
            connections[messageParsed.senderId]
                .addIceCandidate(new RTCIceCandidate(messageParsed.candidate))
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
                                      headerHei,
                                      height,
                                      addStreamOnServ,
                                      getCategoriesToSearchFromServ,
                                      categories,
                                      setLoading,
                                      actualStream,
                                      setActualStream,
                                      deleteStreamOnServ,
                                      actualUser,
                                      editStreamOnServ,
                                      closeStreamOnServ,
                                      getSingleStreamFromServ,
                                      appLoading
                                  }) {

    const initialStartStreamFormValues = {
        title: '',
        description: '',
        linkImage: '',
        categories: []
    }


    const [isEditable, setIsEditable] = useState(false)
    const [isStreamInitialized, setIsStreamInitialized] = useState(false)
    const [areNotificationOpen, setNotificationOpen] = useState(false)
    const [selectOptions, setSelectOptions] = useState(categories)
    const [startStreamFormValues, setStartStreamFormValues] = useState(initialStartStreamFormValues)
    const history = useHistory()
    const {id} = useParams()

    useEffect(() => {
        setLoading(true)
        window.addEventListener('onbeforeunload', onStopSharing)
        const promises = []
        if (id) {
            const initStreamPromise = getSingleStreamFromServ(id)
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
                .catch(err => {
                    alert(err.message)
                    console.log(err)
                })

            promises.push(initStreamPromise)
        }

        getCategoriesToSearchFromServ()
        promises.push(getSingleStreamFromServ)

        Promise.all(promises)
            .catch(err => {
                alert(err.message)
                console.log(err)
            })
            .finally(() => setLoading(false))

        return () => {
            window.removeEventListener('onbeforeunload', onStopSharing)
            onStopSharing()
            setIsStreamInitialized(false)
            setIsEditable(false)
            setNotificationOpen(false)
            setStartStreamFormValues(initialStartStreamFormValues)
            setActualStream(null)
        }
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

    async function onStartSharing(e) {
        try {
            const options = {
                video: {
                    cursor: true,
                },
                audio: true
            }

            if (stream) {
                stream.getTracks().forEach(track => track.stop())
            }

            stream = await navigator.mediaDevices.getDisplayMedia(options)
            if (streamerPeerConnection) {
                const senders = streamerPeerConnection.getSenders()

                senders.map(s => s.replaceTrack(stream.getTracks().find(t => t.kind === s.track.kind, stream)))
            }
            document.getElementById('share_video_container').srcObject = stream
            setIsStreamInitialized(true)

            stream.oninactive = () => onStopSharing()


        } catch (err) {
            console.error(err)
        }
    }

    function onStopSharing() {
        try {
            if (stream) {
                let tracks = stream.getTracks()
                tracks.forEach(track => track.stop())
                stream = null
                setIsStreamInitialized(false)
            }
        } catch (err) {
            console.error(err)
        }
    }

    function onDeleteStream() {
        try {
            deleteStreamOnServ(actualStream.id)
                .then(() => onStopSharing())
                .then(() => history.push('/'))
                .then(() => setActualStream(null))
        } catch (err) {
            alert(err)
        }
    }

    function onCloseStream() {
        try {
            closeStreamOnServ(actualStream.id)
                .then(() => onStopSharing())
                .then(() => history.push('/'))
                .then(() => setActualStream(null))
        } catch (err) {
            alert(err)
        }
    }

    function onEditStream(initialValues) {
        return editStreamOnServ(
            actualStream.id,
            initialValues.categories,
            initialValues.description,
            initialValues.linkImage,
            initialValues.title
        )
            .then(() => setIsEditable(false))
            .catch(err => alert(err))
    }

    function onSubmit(values) {
        if (stream) {
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
        selectOptions={selectOptions}
        initialStartStreamFormValues={initialStartStreamFormValues}
        setSelectOptions={setSelectOptions}
        headerHei={headerHei}
        height={height}
        setStartStreamFormValues={setStartStreamFormValues}
        startStreamFormValues={startStreamFormValues}
        onSubmit={onSubmit}
        Notification={() => <Notification
            content={'You must select screen for sharing'}
            setAreOpen={setNotificationOpen}
        />}
        areNotificationOpen={areNotificationOpen}
        actualStream={actualStream}
        onDeleteStream={onDeleteStream}
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        getPrettyStreamCategories={getPrettyStreamCategories}
        actualUser={actualUser}
        onEditStream={onEditStream}
        isStreamInitialized={isStreamInitialized}
        onClose={onCloseStream}
        appLoading={appLoading}
    />
}


function mapStateToProps(state) {
    return {
        categories: selectCategoriesList(state),
        actualStream: selectActualStream(state),
        streamStates: selectStreamerStreamStates(state),
        actualUser: selectUserData(state),
        appLoading: selectAppLoading(state)
    }
}

export default connect(mapStateToProps, {
    addStreamOnServ,
    getCategoriesToSearchFromServ,
    setLoading: setLoadingAC,
    setActualStream,
    deleteStreamOnServ,
    editStreamOnServ,
    closeStreamOnServ,
    getSingleStreamFromServ
})(StartStreamPageContainer)
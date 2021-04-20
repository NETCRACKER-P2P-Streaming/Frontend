import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import StartStreamPage from './StartStreamPage'
import {commonRegExpValidator, customConditionValidator} from '../../../utils/validators'
import {addStreamOnServ} from '../../../../redux/reducers/stream_reducer'
import * as Stomp from 'stomp-websocket'
import {getCategoriesToSearchFromServ} from '../../../../redux/reducers/category_reducer'
import {selectCategoriesList} from '../../../../redux/selectors/selectors'
import {setLoadingAC} from '../../../../redux/reducers/app_reducer'
import Notification from '../../../util_components/Notification'

let stream = null
const connections = new Map()

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

let viewersCount = 0

async function cleanConnections() {
    viewersCount++
    if(viewersCount >= 10) {
        for(let key of connections.keys()) {
            if(connections[key].connectionState === 'closed' || connections[key].connectionState === 'failed') {
                connections.delete(key)
            }
        }
        viewersCount = 0
    }

}
async function openStreamerConnection(streamId) {
    const ws = new WebSocket('ws://localhost:8081/signaling')
    const client = Stomp.over(ws)

    client.connect({}, frame => {

        client.subscribe(`/queue/${streamId}/streamer/listen`, message => {
            const messageParsed = JSON.parse(message.body)
            const streamerPeerConnection= new RTCPeerConnection(peerConnectionConfig)
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


function StartStreamPageContainer({
                                      headerHei, height, addStreamOnServ, getCategoriesToSearchFromServ,
                                      categories, setLoading
                                  }) {

    const [isStreamInitialized, setIsStreamInitialized] = useState(false)

    async function onStartSharing() {
        try {
            const options = {
                video: {
                    cursor: true,
                },
                audio: false
            }
            stream = await navigator.mediaDevices.getDisplayMedia(options)
            document.getElementById('share_video_container').srcObject = stream
            stream.oninactive = onStopSharing
            setIsStreamInitialized(true)
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
            setIsStreamInitialized(false)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setLoading(true)
        getCategoriesToSearchFromServ()
            .catch(err => {
                alert(err.message)
                console.log(err)
            })
            .finally(() => setLoading(false))
    }, [])

    const initialStartStreamFormValues = {
        title: '',
        description: '',
        linkImage: '',
        categories: []
    }

    const [selectOptions, setSelectOptions] = useState(categories)

    useEffect(() => {
        setSelectOptions(categories)
    }, [categories])

    const [startStreamFormValues, setStartStreamFormValues] = useState(initialStartStreamFormValues)

    const startStreamFormValidators = {
        title: [
            commonRegExpValidator(
                /^[\w ]{5,50}$/,
                'Title must be 5-50 alphanumeric symbols'
            )
        ],
        description: [
            commonRegExpValidator(
                /^[\w ]{0,512}$/,
                'Description must be maximum 512 alphanumeric symbols'
            )
        ],
        categories: [
            customConditionValidator(
                val => val.length > 0,
                'At least one category must be selected'
            )
        ]
    }

    const [areNotificationOpen, setNotificationOpen] = useState(false)
    const showNotification = () => {
        setNotificationOpen(true)
        setTimeout(() => {
            setNotificationOpen(false);
        }, 3000)
    }

    function onSubmit(values) {
        if (isStreamInitialized) {
            // addStreamOnServ({
            //     ...values,
            //     categories: values.categories.filter(c => !!c)
            // })
            //     .then(response => openStreamerConnection(response.userId))
            openStreamerConnection('606a14ab79174b03035878c4')
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
        isStreamInitialized={isStreamInitialized}
        selectOptions={selectOptions}
        setSelectOptions={setSelectOptions}
        initialStartStreamFormValues={initialStartStreamFormValues}
        startStreamFormValues={startStreamFormValues}
        setStartStreamFormValues={setStartStreamFormValues}
        startStreamFormValidators={startStreamFormValidators}
        height={height}
        headerHei={headerHei}
        onSubmit={onSubmit}
        areNotificationOpen={areNotificationOpen}
        Notification={() => <Notification
            content={'You must select screen for sharing'}
            setAreOpen={setNotificationOpen}
        />}
    />
}

function mapStateToProps(state) {
    return {
        categories: selectCategoriesList(state)
    }
}

export default connect(mapStateToProps, {
    addStreamOnServ,
    getCategoriesToSearchFromServ,
    setLoading: setLoadingAC
})(StartStreamPageContainer)
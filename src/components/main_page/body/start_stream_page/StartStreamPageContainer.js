import React, {useEffect, useRef, useState} from 'react'
import {connect} from 'react-redux'
import StartStreamPage from './StartStreamPage'
import {commonRegExpValidator, customConditionValidator} from '../../../utils/validators'
import {addStreamOnServ} from '../../../../redux/reducers/stream_reducer'
import * as Stomp from 'stomp-websocket'
import {getCategoriesToSearchFromServ} from '../../../../redux/reducers/category_reducer'
import {selectCategoriesList} from '../../../../redux/selectors/selectors'
import {setLoadingAC} from '../../../../redux/reducers/app_reducer'
import Notification from '../../../util_components/Notification'

let stream = null;
let client

//const peerConnections = new Map();

async function openStreamerConnection(streamId, peerConnections) {
    const ws = new WebSocket('ws://localhost:3030/signaling')
    console.log("WS established")
    client = Stomp.over(ws)
    var headers = {
        // additional header
        'stream-id': streamId,
        'role': "streamer"
    };
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

    client.connect(headers, frame => {

        client.subscribe('/user/queue/api/error', message => console.log(JSON.parse(message.body)))

        client.subscribe(`/queue/${streamId}/watcher`, message => {
            let sessionId = message.body;
            let watcherPeer = new RTCPeerConnection(config)
            peerConnections[sessionId] = watcherPeer
            console.log(`1. Watcher connected = ${sessionId}, already connected = `, peerConnections);
            stream.getTracks().forEach(t => watcherPeer.addTrack(t, stream))

            watcherPeer.onicecandidate = event => {
                if (event.candidate) {
                    console.log("3. Send candidate to watcher")
                    client.send("/app/streamer/candidate", {}, JSON.stringify({
                        sessionId: sessionId,
                        candidate: event.candidate
                    }));
                }
            };

            watcherPeer.createOffer()
                .then(sdp => watcherPeer.setLocalDescription(sdp))
                .then(() => {
                    //Send offer for watcher, which connected
                    console.log("2. Offer sent")
                    client.send(
                        '/app/offer',
                        {},
                        JSON.stringify({
                            sessionId: sessionId,
                            streamId: streamId,
                            sdp: watcherPeer.localDescription.sdp
                        })
                    )
                })
        })

        client.subscribe(`/queue/${streamId}/streamer/candidate`, message => {
            console.log("5. Streamer received candidate from watcher")
            const messageParsed = JSON.parse(message.body)
            peerConnections[messageParsed.sessionId]
                .addIceCandidate(new RTCIceCandidate(messageParsed.candidate))
                .catch(e => console.error(e));
        })

        client.subscribe(`/queue/${streamId}/answer`, message=> {
            const messageParsed = JSON.parse(message.body)
            console.log("4. Answer received from watcher", messageParsed.sessionId)
            peerConnections[messageParsed.sessionId]
                .setRemoteDescription({sdp: messageParsed.sdp, type: 'answer'})
                .catch(e => console.log(e));;
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

    let peerConnections = new Map()
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
            openStreamerConnection('606a14ab79174b03035878c4',
                peerConnections)
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

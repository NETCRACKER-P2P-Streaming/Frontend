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

async function openStreamerConnection(streamId) {
    const ws = new WebSocket('ws://localhost:3030/signaling')

    const streamerPeerConnection = new RTCPeerConnection({
        /*iceServers: [     // Information about ICE servers - Use your own!
            {
                urls: "stun:stun4.l.google.com:19302"
            }
        ]*/
    })
    const client = Stomp.over(ws)

    function onicecandidate(event) {
        if (!streamerPeerConnection || !event || !event.candidate)
            return
        const candidate = event.candidate
        alert(candidate)
    }

    streamerPeerConnection.addEventListener("icecandidate", onicecandidate)

    client.connect({}, frame => {

        client.subscribe('/user/queue/api/error', message => console.log(JSON.parse(message.body)))

        client.subscribe(`/queue/${streamId}/streamer/offer`, message => {
            const messageParsed = JSON.parse(message.body)
            const desc = new RTCSessionDescription({...messageParsed.offerSDP, type: 'offer'})

            streamerPeerConnection.setRemoteDescription(desc)
                .then(() => stream.getTracks().forEach(t => streamerPeerConnection.addTrack(t, stream)))
                .then(() => streamerPeerConnection.createAnswer())
                .then(answer => streamerPeerConnection.setLocalDescription(answer))
                .then(() => {
                    client.send(
                        '/app/streamer/answer',
                        {},
                        JSON.stringify({
                            viewerId: messageParsed.viewerId,
                            answerSDP: {
                                sdp: streamerPeerConnection.localDescription.sdp
                            }
                        })
                    )
                })
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
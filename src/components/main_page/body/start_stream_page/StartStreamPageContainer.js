import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import StartStreamPage from './StartStreamPage'
import {commonRegExpValidator, customConditionValidator} from '../../../utils/validators'
import {addStreamOnServ} from '../../../../redux/reducers/stream_reducer'
import * as Stomp from 'stomp-websocket'
import {getCategoriesToSearchFromServ} from '../../../../redux/reducers/category_reducer'
import {selectAppLoading, selectCategoriesList} from '../../../../redux/selectors/selectors'
import {setLoadingAC} from "../../../../redux/reducers/app_reducer";

let stream = null

function StartStreamPageContainer({
                                      headerHei, height, addStreamOnServ, getCategoriesToSearchFromServ,
                                      categories, setLoading, appLoading
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

    async function openStreamerConnection(streamId) {
        const client = Stomp.over('http://localhost:3030/signaling')
        const streamerPeerConnection = new RTCPeerConnection({})

        stream.getTracks().forEach(t => streamerPeerConnection.addTrack(t, stream))

        client.connect({}, () => console.log('connection is going'))
        client.heartbeat.outgoing = 1000
        client.reconnect_delay = 5000

        client.subscribe(`/queue/${streamId}/stream/offer`, (message) => console.log(message))

        // const handleNegotiationNeededEvent = e => {
        //     if (streamerPeerConnection.signalingState !== 'stable') {
        //         return
        //     /*} else {
        //         streamerPeerConnection.createOffer()
        //             .then(offer => streamerPeerConnection.setLocalDescription(offer))
        //             .then(() => client.send('/app/stream/answer', {}, streamerPeerConnection.localDescription))
        //             .catch(() => console.log('error'))
        //     }*/
        // }
        // streamerPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent


        // streamerPeerConnection.onicecandidate = e => {
        //     if (e.candidate) {
        //         console.log(e.candidate)
        //     } else {
        //         streamerPeerConnection.getReceivers().forEach(r => )
        //     }
        // }


        // streamerPeerConnection.createAnswer()
        //     .then(answer => streamerPeerConnection.setLocalDescription(answer))
        //     .then(() => client.send('/app/stream/answer', {}, streamerPeerConnection.localDescription))
        //     .catch(() => console.log('error'))
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
    },[])
    const initialStartStreamFormValues = {
        title: '',
        description: '',
        linkImage: '',
        categories: []
    }

    const [selectOptions, setSelectOptions] = useState(categories)
    const [startStreamFormValues, setStartStreamFormValues] = useState(initialStartStreamFormValues)

    function onSubmit(values) {
        addStreamOnServ({
            ...values,
            categories: values.categories.filter(c => !!c)
        })
            .then(response => openStreamerConnection(response.userId))
            .catch(err => {
                alert(err.message)
                console.log(err)
            })
    }

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
    />
}

function mapStateToProps(state) {
    return {
        categories: selectCategoriesList(state),
        appLoading: selectAppLoading(state)
    }
}

export default connect(mapStateToProps, {
    addStreamOnServ,
    getCategoriesToSearchFromServ,
    setLoading: setLoadingAC
})(StartStreamPageContainer)
import React, {useState} from 'react'
import {connect} from 'react-redux'
import StartStreamPage from './StartStreamPage'
import {commonRegExpValidator, customConditionValidator} from '../../../utils/validators'
import * as Stomp from 'stomp-websocket'

let stream = null

function StartStreamPageContainer({headerHei, height}) {

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

    async function onSubmit() {
        const client = Stomp.overWS('<our url>')
        const streamerPeerConnection = new RTCPeerConnection({})
        client.connect({}, () => console.log('connection is going'))
        stream.getTracks().forEach(t => streamerPeerConnection.addTrack(t, stream))
        const answer = await streamerPeerConnection.createAnswer()
        await streamerPeerConnection.setLocalDescription(answer)
        client.heartbeat.outgoing = 1000;
        client.send('/app/stream/offer', {}, streamerPeerConnection.localDescription)
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
    const initialStartStreamFormValues = {
        title: '',
        description: '',
        linkImage: '',
        categories: []
    }
    const categoriesOptions = [
        {id: 1, name: 'option 1'},
        {id: 2, name: 'option 2'},
        {id: 3, name: 'option 3'},
    ]

    const [selectOptions, setSelectOptions] = useState(categoriesOptions)
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

    const addCategoryFormInitialValues = {
        title: '',
        description: ''
    }
    const [addCategoryFormValues, setAddCategoryFormValues] = useState(addCategoryFormInitialValues)
    const [isAddCategoryFormShown, setIsAddCategoryFormShown] = useState(false)
    const addCategoryFormValidators = {
        title: [
            commonRegExpValidator(
                /^[\w ]{2,30}$/,
                'Title must be 2-30 alphanumeric symbols'
            )
        ],
        description: [
            commonRegExpValidator(
                /^[\w ]{0,255}$/,
                'Description must be maximum 255 alphanumeric symbols'
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
        addCategoryFormValues={addCategoryFormValues}
        setAddCategoryFormValues={setAddCategoryFormValues}
        addCategoryFormValidators={addCategoryFormValidators}
        addCategoryFormInitialValues={addCategoryFormInitialValues}
        isAddCategoryFormShown={isAddCategoryFormShown}
        setIsAddCategoryFormShown={setIsAddCategoryFormShown}
    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {

})(StartStreamPageContainer)
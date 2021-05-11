import {signalingRequest, streamsAndCategoriesRequest} from './api'
import {config} from "../config/config";

export function getStreams(getStreamsData) {
    return streamsAndCategoriesRequest.post('/api/v1/streams-page', getStreamsData)
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function addStream(streamData) {
    return streamsAndCategoriesRequest.post('/api/v1/stream', streamData)
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function editStream(streamId, streamData, accessToken) {
    return streamsAndCategoriesRequest.put('/api/v1/stream', {
        id: streamId,
        streamDesc: streamData
    }, {
        headers: {'Authorization' : `Bearer ${accessToken}`}
    })
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
export function deleteStream(streamId, accessToken) {
    return streamsAndCategoriesRequest.delete(`/api/v1/stream`, {
        method: 'DELETE',
        headers: {'Authorization' : `Bearer ${accessToken}`},
        data: {id: streamId}
    })
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}

export function closeStream(cause, streamId) {
    return signalingRequest.post('/api/v1/stream', {
        cause,
        streamId
    })
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })
}
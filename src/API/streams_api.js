import {signalingRequest, streamsAndCategoriesRequest} from './api'

export function getStreams(getStreamsData) {
    return streamsAndCategoriesRequest.post('/api/stream/page', getStreamsData)
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
    return streamsAndCategoriesRequest.post('/api/stream/register', streamData)
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
    debugger
    return streamsAndCategoriesRequest.delete(`/api/stream/delete`, {
        headers: {'Authorization' : `Bearer ${accessToken}`},
        data: {id: streamId},
        withCredentials: true
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
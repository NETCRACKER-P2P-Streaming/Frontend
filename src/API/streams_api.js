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

export function addStream(streamData, accessToken) {
    const formData = new FormData()
    formData.append('preview', streamData.streamDesc.linkImage)
    delete streamData.streamDesc.linkImage
    formData.append('stream', JSON.stringify({
        ...streamData,
        streamDesc: {
            ...streamData.streamDesc,
            linkImage: undefined
        }
    }))
    return streamsAndCategoriesRequest.post('/api/v1/stream', formData, {
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

export function editStream(streamId, streamData, accessToken) {
    const formData = new FormData()
    formData.append('preview', streamData.linkImage)
    delete streamData.linkImage
    formData.append('stream', JSON.stringify({
        id: streamId,
        streamDesc: streamData
    }))
    return streamsAndCategoriesRequest.put('/api/v1/stream', formData, {
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

export function deleteStreamAdmin(streamId, accessToken) {
    return streamsAndCategoriesRequest.delete(`/api/v1/admin/stream`, {
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

export function closeStream(streamId, accessToken) {
    return streamsAndCategoriesRequest.put('/api/v1/stream/close', {
        id: streamId,
    }, {
        headers: {'Authorization' : `Bearer ${accessToken}`},
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

export function closeStreamAdmin(streamId, accessToken) {
    return streamsAndCategoriesRequest.put('/api/v1/stream/admin/close', {
        id: streamId,
    }, {
        headers: {'Authorization' : `Bearer ${accessToken}`},
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

export function getSingleStream(streamId) {
    return streamsAndCategoriesRequest.get(`/api/v1/streams/${streamId}`)
        .then(response => response.data)
        .catch(err => {
            if(err.response) {
                throw new Error(err.response.data.message)
            } else {
                throw err
            }
        })

}

export function increaseViewers(streamId) {
    return streamsAndCategoriesRequest.patch(`/api/v1/stream/increase-viewers`, {
        id: streamId
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

export function decreaseViewers(streamId) {
    return streamsAndCategoriesRequest.patch(`/api/v1/stream/decrease-viewers`, {
        id: streamId
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
export function increaseViews(streamId) {
    return streamsAndCategoriesRequest.patch(`/api/v1/stream/increase-views`, {
        id: streamId
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


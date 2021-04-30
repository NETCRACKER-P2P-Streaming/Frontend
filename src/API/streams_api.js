import {streamsAndCategoriesRequest} from './api'

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
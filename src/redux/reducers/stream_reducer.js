import {addStream, closeStream, deleteStream, editStream, getStreams} from '../../API/streams_api'
import {getUser, logout} from '../../API/user_api'
import {selectActualStream, selectStreamPageSize, selectStreamsList} from '../selectors/selectors'
import {Cookies} from 'react-cookie'

const ADD_STREAMS = 'ADD_STREAMS'
const SET_STREAMS = 'SET_STREAMS'
const SET_ACTUAL_STREAM = 'SET_ACTUAL_STREAM'

const defaultState = {
    streamsList: [],
    pageSize: 10,
    actualStream: null,
    types: [
        {
            title: 'By date',
            value: 'DATE'
        },
        {
            title: 'By views',
            value: 'VIEWS'
        },
        {
            title: 'By viewers',
            value: 'VIEWERS'
        }
    ],
    orders: [
        {
            title: 'Ascending',
            value: true
        },
        {
            title: 'Descending',
            value: false
        }
    ],
    viewerStreamStates: {
        NON_INITIALIZED: 'NON_INITIALIZED',
        OPENED: 'OPENED',
        CLOSED: 'CLOSED'
    }
}

export default function streamReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_ACTUAL_STREAM): {
            return {
                ...state,
                actualStream: action.streamInfo
            }
        }
        case(ADD_STREAMS): {
            return {
                ...state,
                streamsList: [
                    ...state.streamsList,
                    ...action.streamsColl
                ]
            }
        }
        case(SET_STREAMS): {
            return {
                ...state,
                streamsList: action.streamsColl
            }
        }
        default: {
            return state
        }
    }
}

function addStreamsAC(streamsColl) {
    return {
        type: ADD_STREAMS,
        streamsColl
    }
}

function setStreamsAC(streamsColl) {
    return {
        type: SET_STREAMS,
        streamsColl
    }
}

export function setActualStream(streamInfo) {
    return {
        type: SET_ACTUAL_STREAM,
        streamInfo
    }
}

export function editStreamOnServ(streamId, categoriesColl, description, linkImage, title) {
    return async dispatch => {
        try {
            const streamData = {
                categories: [...categoriesColl].filter(c => !!c),
                description: description,
                linkImage: linkImage,
                title: title
            }
            const cookies = new Cookies()
            const response = await editStream(streamId, streamData, cookies.get('accessToken'))
            dispatch(setActualStream({
                ...response,
                streamDesc: streamData
            }))
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function getStreamsFromServ(
    withReplace,
    title,
    categoriesColl,
    type,
    desc
) {
    return async (dispatch, getState) => {
        try {
            const appendStreams = withReplace ? setStreamsAC : addStreamsAC

            const pageSize = selectStreamPageSize(getState())
            const streamsTotalCount = selectStreamsList(getState()).length

            const response = await getStreams({
                title: title,
                desc: desc,
                categories: categoriesColl,
                type: type,
                page: withReplace ? 0 : Math.ceil(streamsTotalCount / pageSize),
                count: pageSize
            })
            let usersPromises = []
            for (let i = 0; i < response.length; i++) {

                usersPromises[i] = getUser(response[i].userId)
                    .then(u => {
                        response[i].user = u.userAttributes.reduce((acc, item) => {
                            acc[item.name] = item.value
                            return acc
                        }, {})
                    })
                    .catch(err => {
                        console.log(err)
                        response[i].user = null
                    })
            }
            dispatch(appendStreams(response))
            return Promise.all(usersPromises)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function addStreamOnServ(streamData) {
    return async (dispatch, getState) => {
        try {

            const resultedStreamData = {
                userId: getState().user.userData.username,
                streamDesc: streamData
            }

            return addStream(resultedStreamData)
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function deleteStreamOnServ(streamId) {
    return async (dispatch, getState) => {
        try {
            const cookies = new Cookies()
            await deleteStream(streamId, cookies.get('accessToken'))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}

export function closeStreamOnServ(streamId) {
    return async dispatch => {
        try {
            const cookies = new Cookies()
            const response = await closeStream(streamId, cookies.get('accessToken'))
            return Promise.resolve()
        } catch (err) {
            return Promise.reject(err)
        }
    }
}
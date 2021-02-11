import {getStreams} from '../../API/streams_api'
import {getUser} from '../../API/user_api'
import {selectStreamPageSize, selectStreamsList} from '../selectors/selectors'

const ADD_STREAMS = 'ADD_STREAMS'
const SET_STREAMS = 'SET_STREAMS'

const defaultState = {
    streamsList: [],
    pageSize: 10,
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
    ]
}

export default function streamReducer(state = defaultState, action) {
    switch (action.type) {
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
            for(let i = 0; i < response.length; i++) {
                usersPromises[i] = getUser(response[i].userId)
                    .then(u => {
                        const userData = u.userAttributes.reduce((acc, item) => {
                            acc[item.name] = item.value
                            return acc
                        }, {})
                        response[i].user = userData
                    })
                    .catch(err => {
                        console.log(err)
                        response[i].user = null
                    })
            }
            await Promise.all(usersPromises)
            dispatch(appendStreams(response))
        } catch(err) {
            return Promise.reject(err)
        }
    }
}
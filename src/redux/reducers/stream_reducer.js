const defaultState = {
    totalCount: 10,
    streamsList: new Array(8).fill('Stream')
}

export default function streamReducer(state = defaultState, action) {
    switch (action.type) {
        default: {
            return state
        }
    }
}
const config = {
    userServiceAddress: process.env.REACT_APP_REGISTRATION_ADDRESS,
    streamsServiceAddress: process.env.REACT_APP_STREAMS_ADRESS,
    appAddress: process.env.REACT_APP_ADDRESS,
    signalingSocketAddress: process.env.REACT_APP_SIGNALING_SOCKET,
    signalingHTTPAddress: process.env.REACT_APP_SIGNALING_HTTP
}

export {config}
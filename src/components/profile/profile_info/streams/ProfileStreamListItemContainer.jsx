import React, {useEffect, useState} from 'react'
import ProfileStreamListItem from './ProfileStreamListItem'


export default function ProfileStreamListItemContainer  ({
                                                        countViewers, streamTitle, streamLinkImage, 
                                                        }) {

    const [streamImage, setStreamImage] = useState(null)

    useEffect(() => {
        if(streamLinkImage) {
            const img = new Image()
            img.onload = () => {setStreamImage(streamLinkImage)}
            img.onerror = () => {setStreamImage(null)}
            img.src = streamLinkImage
        }
    }, [streamLinkImage])

    return <ProfileStreamListItem
        streamImage={streamImage}
        countViewers={countViewers}
        streamTitle={streamTitle}
            />
}
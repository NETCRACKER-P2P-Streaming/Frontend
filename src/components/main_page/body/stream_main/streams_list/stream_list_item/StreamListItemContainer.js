import React, {useEffect, useState} from 'react'
import StreamListItem from './StreamListItem'


export default function StreamListItemContainer({
                                                    countViewers, fullCategories, streamTitle,
                                                    userId, streamLinkImage, streamUserAttributes,
                                                    streamId
}) {

    const [streamImage, setStreamImage] = useState(null)
    const [avatarImage, setAvatarImage] = useState(null)

    useEffect(() => {
        // Если у пользователя существует поле аватарки -
        // идет проверка на валидность используемого изображения. Если изображение
        // не может быть загружено, тогда идет установка изображения в null
        // -> будет отображена заглушка
        if(streamUserAttributes && streamUserAttributes['custom:linkImage']) {
            const img = new Image()
            img.onload = () => {setAvatarImage(streamUserAttributes['custom:linkImage'])}
            img.onerror = () => {setAvatarImage(null)}
            img.src = streamUserAttributes['custom:linkImage']
        }
    }, [streamUserAttributes])

    useEffect(() => {
        if(streamLinkImage) {
            const img = new Image()
            img.onload = () => {setStreamImage(streamLinkImage)}
            img.onerror = () => {setStreamImage(null)}
            img.src = streamLinkImage
        }
    }, [streamLinkImage])

    return <StreamListItem
        streamImage={streamImage}
        avatarImage={avatarImage}
        countViewers={countViewers}
        fullCategories={fullCategories}
        streamTitle={streamTitle}
        userId={userId}
        streamId={streamId}
    />
}
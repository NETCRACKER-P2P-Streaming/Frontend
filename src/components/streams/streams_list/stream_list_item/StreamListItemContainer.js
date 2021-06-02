import React, {useEffect, useState} from 'react'
import StreamListItem from './StreamListItem'
import { deleteOneStreamOnServ, closeOneStreamOnServ } from '../../../../redux/reducers/stream_reducer'
import {connect} from 'react-redux'


function StreamListItemContainer({
                                                    countViewers, fullCategories, streamTitle, 
                                                    streamId, deleteOneStreamOnServ, closeOneStreamOnServ,
                                                    userId, streamLinkImage, streamUserAttributes,
                                                    status
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
        deleteOneStreamOnServ={deleteOneStreamOnServ}
        closeOneStreamOnServ={closeOneStreamOnServ}
        status={status}
    />
}
function mapStateToProps(state) {
    return {
      
    }
}

export default connect(mapStateToProps, {
    deleteOneStreamOnServ,
    closeOneStreamOnServ
    })(StreamListItemContainer)
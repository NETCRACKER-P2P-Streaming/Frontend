import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
    selectAppLoading,
    selectCategoriesList, selectSortStatuses,
    selectStreamsList,
    selectStreamsSortingOrders,
    selectStreamsSortingTypes
} from '../../../../redux/selectors/selectors'
import {getStreamsFromServ} from '../../../../redux/reducers/stream_reducer'
import {getCategoriesToSearchFromServ} from '../../../../redux/reducers/category_reducer'
import {setLoadingAC} from '../../../../redux/reducers/app_reducer'
import StreamPage from './StreamPage'
import {ResponsiveContext} from 'grommet'

function StreamPageContainer({
                                 getStreamsFromServ, getCategoriesToSearchFromServ,
                                 streamsList, categoriesList, setLoading,
                                 streamsSortingTypes, streamsSortingOrders,
                                 appLoading, headerHei, height, width, streamsSortingStatuses
                             }) {

    const size = React.useContext(ResponsiveContext)


    const [values, setValues] = useState({
        title: '',
        categories: [],
        type: streamsSortingTypes[0],
        desc: streamsSortingOrders[0],
        status: streamsSortingStatuses[0]
    })

    // Флаг, показывающий наличие элементов на сервере
    // для бесконечного скролла. Изначально false до первого
    // получения элементов
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setHasMore(false)
        // Получение стримов и категорий при монтировании компоненты
        // Promise.all([
            // getStreamsFromServ(
            //     true,
            //     undefined,
            //     [],
            //     streamsSortingTypes[0].value,
            //     streamsSortingOrders[0].value
            // ),
            getCategoriesToSearchFromServ()
        // ])
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => {
                setLoading(false)
                if(Array.isArray(streamsList) && streamsList.length > 0) {
                    setHasMore(true)
                }
            })
    }, [])

    // Функция и состояние таймаута для запросов при изменении данных формы.
    // Когда данные формы изменяются, состояние таймаута заполняется. При этом,
    // если данные формы не изменились -> выполняется запрос. Иначе старый
    // таймаут чистится и все повторяется
    const [requestTimeOut, setRequestTimeOut] = useState(undefined)

    useEffect(() => manageRequests(), [values])

    function manageRequests() {
        clearTimeout(requestTimeOut)
        setRequestTimeOut(
            setTimeout(
                () => {
                    setLoading(true)
                    let title = undefined
                    if (/^[\w ]{6,50}$/.test(values.title)) {
                        title = values.title
                    }
                    getStreamsFromServ(
                        true,
                        title,
                        values.categories,
                        values.type.value,
                        values.desc.value,
                        values.status.value
                    )
                        .catch(err => {
                            console.log(err)
                            alert(err.message)
                        })
                        .finally(() => setLoading(false))
                },
                500
            )
        )
    }

    // Функция запроса следующих элементов в бесконечном скролле
    function onMore() {
        let title = undefined
        if (values.title.length > 0)
            title = values.title
        setHasMore(true)
        getStreamsFromServ(
            false,
            title,
            values.categories,
            values.type.value,
            values.desc.value,
            values.status.value
        )
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setHasMore(false))
    }

    return <StreamPage
        streamsList={streamsList}
        categoriesList={categoriesList}
        windowHeight={height}
        topHeight={headerHei}
        streamsSortingTypes={streamsSortingTypes}
        streamsSortingOrders={streamsSortingOrders}
        values={values}
        setValues={setValues}
        onMore={onMore}
        hasMore={hasMore}
        size={size}
        appLoading={appLoading}
        streamsSortingStatuses={streamsSortingStatuses}
    />
}

function mapStateToProps(state) {
    return {
        streamsList: selectStreamsList(state),
        categoriesList: selectCategoriesList(state),
        streamsSortingTypes: selectStreamsSortingTypes(state),
        streamsSortingOrders: selectStreamsSortingOrders(state),
        streamsSortingStatuses: selectSortStatuses(state),
        appLoading: selectAppLoading(state)
    }
}

export default connect(mapStateToProps, {
    getStreamsFromServ,
    getCategoriesToSearchFromServ,
    setLoading: setLoadingAC
})(StreamPageContainer)



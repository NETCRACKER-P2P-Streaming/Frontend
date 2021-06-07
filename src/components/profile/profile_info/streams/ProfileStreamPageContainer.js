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
import ProfileStreamPage from './ProfileStreamPage'
import useWindowDimensions from '../../../utils/useWindowDimention'
import {ResponsiveContext} from 'grommet'

function ProfileStreamPageContainer({
                                 getStreamsFromServ, getCategoriesToSearchFromServ,
                                 streamsList, categoriesList, setLoading,
                                 streamsSortingTypes, streamsSortingOrders,
                                 appLoading, profile, streamsSortingStatuses
                             }) {

    const size = React.useContext(ResponsiveContext)

    // Данные, необходимые для выбора высоты элемента
    const {height, width} = useWindowDimensions()
    const [headerHei, setHeaderHei] = useState(document.querySelector('header')?.clientHeight)
    useEffect(
        () => setHeaderHei(document.querySelector('header')?.clientHeight),
        [height, width]
    )


    const [values, setValues] = useState({
        title: '',
        categories: [],
        type: streamsSortingTypes[0],
        desc: streamsSortingOrders[0],
        status: streamsSortingStatuses[3]
    })

    // Флаг, показывающий наличие элементов на сервере
    // для бесконечного скролла. Изначально false до первого
    // получения элементов
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        console.log(hasMore)
    }, [hasMore])
    useEffect(() => {
        setLoading(true)
        setHasMore(false)
        // Получение стримов и категорий при монтировании компоненты
        Promise.all([
            getStreamsFromServ(
                true,
                undefined,
                [],
                streamsSortingTypes[0].value,
                streamsSortingOrders[0].value,
                values.status.value,
                profile.username
            ),
            getCategoriesToSearchFromServ()
        ])
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => {
                setLoading(false)
                setHasMore(false)
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
                        values.status.value,
                        profile.username
                    )
                        .then(res => {
                            if(Array.isArray(res) && res.length > 0) {
                                setHasMore(true)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            alert(err.message)
                        })
                        .finally(() => setLoading(false))
                },
                1000
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
            profile.username
        )
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setHasMore(false))
    }

    return <ProfileStreamPage
        streamsList={streamsList}
        categoriesList={categoriesList}
        windowHeight={height}
        topHeight={headerHei}
        streamsSortingTypes={streamsSortingTypes}
        streamsSortingOrders={streamsSortingOrders}
        streamsSortingStatuses={streamsSortingStatuses}
        values={values}
        setValues={setValues}
        onMore={onMore}
        hasMore={hasMore}
        size={size}
        appLoading={appLoading}
        profile={profile}
    />
}

function mapStateToProps(state) {
    return {
        streamsList: selectStreamsList(state),
        categoriesList: selectCategoriesList(state),
        streamsSortingTypes: selectStreamsSortingTypes(state),
        streamsSortingOrders: selectStreamsSortingOrders(state),
        streamsSortingStatuses: selectSortStatuses(state),
        appLoading: selectAppLoading(state),
        profile:state.profilePage.profile
    }
}

export default connect(mapStateToProps, {
    getStreamsFromServ,
    getCategoriesToSearchFromServ,
    setLoading: setLoadingAC
})(React.memo(ProfileStreamPageContainer))



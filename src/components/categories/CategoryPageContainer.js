import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {
    selectAppLoading,
    selectCategoriesList,
} from '../../redux/selectors/selectors'
import {
    getCategoriesFromServ, 
    addOneCategory, 
    deleteOneCategory,
    updateOneCategory
} from '../../redux/reducers/category_reducer'
import {setLoadingAC} from '../../redux/reducers/app_reducer'
import CategoryPage from './CategoryPage'
import useWindowDimensions from '../utils/useWindowDimention'
import {ResponsiveContext} from 'grommet'

function CategoryPageContainer({
                                 getCategoriesFromServ, categoriesList, setLoading, 
                                 deleteOneCategory, appLoading, addOneCategory, updateOneCategory
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
        name: '',
        desc: ''
    })

    // Флаг, показывающий наличие элементов на сервере
    // для бесконечного скролла. Изначально false до первого
    // получения элементов
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)

        // Получение стримов и категорий при монтировании компоненты
        Promise.all([
            getCategoriesFromServ(
                true,
                undefined,
                undefined            ),
        ])
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => {
                setLoading(false)
                if(Array.isArray(categoriesList) && categoriesList.length > 0) {
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
                    let name = undefined
                    if (/^[\w ]{6,50}$/.test(values.name)) {
                        name = values.name
                    }
                    getCategoriesFromServ(
                        true,
                        name,
                        values.desc.value
                    )
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
        let name = undefined
        if (values.name.length > 0)
            name = values.name
        setHasMore(true)
        getCategoriesFromServ(
            false,
            name,
            values.desc.value
        )
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
            .finally(() => setHasMore(false))
    }

    return <CategoryPage
        categoriesList={categoriesList}
        windowHeight={height}
        topHeight={headerHei}
        values={values}
        setValues={setValues}
        onMore={onMore}
        hasMore={hasMore}
        size={size}
        appLoading={appLoading}
        addOneCategory={addOneCategory}
        deleteOneCategory={deleteOneCategory}
        updateOneCategory={updateOneCategory}
    />
}

function mapStateToProps(state) {
    return {
        categoriesList: selectCategoriesList(state),
        appLoading: selectAppLoading(state)
    }
}

export default connect(mapStateToProps, {
    getCategoriesFromServ,
    setLoading: setLoadingAC,
    addOneCategory,
    deleteOneCategory,
    updateOneCategory
})(CategoryPageContainer)



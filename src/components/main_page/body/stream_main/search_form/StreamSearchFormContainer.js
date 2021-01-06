import React, {useContext, useState} from 'react'
import {connect} from 'react-redux'
import StreamSearchForm from './StreamSearchForm'
import {ResponsiveContext} from 'grommet'
import StreamSearchFormMobile from './StreamSearchFormMobile'


function StreamSearchFormContainer({}) {

    const categoriesColl = ['Game', 'Chatting']

    const [values, setValues] = useState({
        title: '',
        categories: []
    })

    //Состояние загрузки при получении списка категорий
    const [loading, setLoading] = useState(false)
    const size = useContext(ResponsiveContext)
    const [collapse, setCollapse] = useState(false)


    return size === 'small'
        ? <StreamSearchFormMobile
            values={values}
            setValues={setValues}
            loading={loading}
            categoriesColl={categoriesColl}
            collapse={collapse}
            size={size}
            setCollapse={setCollapse}
        />
        : <StreamSearchForm
            values={values}
            setValues={setValues}
            loading={loading}
            categoriesColl={categoriesColl}
            collapse={collapse}
            setCollapse={setCollapse}
            size={size}
        />
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, {

})(StreamSearchFormContainer)
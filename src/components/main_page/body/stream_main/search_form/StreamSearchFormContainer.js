import React, {useState} from 'react'
import {connect} from 'react-redux'
import StreamSearchForm from './StreamSearchForm'


function StreamSearchFormContainer({}) {

    const categoriesColl = ['Game', 'Chatting']
    const [values, setValues] = useState({
        title: '',

        //Должны приходить с сервера
        categories: []
    })

    //Состояние загрузки при получении списка категорий
    const [loading, setLoading] = useState(false)

    return (
        <StreamSearchForm
            values={values}
            setValues={setValues}
            loading={loading}
            categoriesColl={categoriesColl}
        />
    )
}

function mapStateToProps(state) {
    return {

    }
}

export default connect(mapStateToProps, {

})(StreamSearchFormContainer)
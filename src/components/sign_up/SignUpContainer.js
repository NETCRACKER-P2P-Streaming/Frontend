import React from 'react'
import SignUpForm from '../main_page/sign_forms/sign_up_form/SignUpForm'
import {connect} from 'react-redux'

function SignUpContainer({}) {

    return <SignUpForm

    />
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {

})(SignUpForm)
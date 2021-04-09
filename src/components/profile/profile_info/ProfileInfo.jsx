import React from "react"
import Loading from "../../util_components/Loading"
import { Box, Button, Grid, Form} from 'grommet'
import ChangePasswordContainer from "./ChangePasswordContainer"
import withFormModal from '../../main_page/sign_forms/sign_in_form/withFormModal'
import ProfileDataForm from "./ProfileDataForm"
import { connect } from "react-redux"
import {selectIsPasswordFormOpen} from '../../../redux/selectors/selectors'
import { setPasswordFormOpenAC } from "../../../redux/reducers/app_reducer"
import { savePhoto } from "../../../redux/reducers/profile_reducer"

function ProfileInfo ({
                        profile, isPasswordFormOpen, isOwner,savePhoto,
                        saveProfile,updateStatus,setPasswordFormOpen
                     }) {
  if (!profile) {
    return <Loading />
  }
  let userAtt = profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
  const openLogModal = () => setPasswordFormOpen(true)
  const closeLogModal = () => setPasswordFormOpen(false)
  // Оборачивание  формы изменения пароля в модальное окно
  const PasswordInModalFormWrapped = withFormModal(closeLogModal)(ChangePasswordContainer)
  return (
    <Box
      direction="row"
      border={{ color: 'brand', size: 'large' }}
      pad="medium">
      <Grid
        rows={['large', 'medium']}
        columns={['large', 'small']}
        gap="xlarge"
        areas={[
          { name: 'profile', start: [0, 0], end: [1, 0] },
          { name: 'streams', start: [0, 1], end: [1, 1] },
        ]}
      >
      <Box gridArea="profile"  >
        <ProfileDataForm      
          isOwner={isOwner}
          profile={profile}
          saveProfile={saveProfile}
          updateStatus={updateStatus} 
          savePhoto={savePhoto}/>
          <Box
            direction={'row'}
            justify={'between'}
            margin={{ top: 'medium' }}
          >  
            <Button
              default={true}
              label={'Reset password'}
              pad={'small'}
              margin={{left: 'small', right: 'small'}}
              onClick={openLogModal}
            />
          </Box>
          {isPasswordFormOpen && <PasswordInModalFormWrapped />}
        </Box>
        <Box gridArea="streams"  >
          <Form>
            <Button
              type={'submit'}
              primary label={'Start new stream'}
            />
          </Form>
        </Box>
       
      </Grid>

    </Box>
  )
}

function mapStateToProps(state) {
  return {  isPasswordFormOpen: selectIsPasswordFormOpen(state)
  }
}
export default connect(mapStateToProps, {
  setPasswordFormOpen: setPasswordFormOpenAC,
  savePhoto 

})(ProfileInfo)
import React from "react"
import Loading from "../../util_components/Loading"
import { Box, Button, Grid, Tabs, Tab} from 'grommet'
import ChangePasswordContainer from "./ChangePasswordContainer"
import withFormModal from '../../main_page/sign_forms/sign_in_form/withFormModal'
import ProfileDataForm from "./ProfileDataForm"
import { connect } from "react-redux"
import {selectIsPasswordFormOpen,selectProfileStreamsList} from '../../../redux/selectors/selectors'
import { setPasswordFormOpenAC } from "../../../redux/reducers/app_reducer"
import { deletePhoto,
         uploadPhoto  } from "../../../redux/reducers/profile_reducer"
import StreamPageContainer from './../../main_page/body/stream_main/StreamPageContainer'
import ProfileStreamPageContainer from "./streams/ProfileStreamPageContainer"

function ProfileInfo ({
                        profile, isPasswordFormOpen, isOwner, 
                        deletePhoto, uploadPhoto, saveProfile, 
                        updateStatus, setPasswordFormOpen
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
    <Tabs>
    <Tab title="tab 1">
    <Box
      direction="row"
      border={{ color: 'brand', size: 'large' }}
      pad="medium">
     
      <Box   >
        <ProfileDataForm      
          isOwner={isOwner}
          profile={profile}
          saveProfile={saveProfile}
          updateStatus={updateStatus} 
          deletePhoto={deletePhoto}
          uploadPhoto={uploadPhoto}

        />
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
    
       

    </Box>
    </Tab>
    <Tab title="tab 2">
      <ProfileStreamPageContainer/>
    </Tab>
  </Tabs>

  )
}

function mapStateToProps(state) {
  return {  
    isPasswordFormOpen: selectIsPasswordFormOpen(state),
    streamsList: selectProfileStreamsList(state),

  }
}
export default connect(mapStateToProps, {
  setPasswordFormOpen: setPasswordFormOpenAC,
  deletePhoto,
  uploadPhoto 

})(ProfileInfo)
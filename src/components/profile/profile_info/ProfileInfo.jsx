import React from "react"
import Loading from "../../util_components/Loading"
import { Box, Button, Tabs, Tab } from 'grommet'
import ChangePasswordContainer from "./ChangePasswordContainer"
import withFormModal from '../../main_page/sign_forms/sign_in_form/withFormModal'
import ProfileDataForm from "./ProfileDataForm"
import { connect } from "react-redux"
import { selectIsPasswordFormOpen, selectProfileStreamsList } from '../../../redux/selectors/selectors'
import { setPasswordFormOpenAC } from "../../../redux/reducers/app_reducer"
import {
  deletePhoto,
  uploadPhoto
} from "../../../redux/reducers/profile_reducer"
import ProfileStreamPageContainer from "./streams/ProfileStreamPageContainer"

function ProfileInfo({
  profile, isPasswordFormOpen, isOwner,
  deletePhoto, uploadPhoto, saveProfile,
  updateStatus, setPasswordFormOpen
}) {
  if (!profile) {
    return <Loading />
  }
  
  const openLogModal = () => setPasswordFormOpen(true)
  const closeLogModal = () => setPasswordFormOpen(false)
  // Оборачивание  формы изменения пароля в модальное окно
  const PasswordInModalFormWrapped = withFormModal(closeLogModal)(ChangePasswordContainer)
  return (
    <Tabs pad='small' >
      <Tab margin={'small'} title="Profile" >
        <Box
          margin={'small'}
        >
          <Box>
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
              margin={{ top: 'large' }}
            >
              <Button
                default={true}
                label={'Reset password'}
                pad={'small'}
                size={'small'} 
                onClick={openLogModal}
              />
            </Box>
            {isPasswordFormOpen && <PasswordInModalFormWrapped />}
          </Box>
        </Box>
      </Tab>
      <Tab margin={'small'} title="My streams">
        <ProfileStreamPageContainer />
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
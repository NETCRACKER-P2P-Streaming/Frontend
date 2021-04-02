import React from "react"
import Loading from "../../util_components/Loading"
import { Box, Button, Grid, Form, FormField, Heading, Text, TextInput } from 'grommet'
import ProfileAvatarContainer from "./ProfileAvatarContainer"
import ProfileStatus from "./ProfileStatus"
import ChangePasswordContainer from "./ChangePasswordContainer"
import withFormModal from '../../main_page/sign_forms/sign_in_form/withFormModal'
import ProfileDataForm from "./ProfileDataForm"
const ProfileInfo = ({profile,isPasswordFormOpen,setPasswordFormOpen,isOwner,saveProfile,status,updateStatus}) => {
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
          { name: 'profile', start: [0, 0], end: [0, 0] },
          { name: 'streams', start: [0, 1], end: [1, 1] },
          { name: 'button', start: [1, 0], end: [1, 0] },
        ]}
      >
        <Box gridArea="profile"  >

          <ProfileDataForm      isOwner={isOwner}
      profile={profile}
      status={status}
      saveProfile={saveProfile}
      updateStatus={updateStatus} />
          <FormField
              label={'Password'}
              name={'password'}
              required={true}
            >
              <TextInput
                type={'password'}
                id={'password'}
                name={'password'}
                width={'large'}
              />
            </FormField>
            <Button
                            default={true}
                            color={'light-1'}
                            label={'Reset password'}
                            pad={'small'}
                            margin={{left: 'small', right: 'small'}}
                            onClick={openLogModal}
                        />
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
        <Box gridArea="button"  >
          <Heading></Heading>
          <Button
            type={'submit'}
            label={'Save'}
            primary
          />
        </Box>
      </Grid>

    </Box>
  )
}
export default ProfileInfo
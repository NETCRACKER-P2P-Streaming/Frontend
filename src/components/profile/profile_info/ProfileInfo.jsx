import React from "react"
import Loading from "../../util_components/Loading"
import { Box, Button, Grid, Form, FormField, Heading, Text, TextInput } from 'grommet'
import ProfileAvatarContainer from "./ProfileAvatarContainer"
import ProfileStatus from "./ProfileStatus"

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Loading />
  }
  let userAtt = props.profile.userAttributes.reduce((acc, att) => {
    acc[att.name] = att.value
    return acc
  }, {})
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

          <Heading
            level={1}>
            {userAtt['name']}&nbsp;
            {userAtt['family_name']}
          </Heading>
          <ProfileStatus status={userAtt['custom:description']} />
          <ProfileAvatarContainer />
          <Box
            pad="small">
            <FormField
              label={'Nickname'}
              name={'nickname'}
              required={true}
            >
              <TextInput
                type={'nickname'}
                id={'nickname'}
                name={'nickname'}
                width={'large'}
              />
            </FormField>
            <FormField
              label={'Email'}
              name={'email'}
              required={true}
            >
              <TextInput
                type={'email'}
                id={'email'}
                name={'email'}
                width={'large'}
              />
            </FormField>
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
          </Box>
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
export default ProfileInfo;